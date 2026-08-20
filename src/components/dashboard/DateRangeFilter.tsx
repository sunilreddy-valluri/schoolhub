import { useState } from 'react'
import { Button } from '../ui/Button'
import { Label } from '../ui/Label'
import { Input } from '../ui/Input'
import { ChevronDown } from 'lucide-react'

export type DateRangeType = 'all' | 'thisMonth' | 'lastMonth' | 'thisYear' | 'custom'

export interface DateRange {
    startDate: Date | null
    endDate: Date | null
    type: DateRangeType
}

interface DateRangeFilterProps {
    onFilterChange: (range: DateRange) => void
    currentRange?: DateRange
}

export function DateRangeFilter({ onFilterChange, currentRange }: DateRangeFilterProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [customStart, setCustomStart] = useState('')
    const [customEnd, setCustomEnd] = useState('')

    const getDateRange = (type: DateRangeType): DateRange => {
        const today = new Date()
        const currentYear = today.getFullYear()
        const currentMonth = today.getMonth()

        switch (type) {
            case 'thisMonth': {
                const start = new Date(currentYear, currentMonth, 1)
                const end = new Date(currentYear, currentMonth + 1, 0)
                return { startDate: start, endDate: end, type }
            }
            case 'lastMonth': {
                const start = new Date(currentYear, currentMonth - 1, 1)
                const end = new Date(currentYear, currentMonth, 0)
                return { startDate: start, endDate: end, type }
            }
            case 'thisYear': {
                const start = new Date(currentYear, 0, 1)
                const end = new Date(currentYear, 11, 31)
                return { startDate: start, endDate: end, type }
            }
            case 'all':
                return { startDate: null, endDate: null, type }
            default:
                return currentRange || { startDate: null, endDate: null, type: 'all' }
        }
    }

    const handlePresetSelect = (type: Exclude<DateRangeType, 'custom'>) => {
        const range = getDateRange(type)
        onFilterChange(range)
        setIsOpen(false)
    }

    const handleCustomDateChange = () => {
        if (customStart && customEnd) {
            const startDate = new Date(customStart)
            const endDate = new Date(customEnd)

            if (startDate > endDate) {
                alert('Start date must be before end date')
                return
            }

            onFilterChange({
                startDate,
                endDate,
                type: 'custom',
            })
            setIsOpen(false)
        }
    }

    const getDisplayLabel = (): string => {
        if (!currentRange) return 'All Records'

        switch (currentRange.type) {
            case 'thisMonth':
                return 'This Month'
            case 'lastMonth':
                return 'Last Month'
            case 'thisYear':
                return 'This Year'
            case 'custom':
                if (currentRange.startDate && currentRange.endDate) {
                    return `${currentRange.startDate.toLocaleDateString()} - ${currentRange.endDate.toLocaleDateString()}`
                }
                return 'Custom Range'
            default:
                return 'All Records'
        }
    }

    return (
        <div className="date-range-filter">
            <div className="date-range-filter__button">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="date-range-filter__trigger"
                    type="button"
                    aria-expanded={isOpen}
                >
                    <span>{getDisplayLabel()}</span>
                    <ChevronDown size={18} aria-hidden="true" />
                </button>
            </div>

            {isOpen && (
                <div className="date-range-filter__dropdown">
                    <div className="date-range-filter__group">
                        <h4 className="date-range-filter__group-title">Quick Select</h4>
                        <button
                            onClick={() => handlePresetSelect('all')}
                            className={`date-range-filter__option ${currentRange?.type === 'all' ? 'date-range-filter__option--active' : ''}`}
                            type="button"
                        >
                            All Records
                        </button>
                        <button
                            onClick={() => handlePresetSelect('thisMonth')}
                            className={`date-range-filter__option ${currentRange?.type === 'thisMonth' ? 'date-range-filter__option--active' : ''}`}
                            type="button"
                        >
                            This Month
                        </button>
                        <button
                            onClick={() => handlePresetSelect('lastMonth')}
                            className={`date-range-filter__option ${currentRange?.type === 'lastMonth' ? 'date-range-filter__option--active' : ''}`}
                            type="button"
                        >
                            Last Month
                        </button>
                        <button
                            onClick={() => handlePresetSelect('thisYear')}
                            className={`date-range-filter__option ${currentRange?.type === 'thisYear' ? 'date-range-filter__option--active' : ''}`}
                            type="button"
                        >
                            This Year
                        </button>
                    </div>

                    <div className="date-range-filter__divider" />

                    <div className="date-range-filter__group">
                        <h4 className="date-range-filter__group-title">Custom Range</h4>
                        <div className="date-range-filter__custom">
                            <div className="date-range-filter__field">
                                <Label htmlFor="start-date">Start Date</Label>
                                <Input
                                    id="start-date"
                                    type="date"
                                    value={customStart}
                                    onChange={(e) => setCustomStart(e.target.value)}
                                />
                            </div>
                            <div className="date-range-filter__field">
                                <Label htmlFor="end-date">End Date</Label>
                                <Input
                                    id="end-date"
                                    type="date"
                                    value={customEnd}
                                    onChange={(e) => setCustomEnd(e.target.value)}
                                />
                            </div>
                            <Button onClick={handleCustomDateChange} className="date-range-filter__apply">
                                Apply
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
