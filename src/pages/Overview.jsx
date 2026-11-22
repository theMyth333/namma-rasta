import { useState } from 'react'
import {
  AlertTriangle,
  AlertOctagon,
  Route,
  Wrench,
  Car,
  Activity,
} from 'lucide-react'
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line,
} from 'recharts'
import KpiCard from '../components/KpiCard.jsx'
import { SeverityBadge, ConditionBadge, StatusBadge } from '../components/Badges.jsx'
import potholes from '../data/potholes.json'
import roads from '../data/roads.json'
import accidents from '../data/accidents.json'

// Derived stats
const totalPotholes = potholes.length
const criticalPotholes = potholes.filter(p => p.severity === 'Critical').length
const roadsMonitored = roads.length
const roadsNeedMaintenance = roads.filter(r => r.condition === 'Poor' || r.condition === 'Critical').length
const totalAccidents = accidents.length

// Road condition distribution
const conditionCounts = roads.reduce((acc, r) => {
  acc[r.condition] = (acc[r.condition] || 0) + 1
  return acc
}, {})
const conditionData = Object.entries(conditionCounts).map(([name, value]) => ({ name, value }))
const CONDITION_COLORS = { Good: '#22c55e', Moderate: '#f59e0b', Poor: '#f97316', Critical: '#ef4444' }

// Severity distribution
const severityCounts = potholes.reduce((acc, p) => {
  acc[p.severity] = (acc[p.severity] || 0) + 1
  return acc
}, {})
const severityData = [
  { name: 'Critical', value: severityCounts.Critical || 0, fill: '#ef4444' },
  { name: 'High', value: severityCounts.High || 0, fill: '#f97316' },
  { name: 'Medium', value: severityCounts.Medium || 0, fill: '#f59e0b' },
  { name: 'Low', value: severityCounts.Low || 0, fill: '#22c55e' },
]

// Detection trend (last 7 days mock)
const trendData = [
  { day: 'Mon', detections: 3 },
  { day: 'Tue', detections: 5 },
  { day: 'Wed', detections: 4 },
  { day: 'Thu', detections: 7 },
  { day: 'Fri', detections: 6 },
  { day: 'Sat', detections: 8 },
  { day: 'Sun', detections: 5 },
]

// Recent detections (latest 8)
const recentDetections = [...potholes]
  .sort((a, b) => new Date(b.detected_at) - new Date(a.detected_at))
  .slice(0, 8)

export default function Overview() {
  const [selectedDetection, setSelectedDetection] = useState(null)

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KpiCard
          icon={AlertTriangle}
          label="Total Potholes"
          value={totalPotholes}
          description="Detected across all roads"
          color="orange"
          trend={12}
        />
        <KpiCard
          icon={AlertOctagon}
          label="Critical Potholes"
          value={criticalPotholes}
          description="Requiring immediate action"
          color="red"
          trend={8}
        />
        <KpiCard
          icon={Route}
          label="Roads Monitored"
          value={roadsMonitored}
          description="Active monitoring"
          color="blue"
        />
        <KpiCard
          icon={Wrench}
          label="Need Maintenance"
          value={roadsNeedMaintenance}
          description="Poor or critical condition"
          color="orange"
        />
        <KpiCard
          icon={Car}
          label="Accidents Reported"
          value={totalAccidents}
          description="Last 12 months"
          color="red"
          trend={5}
        />
        <KpiCard
          icon={Activity}
          label="Sensor Vehicles"
          value={5}
          description="Active data collectors"
          color="green"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Donut – Road Condition */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-1">Road Condition Distribution</h3>
          <p className="text-xs text-slate-500 mb-4">Across {roadsMonitored} monitored roads</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={conditionData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                {conditionData.map((entry) => (
                  <Cell key={entry.name} fill={CONDITION_COLORS[entry.name] || '#94a3b8'} />
                ))}
              </Pie>
              <Tooltip />
              <Legend iconType="circle" iconSize={8} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar – Detection Trend */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-1">Detection Trend (Last 7 Days)</h3>
          <p className="text-xs text-slate-500 mb-4">Daily pothole detections</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="detections" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Bar – Severity Distribution */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-1">Severity Distribution</h3>
          <p className="text-xs text-slate-500 mb-4">All detected anomalies</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={severityData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={60} />
              <Tooltip />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {severityData.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Detection Activity */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-slate-800">Recent Detection Activity</h3>
            <p className="text-xs text-slate-500 mt-0.5">Latest anomaly detections – click a row for details</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">ID</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Road</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Area</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Type</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Severity</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Detected</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentDetections.map(d => (
                <tr
                  key={d.id}
                  onClick={() => setSelectedDetection(d)}
                  className="hover:bg-blue-50 cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">{d.id}</td>
                  <td className="px-4 py-3 font-medium text-slate-800">{d.road_name}</td>
                  <td className="px-4 py-3 text-slate-600">{d.area}</td>
                  <td className="px-4 py-3 text-slate-600">{d.anomaly_type}</td>
                  <td className="px-4 py-3"><SeverityBadge severity={d.severity} /></td>
                  <td className="px-4 py-3 text-slate-600 text-xs">{new Date(d.detected_at).toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3"><StatusBadge status={d.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedDetection && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedDetection(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-slate-800 text-lg">{selectedDetection.id}</h3>
                <p className="text-sm text-slate-500">{selectedDetection.anomaly_type}</p>
              </div>
              <SeverityBadge severity={selectedDetection.severity} />
            </div>
            <dl className="space-y-2 text-sm">
              {[
                ['Road', selectedDetection.road_name],
                ['Area', selectedDetection.area],
                ['GPS', `${selectedDetection.lat}, ${selectedDetection.lng}`],
                ['Detected At', new Date(selectedDetection.detected_at).toLocaleString('en-IN')],
                ['Vehicle', selectedDetection.vehicle_id],
                ['Confidence', `${selectedDetection.confidence}%`],
                ['Condition', selectedDetection.condition],
                ['Last Maintenance', selectedDetection.last_maintenance],
                ['Status', selectedDetection.status],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between py-1 border-b border-slate-100">
                  <dt className="font-medium text-slate-500">{k}</dt>
                  <dd className="text-slate-800">{v}</dd>
                </div>
              ))}
            </dl>
            <button
              className="mt-4 w-full bg-slate-800 text-white py-2 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors"
              onClick={() => setSelectedDetection(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
