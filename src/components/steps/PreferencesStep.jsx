import FormStep from '../forms/FormStep'
import FormInput from '../ui/FormInput'

const PreferencesStep = ({ formData, updateFormData, errors }) => {
  return (
    <FormStep 
      title="Preferences"
      description="Tell us about your preferences and interests"
    >
      <FormInput
        label="Company Name"
        name="company"
        value={formData.company || ''}
        onChange={(e) => updateFormData('company', e.target.value)}
        placeholder="Enter your company name"
        error={errors.company}
      />
      
      <FormInput
        label="Job Title"
        name="jobTitle"
        value={formData.jobTitle || ''}
        onChange={(e) => updateFormData('jobTitle', e.target.value)}
        placeholder="Enter your job title"
        error={errors.jobTitle}
      />
      
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: '#333', fontSize: '14px' }}>
          Interests
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {['Technology', 'Marketing', 'Design', 'Business', 'Education', 'Health'].map(interest => (
            <label key={interest} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={(formData.interests || []).includes(interest)}
                onChange={(e) => {
                  const interests = formData.interests || []
                  if (e.target.checked) {
                    updateFormData('interests', [...interests, interest])
                  } else {
                    updateFormData('interests', interests.filter(i => i !== interest))
                  }
                }}
                style={{ marginRight: '6px' }}
              />
              <span style={{ fontSize: '14px', color: '#333' }}>{interest}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: '#333', fontSize: '14px' }}>
          Newsletter Subscription
        </label>
        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={formData.newsletter || false}
            onChange={(e) => updateFormData('newsletter', e.target.checked)}
            style={{ marginRight: '8px' }}
          />
          <span style={{ fontSize: '14px', color: '#333' }}>Subscribe to our newsletter for updates</span>
        </label>
      </div>
    </FormStep>
  )
}

export default PreferencesStep