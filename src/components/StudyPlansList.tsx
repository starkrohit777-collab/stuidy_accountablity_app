import { BookOpen, Clock, Trash2 } from 'lucide-react';
import { StudyPlan } from '../lib/supabase';

interface StudyPlansListProps {
  plans: StudyPlan[];
  onSelectPlan: (plan: StudyPlan) => void;
  onDeletePlan: (id: string) => void;
}

export default function StudyPlansList({ plans, onSelectPlan, onDeletePlan }: StudyPlansListProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (plans.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">No study plans yet. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Study Plans</h2>
      {plans.map((plan) => (
        <div
          key={plan.id}
          className={`bg-white rounded-lg shadow-lg p-6 transition-all hover:shadow-xl ${
            plan.completed
              ? 'border-l-4 border-green-500'
              : plan.broken
              ? 'border-l-4 border-red-500'
              : 'border-l-4 border-blue-500'
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{plan.title}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Clock size={16} />
                  {plan.duration_minutes} minutes
                </span>
                <span>{formatDate(plan.scheduled_time)}</span>
              </div>
              {plan.completed && (
                <span className="inline-block mt-2 text-sm font-semibold text-green-600">
                  ✓ Completed
                </span>
              )}
              {plan.broken && (
                <span className="inline-block mt-2 text-sm font-semibold text-red-600">
                  ✗ Plan Broken
                </span>
              )}
            </div>

            <div className="flex gap-2">
              {!plan.completed && !plan.broken && (
                <button
                  onClick={() => onSelectPlan(plan)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                  Start
                </button>
              )}
              <button
                onClick={() => onDeletePlan(plan.id)}
                className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
