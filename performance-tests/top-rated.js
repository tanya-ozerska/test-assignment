import { sleep, check, group } from "k6";
import http from "k6/http";

const ACCESS_TOKEN = __ENV.ACCESS_TOKEN;
const BASE_URL = __ENV.BASE_URL ?? "https://api.themoviedb.org";

export const options = {
  thresholds: {
    // Assert that 99% of requests finish within 500ms
    http_req_duration: ["p(99) < 500"],
    http_req_duration: ["avg<300"],
    "http_req_duration{name:top_rated}": ["avg<300"],
  },
  stages: [
    // Baseline Performance Test (Normal Load)
    { duration: '30s', target: 10 }, // Ramp up to 10 users
    { duration: '1m', target: 10 },  // Maintain 10 users for 1 minute

    // Stress Test (Heavy Load)
    { duration: '30s', target: 100 }, // Ramp up to 100 users
    { duration: '1m', target: 100 },  // Maintain 100 users for 1 minute

    // Soak Test (Long Duration with Moderate Load)
    { duration: '10m', target: 10 },  // Maintain 10 users for 10 minutes

    // Spike Test (Sudden Surge of Traffic)
    { duration: '10s', target: 50 },  // Ramp up to 50 users
    { duration: '30s', target: 50 },  // Maintain 50 users for 30 seconds
    { duration: '10s', target: 0 },   // Ramp down to 0 users

    // Rate Limit Test (Testing Rate Limiting)
    { duration: '20s', target: 50 },  // Simulate 50 requests per second
  ],
};

// Simulated user behavior
export default function () {
  group('GET movie/top_rated', () => {

    const params = {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`
      },
      tags: { name: "top_rated" },
    };

    let res = http.get(`${BASE_URL}/3/movie/top_rated`, params);

    // Validate response status
    check(res, {
      "status is 200": (r) => r.status === 200,
      "response time < 500ms": (r) => r.timings.duration < 500,
      "status is 429 when rate limit exceeded": (r) => r.status === 429 || r.status === 200,
    });
    sleep(1);
  })
}
