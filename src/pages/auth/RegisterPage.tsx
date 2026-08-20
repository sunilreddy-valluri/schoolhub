import { useState, type FormEvent } from 'react'
import { ArrowRight, Check, Eye, EyeOff } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AuthLayout } from '../../components/layout/AuthLayout'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Label } from '../../components/ui/Label'

interface FormErrors {
  fullName?: string
  email?: string
  password?: string
  confirmPassword?: string
}

interface PasswordRequirement {
  label: string
  isMet: boolean
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function PasswordField({
  id,
  label,
  placeholder,
  value,
  onChange,
  error,
  autoComplete,
}: {
  id: string
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  error?: string
  autoComplete: string
}) {
  const [isVisible, setIsVisible] = useState(false)
  const errorId = `${id}-error`

  return (
    <div className="field-group">
      <Label htmlFor={id} required>{label}</Label>
      <div className="password-input">
        <Input
          id={id}
          name={id}
          type={isVisible ? 'text' : 'password'}
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          hasError={Boolean(error)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
        />
        <button
          className="password-input__toggle"
          type="button"
          onClick={() => setIsVisible((visible) => !visible)}
          aria-label={isVisible ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
        >
          {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error ? <p className="field-error" id={errorId}>{error}</p> : null}
    </div>
  )
}

export function RegisterPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const requirements: PasswordRequirement[] = [
    { label: 'At least 8 characters', isMet: password.length >= 8 },
    { label: 'One uppercase letter', isMet: /[A-Z]/.test(password) },
    { label: 'One number', isMet: /\d/.test(password) },
  ]

  function validate() {
    const nextErrors: FormErrors = {}

    if (!fullName.trim()) nextErrors.fullName = 'Full name is required.'
    if (!email.trim()) {
      nextErrors.email = 'Email is required.'
    } else if (!emailPattern.test(email)) {
      nextErrors.email = 'Enter a valid email address.'
    }
    if (!password) {
      nextErrors.password = 'Password is required.'
    } else if (requirements.some(({ isMet }) => !isMet)) {
      nextErrors.password = 'Use all of the password requirements below.'
    }
    if (!confirmPassword) {
      nextErrors.confirmPassword = 'Please confirm your password.'
    } else if (confirmPassword !== password) {
      nextErrors.confirmPassword = 'Passwords do not match.'
    }

    return nextErrors
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    setIsSubmitted(Object.keys(nextErrors).length === 0)
  }

  return (
    <AuthLayout
      eyebrow="Get started with SchoolHub"
      heading={<>Build your school,<br />all in one place.</>}
      description="Create your SchoolHub account and manage students, teachers, classes, and daily school operations with ease."
    >
      <Card className="login-card register-card">
        <div className="login-card__header">
          <div className="mobile-brand-lockup">
            <span className="brand-mark" aria-hidden="true">S</span>
            <span>SchoolHub</span>
          </div>
          <span className="eyebrow">Create your account</span>
          <h2>Create your account</h2>
          <p>Set up your SchoolHub account to get started.</p>
        </div>

        <form className="login-form register-form" onSubmit={handleSubmit} noValidate>
          <div className="field-group">
            <Label htmlFor="fullName" required>Full name</Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              hasError={Boolean(errors.fullName)}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? 'fullName-error' : undefined}
            />
            {errors.fullName ? <p className="field-error" id="fullName-error">{errors.fullName}</p> : null}
          </div>

          <div className="field-group">
            <Label htmlFor="register-email" required>Email</Label>
            <Input
              id="register-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@school.edu"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              hasError={Boolean(errors.email)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'register-email-error' : undefined}
            />
            {errors.email ? <p className="field-error" id="register-email-error">{errors.email}</p> : null}
          </div>

          <PasswordField
            id="register-password"
            label="Password"
            placeholder="Create a password"
            value={password}
            onChange={setPassword}
            error={errors.password}
            autoComplete="new-password"
          />
          <ul className="password-requirements" aria-label="Password requirements">
            {requirements.map(({ label, isMet }) => (
              <li className={isMet ? 'password-requirement password-requirement--met' : 'password-requirement'} key={label}>
                <span className="password-requirement__icon" aria-hidden="true">
                  {isMet ? <Check size={12} strokeWidth={3} /> : null}
                </span>
                {label}
              </li>
            ))}
          </ul>

          <PasswordField
            id="confirm-password"
            label="Confirm password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            error={errors.confirmPassword}
            autoComplete="new-password"
          />

          <Button type="submit" fullWidth disabled={isSubmitted}>
            {isSubmitted ? 'Account details saved' : 'Create account'}
            <ArrowRight size={17} aria-hidden="true" />
          </Button>

          {isSubmitted ? (
            <p className="form-success" role="status">Your account details look good. Registration will be connected soon.</p>
          ) : null}
        </form>

        <div className="login-card__footer">
          <span>Already have an account?</span>
          <Link className="text-link" to="/login">Sign in</Link>
        </div>
      </Card>
    </AuthLayout>
  )
}
