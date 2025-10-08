import FormStep from '../forms/FormStep'

const ReviewStep = ({ formData }) => {
  return (
    <FormStep 
      title="Review Your Information"
      description="Please review all the information before submitting"
    >
      <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '6px', marginBottom: '20px' }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#333', fontSize: '16px' }}>Personal Information</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', fontSize: '14px', color: '#333' }}>
          <div><strong>Name:</strong> {formData.firstName} {formData.lastName}</div>
          <div><strong>Email:</strong> {formData.email}</div>
          <div><strong>Phone:</strong> {formData.phone}</div>
        </div>
      </div>

      <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '6px', marginBottom: '20px' }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#333', fontSize: '16px' }}>Address</h3>
        <div style={{ fontSize: '14px', color: '#333' }}>
          <div style={{ marginBottom: '5px' }}>{formData.street}</div>
          <div>{formData.city}, {formData.state} {formData.zipCode}</div>
          <div>{formData.country}</div>
        </div>
      </div>

      <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '6px' }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#333', fontSize: '16px' }}>Preferences</h3>
        <div style={{ fontSize: '14px', color: '#333' }}>
          {formData.company && <div style={{ marginBottom: '5px' }}><strong>Company:</strong> {formData.company}</div>}
          {formData.jobTitle && <div style={{ marginBottom: '5px' }}><strong>Job Title:</strong> {formData.jobTitle}</div>}
          {formData.interests && formData.interests.length > 0 && (
            <div style={{ marginBottom: '5px' }}>
              <strong>Interests:</strong> {formData.interests.join(', ')}
            </div>
          )}
          <div>
            <strong>Newsletter:</strong> {formData.newsletter ? 'Subscribed' : 'Not subscribed'}
          </div>
        </div>
      </div>
    </FormStep>
  )
}

export default ReviewStep