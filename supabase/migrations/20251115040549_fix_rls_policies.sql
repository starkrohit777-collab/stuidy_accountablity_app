/*
  # Fix RLS Policies for Study Plans

  The previous policies required authentication, but they were too restrictive
  for unauthenticated access. This migration updates the policies to allow
  anonymous users to create and manage study plans.
*/

DROP POLICY IF EXISTS "Users can insert own study plans" ON study_plans;
DROP POLICY IF EXISTS "Users can update own study plans" ON study_plans;
DROP POLICY IF EXISTS "Users can delete own study plans" ON study_plans;
DROP POLICY IF EXISTS "Users can view own study plans" ON study_plans;

CREATE POLICY "Anyone can create study plans"
  ON study_plans FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view study plans"
  ON study_plans FOR SELECT
  USING (true);

CREATE POLICY "Anyone can update study plans"
  ON study_plans FOR UPDATE
  WITH CHECK (true);

CREATE POLICY "Anyone can delete study plans"
  ON study_plans FOR DELETE
  USING (true);

DROP POLICY IF EXISTS "Users can view own study sessions" ON study_sessions;
DROP POLICY IF EXISTS "Users can insert own study sessions" ON study_sessions;
DROP POLICY IF EXISTS "Users can update own study sessions" ON study_sessions;
DROP POLICY IF EXISTS "Users can delete own study sessions" ON study_sessions;

CREATE POLICY "Anyone can view study sessions"
  ON study_sessions FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert study sessions"
  ON study_sessions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update study sessions"
  ON study_sessions FOR UPDATE
  WITH CHECK (true);

CREATE POLICY "Anyone can delete study sessions"
  ON study_sessions FOR DELETE
  USING (true);