import { useState } from 'react'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { Select } from '../ui/Select'
import { Input } from '../ui/Input'
import { sampleClassDetails, classes } from '../../data/classData'

type AttendanceStatus = 'Present' | 'Absent' | 'Late'

interface StudentAttendanceRecord {
  studentId: string
  studentName: string
  status: AttendanceStatus
}

export function MarkAttendanceForm() {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0])
  const [selectedClass, setSelectedClass] = useState<string>('')
  const [students, setStudents] = useState<StudentAttendanceRecord[]>([])
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  // Handlers
  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const classId = e.target.value
    setSelectedClass(classId)
    setIsSaved(false)
    if (classId) {
      // In a real app, fetch students for this class. Using sample data here.
      setStudents(
        sampleClassDetails.students.map(s => ({
          studentId: s.studentId,
          studentName: s.studentName,
          status: 'Present' // Default to present
        }))
      )
    } else {
      setStudents([])
    }
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value)
    setIsSaved(false)
  }

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setStudents(prev => 
      prev.map(s => s.studentId === studentId ? { ...s, status } : s)
    )
  }

  const handleMarkAllPresent = () => {
    setStudents(prev => prev.map(s => ({ ...s, status: 'Present' })))
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    setIsSaving(false)
    setIsSaved(true)
  }

  return (
    <Card className="attendance-form-card">
      <div className="attendance-form-header" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-text-strong)' }}>Mark Attendance</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Date</label>
            <Input 
              type="date" 
              value={selectedDate} 
              onChange={handleDateChange}
              max={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>Class</label>
            <Select value={selectedClass} onChange={handleClassChange}>
              <option value="">Select a class...</option>
              {classes.map(c => (
                <option key={c.id} value={c.id}>{c.displayName}</option>
              ))}
              <option value="CLS001">Grade 10 - A (Sample)</option>
            </Select>
          </div>
        </div>
      </div>

      {isSaved && (
        <div style={{ 
          padding: '1rem', 
          backgroundColor: 'rgba(34, 197, 94, 0.1)', 
          color: 'var(--color-success)', 
          borderRadius: 'var(--radius-md)',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Attendance saved successfully for {selectedDate}.
        </div>
      )}

      {selectedClass && students.length > 0 && !isSaved && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 500 }}>Students ({students.length})</h3>
            <Button variant="ghost" onClick={handleMarkAllPresent}>
              Mark All Present
            </Button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
            {students.map(student => (
              <div 
                key={student.studentId} 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '1rem',
                  backgroundColor: 'var(--color-bg-subtle)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)'
                }}
              >
                <div>
                  <div style={{ fontWeight: 500, color: 'var(--color-text-strong)' }}>{student.studentName}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{student.studentId}</div>
                </div>
                
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    onClick={() => handleStatusChange(student.studentId, 'Present')}
                    style={{
                      padding: '0.375rem 0.75rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      border: student.status === 'Present' ? '1px solid var(--color-success)' : '1px solid var(--color-border)',
                      backgroundColor: student.status === 'Present' ? 'var(--color-success)' : 'transparent',
                      color: student.status === 'Present' ? '#fff' : 'var(--color-text)'
                    }}
                  >
                    Present
                  </button>
                  <button 
                    onClick={() => handleStatusChange(student.studentId, 'Absent')}
                    style={{
                      padding: '0.375rem 0.75rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      border: student.status === 'Absent' ? '1px solid var(--color-danger)' : '1px solid var(--color-border)',
                      backgroundColor: student.status === 'Absent' ? 'var(--color-danger)' : 'transparent',
                      color: student.status === 'Absent' ? '#fff' : 'var(--color-text)'
                    }}
                  >
                    Absent
                  </button>
                  <button 
                    onClick={() => handleStatusChange(student.studentId, 'Late')}
                    style={{
                      padding: '0.375rem 0.75rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      border: student.status === 'Late' ? '1px solid var(--color-warning)' : '1px solid var(--color-border)',
                      backgroundColor: student.status === 'Late' ? 'var(--color-warning)' : 'transparent',
                      color: student.status === 'Late' ? '#fff' : 'var(--color-text)'
                    }}
                  >
                    Late
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Attendance'}
            </Button>
          </div>
        </>
      )}

      {selectedClass && students.length === 0 && !isSaved && (
        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
          No students found for this class.
        </div>
      )}
    </Card>
  )
}
