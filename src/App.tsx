import { useState, useEffect } from 'react';
import { supabase, StudyPlan } from './lib/supabase';
import CreatePlanForm from './components/CreatePlanForm';
import StudyPlansList from './components/StudyPlansList';
import StudyTimer from './components/StudyTimer';
import BelanAnimation from './components/BelanAnimation';
import { BookOpen } from 'lucide-react';

function App() {
  const [plans, setPlans] = useState<StudyPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<StudyPlan | null>(null);
  const [showBelanAnimation, setShowBelanAnimation] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const { data, error } = await supabase
        .from('study_plans')
        .select('*')
        .order('scheduled_time', { ascending: false });

      if (error) throw error;
      setPlans(data || []);
    } catch (error) {
      console.error('Error fetching plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePlan = async (title: string, duration: number, scheduledTime: string) => {
    try {
      const { error } = await supabase.from('study_plans').insert([
        {
          title,
          duration_minutes: duration,
          scheduled_time: scheduledTime,
        },
      ]);

      if (error) throw error;
      await fetchPlans();
    } catch (error) {
      console.error('Error creating plan:', error);
    }
  };

  const handleDeletePlan = async (id: string) => {
    try {
      const { error } = await supabase.from('study_plans').delete().eq('id', id);

      if (error) throw error;
      await fetchPlans();
    } catch (error) {
      console.error('Error deleting plan:', error);
    }
  };

  const handleComplete = async () => {
    if (!selectedPlan) return;

    try {
      const { error } = await supabase
        .from('study_plans')
        .update({ completed: true })
        .eq('id', selectedPlan.id);

      if (error) throw error;
      await fetchPlans();
      setSelectedPlan(null);
    } catch (error) {
      console.error('Error completing plan:', error);
    }
  };

  const handleBreak = async () => {
    if (!selectedPlan) return;

    try {
      const { error } = await supabase
        .from('study_plans')
        .update({ broken: true })
        .eq('id', selectedPlan.id);

      if (error) throw error;

      setShowBelanAnimation(true);
    } catch (error) {
      console.error('Error marking plan as broken:', error);
    }
  };

  const handleAnimationComplete = async () => {
    setShowBelanAnimation(false);
    setSelectedPlan(null);
    await fetchPlans();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-100 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-blue-500 animate-bounce mx-auto mb-4" />
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <BookOpen className="w-12 h-12 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">Study Accountability App</h1>
          </div>
          <p className="text-gray-600">Break your plan? Mom will remind you to study!</p>
        </header>

        {selectedPlan ? (
          <div className="flex justify-center">
            <StudyTimer
              plan={selectedPlan}
              onComplete={handleComplete}
              onBreak={handleBreak}
            />
          </div>
        ) : (
          <>
            <CreatePlanForm onCreatePlan={handleCreatePlan} />
            <StudyPlansList
              plans={plans}
              onSelectPlan={setSelectedPlan}
              onDeletePlan={handleDeletePlan}
            />
          </>
        )}

        {showBelanAnimation && (
          <BelanAnimation onComplete={handleAnimationComplete} />
        )}
      </div>
    </div>
  );
}

export default App;
