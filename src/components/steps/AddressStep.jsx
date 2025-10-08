import FormStep from '../forms/FormStep'
import FormInput from '../ui/FormInput'

const AddressStep = ({ formData, updateFormData, errors }) => {
  return (
    <FormStep 
      title="Address Information"
      description="Please provide your current address details"
    >
      <FormInput
        label="Street Address"
        name="street"
        value={formData.street || ''}
        onChange={(e) => updateFormData('street', e.target.value)}
        placeholder="Enter your street address"
        required
        error={errors.street}
      />
      
      <div style={{ display: 'flex', gap: '15px' }}>
        <FormInput
          label="City"
          name="city"
          value={formData.city || ''}
          onChange={(e) => updateFormData('city', e.target.value)}
          placeholder="Enter your city"
          required
          error={errors.city}
        />
        
        <FormInput
          label="State"
          name="state"
          value={formData.state || ''}
          onChange={(e) => updateFormData('state', e.target.value)}
          placeholder="Enter your state"
          required
          error={errors.state}
        />
      </div>
      
      <div style={{ display: 'flex', gap: '15px' }}>
        <FormInput
          label="ZIP Code"
          name="zipCode"
          value={formData.zipCode || ''}
          onChange={(e) => updateFormData('zipCode', e.target.value)}
          placeholder="Enter your ZIP code"
          required
          error={errors.zipCode}
        />
        
        <FormInput
          label="Country"
          name="country"
          value={formData.country || ''}
          onChange={(e) => updateFormData('country', e.target.value)}
          placeholder="Enter your country"
          required
          error={errors.country}
        />
      </div>
    </FormStep>
  )
}

export default AddressStep