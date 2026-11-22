export function SeverityBadge({ severity }) {
  const map = {
    Critical: 'bg-red-100 text-red-700 border-red-200',
    High: 'bg-orange-100 text-orange-700 border-orange-200',
    Medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    Low: 'bg-green-100 text-green-700 border-green-200',
    Fatal: 'bg-red-200 text-red-800 border-red-300',
    Major: 'bg-orange-100 text-orange-700 border-orange-200',
    Minor: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  }
  const cls = map[severity] || 'bg-slate-100 text-slate-600 border-slate-200'
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${cls}`}>
      {severity}
    </span>
  )
}

export function ConditionBadge({ condition }) {
  const map = {
    Critical: 'bg-red-100 text-red-700 border-red-200',
    Poor: 'bg-orange-100 text-orange-700 border-orange-200',
    Moderate: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    Good: 'bg-green-100 text-green-700 border-green-200',
  }
  const cls = map[condition] || 'bg-slate-100 text-slate-600 border-slate-200'
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${cls}`}>
      {condition}
    </span>
  )
}

export function StatusBadge({ status }) {
  const map = {
    'Pending': 'bg-red-50 text-red-600 border-red-200',
    'In Progress': 'bg-blue-50 text-blue-600 border-blue-200',
    'Reviewed': 'bg-slate-100 text-slate-600 border-slate-200',
    'Resolved': 'bg-green-100 text-green-700 border-green-200',
    'Completed': 'bg-green-100 text-green-700 border-green-200',
    'Scheduled': 'bg-purple-100 text-purple-700 border-purple-200',
  }
  const cls = map[status] || 'bg-slate-100 text-slate-600'
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${cls}`}>
      {status}
    </span>
  )
}
