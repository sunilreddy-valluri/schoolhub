import { Card } from '../ui/Card'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { Label } from '../ui/Label'

interface AttendanceFiltersProps {
    onDateChange?: (date: string) => void
    onGradeChange?: (grade: string) => void
    onClassChange?: (classId: string) => void
}

export function AttendanceFilters({
    onDateChange,
    onGradeChange,
    onClassChange,
}: AttendanceFiltersProps) {
    return (
        <Card style={{ padding: '16px', marginBottom: '24px', display: 'flex', gap: '16px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 200px' }}>
                <Label htmlFor="date-filter">Date</Label>
                <Input
                    type="date"
                    id="date-filter"
                    onChange={(e) => onDateChange?.(e.target.value)}
                    defaultValue={new Date().toISOString().split('T')[0]}
                    style={{ marginTop: '8px' }}
                />
            </div>
            
            <div style={{ flex: '1 1 200px' }}>
                <Label htmlFor="grade-filter">Grade</Label>
                <Select
                    id="grade-filter"
                    onChange={(e) => onGradeChange?.(e.target.value)}
                    style={{ marginTop: '8px' }}
                >
                    <option value="all">All Grades</option>
                    <option value="8">Grade 8</option>
                    <option value="9">Grade 9</option>
                    <option value="10">Grade 10</option>
                    <option value="11">Grade 11</option>
                    <option value="12">Grade 12</option>
                </Select>
            </div>
            
            <div style={{ flex: '1 1 200px' }}>
                <Label htmlFor="class-filter">Class</Label>
                <Select
                    id="class-filter"
                    onChange={(e) => onClassChange?.(e.target.value)}
                    style={{ marginTop: '8px' }}
                >
                    <option value="all">All Classes</option>
                    <option value="8-A">8-A</option>
                    <option value="8-B">8-B</option>
                    <option value="9-C">9-C</option>
                    <option value="10-A">10-A</option>
                    <option value="10-B">10-B</option>
                    <option value="11-Sci">11-Sci</option>
                    <option value="12-Com">12-Com</option>
                </Select>
            </div>
        </Card>
    )
}
