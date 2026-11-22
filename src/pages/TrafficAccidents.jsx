import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts'
import { SeverityBadge } from '../components/Badges.jsx'
import traffic from '../data/traffic.json'
import accidents from '../data/accidents.json'

const CONGESTION_COLORS = { Severe: '#ef4444', High: '#f97316', Moderate: '#f59e0b', Low: '#22c55e' }
const ACCIDENT_SEVERITY_COLORS = { Fatal: '#7f1d1d', Major: '#ef4444', Minor: '#f97316' }

const accidentBySeverity = accidents.reduce((acc, a) => {
  acc[a.severity] = (acc[a.severity] || 0) + 1
  return acc
}, {})
const accidentSeverityData = Object.entries(accidentBySeverity).map(([name, value]) => ({
  name, value, fill: ACCIDENT_SEVERITY_COLORS[name] || '#94a3b8',
}))

const trafficChartData = traffic.map(t => ({
  road: t.road_name.split(' ')[0] + (t.road_name.split(' ')[1] ? ' ' + t.road_name.split(' ')[1] : ''),
  vehicles: Math.round(t.avg_daily_vehicles / 1000),
  speed: t.avg_speed_kmh,
}))

const accidentByRoad = accidents.reduce((acc, a) => {
  acc[a.road_name] = (acc[a.road_name] || 0) + 1
  return acc
}, {})
const topAccidentRoads = Object.entries(accidentByRoad)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 5)
  .map(([name, count]) => ({ name: name.substring(0, 20), count }))

export default function TrafficAccidents() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800">Traffic & Accident Intelligence</h2>
        <p className="text-sm text-slate-500 mt-0.5">Road traffic density and accident analysis across Chennai</p>
      </div>

      {/* Traffic KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Roads Monitored', value: traffic.length, color: 'bg-blue-50 text-blue-700' },
          { label: 'High Congestion Roads', value: traffic.filter(t => t.congestion_level === 'High' || t.congestion_level === 'Severe').length, color: 'bg-red-50 text-red-700' },
          { label: 'Total Accidents', value: accidents.length, color: 'bg-orange-50 text-orange-700' },
          { label: 'Fatalities', value: accidents.reduce((s, a) => s + a.fatalities, 0), color: 'bg-red-100 text-red-800' },
        ].map(({ label, value, color }) => (
          <div key={label} className={`${color} rounded-xl p-4 border border-current/20 shadow-sm`}>
            <p className="text-xs font-semibold uppercase tracking-wide opacity-70">{label}</p>
            <p className="text-3xl font-bold mt-1">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Traffic Volume Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-1">Average Daily Traffic Volume</h3>
          <p className="text-xs text-slate-500 mb-4">In thousands of vehicles per day</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={trafficChartData} margin={{ left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="road" tick={{ fontSize: 10 }} angle={-30} textAnchor="end" height={60} />
              <YAxis tick={{ fontSize: 11 }} unit="K" />
              <Tooltip formatter={(v) => `${v}K vehicles`} />
              <Bar dataKey="vehicles" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Vehicles (K)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Avg Speed Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-1">Average Speed by Road</h3>
          <p className="text-xs text-slate-500 mb-4">km/h during peak hours</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={trafficChartData} margin={{ left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="road" tick={{ fontSize: 10 }} angle={-30} textAnchor="end" height={60} />
              <YAxis tick={{ fontSize: 11 }} unit=" km/h" />
              <Tooltip formatter={(v) => `${v} km/h`} />
              <Bar dataKey="speed" fill="#10b981" radius={[4, 4, 0, 0]} name="Speed (km/h)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Accident Severity Pie */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-1">Accident Severity Distribution</h3>
          <p className="text-xs text-slate-500 mb-4">Last 12 months</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={accidentSeverityData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                {accidentSeverityData.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
              <Legend iconType="circle" iconSize={8} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Accident Roads */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-1">Top Accident-Prone Roads</h3>
          <p className="text-xs text-slate-500 mb-4">By total incidents reported</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={topAccidentRoads} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis type="number" tick={{ fontSize: 11 }} allowDecimals={false} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={110} />
              <Tooltip />
              <Bar dataKey="count" fill="#ef4444" radius={[0, 4, 4, 0]} name="Accidents" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Traffic Detail Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800">Traffic Data by Road</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {['Road', 'Area', 'Density', 'Avg Daily Vehicles', 'Peak Period', 'Congestion', 'Avg Speed'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {traffic.map(t => (
                <tr key={t.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-800">{t.road_name}</td>
                  <td className="px-4 py-3 text-slate-600">
                    {/* Look up area from road name */}
                    {['Anna Salai', 'Jawaharlal Nehru Road', 'Nungambakkam High Road'].includes(t.road_name) ? 'Central' :
                     ['Rajiv Gandhi Salai (OMR)', 'Velachery Main Road'].includes(t.road_name) ? 'South' :
                     ['Poonamallee High Road', 'Arcot Road'].includes(t.road_name) ? 'West' :
                     ['Tambaram–Velachery Road'].includes(t.road_name) ? 'South-West' :
                     ['Sardar Patel Road'].includes(t.road_name) ? 'Adyar' : 'East'}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      t.density === 'High' ? 'bg-red-100 text-red-700' :
                      t.density === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>{t.density}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-700 font-semibold">{t.avg_daily_vehicles.toLocaleString()}</td>
                  <td className="px-4 py-3 text-slate-600 text-xs">{t.peak_period}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      t.congestion_level === 'Severe' ? 'bg-red-200 text-red-800' :
                      t.congestion_level === 'High' ? 'bg-orange-100 text-orange-700' :
                      t.congestion_level === 'Moderate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>{t.congestion_level}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{t.avg_speed_kmh} km/h</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Accidents Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800">Accident Records</h3>
          <p className="text-xs text-slate-500 mt-0.5">All reported incidents in the last 12 months</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {['ID', 'Road', 'Date', 'Severity', 'Cause', 'Vehicles', 'Injuries', 'Fatalities'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {accidents.map(a => (
                <tr key={a.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">{a.id}</td>
                  <td className="px-4 py-3 font-medium text-slate-800">{a.road_name}</td>
                  <td className="px-4 py-3 text-slate-600">{a.date}</td>
                  <td className="px-4 py-3"><SeverityBadge severity={a.severity} /></td>
                  <td className="px-4 py-3 text-slate-600 text-xs">{a.cause}</td>
                  <td className="px-4 py-3 text-slate-700">{a.vehicles_involved}</td>
                  <td className="px-4 py-3 text-orange-600 font-semibold">{a.injuries}</td>
                  <td className="px-4 py-3 text-red-600 font-bold">{a.fatalities}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
