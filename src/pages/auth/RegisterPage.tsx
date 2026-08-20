import { Link } from 'react-router-dom'
import { AuthLayout } from '../../components/layout/AuthLayout'

export function RegisterPage() {
  return (
    <AuthLayout>
      <div className="placeholder-page">
        <span className="eyebrow">Coming next</span>
        <h1>Set up your SchoolHub account.</h1>
        <p>Registration will use the same shared auth layout and form primitives.</p>
        <Link className="text-link" to="/login">Back to sign in</Link>
      </div>
    </AuthLayout>
  )
}
