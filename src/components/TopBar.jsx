import { Bell, User, MapPin, Clock } from 'lucide-react'

export default function TopBar({ pageLabel }) {
  const now = new Date()
  const timeStr = now.toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between flex-shrink-0">
      <div className="flex items-center gap-3">
        <span className="text-slate-400 text-sm">/</span>
        <h2 className="text-slate-800 font-semibold text-sm">{pageLabel}</h2>
      </div>

      <div className="flex items-center gap-4">
        {/* Location */}
        <div className="flex items-center gap-1.5 text-sm text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
          <MapPin className="w-3.5 h-3.5 text-blue-600" />
          <span className="font-medium">Chennai, TN</span>
        </div>

        {/* Last update */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Clock className="w-3.5 h-3.5" />
          <span>{timeStr}</span>
        </div>

        {/* Notification */}
        <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
          <Bell className="w-4 h-4 text-slate-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User */}
        <div className="flex items-center gap-2 cursor-pointer hover:bg-slate-100 px-2 py-1 rounded-lg transition-colors">
          <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-medium text-slate-700">Admin</span>
        </div>
      </div>
    </header>
  )
}
