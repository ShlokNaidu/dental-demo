-- Create clinics table
CREATE TABLE IF NOT EXISTS clinics (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  address VARCHAR(255) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  hours VARCHAR(100) NOT NULL,
  services JSONB NOT NULL DEFAULT '[]'::jsonb,
  system_prompt TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Insert default demo clinic
INSERT INTO clinics (id, name, address, phone, hours, services, system_prompt)
VALUES (
  'smile-care-indore',
  'Smile Care Dental Clinic',
  'Scheme 54, Vijay Nagar, Indore, MP 452010',
  '+91 98765 43210',
  'Mon-Sat: 10:00 AM - 8:00 PM, Sun: Closed',
  '[{"name": "Teeth Cleaning", "price": 800}, {"name": "Root Canal Treatment", "price": 3500}, {"name": "Dental Braces Consultation", "price": 500}, {"name": "Comprehensive Checkup", "price": 300}]'::jsonb,
  'You are an intelligent, polite, and reassuring AI assistant for Smile Care Dental Clinic in Vijay Nagar, Indore. Answer patient logistics questions accurately based on prices: Cleaning (₹800), Root Canal (₹3500), Braces Consultation (₹500), Checkup (₹300). Hours are Mon-Sat 10 AM - 8 PM. Keep answers concise and helpful.'
) ON CONFLICT (id) DO NOTHING;
