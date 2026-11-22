import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet'
import potholes from '../data/potholes.json'

const SEVERITY_COLORS = {
  Critical: '#ef4444',
  High: '#f97316',
  Medium: '#eab308',
  Low: '#22c55e',
}

const ANOMALY_TYPES = ['All', ...new Set(potholes.map(p => p.anomaly_type))]
const ROAD_NAMES = ['All', ...new Set(potholes.map(p => p.road_name))]
const SEVERITIES = ['All', 'Critical', 'High', 'Medium', 'Low']

function FlyToChennai() {
  const map = useMap()
  useEffect(() => {
    map.setView([13.0569, 80.2425], 12)
  }, [map])
  return null
}

export default function RoadMap() {
  const [filterSeverity, setFilterSeverity] = useState('All')
  const [filterRoad, setFilterRoad] = useState('All')
  const [filterType, setFilterType] = useState('All')

  const filtered = potholes.filter(p => {
    if (filterSeverity !== 'All' && p.severity !== filterSeverity) return false
    if (filterRoad !== 'All' && p.road_name !== filterRoad) return false
    if (filterType !== 'All' && p.anomaly_type !== filterType) return false
    return true
  })

  return (
    <div className="flex flex-col h-full space-y-4" style={{ minHeight: '75vh' }}>
      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-wrap gap-4 items-center">
        <span className="text-sm font-semibold text-slate-700">Filters:</span>
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-500 font-medium">Severity</label>
          <select
            className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={filterSeverity}
            onChange={e => setFilterSeverity(e.target.value)}
          >
            {SEVERITIES.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-500 font-medium">Road</label>
          <select
            className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={filterRoad}
            onChange={e => setFilterRoad(e.target.value)}
          >
            {ROAD_NAMES.map(r => <option key={r}>{r}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-500 font-medium">Type</label>
          <select
            className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
          >
            {ANOMALY_TYPES.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <span className="ml-auto text-xs text-slate-500 font-medium">
          Showing <span className="font-bold text-slate-800">{filtered.length}</span> of {potholes.length} detections
        </span>
        {/* Legend */}
        <div className="flex items-center gap-3 ml-2">
          {Object.entries(SEVERITY_COLORS).map(([sev, color]) => (
            <div key={sev} className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: color }}></span>
              <span className="text-xs text-slate-600">{sev}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 rounded-xl overflow-hidden border border-slate-200 shadow-sm" style={{ minHeight: '600px' }}>
        <MapContainer
          center={[13.0569, 80.2425]}
          zoom={12}
          style={{ height: '100%', width: '100%', minHeight: '600px' }}
        >
          <FlyToChennai />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filtered.map(p => (
            <CircleMarker
              key={p.id}
              center={[p.lat, p.lng]}
              radius={p.severity === 'Critical' ? 12 : p.severity === 'High' ? 10 : 8}
              pathOptions={{
                color: SEVERITY_COLORS[p.severity],
                fillColor: SEVERITY_COLORS[p.severity],
                fillOpacity: 0.85,
                weight: 2,
              }}
            >
              <Popup>
                <div className="text-sm min-w-[220px]">
                  <div className="font-bold text-slate-800 text-base mb-2 pb-2 border-b border-slate-200">
                    {p.id} — {p.anomaly_type}
                  </div>
                  <table className="w-full text-xs">
                    <tbody>
                      {[
                        ['Road', p.road_name],
                        ['Severity', p.severity],
                        ['Detected', new Date(p.detected_at).toLocaleString('en-IN')],
                        ['GPS', `${p.lat}, ${p.lng}`],
                        ['Condition', p.condition],
                        ['Last Maintenance', p.last_maintenance],
                        ['Confidence', `${p.confidence}%`],
                        ['Status', p.status],
                      ].map(([k, v]) => (
                        <tr key={k} className="border-b border-slate-100">
                          <td className="font-semibold text-slate-500 py-1 pr-2">{k}</td>
                          <td className="text-slate-800">{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </div>
  )
}
