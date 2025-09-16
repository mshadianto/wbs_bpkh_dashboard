/*
  # Create reports table for whistleblowing system

  1. New Tables
    - `reports`
      - `id` (uuid, primary key)
      - `title` (text, report title)
      - `category` (text, report category)
      - `description` (text, detailed description)
      - `location` (text, incident location)
      - `witnesses` (text, witness information)
      - `evidence` (text, evidence description)
      - `contact_preference` (text, preferred contact method)
      - `status` (text, current status)
      - `priority` (text, priority level)
      - `assigned_to` (uuid, assigned investigator)
      - `is_anonymous` (boolean, anonymous flag)
      - `risk_level` (numeric, risk assessment score)
      - `created_at` (timestamptz, submission time)
      - `updated_at` (timestamptz, last update time)

  2. Security
    - Enable RLS on `reports` table
    - Add policies for report management
*/

CREATE TABLE IF NOT EXISTS reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL CHECK (category IN ('fraud', 'harassment', 'safety', 'corruption', 'other')),
  description text NOT NULL,
  location text NOT NULL,
  witnesses text DEFAULT '',
  evidence text DEFAULT '',
  contact_preference text NOT NULL,
  status text DEFAULT 'new' CHECK (status IN ('new', 'investigating', 'resolved', 'closed', 'escalated')),
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  assigned_to uuid REFERENCES users(id),
  is_anonymous boolean DEFAULT true,
  risk_level numeric DEFAULT 5.0 CHECK (risk_level >= 0 AND risk_level <= 10),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read all reports
CREATE POLICY "Users can read all reports"
  ON reports
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow anyone to insert reports (for anonymous submissions)
CREATE POLICY "Anyone can submit reports"
  ON reports
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow investigators and admins to update reports
CREATE POLICY "Investigators and admins can update reports"
  ON reports
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'investigator', 'manager')
    )
  );

-- Allow admins to delete reports
CREATE POLICY "Admins can delete reports"
  ON reports
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Insert sample reports
INSERT INTO reports (title, category, description, location, witnesses, evidence, contact_preference, status, priority, risk_level) VALUES
  (
    'Dugaan Penyalahgunaan Dana Operasional',
    'fraud',
    'Terdapat indikasi penyalahgunaan dana operasional untuk kepentingan pribadi oleh pejabat di departemen keuangan.',
    'Departemen Keuangan - Lantai 3',
    'Staf administrasi yang melihat transaksi mencurigakan',
    'Dokumen transaksi, email internal, rekaman percakapan',
    'Email aman (anonim)',
    'investigating',
    'high',
    8.5
  ),
  (
    'Pelecehan di Tempat Kerja',
    'harassment',
    'Laporan pelecehan verbal dan intimidasi yang dilakukan oleh supervisor terhadap bawahan.',
    'Divisi SDM - Ruang Meeting B',
    'Beberapa rekan kerja yang hadir dalam meeting',
    'Rekaman audio, testimoni saksi',
    'Pertemuan langsung (rahasia)',
    'new',
    'critical',
    9.2
  ),
  (
    'Pelanggaran Prosedur Keamanan',
    'safety',
    'Pelanggaran protokol keamanan dalam penanganan dokumen rahasia.',
    'Ruang Arsip - Gedung Utama',
    'Petugas keamanan',
    'CCTV, log akses sistem',
    'Anonim - Tidak perlu kontak',
    'new',
    'medium',
    6.8
  )
ON CONFLICT DO NOTHING;