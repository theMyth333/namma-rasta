export default function KpiCard({ icon: Icon, label, value, description, color, trend }) {
  const colorMap = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    red: 'bg-red-50 text-red-600 border-red-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    orange: 'bg-orange-50 text-orange-600 border-orange-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
    teal: 'bg-teal-50 text-teal-600 border-teal-200',
  }
  const iconBg = colorMap[color] || colorMap.blue

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
      <div className={`rounded-xl p-3 border ${iconBg} flex-shrink-0`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-bold text-slate-800 mt-0.5">{value}</p>
        <p className="text-xs text-slate-500 mt-1">{description}</p>
        {trend !== undefined && (
          <div className={`inline-flex items-center gap-1 text-xs font-medium mt-1.5 px-2 py-0.5 rounded-full ${
            trend > 0 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
          }`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% vs last week
          </div>
        )}
      </div>
    </div>
  )
}
