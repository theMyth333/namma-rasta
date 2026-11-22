# 🛣️ NammaRasta
### *Smarter Roads. Safer Journeys.*

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-namma--rasta.vercel.app-blue?style=for-the-badge)](https://namma-rasta.vercel.app/)

> A smart road monitoring and maintenance intelligence platform that transforms everyday vehicle journeys into a distributed road-condition network — built for Bengaluru's urban road infrastructure.

---

## 🚨 The Problem

Every day, millions of vehicles navigate Bengaluru's roads — dodging potholes, bracing for uneven surfaces, and enduring roads that haven't seen maintenance in years.

**The reality on the ground:**

- 🕳️ **Potholes go undetected for weeks** — until a tyre bursts or an accident happens
- 📋 **Maintenance is reactive, not proactive** — authorities wait for citizen complaints instead of acting on data
- 📍 **No centralised visibility** — road condition data is fragmented across departments with no unified view
- 🚦 **High-traffic corridors deteriorate fastest** — but maintenance priority often ignores traffic load and accident history
- 📊 **Decisions are made without data** — budget allocation for road repair lacks evidence-based prioritisation
- ⏳ **Delayed response costs lives** — road-condition-related accidents occur on roads that were already flagged but never fixed

The result? Citizens suffer. Accidents happen. Budgets are wasted on the wrong roads.

---

## 💡 The Solution — NammaRasta

**NammaRasta** turns the thousands of vehicles already on the road into a distributed sensor network.

Modern vehicles are equipped with accelerometers, GPS modules, and suspension sensors. As they travel across the city, they silently detect road anomalies — potholes, cracks, uneven surfaces, damaged sections — and transmit that data to a central server along with precise GPS coordinates, timestamps, and severity measurements.

NammaRasta aggregates this data alongside road infrastructure details, maintenance history, traffic density, and accident records — and presents everything through a unified, actionable intelligence dashboard built for municipal road authorities.

> **"Instead of waiting for citizens to report potholes, we proactively identify road problems using data already being collected by vehicles on the road."**

---

## 🗺️ Features at a Glance

### 📊 Overview Dashboard
Real-time KPIs including total potholes detected, critical anomalies, roads monitored, roads requiring maintenance, accident count, and active sensor vehicles — with charts for road condition distribution, detection trends, and severity breakdown.

### 🗺️ Live Road Map
An interactive Leaflet/OpenStreetMap powered map of Bengaluru showing all detected pothole and anomaly locations with colour-coded severity markers. Click any marker to see full detection details including GPS coordinates, sensor confidence score, road condition, and last maintenance date.

| Marker Colour | Severity |
|---|---|
| 🔴 Red | Critical |
| 🟠 Orange | High |
| 🟡 Yellow | Medium |
| 🟢 Green | Low |

Filter by severity, road name, or anomaly type to focus on what matters most.

### 🛣️ Road Intelligence
A complete intelligence profile for every monitored road — including road classification, length, number of lanes, current condition, maintenance history, traffic density, accident records, and detected potholes. Identify at a glance which roads are deteriorating and why.

### 🕳️ Pothole Monitoring
A searchable, filterable, sortable table of every anomaly detection across the city. Filter by severity or resolution status, sort by confidence score or detection time, and open a detail panel for each record including depth, width, detecting vehicle ID, and sensor confidence.

### 🚦 Traffic & Accidents
Understand how road conditions correlate with traffic load and accident history. View average daily vehicle volume, peak congestion periods, accident-prone roads, and injury/fatality data — all cross-referenced with road condition.

### 🔧 Maintenance Insights
A data-driven maintenance prioritisation engine. Every road gets a composite **Priority Score (0–100)** calculated from road condition, pothole count, traffic density, and accident history. Roads are ranked highest-to-lowest urgency so authorities can act on the right roads first.

---

## 🏙️ Why This Matters for Bengaluru

Bengaluru's road network spans thousands of kilometres across rapidly growing corridors — ORR, Hosur Road, Tumkur Road, Mysuru Road, Sarjapur Road — all under immense daily traffic pressure. BBMP and NHAI manage maintenance across these roads with limited real-time visibility.

NammaRasta gives road authorities the intelligence they need to:

- ✅ Know exactly where the worst potholes are — before an accident happens
- ✅ Prioritise roads with the highest combination of damage, traffic, and accident risk
- ✅ Track maintenance contractor activity and renovation history
- ✅ Make evidence-based budget decisions for road repair
- ✅ Reduce accident rates on high-risk corridors through timely intervention

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS |
| Maps | Leaflet + React-Leaflet + OpenStreetMap |
| Charts | Recharts |
| Icons | Lucide React |
| Data | Local JSON (mock data) |
| Language | JavaScript (ES Modules) |

> No backend. No database. No API keys required. All data is loaded from local JSON files — making this fully self-contained and demo-ready.

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/theMyth333/namma-rasta.git
cd namma-rasta

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📂 Project Structure

```
src/
├── components/
│   ├── Sidebar.jsx        # Left navigation
│   ├── TopBar.jsx         # Header bar
│   ├── KpiCard.jsx        # Reusable metric card
│   └── Badges.jsx         # Severity / condition / status badges
├── pages/
│   ├── Overview.jsx           # KPI dashboard + charts
│   ├── RoadMap.jsx            # Interactive Leaflet map
│   ├── RoadIntelligence.jsx   # Road list + detail drill-down
│   ├── PotholeMonitoring.jsx  # Anomaly table + detail panel
│   ├── TrafficAccidents.jsx   # Traffic & accident analytics
│   └── MaintenanceInsights.jsx # Priority scoring & ranking
└── data/
    ├── roads.json         # 10 Bengaluru roads
    ├── potholes.json      # 30 anomaly detections
    ├── traffic.json       # Traffic data per road
    ├── accidents.json     # 10 accident records
    └── maintenance.json   # Maintenance history
```

---

## 🎯 Demo Workflows

### Workflow 1 — Identify a critical pothole
1. Open the **Overview** dashboard → note the critical pothole count
2. Navigate to **Live Road Map**
3. Click a red marker → view the pothole's GPS location, severity, sensor confidence, and last maintenance date

### Workflow 2 — Investigate a deteriorating road
1. Open **Road Intelligence** → find a road marked *Critical* or *Poor*
2. Click the road → view its full profile:
   - Pothole detection history
   - Last renovation date
   - Traffic density
   - Accident history
3. Understand the full picture of why this road needs urgent attention

### Workflow 3 — Prioritise maintenance budget
1. Open **Maintenance Insights**
2. View the ranked priority table — roads scored by a composite index of condition, potholes, traffic, and accidents
3. Identify which roads deliver the highest safety return per maintenance rupee

---

## 📍 Data Coverage

All mock data covers **Bengaluru, Karnataka** with realistic GPS coordinates across major corridors:

| Road | Area |
|---|---|
| Outer Ring Road (ORR) | East Bengaluru |
| Hosur Road (NH 44) | South Bengaluru |
| Tumkur Road (NH 48) | North Bengaluru |
| Bannerghatta Road | South Bengaluru |
| Old Madras Road (NH 75) | East Bengaluru |
| MG Road | Central Bengaluru |
| Cunningham Road | Central Bengaluru |
| Sarjapur Road | South-East Bengaluru |
| Bellary Road (NH 44) | North Bengaluru |
| Mysuru Road (NH 275) | West Bengaluru |

---

## ⚠️ Disclaimer

This is a **hackathon prototype** built for demonstration purposes. All data is mock/simulated and does not represent actual municipal sensor data, real road conditions, or official BBMP/NHAI records. GPS coordinates are approximate.

---

<p align="center">
  Built with ❤️ for smarter, safer roads · NammaRasta 2026
</p>
