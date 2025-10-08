import { useState } from 'react'
import MultiStepForm from './components/forms/MultiStepForm'
import PersonalInfoStep from './components/steps/PersonalInfoStep'
import AddressStep from './components/steps/AddressStep'
import PreferencesStep from './components/steps/PreferencesStep'
import ReviewStep from './components/steps/ReviewStep'
import FormsList from './components/ui/FormsList'
import FormViewer from './components/ui/FormViewer'
import CSVUploader from './components/ui/CSVUploader'
import Button from './components/ui/Button'
import './App.css'

function App() {
  const [submittedForms, setSubmittedForms] = useState([])
  const [selectedForm, setSelectedForm] = useState(null)
  const [showFormCreator, setShowFormCreator] = useState(true)
  const [showCSVUploader, setShowCSVUploader] = useState(false)

  const steps = [
    {
      title: 'Personal Info',
      component: PersonalInfoStep
    },
    {
      title: 'Address',
      component: AddressStep
    },
    {
      title: 'Preferences',
      component: PreferencesStep
    },
    {
      title: 'Review',
      component: ReviewStep
    }
  ]

  const validation = {
    0: { // Personal Info step
      firstName: { required: true, message: 'First name is required' },
      lastName: { required: true, message: 'Last name is required' },
      email: { 
        required: true, 
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email address'
      }
    },
    1: { // Address step
      street: { required: true, message: 'Street address is required' },
      city: { required: true, message: 'City is required' },
      state: { required: true, message: 'State is required' },
      zipCode: { required: true, message: 'ZIP code is required' },
      country: { required: true, message: 'Country is required' }
    }
  }

  const handleBulkUpload = (bulkData) => {
    const timestamp = Date.now()
    const newForms = bulkData.map((formData, index) => ({
      id: `${timestamp}-${index}`,
      data: formData,
      status: 'pending',
      submittedAt: timestamp + index // Slight offset for each form
    }))
    
    setSubmittedForms(prev => [...newForms, ...prev])
    setShowCSVUploader(false)
    setShowFormCreator(false)
    
    if (newForms.length > 0) {
      setSelectedForm(newForms[0])
    }
    
    console.log('Bulk forms uploaded:', newForms.length)
    alert(`${newForms.length} forms uploaded successfully!`)
  }

  const handleSubmit = (formData) => {
    const newForm = {
      id: Date.now().toString(),
      data: formData,
      status: 'pending',
      submittedAt: Date.now()
    }
    
    setSubmittedForms(prev => [newForm, ...prev])
    setSelectedForm(newForm)
    setShowFormCreator(false)
    
    console.log('Form submitted:', formData)
    alert('Form submitted successfully! You can now view it in the sidebar.')
  }

  const handleStepChange = (step, formData) => {
    console.log(`Step changed to: ${step}`, formData)
  }

  const handleApprove = (formId) => {
    setSubmittedForms(prev => 
      prev.map(form => 
        form.id === formId 
          ? { ...form, status: 'approved', approvedAt: Date.now() }
          : form
      )
    )
    
    // Update selected form if it's the one being approved
    if (selectedForm && selectedForm.id === formId) {
      setSelectedForm(prev => ({ ...prev, status: 'approved', approvedAt: Date.now() }))
    }
    
    console.log('Form approved:', formId)
  }

  const handleMassApprove = (formIds) => {
    const approvalTime = Date.now()
    setSubmittedForms(prev => 
      prev.map(form => 
        formIds.includes(form.id)
          ? { ...form, status: 'approved', approvedAt: approvalTime }
          : form
      )
    )
    
    // Update selected form if it's one of the approved forms
    if (selectedForm && formIds.includes(selectedForm.id)) {
      setSelectedForm(prev => ({ ...prev, status: 'approved', approvedAt: approvalTime }))
    }
    
    console.log('Forms mass approved:', formIds)
    alert(`${formIds.length} forms approved successfully!`)
  }

  const handleSelectForm = (form) => {
    setSelectedForm(form)
    setShowFormCreator(false)
  }

  const handleNewForm = () => {
    setShowFormCreator(true)
    setSelectedForm(null)
  }

  return (
    <div className="app">
      <div className="app__layout">
        
        <div className="app__main">
          {showFormCreator ? (
            <div className="app__form-creator">
              <div className="app__header">
                <h1>Multi-Step Form Example</h1>
                <p>A simple, reusable multi-step form built with React and Vite</p>
                <div className="app__header-actions">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowCSVUploader(true)}
                    className="app__bulk-upload-btn"
                  >
                    📤 Bulk Upload CSV
                  </Button>
                </div>
              </div>
              
              <MultiStepForm
                steps={steps}
                onSubmit={handleSubmit}
                onStepChange={handleStepChange}
                validation={validation}
                initialData={{
                  firstName: '',
                  lastName: '',
                  email: '',
                  phone: '',
                  street: '',
                  city: '',
                  state: '',
                  zipCode: '',
                  country: '',
                  company: '',
                  jobTitle: '',
                  interests: [],
                  newsletter: false
                }}
              />
            </div>
          ) : (
            <div className="app__viewer">
              <div className="app__viewer-header">
                <div className="app__viewer-actions">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowCSVUploader(true)}
                  >
                    📤 Bulk Upload
                  </Button>
                  <Button onClick={handleNewForm} variant="outline">
                    + Create New Form
                  </Button>
                </div>
              </div>
              <FormViewer form={selectedForm} />
            </div>
          )}
        </div>

        <FormsList
          forms={submittedForms}
          onApprove={handleApprove}
          onMassApprove={handleMassApprove}
          onSelectForm={handleSelectForm}
          selectedFormId={selectedForm?.id}
        />
      </div>
      
      {showCSVUploader && (
        <CSVUploader
          onUpload={handleBulkUpload}
          onClose={() => setShowCSVUploader(false)}
        />
      )}
    </div>
  )
}

export default App
