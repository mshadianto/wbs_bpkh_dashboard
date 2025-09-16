/*
  # Create attachments table for report files

  1. New Tables
    - `attachments`
      - `id` (uuid, primary key)
      - `report_id` (uuid, foreign key to reports)
      - `name` (text, file name)
      - `type` (text, file type/mime type)
      - `size` (bigint, file size in bytes)
      - `url` (text, file URL)
      - `uploaded_at` (timestamptz, upload timestamp)

  2. Security
    - Enable RLS on `attachments` table
    - Add policies for file management
*/

CREATE TABLE IF NOT EXISTS attachments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id uuid NOT NULL REFERENCES reports(id) ON DELETE CASCADE,
  name text NOT NULL,
  type text NOT NULL,
  size bigint NOT NULL DEFAULT 0,
  url text NOT NULL,
  uploaded_at timestamptz DEFAULT now()
);

ALTER TABLE attachments ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read attachments
CREATE POLICY "Users can read attachments"
  ON attachments
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to upload attachments
CREATE POLICY "Authenticated users can upload attachments"
  ON attachments
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow users to delete attachments (admins and investigators)
CREATE POLICY "Admins and investigators can delete attachments"
  ON attachments
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'investigator', 'manager')
    )
  );