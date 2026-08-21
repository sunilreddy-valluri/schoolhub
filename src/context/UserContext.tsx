import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export interface UserProfile {
  name: string
  email: string
  phone: string
  role: string
  avatarColor: string
}

interface UserContextProps {
  profile: UserProfile
  updateProfile: (profileData: Partial<UserProfile>) => void
  verifyPassword: (password: string) => boolean
  updatePassword: (password: string) => void
}

const UserContext = createContext<UserContextProps | undefined>(undefined)

const DEFAULT_PROFILE: UserProfile = {
  name: 'Suneel Reddy',
  email: 'suneel@schoolhub.com',
  phone: '+1 (555) 019-2834',
  role: 'School Administrator',
  avatarColor: '#2563eb', // Default SchoolHub primary blue
}

const DEFAULT_PASSWORD = 'password123'

export function UserProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('schoolhub_user_profile')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error('Failed to parse user profile from localStorage', e)
      }
    }
    return DEFAULT_PROFILE
  })

  const [password, setPassword] = useState<string>(() => {
    return localStorage.getItem('schoolhub_user_password') ?? DEFAULT_PASSWORD
  })

  // Synchronize state changes to localStorage
  useEffect(() => {
    localStorage.setItem('schoolhub_user_profile', JSON.stringify(profile))
  }, [profile])

  const updateProfile = (profileData: Partial<UserProfile>) => {
    setProfile((prev) => ({
      ...prev,
      ...profileData,
    }))
  }

  const verifyPassword = (inputPassword: string) => {
    return inputPassword === password
  }

  const updatePassword = (newPassword: string) => {
    setPassword(newPassword)
    localStorage.setItem('schoolhub_user_password', newPassword)
  }

  return (
    <UserContext.Provider
      value={{
        profile,
        updateProfile,
        verifyPassword,
        updatePassword,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
