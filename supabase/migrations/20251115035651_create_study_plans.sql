/*
  # Study Plan Application Schema

  1. New Tables
    - `study_plans`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `title` (text) - Name of the study plan
      - `duration_minutes` (integer) - Planned study duration
      - `scheduled_time` (timestamptz) - When to study
      - `completed` (boolean) - Whether completed successfully
      - `broken` (boolean) - Whether the plan was broken
      - `created_at` (timestamptz)
    
    - `study_sessions`
      - `id` (uuid, primary key)
      - `plan_id` (uuid, references study_plans)
      - `started_at` (timestamptz)
      - `ended_at` (timestamptz)
      - `actual_duration_minutes` (integer)
      - `completed` (boolean)
  
  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to manage their own data
*/

CREATE TABLE IF NOT EXISTS study_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) DEFAULT auth.uid(),
  title text NOT NULL,
  duration_minutes integer NOT NULL DEFAULT 30,
  scheduled_time timestamptz NOT NULL,
  completed boolean DEFAULT false,
  broken boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS study_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id uuid REFERENCES study_plans(id) ON DELETE CASCADE,
  started_at timestamptz DEFAULT now(),
  ended_at timestamptz,
  actual_duration_minutes integer,
  completed boolean DEFAULT false
);

ALTER TABLE study_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own study plans"
  ON study_plans FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own study plans"
  ON study_plans FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own study plans"
  ON study_plans FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own study plans"
  ON study_plans FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own study sessions"
  ON study_sessions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM study_plans
      WHERE study_plans.id = study_sessions.plan_id
      AND study_plans.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own study sessions"
  ON study_sessions FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM study_plans
      WHERE study_plans.id = study_sessions.plan_id
      AND study_plans.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own study sessions"
  ON study_sessions FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM study_plans
      WHERE study_plans.id = study_sessions.plan_id
      AND study_plans.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM study_plans
      WHERE study_plans.id = study_sessions.plan_id
      AND study_plans.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own study sessions"
  ON study_sessions FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM study_plans
      WHERE study_plans.id = study_sessions.plan_id
      AND study_plans.user_id = auth.uid()
    )
  );