import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts'
import { ConditionBadge } from '../components/Badges.jsx'
import roads from '../data/roads.json'
import potholes from '../data/potholes.json'
import traffic from '../data/traffic.json'
import accidents from '../data/accidents.json'
import maintenance from '../data/maintenance.json'

// Build maintenance priority table
const priorityTable = roads
  .map(road => {
    const ph = potholes.filter(p => p.road_id === road.id)
    const tr = traffic.find(t => t.road_id === road.id)
    const ac = accidents.filter(a => a.road_id === road.id)
    const criticalPH = ph.filter(p => p.severity === 'Critical').length
    const trafficScore = tr?.density === 'High' ? 3 : tr?.density === 'Medium' ? 2 : 1
    const accidentScore = ac.length * 2
    const priorityScore = road.priority_score

    return {
      road,
      potholes: ph.length,
      criticalPH,
      trafficDensity: tr?.density || 'Unknown',
      accidents: ac.length,
      priorityScore,
      priority: road.maintenance_priority,
    }
  })
  .sort((a, b) => b.priorityScore - a.priorityScore)

const chartData = priorityTable.slice(0, 7).map(r => ({
  name: r.road.name.substring(0, 15),
  score: r.priorityScore,
  potholes: r.potholes,
}))

const PRIORITY_COLOR = {
  Critical: '#ef4444',
  High: '#f97316',
  Medium: '#f59e0b',
  Low: '#22c55e',
}

const nextMaintenance = maintenance.filter(m => m.status === 'Scheduled')

export default function MaintenanceInsights() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800">Maintenance Insights</h2>
        <p className="text-sm text-slate-500 mt-0.5">Prioritized maintenance recommendations based on road condition, potholes, traffic, and accidents</p>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Roads Needing Immediate Attention', value: roads.filter(r => r.maintenance_priority === 'Critical').length, color: 'bg-red-50 text-red-700' },
          { label: 'High Priority Roads', value: roads.filter(r => r.maintenance_priority === 'High').length, color: 'bg-orange-50 text-orange-700' },
          { label: 'Scheduled Maintenance', value: nextMaintenance.length, color: 'bg-purple-50 text-purple-700' },
          { label: 'Total Critical Potholes', value: potholes.filter(p => p.severity === 'Critical').length, color: 'bg-red-100 text-red-800' },
        ].map(({ label, value, color }) => (
          <div key={label} className={`${color} rounded-xl p-4 border border-current/20 shadow-sm`}>
            <p className="text-xs font-semibold uppercase tracking-wide opacity-70">{label}</p>
            <p className="text-3xl font-bold mt-1">{value}</p>
          </div>
        ))}
      </div>

      {/* Priority Score Chart */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <h3 className="font-semibold text-slate-800 mb-1">Maintenance Priority Score by Road</h3>
        <p className="text-xs text-slate-500 mb-4">Composite score (0–100) based on condition, potholes, traffic, and accidents</p>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={chartData} margin={{ bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-20} textAnchor="end" height={55} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
            <Tooltip />
            <Bar dataKey="score" radius={[4, 4, 0, 0]} name="Priority Score">
              {chartData.map((entry, index) => {
                const row = priorityTable[index]
                const color = PRIORITY_COLOR[row?.priority] || '#94a3b8'
                return <Cell key={`cell-${index}`} fill={color} />
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Prioritized Maintenance Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800">Prioritized Maintenance Table</h3>
          <p className="text-xs text-slate-500 mt-0.5">Ranked by composite priority score – highest urgency first</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Rank</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Road</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Condition</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Potholes</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Critical PH</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Traffic</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Accidents</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Score</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Priority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {priorityTable.map((row, idx) => (
                <tr key={row.road.id} className={`hover:bg-slate-50 ${idx < 2 ? 'bg-red-50/40' : ''}`}>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
                      idx === 0 ? 'bg-red-500 text-white' :
                      idx === 1 ? 'bg-orange-500 text-white' :
                      idx === 2 ? 'bg-yellow-400 text-white' :
                      'bg-slate-200 text-slate-600'
                    }`}>
                      {idx + 1}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-slate-800">{row.road.name}</td>
                  <td className="px-4 py-3"><ConditionBadge condition={row.road.condition} /></td>
                  <td className="px-4 py-3 font-bold text-slate-800">{row.potholes}</td>
                  <td className="px-4 py-3 font-bold text-red-600">{row.criticalPH}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      row.trafficDensity === 'High' ? 'bg-red-100 text-red-700' :
                      row.trafficDensity === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>{row.trafficDensity}</span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-orange-700">{row.accidents}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-slate-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${row.priorityScore}%`,
                            backgroundColor: PRIORITY_COLOR[row.priority] || '#94a3b8',
                          }}
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-700">{row.priorityScore}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                      row.priority === 'Critical' ? 'bg-red-100 text-red-700 border border-red-200' :
                      row.priority === 'High' ? 'bg-orange-100 text-orange-700 border border-orange-200' :
                      row.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
                      'bg-green-100 text-green-700 border border-green-200'
                    }`}>
                      {row.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Scheduled Maintenance */}
      {nextMaintenance.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800">Scheduled Maintenance</h3>
          </div>
          <div className="p-5 space-y-3">
            {nextMaintenance.map(m => (
              <div key={m.id} className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="bg-purple-200 text-purple-800 rounded-lg p-2 text-xs font-bold flex-shrink-0">SCHEDULED</div>
                <div>
                  <p className="font-semibold text-slate-800">{m.road_name}</p>
                  <p className="text-sm text-slate-600">{m.type} · {m.contractor}</p>
                  <p className="text-xs text-slate-500 mt-1">{m.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
