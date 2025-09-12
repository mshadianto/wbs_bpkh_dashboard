/*
  # Create timeline events table for report tracking

  1. New Tables
    - `timeline_events`
      - `id` (uuid, primary key)
      - `report_id` (uuid, foreign key to reports)
      - `type` (text, event type)
      - `description` (text, event description)
      - `user_id` (uuid, user who created the event)
      - `created_at` (timestamptz, event timestamp)

  2. Security
    - Enable RLS on `timeline_events` table
    - Add policies for timeline management
*/

CREATE TABLE IF NOT EXISTS timeline_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id uuid NOT NULL REFERENCES reports(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('created', 'assigned', 'updated', 'resolved', 'escalated', 'comment')),
  description text NOT NULL,
  user_id uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE timeline_events ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read timeline events
CREATE POLICY "Users can read timeline events"
  ON timeline_events
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to insert timeline events
CREATE POLICY "Authenticated users can create timeline events"
  ON timeline_events
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow users to update their own timeline events
CREATE POLICY "Users can update own timeline events"
  ON timeline_events
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Insert sample timeline events
INSERT INTO timeline_events (report_id, type, description, user_id) 
SELECT 
  r.id,
  'created',
  'Laporan dibuat dan menunggu review',
  u.id
FROM reports r, users u 
WHERE r.title = 'Dugaan Penyalahgunaan Dana Operasional' 
AND u.email = 'admin@bpkh.go.id'
LIMIT 1;