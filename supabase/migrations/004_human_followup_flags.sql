-- Create human_followup_flags table
CREATE TABLE IF NOT EXISTS human_followup_flags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number VARCHAR(30) NOT NULL,
  patient_name VARCHAR(150),
  reason VARCHAR(255) NOT NULL,
  original_message TEXT NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'PENDING', -- 'PENDING', 'RESOLVED'
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_followup_status ON human_followup_flags(status);
