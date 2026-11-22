import { useState } from 'react'
import { Search, ChevronUp, ChevronDown, X } from 'lucide-react'
import { SeverityBadge, StatusBadge } from '../components/Badges.jsx'
import potholes from '../data/potholes.json'

const SEVERITY_OPTS = ['All', 'Critical', 'High', 'Medium', 'Low']
const STATUS_OPTS = ['All', 'Pending', 'In Progress', 'Reviewed', 'Resolved']

export default function PotholeMonitoring() {
  const [search, setSearch] = useState('')
  const [filterSeverity, setFilterSeverity] = useState('All')
  const [filterStatus, setFilterStatus] = useState('All')
  const [sortKey, setSortKey] = useState('detected_at')
  const [sortDir, setSortDir] = useState('desc')
  const [selected, setSelected] = useState(null)

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  const filtered = potholes
    .filter(p => {
      if (filterSeverity !== 'All' && p.severity !== filterSeverity) return false
      if (filterStatus !== 'All' && p.status !== filterStatus) return false
      if (search && !Object.values(p).join(' ').toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
    .sort((a, b) => {
      let va = a[sortKey], vb = b[sortKey]
      if (sortKey === 'detected_at') { va = new Date(va); vb = new Date(vb) }
      if (sortKey === 'confidence') { va = Number(va); vb = Number(vb) }
      if (va < vb) return sortDir === 'asc' ? -1 : 1
      if (va > vb) return sortDir === 'asc' ? 1 : -1
      return 0
    })

  const SortIcon = ({ col }) => {
    if (sortKey !== col) return <ChevronUp className="w-3 h-3 text-slate-300" />
    return sortDir === 'asc'
      ? <ChevronUp className="w-3 h-3 text-blue-500" />
      : <ChevronDown className="w-3 h-3 text-blue-500" />
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-800">Pothole Monitoring</h2>
        <p className="text-sm text-slate-500 mt-0.5">Search, filter and inspect all detected anomalies</p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search potholes..."
            className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 w-56"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select
          className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={filterSeverity}
          onChange={e => setFilterSeverity(e.target.value)}
        >
          {SEVERITY_OPTS.map(s => <option key={s}>Severity: {s}</option>)}
        </select>
        <select
          className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
        >
          {STATUS_OPTS.map(s => <option key={s}>Status: {s}</option>)}
        </select>
        <span className="text-sm text-slate-500 ml-auto">
          <span className="font-bold text-slate-800">{filtered.length}</span> results
        </span>
      </div>

      <div className="flex gap-5">
        {/* Table */}
        <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden min-w-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  {[
                    { key: 'id', label: 'ID' },
                    { key: 'road_name', label: 'Road' },
                    { key: 'area', label: 'Area' },
                    { key: 'lat', label: 'Lat' },
                    { key: 'lng', label: 'Lng' },
                    { key: 'severity', label: 'Severity' },
                    { key: 'vehicle_id', label: 'Vehicle' },
                    { key: 'detected_at', label: 'Detected' },
                    { key: 'confidence', label: 'Confidence' },
                    { key: 'status', label: 'Status' },
                  ].map(({ key, label }) => (
                    <th
                      key={key}
                      className="text-left px-3 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide cursor-pointer select-none hover:bg-slate-100"
                      onClick={() => toggleSort(key)}
                    >
                      <span className="flex items-center gap-1">
                        {label} <SortIcon col={key} />
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map(p => (
                  <tr
                    key={p.id}
                    onClick={() => setSelected(p)}
                    className={`cursor-pointer transition-colors hover:bg-blue-50 ${selected?.id === p.id ? 'bg-blue-50' : ''}`}
                  >
                    <td className="px-3 py-2.5 font-mono text-xs text-slate-500">{p.id}</td>
                    <td className="px-3 py-2.5 font-medium text-slate-800 max-w-[150px] truncate">{p.road_name}</td>
                    <td className="px-3 py-2.5 text-slate-600">{p.area}</td>
                    <td className="px-3 py-2.5 text-slate-500 text-xs">{p.lat}</td>
                    <td className="px-3 py-2.5 text-slate-500 text-xs">{p.lng}</td>
                    <td className="px-3 py-2.5"><SeverityBadge severity={p.severity} /></td>
                    <td className="px-3 py-2.5 font-mono text-xs text-slate-500">{p.vehicle_id}</td>
                    <td className="px-3 py-2.5 text-slate-600 text-xs">{new Date(p.detected_at).toLocaleDateString('en-IN')}</td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-16 bg-slate-200 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${p.confidence >= 90 ? 'bg-green-500' : p.confidence >= 75 ? 'bg-yellow-400' : 'bg-red-400'}`}
                            style={{ width: `${p.confidence}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-600">{p.confidence}%</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5"><StatusBadge status={p.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail Panel */}
        {selected && (
          <div className="w-72 flex-shrink-0 bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-800">{selected.id}</h3>
                <p className="text-xs text-slate-500">{selected.anomaly_type}</p>
              </div>
              <button onClick={() => setSelected(null)} className="p-1 hover:bg-slate-100 rounded-lg">
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Placeholder image */}
            <div className="w-full h-36 bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <div className="text-3xl mb-1">🕳️</div>
                <p className="text-xs text-slate-500">Sensor Detection Image</p>
                <p className="text-xs text-slate-400">Mock Placeholder</p>
              </div>
            </div>

            <SeverityBadge severity={selected.severity} />

            <dl className="space-y-1.5 text-xs mt-3">
              {[
                ['Road', selected.road_name],
                ['Area', selected.area],
                ['Type', selected.anomaly_type],
                ['GPS', `${selected.lat}, ${selected.lng}`],
                ['Vehicle', selected.vehicle_id],
                ['Detected', new Date(selected.detected_at).toLocaleString('en-IN')],
                ['Confidence', `${selected.confidence}%`],
                ['Depth', `${selected.depth_cm} cm`],
                ['Width', `${selected.width_cm} cm`],
                ['Condition', selected.condition],
                ['Last Maintenance', selected.last_maintenance],
                ['Status', selected.status],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between py-1 border-b border-slate-50">
                  <dt className="font-medium text-slate-500">{k}</dt>
                  <dd className="text-slate-800 text-right max-w-[140px] break-words">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </div>
  )
}
