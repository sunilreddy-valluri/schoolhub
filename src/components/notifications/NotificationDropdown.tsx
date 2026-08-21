import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, ClipboardList, ClipboardCheck, Megaphone, Settings, Inbox } from 'lucide-react'
import { useNotifications } from '../../context/NotificationContext'
import { formatRelativeTime } from '../../utils/date'

export function NotificationDropdown() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications()
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isOpen) return

    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const toggleDropdown = () => {
    setIsOpen(prev => !prev)
  }

  const handleNotificationClick = (id: string) => {
    markAsRead(id)
  }

  const handleViewAllClick = () => {
    setIsOpen(false)
    navigate('/notifications')
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'assignment':
        return <ClipboardList size={18} aria-hidden="true" />
      case 'attendance':
        return <ClipboardCheck size={18} aria-hidden="true" />
      case 'announcement':
        return <Megaphone size={18} aria-hidden="true" />
      case 'system':
      default:
        return <Settings size={18} aria-hidden="true" />
    }
  }

  // Display only the 5 most recent notifications
  const recentNotifications = notifications.slice(0, 5)
  const hasUnread = unreadCount > 0

  return (
    <div className="notification-bell-container" ref={containerRef}>
      <button
        className="dashboard-icon-button"
        type="button"
        onClick={toggleDropdown}
        aria-label={`View notifications. ${unreadCount} unread`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Bell size={19} aria-hidden="true" />
        {hasUnread && (
          <span className="notification-badge" aria-hidden="true">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="notification-dropdown" role="dialog" aria-modal="true" aria-label="Notifications">
          <div className="notification-dropdown__header">
            <h2 className="notification-dropdown__title">Notifications</h2>
            {hasUnread && (
              <button
                type="button"
                className="notification-dropdown__mark-read"
                onClick={markAllAsRead}
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="notification-dropdown__list">
            {recentNotifications.length > 0 ? (
              recentNotifications.map(notification => (
                <button
                  key={notification.id}
                  type="button"
                  className={`notification-item ${notification.read ? '' : 'notification-item--unread'}`}
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  <div className={`notification-icon-wrapper notification-icon-wrapper--${notification.type}`}>
                    {getIcon(notification.type)}
                  </div>
                  <div className="notification-content">
                    <h3 className="notification-title">{notification.title}</h3>
                    <p className="notification-description">{notification.description}</p>
                    <span className="notification-time">{formatRelativeTime(notification.time)}</span>
                  </div>
                  {!notification.read && (
                    <span className="notification-dot-indicator" aria-label="Unread" />
                  )}
                </button>
              ))
            ) : (
              <div className="notification-empty-state">
                <div className="notification-empty-state__icon">
                  <Inbox size={40} aria-hidden="true" />
                </div>
                <h3 className="notification-empty-state__title">You&apos;re all caught up!</h3>
                <p className="notification-empty-state__description">No notifications at the moment.</p>
              </div>
            )}
          </div>

          <div className="notification-dropdown__footer">
            <button
              type="button"
              className="notification-dropdown__view-all"
              onClick={handleViewAllClick}
            >
              View All Notifications
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
