import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  Building2,
  CheckCircle2,
  Clock,
  ExternalLink,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  RotateCcw,
  Save,
  ShieldCheck,
  Sparkles,
  Users,
  FileEdit,
  ArrowRight,
} from 'lucide-react'
import { DashboardLayout } from '../../components/layout/DashboardLayout'
import { PageContainer } from '../../components/layout/PageContainer'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Label } from '../../components/ui/Label'
import {
  defaultSchoolDetails,
  getSchoolDetails,
  saveSchoolDetails,
  resetSchoolDetails,
  initialOnboardingSteps,
  type SchoolBasicDetails,
} from '../../data/schoolOnboardingData'

type ActiveTab = 'overview' | 'edit' | 'checklist'

export function OnboardingPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview')
  const [details, setDetails] = useState<SchoolBasicDetails>(getSchoolDetails)
  const [formData, setFormData] = useState<SchoolBasicDetails>(getSchoolDetails)
  const steps = initialOnboardingSteps
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [resetSuccess, setResetSuccess] = useState(false)

  const handleInputChange = (field: keyof SchoolBasicDetails, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleFacilityToggle = (facility: string) => {
    setFormData((prev) => {
      const exists = prev.facilities.includes(facility)
      return {
        ...prev,
        facilities: exists
          ? prev.facilities.filter((f) => f !== facility)
          : [...prev.facilities, facility],
      }
    })
  }

  const handleSave = (e: FormEvent) => {
    e.preventDefault()
    saveSchoolDetails(formData)
    setDetails(formData)
    setSaveSuccess(true)
    setResetSuccess(false)
    setTimeout(() => {
      setSaveSuccess(false)
      setActiveTab('overview')
    }, 1200)
  }

  const handleReset = () => {
    if (window.confirm('Reset all school details to default configuration?')) {
      const def = resetSchoolDetails()
      setDetails(def)
      setFormData(def)
      setResetSuccess(true)
      setSaveSuccess(false)
      setTimeout(() => setResetSuccess(false), 2500)
    }
  }

  const completedStepsCount = steps.filter((s) => s.status === 'completed').length
  const progressPercentage = Math.round((completedStepsCount / steps.length) * 100)

  return (
    <DashboardLayout activePath="/onboarding">
      <PageContainer>
        {/* Page Header */}
        <header className="onboarding-header">
          <div className="onboarding-header__copy">
            <span className="section-kicker">Administration & Setup</span>
            <h1 className="onboarding-title">🏫 School Onboarding & Profile</h1>
            <p className="onboarding-subtitle">
              Configure and review institutional basic details, academic parameters, administrative leadership, and operational readiness.
            </p>
          </div>

          <div className="onboarding-header__actions">
            <Button
              type="button"
              variant="secondary"
              onClick={handleReset}
              title="Reset school details to default values"
              aria-label="Reset to default details"
            >
              <RotateCcw size={16} aria-hidden="true" />
              <span>Reset Defaults</span>
            </Button>
            {activeTab !== 'edit' ? (
              <Button
                type="button"
                onClick={() => {
                  setFormData(details)
                  setActiveTab('edit')
                }}
                aria-label="Edit school basic details"
              >
                <FileEdit size={16} aria-hidden="true" />
                <span>Edit School Details</span>
              </Button>
            ) : (
              <Button
                type="button"
                variant="secondary"
                onClick={() => setActiveTab('overview')}
                aria-label="Cancel editing"
              >
                <span>Back to Overview</span>
              </Button>
            )}
          </div>
        </header>

        {/* Notifications */}
        {saveSuccess && (
          <div className="alert alert--success onboarding-alert" role="status" aria-live="polite">
            <CheckCircle2 size={18} aria-hidden="true" />
            <div>
              <strong>Details Saved Successfully!</strong>
              <p>School basic information has been updated and persisted to your system.</p>
            </div>
          </div>
        )}

        {resetSuccess && (
          <div className="alert alert--info onboarding-alert" role="status" aria-live="polite">
            <RotateCcw size={18} aria-hidden="true" />
            <div>
              <strong>Reset to Default Data</strong>
              <p>School details have been restored to the initial institutional defaults.</p>
            </div>
          </div>
        )}

        {/* Hero Progress Banner */}
        <div className="onboarding-hero-card">
          <div className="onboarding-hero-card__content">
            <div className="onboarding-hero-card__badge">
              <Sparkles size={16} aria-hidden="true" />
              <span>Institutional Onboarding Status</span>
            </div>
            <h2 className="onboarding-hero-card__title">{details.schoolName}</h2>
            <p className="onboarding-hero-card__motto">"{details.motto}"</p>

            <div className="onboarding-progress-container">
              <div className="onboarding-progress-header">
                <span>Setup Progress: {progressPercentage}% Complete</span>
                <span>{completedStepsCount} of {steps.length} Phases Active</span>
              </div>
              <div className="onboarding-progress-bar" role="progressbar" aria-valuenow={progressPercentage} aria-valuemin={0} aria-valuemax={100}>
                <div
                  className="onboarding-progress-fill"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>

          <div className="onboarding-hero-stats">
            <div className="onboarding-stat-tile">
              <span className="onboarding-stat-tile__label">Affiliation Code</span>
              <strong className="onboarding-stat-tile__value">{details.schoolCode}</strong>
              <small className="onboarding-stat-tile__sub">{details.accreditation.split(' ')[0]} {details.accreditation.split(' ')[1]}</small>
            </div>

            <div className="onboarding-stat-tile">
              <span className="onboarding-stat-tile__label">Academic Year</span>
              <strong className="onboarding-stat-tile__value">{details.academicYear}</strong>
              <small className="onboarding-stat-tile__sub">Active Session</small>
            </div>

            <div className="onboarding-stat-tile">
              <span className="onboarding-stat-tile__label">Total Enrolled</span>
              <strong className="onboarding-stat-tile__value">
                {details.currentEnrollment} <small>/ {details.studentCapacity}</small>
              </strong>
              <small className="onboarding-stat-tile__sub">
                {Math.round((details.currentEnrollment / details.studentCapacity) * 100)}% Capacity Filled
              </small>
            </div>

            <div className="onboarding-stat-tile">
              <span className="onboarding-stat-tile__label">Established</span>
              <strong className="onboarding-stat-tile__value">{details.establishedYear}</strong>
              <small className="onboarding-stat-tile__sub">Campus: {details.campusSize}</small>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="onboarding-tabs" role="tablist" aria-label="Onboarding sections">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'overview'}
            className={`onboarding-tab ${activeTab === 'overview' ? 'onboarding-tab--active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <Building2 size={17} aria-hidden="true" />
            <span>School Basic Details</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'edit'}
            className={`onboarding-tab ${activeTab === 'edit' ? 'onboarding-tab--active' : ''}`}
            onClick={() => {
              setFormData(details)
              setActiveTab('edit')
            }}
          >
            <FileEdit size={17} aria-hidden="true" />
            <span>Edit Details Form</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'checklist'}
            className={`onboarding-tab ${activeTab === 'checklist' ? 'onboarding-tab--active' : ''}`}
            onClick={() => setActiveTab('checklist')}
          >
            <CheckCircle2 size={17} aria-hidden="true" />
            <span>Onboarding Checklist ({completedStepsCount}/{steps.length})</span>
          </button>
        </div>

        {/* TAB 1: SCHOOL OVERVIEW / BASIC DETAILS */}
        {activeTab === 'overview' && (
          <div className="onboarding-overview-grid">
            {/* 1. School Identity & Affiliation */}
            <Card className="onboarding-section-card">
              <div className="onboarding-card-header">
                <div className="onboarding-card-icon-wrap onboarding-card-icon-wrap--primary">
                  <GraduationCap size={20} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="onboarding-card-title">School Identity & Governance</h3>
                  <p className="onboarding-card-subtitle">Official registration, board affiliation, and status</p>
                </div>
              </div>

              <div className="onboarding-detail-list">
                <div className="onboarding-detail-item">
                  <span className="onboarding-detail-label">Institution Name</span>
                  <span className="onboarding-detail-value font-bold text-primary">{details.schoolName}</span>
                </div>
                <div className="onboarding-detail-item">
                  <span className="onboarding-detail-label">School Code</span>
                  <span className="onboarding-detail-value badge-pill">{details.schoolCode}</span>
                </div>
                <div className="onboarding-detail-item">
                  <span className="onboarding-detail-label">Affiliation Board</span>
                  <span className="onboarding-detail-value">{details.affiliationBoard}</span>
                </div>
                <div className="onboarding-detail-item">
                  <span className="onboarding-detail-label">Affiliation Number</span>
                  <span className="onboarding-detail-value font-mono">{details.affiliationNumber}</span>
                </div>
                <div className="onboarding-detail-item">
                  <span className="onboarding-detail-label">Institution Type</span>
                  <span className="onboarding-detail-value">{details.schoolType}</span>
                </div>
                <div className="onboarding-detail-item">
                  <span className="onboarding-detail-label">Accreditation</span>
                  <span className="onboarding-detail-value text-success font-semibold">
                    <ShieldCheck size={14} className="inline mr-1" aria-hidden="true" />
                    {details.accreditation}
                  </span>
                </div>
                <div className="onboarding-detail-item">
                  <span className="onboarding-detail-label">Campus Area</span>
                  <span className="onboarding-detail-value">{details.campusSize}</span>
                </div>
                <div className="onboarding-detail-item">
                  <span className="onboarding-detail-label">Year Established</span>
                  <span className="onboarding-detail-value">{details.establishedYear}</span>
                </div>
              </div>
            </Card>

            {/* 2. Campus Location & Official Contacts */}
            <Card className="onboarding-section-card">
              <div className="onboarding-card-header">
                <div className="onboarding-card-icon-wrap onboarding-card-icon-wrap--emerald">
                  <MapPin size={20} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="onboarding-card-title">Campus Location & Contact</h3>
                  <p className="onboarding-card-subtitle">Official communication channels & postal address</p>
                </div>
              </div>

              <div className="onboarding-detail-list">
                <div className="onboarding-detail-item">
                  <span className="onboarding-detail-label">Official Email</span>
                  <a href={`mailto:${details.officialEmail}`} className="onboarding-link">
                    <Mail size={14} aria-hidden="true" />
                    <span>{details.officialEmail}</span>
                  </a>
                </div>
                <div className="onboarding-detail-item">
                  <span className="onboarding-detail-label">Admissions Email</span>
                  <a href={`mailto:${details.supportEmail}`} className="onboarding-link">
                    <Mail size={14} aria-hidden="true" />
                    <span>{details.supportEmail}</span>
                  </a>
                </div>
                <div className="onboarding-detail-item">
                  <span className="onboarding-detail-label">Main Telephone</span>
                  <a href={`tel:${details.primaryPhone}`} className="onboarding-link">
                    <Phone size={14} aria-hidden="true" />
                    <span>{details.primaryPhone}</span>
                  </a>
                </div>
                <div className="onboarding-detail-item">
                  <span className="onboarding-detail-label">Secondary Contact</span>
                  <span className="onboarding-detail-value">{details.secondaryPhone}</span>
                </div>
                <div className="onboarding-detail-item">
                  <span className="onboarding-detail-label">Official Website</span>
                  <a
                    href={details.website}
                    target="_blank"
                    rel="noreferrer"
                    className="onboarding-link"
                  >
                    <ExternalLink size={14} aria-hidden="true" />
                    <span>{details.website}</span>
                  </a>
                </div>
                <div className="onboarding-detail-item onboarding-detail-item--multiline">
                  <span className="onboarding-detail-label">Campus Address</span>
                  <span className="onboarding-detail-value">
                    {details.streetAddress}, {details.city}, {details.state} - {details.postalCode}, {details.country}
                  </span>
                </div>
              </div>
            </Card>

            {/* 3. Academic Structure & Operations */}
            <Card className="onboarding-section-card">
              <div className="onboarding-card-header">
                <div className="onboarding-card-icon-wrap onboarding-card-icon-wrap--amber">
                  <Clock size={20} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="onboarding-card-title">Academic & Operational Setup</h3>
                  <p className="onboarding-card-subtitle">Session dates, bell schedule, and grading scale</p>
                </div>
              </div>

              <div className="onboarding-detail-list">
                <div className="onboarding-detail-item">
                  <span className="onboarding-detail-label">Academic Session</span>
                  <span className="onboarding-detail-value font-bold">{details.academicYear}</span>
                </div>
                <div className="onboarding-detail-item">
                  <span className="onboarding-detail-label">Term Duration</span>
                  <span className="onboarding-detail-value">{details.academicSessionDates}</span>
                </div>
                <div className="onboarding-detail-item">
                  <span className="onboarding-detail-label">Daily Timings</span>
                  <span className="onboarding-detail-value font-semibold">{details.schoolHours}</span>
                </div>
                <div className="onboarding-detail-item">
                  <span className="onboarding-detail-label">Working Days</span>
                  <span className="onboarding-detail-value">{details.workingDays}</span>
                </div>
                <div className="onboarding-detail-item">
                  <span className="onboarding-detail-label">Grade Levels</span>
                  <span className="onboarding-detail-value">{details.gradeRange}</span>
                </div>
                <div className="onboarding-detail-item">
                  <span className="onboarding-detail-label">Grading System</span>
                  <span className="onboarding-detail-value">{details.gradingScale}</span>
                </div>
                <div className="onboarding-detail-item">
                  <span className="onboarding-detail-label">Student Capacity</span>
                  <span className="onboarding-detail-value font-bold">
                    {details.currentEnrollment} / {details.studentCapacity} Seats
                  </span>
                </div>
              </div>
            </Card>

            {/* 4. Leadership & Administration */}
            <Card className="onboarding-section-card">
              <div className="onboarding-card-header">
                <div className="onboarding-card-icon-wrap onboarding-card-icon-wrap--violet">
                  <Users size={20} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="onboarding-card-title">Administrative Leadership</h3>
                  <p className="onboarding-card-subtitle">Key school authorities and institutional liaisons</p>
                </div>
              </div>

              <div className="onboarding-detail-list">
                <div className="onboarding-detail-item">
                  <span className="onboarding-detail-label">Principal / Headmaster</span>
                  <div className="onboarding-detail-multiline">
                    <strong>{details.principalName}</strong>
                    <small className="text-muted">{details.principalEmail}</small>
                  </div>
                </div>
                <div className="onboarding-detail-item">
                  <span className="onboarding-detail-label">Vice Principal</span>
                  <span className="onboarding-detail-value">{details.vicePrincipalName}</span>
                </div>
                <div className="onboarding-detail-item">
                  <span className="onboarding-detail-label">System Administrator</span>
                  <div className="onboarding-detail-multiline">
                    <strong>{details.adminContactName}</strong>
                    <small className="text-muted">{details.adminContactRole}</small>
                  </div>
                </div>
                <div className="onboarding-detail-item">
                  <span className="onboarding-detail-label">Emergency SOS Line</span>
                  <span className="onboarding-detail-value font-bold text-error">
                    {details.emergencyHotline}
                  </span>
                </div>
              </div>
            </Card>

            {/* 5. Campus Infrastructure & Facilities (Full Width) */}
            <Card className="onboarding-section-card onboarding-section-card--full">
              <div className="onboarding-card-header">
                <div className="onboarding-card-icon-wrap onboarding-card-icon-wrap--rose">
                  <Building2 size={20} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="onboarding-card-title">Campus Facilities & Infrastructure</h3>
                  <p className="onboarding-card-subtitle">Active verified facilities and student resources available on campus</p>
                </div>
              </div>

              <div className="onboarding-facilities-grid">
                {details.facilities.map((facility) => (
                  <div key={facility} className="onboarding-facility-pill">
                    <CheckCircle2 size={16} className="text-success shrink-0" aria-hidden="true" />
                    <span>{facility}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* TAB 2: EDIT SCHOOL BASIC DETAILS FORM */}
        {activeTab === 'edit' && (
          <Card className="onboarding-edit-card">
            <form onSubmit={handleSave} className="onboarding-form" aria-label="Edit School Details Form">
              <div className="onboarding-form-section">
                <h3 className="onboarding-form-section__title">1. School Identity & Registration</h3>
                <div className="onboarding-form-row">
                  <div className="field-group">
                    <Label htmlFor="schoolName" required>School Name</Label>
                    <Input
                      id="schoolName"
                      value={formData.schoolName}
                      onChange={(e) => handleInputChange('schoolName', e.target.value)}
                      required
                    />
                  </div>
                  <div className="field-group">
                    <Label htmlFor="schoolCode" required>School Code / ID</Label>
                    <Input
                      id="schoolCode"
                      value={formData.schoolCode}
                      onChange={(e) => handleInputChange('schoolCode', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="onboarding-form-row">
                  <div className="field-group">
                    <Label htmlFor="affiliationBoard" required>Affiliation Board</Label>
                    <Input
                      id="affiliationBoard"
                      value={formData.affiliationBoard}
                      onChange={(e) => handleInputChange('affiliationBoard', e.target.value)}
                      required
                    />
                  </div>
                  <div className="field-group">
                    <Label htmlFor="affiliationNumber" required>Affiliation Number</Label>
                    <Input
                      id="affiliationNumber"
                      value={formData.affiliationNumber}
                      onChange={(e) => handleInputChange('affiliationNumber', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="onboarding-form-row">
                  <div className="field-group">
                    <Label htmlFor="motto">School Motto / Vision</Label>
                    <Input
                      id="motto"
                      value={formData.motto}
                      onChange={(e) => handleInputChange('motto', e.target.value)}
                    />
                  </div>
                  <div className="field-group">
                    <Label htmlFor="schoolType">School Type</Label>
                    <Input
                      id="schoolType"
                      value={formData.schoolType}
                      onChange={(e) => handleInputChange('schoolType', e.target.value)}
                    />
                  </div>
                </div>

                <div className="onboarding-form-row">
                  <div className="field-group">
                    <Label htmlFor="establishedYear">Established Year</Label>
                    <Input
                      id="establishedYear"
                      value={formData.establishedYear}
                      onChange={(e) => handleInputChange('establishedYear', e.target.value)}
                    />
                  </div>
                  <div className="field-group">
                    <Label htmlFor="accreditation">Accreditation</Label>
                    <Input
                      id="accreditation"
                      value={formData.accreditation}
                      onChange={(e) => handleInputChange('accreditation', e.target.value)}
                    />
                  </div>
                  <div className="field-group">
                    <Label htmlFor="campusSize">Campus Area / Size</Label>
                    <Input
                      id="campusSize"
                      value={formData.campusSize}
                      onChange={(e) => handleInputChange('campusSize', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="onboarding-form-section">
                <h3 className="onboarding-form-section__title">2. Campus Contact & Location</h3>
                <div className="onboarding-form-row">
                  <div className="field-group">
                    <Label htmlFor="officialEmail" required>Official Email</Label>
                    <Input
                      id="officialEmail"
                      type="email"
                      value={formData.officialEmail}
                      onChange={(e) => handleInputChange('officialEmail', e.target.value)}
                      required
                    />
                  </div>
                  <div className="field-group">
                    <Label htmlFor="supportEmail">Admissions Email</Label>
                    <Input
                      id="supportEmail"
                      type="email"
                      value={formData.supportEmail}
                      onChange={(e) => handleInputChange('supportEmail', e.target.value)}
                    />
                  </div>
                </div>

                <div className="onboarding-form-row">
                  <div className="field-group">
                    <Label htmlFor="primaryPhone" required>Primary Phone</Label>
                    <Input
                      id="primaryPhone"
                      value={formData.primaryPhone}
                      onChange={(e) => handleInputChange('primaryPhone', e.target.value)}
                      required
                    />
                  </div>
                  <div className="field-group">
                    <Label htmlFor="secondaryPhone">Secondary Phone</Label>
                    <Input
                      id="secondaryPhone"
                      value={formData.secondaryPhone}
                      onChange={(e) => handleInputChange('secondaryPhone', e.target.value)}
                    />
                  </div>
                  <div className="field-group">
                    <Label htmlFor="website">Official Website URL</Label>
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                    />
                  </div>
                </div>

                <div className="onboarding-form-row">
                  <div className="field-group onboarding-field-span2">
                    <Label htmlFor="streetAddress" required>Street Address</Label>
                    <Input
                      id="streetAddress"
                      value={formData.streetAddress}
                      onChange={(e) => handleInputChange('streetAddress', e.target.value)}
                      required
                    />
                  </div>
                  <div className="field-group">
                    <Label htmlFor="city" required>City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="onboarding-form-row">
                  <div className="field-group">
                    <Label htmlFor="state" required>State / Province</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      required
                    />
                  </div>
                  <div className="field-group">
                    <Label htmlFor="postalCode" required>Postal / PIN Code</Label>
                    <Input
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value)}
                      required
                    />
                  </div>
                  <div className="field-group">
                    <Label htmlFor="country" required>Country</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="onboarding-form-section">
                <h3 className="onboarding-form-section__title">3. Academic Setup & Hours</h3>
                <div className="onboarding-form-row">
                  <div className="field-group">
                    <Label htmlFor="academicYear" required>Academic Year</Label>
                    <Input
                      id="academicYear"
                      value={formData.academicYear}
                      onChange={(e) => handleInputChange('academicYear', e.target.value)}
                      required
                    />
                  </div>
                  <div className="field-group">
                    <Label htmlFor="academicSessionDates">Session Dates</Label>
                    <Input
                      id="academicSessionDates"
                      value={formData.academicSessionDates}
                      onChange={(e) => handleInputChange('academicSessionDates', e.target.value)}
                    />
                  </div>
                </div>

                <div className="onboarding-form-row">
                  <div className="field-group">
                    <Label htmlFor="schoolHours">Daily Bell Hours</Label>
                    <Input
                      id="schoolHours"
                      value={formData.schoolHours}
                      onChange={(e) => handleInputChange('schoolHours', e.target.value)}
                    />
                  </div>
                  <div className="field-group">
                    <Label htmlFor="workingDays">Working Days</Label>
                    <Input
                      id="workingDays"
                      value={formData.workingDays}
                      onChange={(e) => handleInputChange('workingDays', e.target.value)}
                    />
                  </div>
                  <div className="field-group">
                    <Label htmlFor="gradeRange">Grade Range</Label>
                    <Input
                      id="gradeRange"
                      value={formData.gradeRange}
                      onChange={(e) => handleInputChange('gradeRange', e.target.value)}
                    />
                  </div>
                </div>

                <div className="onboarding-form-row">
                  <div className="field-group">
                    <Label htmlFor="studentCapacity">Max Student Capacity</Label>
                    <Input
                      id="studentCapacity"
                      type="number"
                      value={formData.studentCapacity}
                      onChange={(e) => handleInputChange('studentCapacity', Number(e.target.value))}
                    />
                  </div>
                  <div className="field-group">
                    <Label htmlFor="currentEnrollment">Current Enrollment</Label>
                    <Input
                      id="currentEnrollment"
                      type="number"
                      value={formData.currentEnrollment}
                      onChange={(e) => handleInputChange('currentEnrollment', Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>

              <div className="onboarding-form-section">
                <h3 className="onboarding-form-section__title">4. Administration & Key Roles</h3>
                <div className="onboarding-form-row">
                  <div className="field-group">
                    <Label htmlFor="principalName" required>Principal / Headmaster Name</Label>
                    <Input
                      id="principalName"
                      value={formData.principalName}
                      onChange={(e) => handleInputChange('principalName', e.target.value)}
                      required
                    />
                  </div>
                  <div className="field-group">
                    <Label htmlFor="principalEmail">Principal Email</Label>
                    <Input
                      id="principalEmail"
                      type="email"
                      value={formData.principalEmail}
                      onChange={(e) => handleInputChange('principalEmail', e.target.value)}
                    />
                  </div>
                </div>

                <div className="onboarding-form-row">
                  <div className="field-group">
                    <Label htmlFor="vicePrincipalName">Vice Principal Name</Label>
                    <Input
                      id="vicePrincipalName"
                      value={formData.vicePrincipalName}
                      onChange={(e) => handleInputChange('vicePrincipalName', e.target.value)}
                    />
                  </div>
                  <div className="field-group">
                    <Label htmlFor="adminContactName">System Admin Name</Label>
                    <Input
                      id="adminContactName"
                      value={formData.adminContactName}
                      onChange={(e) => handleInputChange('adminContactName', e.target.value)}
                    />
                  </div>
                  <div className="field-group">
                    <Label htmlFor="emergencyHotline">Emergency Hotline</Label>
                    <Input
                      id="emergencyHotline"
                      value={formData.emergencyHotline}
                      onChange={(e) => handleInputChange('emergencyHotline', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="onboarding-form-section">
                <h3 className="onboarding-form-section__title">5. Campus Amenities & Facilities</h3>
                <p className="onboarding-form-section__desc">Select active facilities enabled for your school campus:</p>
                <div className="onboarding-checkbox-grid">
                  {defaultSchoolDetails.facilities.map((fac) => {
                    const isChecked = formData.facilities.includes(fac)
                    return (
                      <label key={fac} className={`onboarding-checkbox-label ${isChecked ? 'onboarding-checkbox-label--selected' : ''}`}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleFacilityToggle(fac)}
                          className="mr-2"
                        />
                        <span>{fac}</span>
                      </label>
                    )
                  })}
                </div>
              </div>

              <div className="onboarding-form-actions">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setActiveTab('overview')}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  <Save size={16} aria-hidden="true" />
                  <span>Save School Details</span>
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* TAB 3: ONBOARDING CHECKLIST */}
        {activeTab === 'checklist' && (
          <div className="onboarding-checklist-container">
            <Card className="onboarding-checklist-card">
              <div className="onboarding-card-header">
                <div className="onboarding-card-icon-wrap onboarding-card-icon-wrap--primary">
                  <CheckCircle2 size={20} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="onboarding-card-title">SchoolHub Onboarding Roadmap</h3>
                  <p className="onboarding-card-subtitle">
                    Step-by-step progress checklist for configuring your educational institution
                  </p>
                </div>
              </div>

              <div className="onboarding-step-list">
                {steps.map((step) => {
                  const isCompleted = step.status === 'completed'
                  const isInProgress = step.status === 'in-progress'

                  return (
                    <div
                      key={step.id}
                      className={`onboarding-step-item ${
                        isCompleted
                          ? 'onboarding-step-item--completed'
                          : isInProgress
                          ? 'onboarding-step-item--in-progress'
                          : ''
                      }`}
                    >
                      <div className="onboarding-step-number" aria-hidden="true">
                        {isCompleted ? <CheckCircle2 size={20} /> : step.stepNumber}
                      </div>

                      <div className="onboarding-step-content">
                        <div className="onboarding-step-header">
                          <h4 className="onboarding-step-title">{step.title}</h4>
                          <span
                            className={`badge ${
                              isCompleted
                                ? 'badge--success'
                                : isInProgress
                                ? 'badge--warning'
                                : 'badge--neutral'
                            }`}
                          >
                            {isCompleted ? 'Completed' : isInProgress ? 'In Progress' : 'Pending'}
                          </span>
                        </div>
                        <p className="onboarding-step-desc">{step.description}</p>
                      </div>

                      <div className="onboarding-step-action">
                        {step.link ? (
                          <Link to={step.link} className="button button--secondary button--sm">
                            <span>{step.actionLabel || 'Configure'}</span>
                            <ArrowRight size={14} aria-hidden="true" />
                          </Link>
                        ) : (
                          <Button
                            variant="secondary"
                            className="button--sm"
                            onClick={() => setActiveTab('overview')}
                          >
                            <span>{step.actionLabel || 'View'}</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>
          </div>
        )}
      </PageContainer>
    </DashboardLayout>
  )
}
