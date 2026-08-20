import { useState, type FormEvent } from 'react'
import { ArrowRight, Eye, EyeOff } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AuthLayout } from '../../components/layout/AuthLayout'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Label } from '../../components/ui/Label'

interface FormErrors {
  email?: string
  password?: string
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  function validate() {
    const nextErrors: FormErrors = {}

    if (!email.trim()) {
      nextErrors.email = 'Email is required.'
    } else if (!emailPattern.test(email)) {
      nextErrors.email = 'Enter a valid email address.'
    }

    if (!password) {
      nextErrors.password = 'Password is required.'
    } else if (password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters.'
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
    <AuthLayout>
      <Card className="login-card">
        <div className="login-card__header">
          <div className="mobile-brand-lockup">
            <span className="brand-mark" aria-hidden="true">S</span>
            <span>SchoolHub</span>
          </div>
          <span className="eyebrow">Welcome back</span>
          <h2>Sign in to your account</h2>
          <p>Pick up where you left off.</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div className="field-group">
            <Label htmlFor="email" required>Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@school.edu"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              hasError={Boolean(errors.email)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email ? <p className="field-error" id="email-error">{errors.email}</p> : null}
          </div>

          <div className="field-group">
            <div className="field-label-row">
              <Label htmlFor="password" required>Password</Label>
              <a className="text-link text-link--small" href="#forgot-password">Forgot password?</a>
            </div>
            <div className="password-input">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                hasError={Boolean(errors.password)}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? 'password-error' : undefined}
              />
              <button
                className="password-input__toggle"
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password ? <p className="field-error" id="password-error">{errors.password}</p> : null}
          </div>

          <Button type="submit" fullWidth>
            Sign in
            <ArrowRight size={17} aria-hidden="true" />
          </Button>

          {isSubmitted ? (
            <p className="form-success" role="status">Your details look good. Authentication will be connected soon.</p>
          ) : null}
        </form>

        <div className="login-card__footer">
          <span>Don&apos;t have an account?</span>
          <Link className="text-link" to="/register">Create an account</Link>
        </div>
      </Card>
    </AuthLayout>
  )
}
