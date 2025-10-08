import { useState } from 'react'
import StepIndicator from '../ui/StepIndicator'
import Button from '../ui/Button'
import './MultiStepForm.css'

const MultiStepForm = ({ 
  steps, 
  onSubmit, 
  onStepChange,
  initialData = {},
  validation = {}
}) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState(initialData)
  const [errors, setErrors] = useState({})

  const stepTitles = steps.map(step => step.title)
  const totalSteps = steps.length

  const validateStep = (stepIndex, data) => {
    if (!validation[stepIndex]) return true
    
    const stepErrors = {}
    const validationRules = validation[stepIndex]
    
    Object.keys(validationRules).forEach(field => {
      const rule = validationRules[field]
      const value = data[field]
      
      if (rule.required && (!value || value.trim() === '')) {
        stepErrors[field] = rule.message || `${field} is required`
      } else if (rule.pattern && value && !rule.pattern.test(value)) {
        stepErrors[field] = rule.message || `${field} is invalid`
      }
    })
    
    setErrors(stepErrors)
    return Object.keys(stepErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep, formData)) {
      const nextStep = currentStep + 1
      setCurrentStep(nextStep)
      onStepChange?.(nextStep, formData)
    }
  }

  const handlePrevious = () => {
    const prevStep = currentStep - 1
    setCurrentStep(prevStep)
    onStepChange?.(prevStep, formData)
  }

  const handleSubmit = () => {
    if (validateStep(currentStep, formData)) {
      onSubmit(formData)
    }
  }

  const updateFormData = (field, value) => {
    const newData = { ...formData, [field]: value }
    setFormData(newData)
    
    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const isLastStep = currentStep === totalSteps - 1
  const isFirstStep = currentStep === 0

  return (
    <div className="multi-step-form">
      <StepIndicator 
        currentStep={currentStep}
        totalSteps={totalSteps}
        steps={stepTitles}
      />
      
      <div className="multi-step-form__content">
        {steps[currentStep].component({ 
          formData, 
          updateFormData, 
          errors 
        })}
      </div>

      <div className="multi-step-form__actions">
        {!isFirstStep && (
          <Button 
            variant="outline" 
            onClick={handlePrevious}
          >
            Previous
          </Button>
        )}
        
        <div className="multi-step-form__actions-right">
          {isLastStep ? (
            <Button onClick={handleSubmit}>
              Submit
            </Button>
          ) : (
            <Button onClick={handleNext}>
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default MultiStepForm