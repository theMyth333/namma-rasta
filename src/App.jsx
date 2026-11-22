import { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import TopBar from './components/TopBar.jsx'
import Overview from './pages/Overview.jsx'
import RoadMap from './pages/RoadMap.jsx'
import RoadIntelligence from './pages/RoadIntelligence.jsx'
import PotholeMonitoring from './pages/PotholeMonitoring.jsx'
import TrafficAccidents from './pages/TrafficAccidents.jsx'
import MaintenanceInsights from './pages/MaintenanceInsights.jsx'

const PAGES = {
  overview: { label: 'Overview', component: Overview },
  map: { label: 'Live Road Map', component: RoadMap },
  roads: { label: 'Road Intelligence', component: RoadIntelligence },
  potholes: { label: 'Pothole Monitoring', component: PotholeMonitoring },
  traffic: { label: 'Traffic & Accidents', component: TrafficAccidents },
  maintenance: { label: 'Maintenance Insights', component: MaintenanceInsights },
}

export default function App() {
  const [activePage, setActivePage] = useState('overview')

  const PageComponent = PAGES[activePage].component
  const pageLabel = PAGES[activePage].label

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar pageLabel={pageLabel} />
        <main className="flex-1 overflow-auto p-6">
          <PageComponent />
        </main>
      </div>
    </div>
  )
}
