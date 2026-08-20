import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/Button'
import { ArrowRight } from 'lucide-react'

/**
 * 🎯 QuickAccessButton Component
 * 
 * Provides quick navigation buttons to key features:
 * - Dashboard: School overview
 * - Attendance: Attendance management
 * - Classes: Class details
 */

interface QuickAccessButtonProps {
    destination: 'dashboard' | 'attendance' | 'classes'
    label?: string
    className?: string
    showIcon?: boolean
}

export function QuickAccessButton({
    destination,
    label,
    className = '',
    showIcon = true,
}: QuickAccessButtonProps) {
    const navigate = useNavigate()

    const getRoute = () => {
        switch (destination) {
            case 'dashboard':
                return '/dashboard'
            case 'attendance':
                return '/attendance'
            case 'classes':
                return '/class/CLS001'
            default:
                return '/dashboard'
        }
    }

    const getLabel = () => {
        if (label) return label
        switch (destination) {
            case 'dashboard':
                return '📊 Go to Dashboard'
            case 'attendance':
                return '📋 View Attendance'
            case 'classes':
                return '👥 Class Details'
            default:
                return 'Navigate'
        }
    }

    const handleClick = () => {
        navigate(getRoute())
    }

    return (
        <Button
            onClick={handleClick}
            className={className}
            title={`Navigate to ${destination}`}
            aria-label={`Go to ${destination}`}
        >
            <span>{getLabel()}</span>
            {showIcon && <ArrowRight size={16} aria-hidden="true" />}
        </Button>
    )
}
