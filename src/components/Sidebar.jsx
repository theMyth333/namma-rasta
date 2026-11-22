import {
  LayoutDashboard,
  Map,
  Route,
  AlertTriangle,
  BarChart2,
  Wrench,
  Navigation,
} from 'lucide-react'

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'map', label: 'Live Road Map', icon: Map },
  { id: 'roads', label: 'Road Intelligence', icon: Route },
  { id: 'potholes', label: 'Pothole Monitoring', icon: AlertTriangle },
  { id: 'traffic', label: 'Traffic & Accidents', icon: BarChart2 },
  { id: 'maintenance', label: 'Maintenance Insights', icon: Wrench },
]

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="w-64 bg-[#1e2a4a] text-white flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="bg-blue-500 rounded-lg p-2">
            <Navigation className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white">NammaRasta</h1>
            <p className="text-xs text-blue-300">Smarter Roads. Safer Journeys.</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const active = activePage === id
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                active
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-white/10">
        <p className="text-xs text-slate-400">© 2026 NammaRasta</p>
        <p className="text-xs text-slate-500">Demo Data Only</p>
      </div>
    </aside>
  )
}
