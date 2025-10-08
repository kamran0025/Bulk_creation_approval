import FormStep from '../forms/FormStep'
import FormInput from '../ui/FormInput'

const PersonalInfoStep = ({ formData, updateFormData, errors }) => {
  return (
    <FormStep 
      title="Personal Information"
      description="Please provide your basic personal details"
    >
      <FormInput
        label="First Name"
        name="firstName"
        value={formData.firstName || ''}
        onChange={(e) => updateFormData('firstName', e.target.value)}
        placeholder="Enter your first name"
        required
        error={errors.firstName}
      />
      
      <FormInput
        label="Last Name"
        name="lastName"
        value={formData.lastName || ''}
        onChange={(e) => updateFormData('lastName', e.target.value)}
        placeholder="Enter your last name"
        required
        error={errors.lastName}
      />
      
      <FormInput
        label="Email Address"
        name="email"
        type="email"
        value={formData.email || ''}
        onChange={(e) => updateFormData('email', e.target.value)}
        placeholder="Enter your email address"
        required
        error={errors.email}
      />
      
      <FormInput
        label="Phone Number"
        name="phone"
        type="tel"
        value={formData.phone || ''}
        onChange={(e) => updateFormData('phone', e.target.value)}
        placeholder="Enter your phone number"
        error={errors.phone}
      />
    </FormStep>
  )
}

export default PersonalInfoStep