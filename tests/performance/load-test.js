import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 }, // Ramp up to 20 VUs
    { duration: '1m', target: 50 },  // Sustained peak load 50 VUs
    { duration: '30s', target: 0 },  // Ramp down to 0
  ],
  thresholds: {
    http_req_duration: ['p(95)<1500'], // 95% of requests should complete within 1.5s
    http_req_failed: ['rate<0.01'],    // Error rate under 1%
  },
};

const BASE_URL = __ENV.TARGET_URL || 'http://localhost:3000';

export default function () {
  // Test 1: Send Web Booking Submission
  const bookingPayload = JSON.stringify({
    clinicId: 'smile-care-indore',
    patientName: `Load Test User ${__VU}`,
    patientPhone: '9876543210',
    serviceName: 'Teeth Cleaning',
    bookingDate: '2026-09-01',
    bookingTime: '10:00 AM',
    source: 'WEB_WIDGET',
  });

  const headers = { 'Content-Type': 'application/json' };

  const bookingRes = http.post(`${BASE_URL}/api/send-booking`, bookingPayload, { headers });
  check(bookingRes, {
    'send-booking status is 200': (r) => r.status === 200,
    'send-booking success is true': (r) => JSON.parse(r.body).success === true,
  });

  sleep(1);

  // Test 2: Incoming WhatsApp Webhook Request
  const webhookPayload = JSON.stringify({
    object: 'whatsapp_business_account',
    entry: [
      {
        id: 'entry_k6',
        changes: [
          {
            field: 'messages',
            value: {
              messaging_product: 'whatsapp',
              metadata: { display_phone_number: '919876543210', phone_number_id: '100' },
              messages: [
                {
                  from: `91987${__VU}43210`,
                  id: `k6_msg_${Date.now()}`,
                  timestamp: `${Math.floor(Date.now() / 1000)}`,
                  type: 'text',
                  text: { body: 'What are your clinic working hours?' },
                },
              ],
            },
          },
        ],
      },
    ],
  });

  const webhookRes = http.post(`${BASE_URL}/api/webhook`, webhookPayload, { headers });
  check(webhookRes, {
    'webhook status is 200': (r) => r.status === 200,
  });

  sleep(1);
}
