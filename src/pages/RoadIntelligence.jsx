import { useState } from 'react'
import { ChevronRight, X } from 'lucide-react'
import { ConditionBadge, SeverityBadge, StatusBadge } from '../components/Badges.jsx'
import roads from '../data/roads.json'
import potholes from '../data/potholes.json'
import traffic from '../data/traffic.json'
import accidents from '../data/accidents.json'
import maintenance from '../data/maintenance.json'

export default function RoadIntelligence() {
  const [selectedRoad, setSelectedRoad] = useState(null)

  const roadPotholes = (roadId) => potholes.filter(p => p.road_id === roadId)
  const roadTraffic = (roadId) => traffic.find(t => t.road_id === roadId)
  const roadAccidents = (roadId) => accidents.filter(a => a.road_id === roadId)
  const roadMaintenance = (roadId) => maintenance.filter(m => m.road_id === roadId)

  if (selectedRoad) {
    const ph = roadPotholes(selectedRoad.id)
    const tr = roadTraffic(selectedRoad.id)
    const ac = roadAccidents(selectedRoad.id)
    const mh = roadMaintenance(selectedRoad.id)
    const criticalPH = ph.filter(p => p.severity === 'Critical').length

    return (
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
              <button onClick={() => setSelectedRoad(null)} className="hover:text-blue-600 transition-colors">
                Road Intelligence
              </button>
              <ChevronRight className="w-4 h-4" />
              <span className="text-slate-800 font-medium">{selectedRoad.name}</span>
            </div>
            <h2 className="text-xl font-bold text-slate-800">{selectedRoad.name}</h2>
            <p className="text-sm text-slate-500">{selectedRoad.area} · {selectedRoad.classification}</p>
          </div>
          <div className="flex items-center gap-3">
            <ConditionBadge condition={selectedRoad.condition} />
            <button
              onClick={() => setSelectedRoad(null)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Road Information */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <h3 className="font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-100">Road Information</h3>
            <dl className="space-y-2 text-sm">
              {[
                ['Road Name', selectedRoad.name],
                ['Area', selectedRoad.area],
                ['Classification', selectedRoad.classification],
                ['Length', `${selectedRoad.length_km} km`],
                ['Lanes', selectedRoad.lanes],
                ['Condition', <ConditionBadge key="c" condition={selectedRoad.condition} />],
                ['Priority Score', selectedRoad.priority_score + '/100'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between py-1.5 border-b border-slate-50">
                  <dt className="text-slate-500 font-medium">{k}</dt>
                  <dd className="text-slate-800">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Maintenance History */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <h3 className="font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-100">Maintenance History</h3>
            {mh.length === 0 ? (
              <p className="text-sm text-slate-500">No maintenance records found.</p>
            ) : (
              <div className="space-y-3">
                {mh.map(m => (
                  <div key={m.id} className="p-3 bg-slate-50 rounded-lg text-sm">
                    <div className="flex items-start justify-between mb-1">
                      <span className="font-semibold text-slate-800">{m.type}</span>
                      <StatusBadge status={m.status} />
                    </div>
                    <p className="text-slate-500">{m.date} · {m.contractor}</p>
                    <p className="text-slate-600 mt-1">{m.notes}</p>
                    <p className="text-slate-400 text-xs mt-1">Cost: ₹{m.cost_lakhs} L</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Traffic Info */}
          {tr && (
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <h3 className="font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-100">Traffic Information</h3>
              <dl className="space-y-2 text-sm">
                {[
                  ['Density', tr.density],
                  ['Avg Daily Vehicles', tr.avg_daily_vehicles.toLocaleString()],
                  ['Peak Period', tr.peak_period],
                  ['Congestion Level', tr.congestion_level],
                  ['Avg Speed', `${tr.avg_speed_kmh} km/h`],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-1.5 border-b border-slate-50">
                    <dt className="text-slate-500 font-medium">{k}</dt>
                    <dd className="text-slate-800">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/* Accident Info */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <h3 className="font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-100">Accident Information</h3>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-red-50 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-red-600">{ac.length}</p>
                <p className="text-xs text-red-500">Total Accidents</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-orange-600">{ac.reduce((s, a) => s + a.injuries, 0)}</p>
                <p className="text-xs text-orange-500">Total Injuries</p>
              </div>
              <div className="bg-red-100 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-red-800">{ac.reduce((s, a) => s + a.fatalities, 0)}</p>
                <p className="text-xs text-red-700">Fatalities</p>
              </div>
            </div>
            {ac.map(a => (
              <div key={a.id} className="flex items-start justify-between text-sm py-2 border-b border-slate-100">
                <div>
                  <p className="font-medium text-slate-800">{a.date}</p>
                  <p className="text-slate-500 text-xs">{a.cause}</p>
                </div>
                <SeverityBadge severity={a.severity} />
              </div>
            ))}
          </div>

          {/* Pothole Info */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm lg:col-span-2">
            <h3 className="font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-100">Pothole Information</h3>
            <div className="grid grid-cols-4 gap-3 mb-4">
              <div className="bg-slate-50 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-slate-800">{ph.length}</p>
                <p className="text-xs text-slate-500">Total Detected</p>
              </div>
              <div className="bg-red-50 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-red-600">{criticalPH}</p>
                <p className="text-xs text-red-500">Critical</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-orange-600">{ph.filter(p => p.severity === 'High').length}</p>
                <p className="text-xs text-orange-500">High</p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-yellow-600">{ph.filter(p => p.status === 'Pending').length}</p>
                <p className="text-xs text-yellow-600">Pending</p>
              </div>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {['ID', 'Type', 'Severity', 'Detected', 'Confidence', 'Status'].map(h => (
                    <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-slate-500 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ph.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="px-3 py-2 font-mono text-xs text-slate-500">{p.id}</td>
                    <td className="px-3 py-2 text-slate-700">{p.anomaly_type}</td>
                    <td className="px-3 py-2"><SeverityBadge severity={p.severity} /></td>
                    <td className="px-3 py-2 text-slate-600 text-xs">{new Date(p.detected_at).toLocaleDateString('en-IN')}</td>
                    <td className="px-3 py-2 text-slate-600">{p.confidence}%</td>
                    <td className="px-3 py-2"><StatusBadge status={p.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-800">Road Intelligence</h2>
        <p className="text-sm text-slate-500 mt-0.5">Select a road to view detailed intelligence and maintenance information</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              {['Road ID', 'Road Name', 'Area', 'Classification', 'Length', 'Condition', 'Potholes', 'Last Renovation', 'Priority'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {roads.map(road => (
              <tr
                key={road.id}
                onClick={() => setSelectedRoad(road)}
                className="hover:bg-blue-50 cursor-pointer transition-colors"
              >
                <td className="px-4 py-3 font-mono text-xs text-slate-500">{road.id}</td>
                <td className="px-4 py-3 font-semibold text-slate-800">{road.name}</td>
                <td className="px-4 py-3 text-slate-600">{road.area}</td>
                <td className="px-4 py-3 text-slate-600">{road.classification}</td>
                <td className="px-4 py-3 text-slate-600">{road.length_km} km</td>
                <td className="px-4 py-3"><ConditionBadge condition={road.condition} /></td>
                <td className="px-4 py-3 font-bold text-slate-800">{road.potholes_count}</td>
                <td className="px-4 py-3 text-slate-600 text-xs">{road.last_renovation}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                    road.maintenance_priority === 'Critical' ? 'bg-red-100 text-red-700' :
                    road.maintenance_priority === 'High' ? 'bg-orange-100 text-orange-700' :
                    road.maintenance_priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {road.maintenance_priority}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
