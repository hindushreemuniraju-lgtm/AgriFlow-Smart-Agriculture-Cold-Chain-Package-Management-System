# 🌱 AgriFlow - Smart Agriculture & Package Management System

> **A modern, full-stack, multi-interface platform for intelligent crop harvesting, dynamic multi-layer smart packaging, route-bundled fair cold-chain logistics, and cryptographic farm-to-fork Product Passports.**

Built with an ultra-premium dark UI using deep blues (`#0f172a`, `#1e1b4b`), vibrant purples (`#7e22ce`, `#a855f7`), and glowing neon accents (`#38bdf8`, `#10b981`, `#c084fc`), glassmorphism card effects, smooth animations, and micro-interactions.

---

## 🌟 Key Features

### 🌐 Global Multilingual Switcher
Located prominently at the top header, supporting real-time dynamic switching across:
- **English** (en)
- **हिन्दी / Hindi** (hi)
- **ಕನ್ನಡ / Kannada** (kn)
- **తెలుగు / Telugu** (te)
- **தமிழ் / Tamil** (ta)
- **मराठी / Marathi** (mr)
- **ਪੰਜਾਬੀ / Punjabi** (pa)

Translates titles, indicators, packaging layers, marketplace bids, route optimization terms, and nutritional passports dynamically.

---

### 1. 🚜 Farmer Interface
- **Crop Selection & Dashboard**: Pre-loaded catalog featuring Vine-Ripened Roma Tomatoes, Ratnagiri Alphonso Mangoes, Winter Dawn Strawberries, Tri-Color Bell Peppers, Thompson Seedless Grapes, and Baby Spinach with real-time maturity stages, category pills, and base mandi prices.
- **Smart Insights Engine**:
  - Regional Terroir Simulation (Nashik, Ratnagiri, Mahabaleshwar, Bengaluru Rural, Shimla).
  - Microclimate telemetry (Ambient temperature, humidity, solar radiation, rain risk).
  - IoT Soil Probe Telemetry (Moisture %, neutral pH balance, Nitrogen, Phosphorus, Potassium).
  - **Optimal Harvesting Timeline & Countdown**: Live countdown to peak harvest, Brix sugar target, fruit firmness penetrometer index, and ideal picking hours (early morning 06:00 AM - 09:30 AM).
  - **Quality Improvement Techniques**: Immediate, Scheduled, and Monitoring agronomy interventions.
- **Smart Packaging AI Guidance (Ultra-Attractive Visual Showcase)**:
  - **3D-Styled 5-Layer Interactive Cross-Section Visualizer**:
    1. *Layer 1: Outer Protective Armor* (5-ply Kraft or Heavy Export Fluted Carton with 450 kg stack load limit).
    2. *Layer 2: Impact & Vibration Dampener* (Molded pulp trays or honeycomb air-chambers absorbing up to 3.8g highway shock).
    3. *Layer 3: Thermal & Microclimate Barrier* (IoT Active Cold Chain maintaining core pulp temperatures for 48+ hours).
    4. *Layer 4: Active Respiration & Ethylene Scavenger* (Potassium Permanganate KMnO4 / 1-MCP strip with 99.4% gas scrubbing).
    5. *Layer 5: Digital Tamper-Evident QR Smart Tag* (Dynamic QR batch seal with cryptographic verification).
  - **Interactive Transit Distance Slider (20 km to 1,500 km)** and Target Market Selector (*Local Mandi, Supermarket Chain, Air Export, Food Processing*).
  - **Glowing Performance Gauges**: 98.2% Shock Dampening, 48h Thermal Lock, 99.4% Gas Scrub, and 4.6x ROI Spoilage Prevention Savings.
  - **5-Step Standard Packing Blueprint (SOP)** with interactive completion checklist.
  - **Packaging Blueprint PDF / Certificate Viewer**.
- **Transport Order Request**:
  - Input produce weight (kg), boxes count, pickup location, preferred morning/evening pickup window.
  - Transparent Fair-Price Benchmark auto-calculated based on distance and load.
  - Instant dynamic QR Batch Tag generator preview with celebratory confetti dispatch.

---

### 2. 🚛 Logistics & Transportation Interface
- **Fair-Price Marketplace & Driver Bidding**:
  - List of active farmer transport demands with transparent formula breakdown:
    $$\text{Fair Price} = \text{Base (₹800)} + (\text{Distance} \times \text{₹22/km}) + (\text{Weight} \times \text{₹0.35/kg}) + \text{Cold Chain Surcharge (₹600)}$$
  - Verified fleet partners (Tata Ultra Reefer, Eicher Insulated Canter, Mahindra EV Reefer, Ashok Leyland High-Deck).
  - Instant One-Click Accept at fair benchmark or custom driver bid submission.
- **Route & Batch Optimizer**:
  - Select 2 or more farmer orders to bundle onto a single consolidated route.
  - Real-time vehicle capacity fill gauge (0% to 100% capacity).
  - Multi-order bundling analytics: **Distance Saved (km)**, **Diesel Fuel Conserved (Liters)**, **CO2e Emissions Prevented (kg)**, and **Farmer Bundling Discounts**.
  - Optimized Multi-Stop Waypoint Itinerary (Pickup 1 ➔ Pickup 2 ➔ Highway Transit ➔ Supermarket Delivery Hub).
- **Interactive Tracking & Schedule Management**:
  - Real-time simulated IoT telemetry: Reefer cargo temperature chart ($\pm0.2^\circ\text{C}$ stability), humidity %, vehicle highway speed (km/h), and live ETA countdown.
  - Container door security sensor and seal verification.
  - 5-stage chronological route progress tracking.

---

### 3. 📱 Customer Interface & QR Product Passport
- **Interactive QR Code Scanner / Simulator**:
  - Visual camera scanner with animated laser beam and corner guides.
  - 1-click quick-scan preset batch buttons (*#AGF-8921 Roma Tomatoes, #AGF-4412 Ratnagiri Mangoes, #AGF-7734 Strawberries, #AGF-3390 Bell Peppers, #AGF-5501 Thompson Grapes*).
  - Custom batch code search.
- **Digital Product Passport Card**:
  - Verified provenance badge with blockchain verification hash and scannable QR tag.
  - Farm & harvest origin profile (farmer name, contact, farm territory, harvest timestamp, soil health score, chemical residue test certificate).
  - Chronological cold-chain audit log with logged temperatures at each stage.
  - **Dynamic Freshness & Real-Time Shelf Life**: Ambient room temp vs refrigerator days remaining countdown.
  - Recommended home preservation & storage techniques.
  - Complete nutritional breakdown (Calories, Vitamin C, Vitamin A, Fiber, Antioxidant index, Glycemic index).
  - **Optimal Consumption Guide**: Chef-curated recipes, preparation steps, and bioavailability enhancement tips.
  - **Direct Farmer Appreciation & Tip Modal**: 5-star quality rating, tip amount selection (₹20, ₹50, ₹100, ₹200), personal thank-you note, and celebratory confetti.
  - Cryptographic Certificate of Provenance viewer and printable certificate.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Lucide React icons, `qrcode.react`, `canvas-confetti`.
- **Backend**: Express 5, TypeScript (`tsx`), CORS, RESTful API architecture.
- **i18n**: Custom reactive multilingual engine supporting 7 languages.

---

## 🚀 Running the Application

### 1. Unified Development Mode (Runs Frontend + Backend together)
```bash
npm run dev
```
- Frontend will open on: `http://localhost:5173`
- Backend API runs on: `http://localhost:5000`

### 2. Standalone Full-Stack Server
```bash
npm run build
npm start
```
- The Express server serves both the REST API and the compiled production React client directly at: `http://localhost:5000`

---

## 📡 Key API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/crops` | Returns all crop agronomy & packaging presets |
| `POST` | `/api/insights/simulate` | Computes simulated weather, soil health, and harvest readiness |
| `POST` | `/api/packaging/recommend` | Calculates 5-layer packaging matrix, shock rating, and SOP blueprint |
| `GET` | `/api/orders` | Retrieves all farmer transport orders |
| `POST` | `/api/orders` | Creates new transport order with batch ID & fair price benchmark |
| `GET` | `/api/logistics/marketplace` | Retrieves pending loads and verified fleet haulers |
| `POST` | `/api/logistics/bid` | Driver bids or accepts order at benchmark |
| `POST` | `/api/logistics/batch-optimize` | Bundles 2+ orders, computing fuel savings and multi-stop route |
| `GET` | `/api/logistics/telemetry/:id` | Returns real-time IoT reefer temperature & GPS telemetry |
| `GET` | `/api/passport/:batchId` | Returns cryptographic product passport, provenance & nutrition |
| `POST` | `/api/passport/tip` | Submits customer tip and 5-star gratitude review directly to farmer |
