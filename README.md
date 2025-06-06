## 🚀 Features

### 1. High Heart Rate Events

- **Endpoint**: `GET api/patient/high-rate-events?threshold=100`
- **Description**: Lists all events where a patient's heart rate exceeded 100 bpm.

---

### 2. Heart Rate Analytics

- **Endpoint**: `GET api/analytics/heart-rate-analytics?from=timestamp&to=timestamp`
- **Description**: Calculates average, minimum, and maximum heart rate values per patient in a time range.

---

### 3. Patient Request Tracking

- **Endpoint**: `GET api/tracker/requests-count`
- **Description**: Returns a count of how many times each patient's data has been requested via endpoints like high-rate events and analytics.

---

## 🧪 Mock Data

Located in `data/mock-data.json`, containing:

- Patients
- Heart rate readings with timestamps

---

## ⚙️ Tech Stack

- **NestJS (TypeScript)**
- In-memory tracking via `Map`
- JSON-based mock data (no database)

---

## 🛠 Setup

```bash
# Install dependencies
yarn

# Run the app
yarn run start:dev