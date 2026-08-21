import { useState } from 'react'
import { DashboardLayout } from '../../components/layout/DashboardLayout'
import { useNotifications } from '../../context/NotificationContext'
import { formatRelativeTime } from '../../utils/date'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { 
  ClipboardList, 
  ClipboardCheck, 
  Megaphone, 
  Settings, 
  Inbox, 
  Trash2, 
  Check, 
  Eye, 
  EyeOff
} from 'lucide-react'

export function NotificationsPage() {
  const { 
    notifications, 
    unreadCount, 
    toggleReadState, 
    markAllAsRead, 
    deleteNotification, 
    clearAll 
  } = useNotifications()

  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'read'>('all')

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === 'unread') return !n.read
    if (activeTab === 'read') return n.read
    return true
  })

  const getIcon = (type: string) => {
    switch (type) {
      case 'assignment':
        return <ClipboardList className="w-5 h-5" />
      case 'attendance':
        return <ClipboardCheck className="w-5 h-5" />
      case 'announcement':
        return <Megaphone className="w-5 h-5" />
      case 'system':
      default:
        return <Settings className="w-5 h-5" />
    }
  }

  const handleDeleteAll = () => {
    if (window.confirm('Are you sure you want to clear all notifications?')) {
      clearAll()
    }
  }

  const getBadgeTone = (type: string): 'info' | 'success' | 'warning' | 'error' => {
    switch (type) {
      case 'assignment':
        return 'info'
      case 'attendance':
        return 'success'
      case 'announcement':
        return 'warning'
      case 'system':
      default:
        return 'error'
    }
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="dashboard-header__copy">
          <span className="eyebrow block mb-2 text-[var(--color-primary)] text-xs font-bold uppercase tracking-widest">
            Account & Updates
          </span>
          <h1 className="text-3xl font-bold text-[var(--color-text-primary)] m-0">Notifications</h1>
          <p className="mt-2 text-[var(--color-text-secondary)] text-sm">
            Keep track of assignments, class announcements, attendance reports, and system messages.
          </p>
        </div>

        {notifications.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {unreadCount > 0 && (
              <Button 
                variant="secondary" 
                onClick={markAllAsRead} 
                className="whitespace-nowrap flex items-center gap-2"
              >
                <Check className="w-4 h-4 text-[var(--color-success)]" />
                Mark all as read
              </Button>
            )}
            <Button 
              variant="danger" 
              onClick={handleDeleteAll} 
              className="whitespace-nowrap flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Clear all
            </Button>
          </div>
        )}
      </div>

      <div className="w-full space-y-6">
        {/* Navigation Tabs */}
        <div className="flex justify-between items-center bg-[var(--color-surface)] p-4 rounded-[var(--radius-large)] border border-[var(--color-border)] shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 border-0 cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[var(--color-primary)] text-white shadow-md shadow-blue-500/10'
                  : 'bg-[var(--color-background)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)]'
              }`}
            >
              All
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                activeTab === 'all' ? 'bg-white/20 text-white' : 'bg-[var(--color-border)] text-[var(--color-text-secondary)]'
              }`}>
                {notifications.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('unread')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 border-0 cursor-pointer ${
                activeTab === 'unread'
                  ? 'bg-[var(--color-primary)] text-white shadow-md shadow-blue-500/10'
                  : 'bg-[var(--color-background)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)]'
              }`}
            >
              Unread
              {unreadCount > 0 ? (
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  activeTab === 'unread' ? 'bg-white/20 text-white' : 'bg-[var(--color-error)] text-white font-bold'
                }`}>
                  {unreadCount}
                </span>
              ) : (
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  activeTab === 'unread' ? 'bg-white/20 text-white' : 'bg-[var(--color-border)] text-[var(--color-text-secondary)]'
                }`}>
                  0
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('read')}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 border-0 cursor-pointer ${
                activeTab === 'read'
                  ? 'bg-[var(--color-primary)] text-white shadow-md shadow-blue-500/10'
                  : 'bg-[var(--color-background)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)]'
              }`}
            >
              Read
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                activeTab === 'read' ? 'bg-white/20 text-white' : 'bg-[var(--color-border)] text-[var(--color-text-secondary)]'
              }`}>
                {notifications.filter(n => n.read).length}
              </span>
            </button>
          </div>
        </div>

        {/* Notifications List Card */}
        <Card className="p-0 border border-[var(--color-border)] shadow-[var(--shadow-card)] bg-[var(--color-surface)] rounded-[var(--radius-large)] overflow-hidden">
          {filteredNotifications.length > 0 ? (
            <div className="divide-y divide-[var(--color-border)]">
              {filteredNotifications.map(notification => (
                <div
                  key={notification.id}
                  className={`flex items-start justify-between p-6 transition-all border-b border-[var(--color-border)] last:border-b-0 ${
                    notification.read ? '' : 'bg-[var(--color-primary-light)]'
                  }`}
                >
                  <div className="flex items-start gap-4 flex-grow min-w-0">
                    <div className={`notification-icon-wrapper notification-icon-wrapper--${notification.type} mt-1`}>
                      {getIcon(notification.type)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-semibold text-base text-[var(--color-text-primary)] m-0">
                          {notification.title}
                        </h3>
                        <Badge tone={getBadgeTone(notification.type)} className="capitalize text-xs font-semibold px-2 px-1">
                          {notification.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-[var(--color-text-secondary)] m-0 leading-relaxed mb-2">
                        {notification.description}
                      </p>
                      <span className="text-xs text-[var(--color-text-muted)] block">
                        {new Date(notification.time).toLocaleString(undefined, {
                          weekday: 'long',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })} ({formatRelativeTime(notification.time)})
                      </span>
                    </div>
                  </div>

                  {/* Actions for each notification */}
                  <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                    <button
                      onClick={() => toggleReadState(notification.id)}
                      className="p-2 bg-transparent border-0 hover:bg-[var(--color-background)] rounded-full text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] cursor-pointer transition-colors"
                      title={notification.read ? "Mark as unread" : "Mark as read"}
                      type="button"
                    >
                      {notification.read ? (
                        <EyeOff className="w-5 h-5" aria-hidden="true" />
                      ) : (
                        <Eye className="w-5 h-5" aria-hidden="true" />
                      )}
                    </button>
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-2 bg-transparent border-0 hover:bg-[var(--color-error-light)] rounded-full text-[var(--color-text-muted)] hover:text-[var(--color-error)] cursor-pointer transition-colors"
                      title="Delete notification"
                      type="button"
                    >
                      <Trash2 className="w-5 h-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
              <div className="w-16 h-16 bg-[var(--color-background)] rounded-full flex items-center justify-center text-[var(--color-text-muted)] mb-4">
                <Inbox className="w-8 h-8 opacity-60" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-1">
                {activeTab === 'all' 
                  ? 'No notifications' 
                  : activeTab === 'unread' 
                    ? 'No unread notifications' 
                    : 'No read notifications'}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] max-w-sm m-0">
                {activeTab === 'all'
                  ? "You don't have any notifications right now."
                  : activeTab === 'unread'
                    ? "You've read all your notifications!"
                    : "You haven't read any notifications yet."}
              </p>
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  )
}
