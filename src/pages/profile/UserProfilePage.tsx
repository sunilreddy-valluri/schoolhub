import { useState, type FormEvent } from 'react'
import { Check, Eye, EyeOff, Camera, User, Shield, Info } from 'lucide-react'
import { DashboardLayout } from '../../components/layout/DashboardLayout'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Label } from '../../components/ui/Label'
import { Divider } from '../../components/ui/Divider'
import { useUser } from '../../context/UserContext'
import { useNotifications } from '../../context/NotificationContext'

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  currentPassword?: string
  newPassword?: string
  confirmPassword?: string
}

interface PasswordRequirement {
  label: string
  isMet: boolean
}

const AVATAR_COLORS = [
  { name: 'Primary Blue', value: '#2563eb' },
  { name: 'Indigo Purple', value: '#6366f1' },
  { name: 'Forest Emerald', value: '#10b981' },
  { name: 'Crimson Pink', value: '#ec4899' },
  { name: 'Warm Amber', value: '#f59e0b' },
  { name: 'Dark Slate', value: '#475569' },
]

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function UserProfilePage() {
  const { profile, updateProfile, verifyPassword, updatePassword } = useUser()
  const { addNotification } = useNotifications()

  // Form State
  const [name, setName] = useState(profile.name)
  const [email, setEmail] = useState(profile.email)
  const [phone, setPhone] = useState(profile.phone)
  const [avatarColor, setAvatarColor] = useState(profile.avatarColor)

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // UI state
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Real-time password requirements verification
  const requirements: PasswordRequirement[] = [
    { label: 'At least 8 characters', isMet: newPassword.length >= 8 },
    { label: 'One uppercase letter', isMet: /[A-Z]/.test(newPassword) },
    { label: 'One number', isMet: /\d/.test(newPassword) },
  ]

  // Validation function
  function validate() {
    const nextErrors: FormErrors = {}

    // Personal details validation
    if (!name.trim()) nextErrors.name = 'Full name is required.'
    
    if (!email.trim()) {
      nextErrors.email = 'Email is required.'
    } else if (!emailPattern.test(email)) {
      nextErrors.email = 'Please enter a valid email address.'
    }

    if (!phone.trim()) {
      nextErrors.phone = 'Phone number is required.'
    }

    // Password validation (only if new password fields are being edited)
    const hasPasswordInput = currentPassword || newPassword || confirmPassword
    if (hasPasswordInput) {
      if (!currentPassword) {
        nextErrors.currentPassword = 'Current password is required to change your password.'
      } else if (!verifyPassword(currentPassword)) {
        nextErrors.currentPassword = 'The current password you entered is incorrect.'
      }

      if (!newPassword) {
        nextErrors.newPassword = 'New password is required.'
      } else if (requirements.some((req) => !req.isMet)) {
        nextErrors.newPassword = 'New password must meet all requirements below.'
      }

      if (!confirmPassword) {
        nextErrors.confirmPassword = 'Please confirm your new password.'
      } else if (confirmPassword !== newPassword) {
        nextErrors.confirmPassword = 'Passwords do not match.'
      }
    }

    return nextErrors
  }

  // Handle Save
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrors({})
    setSuccessMessage(null)
    setIsSubmitting(true)

    // Delay submission slightly to simulate a premium save transition
    setTimeout(() => {
      const nextErrors = validate()
      const isValid = Object.keys(nextErrors).length === 0

      if (!isValid) {
        setErrors(nextErrors)
        setIsSubmitting(false)
        
        // Focus first field with error for accessibility
        const firstErrorKey = Object.keys(nextErrors)[0] as keyof FormErrors
        const element = document.getElementById(firstErrorKey)
        element?.focus()
        return
      }

      // Update Profile Details
      updateProfile({
        name,
        email,
        phone,
        avatarColor,
      })

      // Update Password if filled
      const isPasswordChanged = newPassword && currentPassword
      if (isPasswordChanged) {
        updatePassword(newPassword)
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
      }

      // Show success feedback
      const msg = isPasswordChanged
        ? 'Your profile details and password have been successfully updated.'
        : 'Your profile details have been successfully updated.'
      
      setSuccessMessage(msg)
      addNotification(
        'Profile Updated',
        isPasswordChanged ? 'You updated your account information and password.' : 'You updated your profile information.',
        'system'
      )
      setIsSubmitting(false)
      
      // Auto-clear success message after 5 seconds
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }, 400)
  }

  // Derived initials
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <DashboardLayout activePath="/profile">
      <section className="dashboard-section" aria-labelledby="profile-heading">
        {/* Header Title */}
        <div className="dashboard-section__header">
          <div>
            <span className="section-kicker">Account Settings</span>
            <h2 id="profile-heading">Profile Settings</h2>
            <p className="page-intro" style={{ marginTop: '4px' }}>
              Manage your personal information, contact details, and account security.
            </p>
          </div>
        </div>

        {/* Success Alert */}
        {successMessage ? (
          <div className="form-success-card" role="status" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor: 'var(--color-success-light)',
            border: '1px solid var(--color-success)',
            color: 'var(--color-success)',
            padding: '16px',
            borderRadius: 'var(--radius-default)',
            marginBottom: '24px',
            fontSize: '14px',
            fontWeight: 500
          }}>
            <span style={{ display: 'grid', placeItems: 'center', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'var(--color-success)', color: '#fff' }}>
              ✓
            </span>
            <span>{successMessage}</span>
          </div>
        ) : null}

        {/* Main Grid */}
        <div className="profile-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(240px, 1fr) minmax(320px, 2.5fr)',
          gap: '24px',
          alignItems: 'start'
        }}>
          
          {/* Left Column: Avatar Settings */}
          <Card className="profile-avatar-card" style={{ padding: '24px', textAlign: 'center' }}>
            <h3 className="section-title" style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '20px', textAlign: 'left' }}>
              Profile Avatar
            </h3>
            
            <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 16px' }}>
              <div
                className="profile-large-avatar"
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  backgroundColor: avatarColor,
                  color: '#ffffff',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: '38px',
                  fontWeight: 700,
                  boxShadow: 'var(--shadow-card)',
                  transition: 'background-color 200ms ease'
                }}
              >
                {initials || '?'}
              </div>
              <div style={{
                position: 'absolute',
                bottom: '0',
                right: '0',
                backgroundColor: 'var(--color-secondary)',
                color: 'var(--color-surface)',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'grid',
                placeItems: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                border: '2px solid var(--color-surface)'
              }} title="Edit profile theme">
                <Camera size={14} />
              </div>
            </div>

            <h4 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-primary)', margin: '0 0 4px' }}>
              {name || 'New User'}
            </h4>
            <span className="badge badge--info" style={{ display: 'inline-block', marginBottom: '24px' }}>
              {profile.role}
            </span>

            <Divider />

            {/* Avatar Color Selector */}
            <div style={{ marginTop: '20px', textAlign: 'left' }}>
              <span className="label" style={{ display: 'block', marginBottom: '10px' }}>
                Avatar Theme Color
              </span>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {AVATAR_COLORS.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => setAvatarColor(color.value)}
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: color.value,
                      border: avatarColor === color.value ? '2px solid var(--color-text-primary)' : '2px solid transparent',
                      outlineOffset: '2px',
                      padding: '0',
                      cursor: 'pointer',
                      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
                      transform: avatarColor === color.value ? 'scale(1.1)' : 'scale(1)',
                      transition: 'transform 100ms ease, border-color 100ms ease'
                    }}
                    title={color.name}
                    aria-label={`Select ${color.name} theme`}
                  />
                ))}
              </div>
            </div>
          </Card>

          {/* Right Column: Forms */}
          <form onSubmit={handleSubmit} noValidate style={{ display: 'grid', gap: '24px' }}>
            
            {/* Card 1: Personal Details */}
            <Card style={{ padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <User size={20} className="color-primary" style={{ color: 'var(--color-primary)' }} />
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-primary)', margin: 0 }}>
                  Personal Information
                </h3>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '-12px', marginBottom: '24px' }}>
                Update your primary profile details and contact settings.
              </p>

              <div className="login-form" style={{ gap: '20px' }}>
                {/* Name */}
                <div className="field-group">
                  <Label htmlFor="name" required>Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    hasError={Boolean(errors.name)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name ? <p className="field-error" id="name-error">{errors.name}</p> : null}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                  {/* Email */}
                  <div className="field-group">
                    <Label htmlFor="email" required>Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@school.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      hasError={Boolean(errors.email)}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email ? <p className="field-error" id="email-error">{errors.email}</p> : null}
                  </div>

                  {/* Phone */}
                  <div className="field-group">
                    <Label htmlFor="phone" required>Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      hasError={Boolean(errors.phone)}
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                    />
                    {errors.phone ? <p className="field-error" id="phone-error">{errors.phone}</p> : null}
                  </div>
                </div>

                {/* Role (Display Only) */}
                <div className="field-group">
                  <Label htmlFor="role">User Role</Label>
                  <div style={{ position: 'relative' }}>
                    <Input
                      id="role"
                      name="role"
                      type="text"
                      value={profile.role}
                      disabled
                      style={{ paddingRight: '40px' }}
                    />
                    <div style={{
                      position: 'absolute',
                      right: '14px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--color-text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }} title="Your user role is managed by the system. Contact IT support to request change.">
                      <Info size={16} />
                    </div>
                  </div>
                  <p className="field-intro" style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                    Your role is managed by system permissions and cannot be modified.
                  </p>
                </div>
              </div>
            </Card>

            {/* Card 2: Security & Password */}
            <Card style={{ padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <Shield size={20} className="color-primary" style={{ color: 'var(--color-primary)' }} />
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-primary)', margin: 0 }}>
                  Change Password
                </h3>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '-12px', marginBottom: '24px' }}>
                Change your login credentials. Leave these fields blank if you do not wish to change your password.
              </p>

              <div className="login-form" style={{ gap: '20px' }}>
                {/* Current Password */}
                <div className="field-group">
                  <Label htmlFor="currentPassword" required={Boolean(newPassword || confirmPassword)}>
                    Current Password
                  </Label>
                  <div className="password-input">
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type={showCurrentPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      placeholder="Enter your current password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      hasError={Boolean(errors.currentPassword)}
                      aria-invalid={Boolean(errors.currentPassword)}
                      aria-describedby={errors.currentPassword ? 'currentPassword-error' : undefined}
                    />
                    <button
                      className="password-input__toggle"
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      aria-label={showCurrentPassword ? 'Hide current password' : 'Show current password'}
                    >
                      {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.currentPassword ? <p className="field-error" id="currentPassword-error">{errors.currentPassword}</p> : null}
                </div>

                {/* New Password */}
                <div className="field-group">
                  <Label htmlFor="newPassword" required={Boolean(currentPassword || confirmPassword)}>
                    New Password
                  </Label>
                  <div className="password-input">
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type={showNewPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      placeholder="Create a new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      hasError={Boolean(errors.newPassword)}
                      aria-invalid={Boolean(errors.newPassword)}
                      aria-describedby={errors.newPassword ? 'newPassword-error' : undefined}
                    />
                    <button
                      className="password-input__toggle"
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      aria-label={showNewPassword ? 'Hide new password' : 'Show new password'}
                    >
                      {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.newPassword ? <p className="field-error" id="newPassword-error">{errors.newPassword}</p> : null}
                </div>

                {/* Password Requirements */}
                {newPassword ? (
                  <ul className="password-requirements" aria-label="Password requirements" style={{ marginBottom: '4px', listStyle: 'none', paddingLeft: 0 }}>
                    {requirements.map(({ label, isMet }) => (
                      <li
                        className={isMet ? 'password-requirement password-requirement--met' : 'password-requirement'}
                        key={label}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: isMet ? 'var(--color-success)' : 'var(--color-text-muted)', marginBottom: '4px' }}
                      >
                        <span className="password-requirement__icon" aria-hidden="true" style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: '14px', height: '14px', borderRadius: '50%', border: isMet ? 'none' : '1px solid var(--color-border)', backgroundColor: isMet ? 'var(--color-success)' : 'transparent', color: '#fff' }}>
                          {isMet ? <Check size={10} strokeWidth={3} /> : null}
                        </span>
                        {label}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {/* Confirm Password */}
                <div className="field-group">
                  <Label htmlFor="confirmPassword" required={Boolean(currentPassword || newPassword)}>
                    Confirm New Password
                  </Label>
                  <div className="password-input">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      placeholder="Confirm your new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      hasError={Boolean(errors.confirmPassword)}
                      aria-invalid={Boolean(errors.confirmPassword)}
                      aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
                    />
                    <button
                      className="password-input__toggle"
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.confirmPassword ? <p className="field-error" id="confirmPassword-error">{errors.confirmPassword}</p> : null}
                </div>
              </div>
            </Card>

            {/* Save Button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
              <Button type="submit" disabled={isSubmitting} style={{ minWidth: '160px' }}>
                {isSubmitting ? 'Saving Changes...' : 'Save Changes'}
              </Button>
            </div>

          </form>
        </div>
      </section>
      
      {/* Mobile styling styles embedded in inline style or tag */}
      <style>{`
        @media (max-width: 820px) {
          .profile-grid {
            grid-template-columns: 1fr !important;
          }
          .profile-avatar-card {
            padding: 20px !important;
          }
        }
      `}</style>
    </DashboardLayout>
  )
}
