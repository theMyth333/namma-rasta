# Build Prompt: NammaRasta – Smart Road Monitoring Dashboard

## 1. Project Overview

Build a modern, professional ReactJS dashboard prototype named **NammaRasta**.

NammaRasta is a smart road monitoring and maintenance intelligence platform that uses data collected from vehicles already equipped with sensors.

These vehicles continuously detect road anomalies such as:
- Potholes
- Uneven road surfaces
- Road cracks
- Speed breakers and damaged road sections
- Other road infrastructure issues

When an anomaly is detected, the vehicle sends information to a central server along with:
- GPS coordinates (latitude and longitude)
- Detection timestamp
- Vehicle identifier
- Anomaly type
- Severity level
- Sensor confidence score
- Other relevant sensor measurements

The platform combines this information with additional contextual data, including:
- Road details and classification
- Last road renovation or maintenance date
- Traffic density
- Accident history
- Nearby landmarks
- Previous pothole reports
- Road maintenance priority

NammaRasta presents this information through a centralized dashboard to help municipal authorities understand road conditions and make informed maintenance decisions.

## 2. Hackathon Scope and Constraints

This is a hackathon prototype, not a production application.

**Time constraint:**
- Target a functional MVP within the first 60 minutes.
- Use the remaining hackathon time for visual improvements, testing, and presentation preparation.
- Prioritize functionality and a polished demonstration over architectural complexity.

**Technical constraints:**
- ReactJS frontend only.
- Use Vite for project setup.
- Use JavaScript (not TypeScript).
- No backend.
- No database.
- No authentication.
- No API integrations.
- No real IoT or vehicle sensor integrations.
- No external services requiring API keys.

All application data must be stored in local JSON files inside the project.

Suggested structure:

```text
src/
  components/
  pages/
  data/
    roads.json
    potholes.json
    traffic.json
    accidents.json
    maintenance.json
  hooks/
  utils/
  App.jsx
  main.jsx
```

Use mock JSON data imported directly into React components.

Do not introduce unnecessary architecture or abstractions. Keep the implementation simple and easy to modify during the hackathon.

## 3. Dashboard Design

Create a modern smart-city operations dashboard.

**Application name:** NammaRasta

**Tagline:** Smarter Roads. Safer Journeys.

Design guidelines:
- Professional smart-city / urban mobility dashboard.
- Clean, modern interface.
- Light theme.
- White and light-grey backgrounds.
- Deep navy or dark blue for navigation.
- Green for healthy road conditions.
- Orange for moderate issues.
- Red for critical issues.
- Use consistent typography, spacing, and icons.
- Responsive desktop-first layout.
- Use reusable React components.

Suggested technology:
- ReactJS + Vite
- Tailwind CSS
- Lucide React icons
- Recharts for charts
- Leaflet with OpenStreetMap for interactive maps, without requiring an API key.

## 4. Main Dashboard Features

### A. Overview Dashboard

Display KPI cards at the top:

1. Total Potholes Detected
2. Critical Potholes
3. Roads Monitored
4. Roads Requiring Maintenance
5. Accidents Reported
6. Active Sensor Vehicles

Each KPI should display:
- Main metric
- Relevant icon
- Supporting description
- Optional comparison indicator

Below the KPI cards, display:

**Road Condition Distribution**
- Good
- Moderate
- Poor
- Critical

Use a donut chart.

**Pothole Detection Trend**
- Daily pothole detections over the last 7 days.
- Use a line or bar chart.

**Severity Distribution**
- Critical, High, Medium, Low.
- Use a chart.

**Recent Detection Activity**
Display a table containing:
- Detection ID
- Road name
- Location
- Anomaly type
- Severity
- Detection time
- Status

Allow users to click a record to see its details.

### B. Interactive Road Map

This is one of the most important features.

Display an interactive map showing mock pothole detection locations.

Requirements:
- Use Leaflet and OpenStreetMap.
- Use mock GPS coordinates around Chennai, India.
- Display pothole locations using colored markers.
- Red markers: Critical.
- Orange markers: High.
- Yellow markers: Medium.
- Green markers: Low.

When a user clicks a marker, display a popup containing:
- Pothole ID
- Road name
- Severity
- Detection timestamp
- GPS coordinates
- Road condition
- Last maintenance date

Provide filters:
- Severity
- Road name
- Anomaly type

The map should be visually prominent and occupy a significant portion of the dashboard.

### C. Road Intelligence

Create a dedicated Road Intelligence section.

Display a list or table of monitored roads.

Each road should contain:
- Road ID
- Road name
- Area
- Road classification
- Road length
- Current condition
- Total detected potholes
- Last renovation date
- Maintenance priority

Allow users to select a road and open a detailed view.

The road detail view should contain:

**Road Information**
- Road name
- Location
- Road type
- Length
- Number of lanes
- Current condition

**Maintenance History**
- Last renovation date
- Previous maintenance activities
- Maintenance contractor (mock data)
- Maintenance status

**Traffic Information**
- Current traffic density
- Average daily traffic
- Peak traffic period

**Accident Information**
- Total accidents reported in the last 12 months
- Accident hotspots
- Accident severity distribution

**Pothole Information**
- Total potholes detected
- Critical potholes
- Latest detection
- Detection history

### D. Pothole Monitoring

Create a dedicated Pothole Monitoring page.

Display pothole records in a table with:
- Pothole ID
- Road name
- Area
- Latitude
- Longitude
- Severity
- Detected by vehicle
- Detection timestamp
- Sensor confidence
- Resolution status

Include:
- Search
- Severity filters
- Status filters
- Sortable columns

On selecting a pothole, show a detail panel with all relevant information.

Use a simple mock image or placeholder for the detected pothole. Do not spend time implementing actual image recognition.

### E. Traffic and Accident Intelligence

Create a section displaying additional contextual intelligence.

**Traffic**
- Traffic density by road
- Average traffic volume
- Peak traffic periods
- High congestion roads

**Accidents**
- Total accidents
- Accident-prone roads
- Accident severity
- Accident locations

Use mock data and simple charts.

## 5. Mock Data Requirements

Create realistic, interconnected mock data in JSON files.

Use Chennai as the demonstration location.

Include at least:
- 10 monitored roads
- 30 pothole detection records
- 10 accident records
- Traffic information for all monitored roads
- Maintenance history for monitored roads
- 5 active sensor-equipped vehicles

Use realistic road names and approximate GPS coordinates.

Make sure relationships between records are consistent.

For example:
- A pothole must reference a valid road ID.
- Traffic information must reference a valid road ID.
- Accident information must reference a valid road ID.
- Maintenance history must reference a valid road ID.

Include a variety of road conditions and severity levels.

All mock data should be clearly identifiable as demonstration data, not actual municipal or sensor information.

## 6. User Experience and Navigation

Use a left-side navigation menu:

1. Overview
2. Live Road Map
3. Road Intelligence
4. Pothole Monitoring
5. Traffic & Accidents
6. Maintenance Insights

The top navigation bar should display:
- NammaRasta logo/name
- Current selected module
- Location selector (default: Chennai)
- Last data update timestamp
- Notification icon
- User profile placeholder

Navigation should work without page reloads.

## 7. Important Demonstration Workflows

The prototype must support these interactive demonstrations:

**Workflow 1: Identify a critical pothole**
1. Open the dashboard.
2. Identify the number of critical potholes.
3. Navigate to the map.
4. Click a critical pothole marker.
5. View the pothole's location and details.

**Workflow 2: Investigate a road**
1. Open Road Intelligence.
2. Select a road with poor road conditions.
3. View its pothole detection history.
4. Check its last renovation date.
5. Review traffic density.
6. Review accident history.
7. Understand why the road requires maintenance.

**Workflow 3: Prioritize maintenance**
1. Open Maintenance Insights.
2. Display roads requiring attention.
3. Rank roads based on a mock maintenance priority score.
4. Consider pothole severity, traffic density, and accident history.
5. Display the highest-priority roads.

Implement a simple priority score using mock data. It does not need to be an actual municipal engineering algorithm.

## 8. Maintenance Insights

Create a simple maintenance prioritization dashboard.

Display:
- Roads requiring immediate attention
- Critical pothole count by road
- High-traffic roads with poor conditions
- Accident-prone roads with potholes

Create a prioritized maintenance table:

| Road | Potholes | Traffic | Accidents | Priority |
|---|---|---|---|---|
| Road A | 12 | High | 4 | Critical |
| Road B | 8 | Medium | 2 | High |
| Road C | 3 | Low | 0 | Medium |

The values above are illustrative. Generate the actual table dynamically from mock JSON data.

## 9. Implementation Guidelines

Follow these implementation priorities:

**Priority 1 – Must Have**
- ReactJS application running locally.
- Professional dashboard layout.
- KPI cards.
- Interactive map with mock pothole locations.
- Pothole details on marker click.
- Road Intelligence view.
- Mock JSON data.

**Priority 2 – Should Have**
- Pothole monitoring table.
- Search and filters.
- Traffic and accident charts.
- Road detail view.
- Maintenance priority ranking.

**Priority 3 – Nice to Have**
- Notification panel.
- Dashboard animations.
- Trend indicators.
- Additional visual polish.

Do not spend excessive time on optional features before completing Priority 1.

## 10. Final Deliverable

Build a fully working frontend prototype that can be started locally using:

```bash
npm install
npm run dev
```

Ensure:
- No backend or database is required.
- All data comes from local JSON files.
- Navigation works.
- Charts render correctly.
- Map markers work.
- Filters work.
- Road and pothole details are accessible.
- No broken buttons or non-functional interactive elements.
- No external API keys are required.

Create a visually impressive prototype suitable for a live hackathon presentation.

## 11. Hackathon Presentation Objective

The application should communicate this story:

"Every day, thousands of vehicles travel across our roads. Many of these vehicles already have sensors capable of detecting road anomalies. NammaRasta transforms these everyday journeys into a distributed road-monitoring network.

By combining vehicle-generated pothole detection data with road infrastructure, maintenance, traffic, and accident information, NammaRasta helps authorities identify dangerous roads, understand their condition, and prioritize maintenance.

Instead of waiting for citizens to report potholes, we can proactively identify road problems using data collected from vehicles already on the road."

**Build the application now. Start with the dashboard shell and mock JSON data, then implement the map and road intelligence. Do not over-engineer. A polished, working prototype is more important than implementing every feature.**