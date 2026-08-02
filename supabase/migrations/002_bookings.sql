-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id VARCHAR(100) NOT NULL DEFAULT 'smile-care-indore',
  patient_name VARCHAR(150) NOT NULL,
  patient_phone VARCHAR(30) NOT NULL,
  service_name VARCHAR(100) NOT NULL,
  booking_date DATE NOT NULL,
  booking_time VARCHAR(20) NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'CONFIRMED',
  source VARCHAR(30) NOT NULL DEFAULT 'WEB_WIDGET', -- 'WEB_WIDGET' or 'WHATSAPP'
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_bookings_clinic_date ON bookings(clinic_id, booking_date);

-- Enable Supabase Realtime for bookings table
ALTER PUBLICATION supabase_realtime ADD TABLE bookings;
