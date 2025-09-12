/*
  # Create users table for BPKH system

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `name` (text, user's full name)
      - `email` (text, unique email address)
      - `role` (text, user role: admin, investigator, manager, viewer)
      - `department` (text, user's department)
      - `avatar` (text, optional avatar URL)
      - `last_login` (timestamptz, last login timestamp)
      - `is_active` (boolean, account status)
      - `created_at` (timestamptz, account creation time)
      - `updated_at` (timestamptz, last update time)

  2. Security
    - Enable RLS on `users` table
    - Add policies for authenticated users to manage user data
*/

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  role text NOT NULL CHECK (role IN ('admin', 'investigator', 'manager', 'viewer')),
  department text NOT NULL,
  avatar text,
  last_login timestamptz DEFAULT now(),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read all users
CREATE POLICY "Users can read all user data"
  ON users
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow admins to insert new users
CREATE POLICY "Admins can insert users"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Allow admins and users themselves to update user data
CREATE POLICY "Users can update own data or admins can update any"
  ON users
  FOR UPDATE
  TO authenticated
  USING (
    id = auth.uid() OR 
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Allow admins to delete users
CREATE POLICY "Admins can delete users"
  ON users
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Insert default admin user
INSERT INTO users (name, email, role, department, is_active) VALUES
  ('Admin BPKH', 'admin@bpkh.go.id', 'admin', 'IT & Security', true),
  ('Dr. Ahmad Santoso', 'ahmad.santoso@bpkh.go.id', 'investigator', 'Internal Audit', true),
  ('Siti Nurhaliza, S.H.', 'siti.nurhaliza@bpkh.go.id', 'manager', 'Legal & Compliance', true),
  ('Budi Prasetyo, M.M.', 'budi.prasetyo@bpkh.go.id', 'admin', 'IT & Security', true)
ON CONFLICT (email) DO NOTHING;