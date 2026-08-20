import { type AttendanceRecord } from '../../data/attendanceData'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

interface MonthlySummaryItem {
    month: string
    year: number
    present: number
    absent: number
    late: number
    excused: number
    percentage: number
}

interface MonthlySummaryProps {
    records: AttendanceRecord[]
    onMonthSelect?: (month: string, year: number) => void
}

export function MonthlySummary({ records }: MonthlySummaryProps) {
    const [expandedMonth, setExpandedMonth] = useState<string | null>(null)

    const groupByMonth = (records: AttendanceRecord[]): MonthlySummaryItem[] => {
        const months: Map<string, AttendanceRecord[]> = new Map()

        records.forEach((record) => {
            const date = new Date(record.date)
            const key = `${date.getFullYear()}-${date.getMonth()}`
            if (!months.has(key)) {
                months.set(key, [])
            }
            months.get(key)!.push(record)
        })

        return Array.from(months.entries())
            .map(([key, monthRecords]) => {
                const [year, month] = key.split('-').map(Number)
                const present = monthRecords.filter((r) => r.status === 'Present').length
                const absent = monthRecords.filter((r) => r.status === 'Absent').length
                const late = monthRecords.filter((r) => r.status === 'Late').length
                const excused = monthRecords.filter((r) => r.status === 'Excused').length
                const total = monthRecords.length
                const percentage = ((present + excused) / total) * 100

                const monthName = new Date(year, month).toLocaleString('en-US', { month: 'long' })

                return {
                    month: monthName,
                    year,
                    present,
                    absent,
                    late,
                    excused,
                    percentage,
                }
            })
            .sort((a, b) => {
                if (a.year !== b.year) return b.year - a.year
                const monthOrder = [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December',
                ]
                return monthOrder.indexOf(b.month) - monthOrder.indexOf(a.month)
            })
    }

    const monthlySummaries = groupByMonth(records)

    const toggleMonth = (monthKey: string) => {
        setExpandedMonth(expandedMonth === monthKey ? null : monthKey)
    }

    return (
        <div className="monthly-summary">
            <h3 className="monthly-summary__title">Monthly Summary</h3>
            <div className="monthly-summary__list">
                {monthlySummaries.length === 0 ? (
                    <div className="monthly-summary__empty">No attendance data available</div>
                ) : (
                    monthlySummaries.map((item) => {
                        const monthKey = `${item.month}-${item.year}`
                        const isExpanded = expandedMonth === monthKey

                        return (
                            <div key={monthKey} className="monthly-summary__item">
                                <button
                                    className="monthly-summary__header"
                                    onClick={() => toggleMonth(monthKey)}
                                    aria-expanded={isExpanded}
                                    type="button"
                                >
                                    <div className="monthly-summary__month">
                                        <div className="monthly-summary__month-name">{item.month} {item.year}</div>
                                        <div
                                            className={`monthly-summary__percentage monthly-summary__percentage--${item.percentage >= 95 ? 'success' : item.percentage >= 85 ? 'warning' : 'error'
                                                }`}
                                        >
                                            {item.percentage.toFixed(1)}%
                                        </div>
                                    </div>
                                    <ChevronDown
                                        size={18}
                                        aria-hidden="true"
                                        className={`monthly-summary__toggle ${isExpanded ? 'monthly-summary__toggle--open' : ''}`}
                                    />
                                </button>

                                {isExpanded && (
                                    <div className="monthly-summary__content">
                                        <div className="monthly-summary__stat">
                                            <span className="monthly-summary__stat-label">Present:</span>
                                            <span className="monthly-summary__stat-value">{item.present}</span>
                                        </div>
                                        <div className="monthly-summary__stat">
                                            <span className="monthly-summary__stat-label">Absent:</span>
                                            <span className="monthly-summary__stat-value">{item.absent}</span>
                                        </div>
                                        <div className="monthly-summary__stat">
                                            <span className="monthly-summary__stat-label">Late:</span>
                                            <span className="monthly-summary__stat-value">{item.late}</span>
                                        </div>
                                        <div className="monthly-summary__stat">
                                            <span className="monthly-summary__stat-label">Excused:</span>
                                            <span className="monthly-summary__stat-value">{item.excused}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}
