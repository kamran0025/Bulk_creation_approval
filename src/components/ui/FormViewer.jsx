import './FormViewer.css'

const FormViewer = ({ form }) => {
  if (!form) {
    return (
      <div className="form-viewer">
        <div className="form-viewer__empty">
          <h3>No form selected</h3>
          <p>Select a form from the sidebar to view its details</p>
        </div>
      </div>
    )
  }

  const formatSubmissionTime = (timestamp) => {
    return new Date(timestamp).toLocaleString()
  }

  return (
    <div className="form-viewer">
      <div className="form-viewer__header">
        <div className="form-viewer__title">
          <h2>{form.data.firstName} {form.data.lastName}</h2>
          <span className={`form-viewer__status form-viewer__status--${form.status}`}>
            {form.status === 'approved' ? '✓ Approved' : 'Pending Approval'}
          </span>
        </div>
        <div className="form-viewer__meta">
          <span>Submitted: {formatSubmissionTime(form.submittedAt)}</span>
          {form.approvedAt && (
            <span>Approved: {formatSubmissionTime(form.approvedAt)}</span>
          )}
        </div>
      </div>

      <div className="form-viewer__content">
        <div className="form-viewer__section">
          <h3>Personal Information</h3>
          <div className="form-viewer__grid">
            <div className="form-viewer__field">
              <label>First Name</label>
              <span>{form.data.firstName}</span>
            </div>
            <div className="form-viewer__field">
              <label>Last Name</label>
              <span>{form.data.lastName}</span>
            </div>
            <div className="form-viewer__field">
              <label>Email</label>
              <span>{form.data.email}</span>
            </div>
            <div className="form-viewer__field">
              <label>Phone</label>
              <span>{form.data.phone || 'Not provided'}</span>
            </div>
          </div>
        </div>

        <div className="form-viewer__section">
          <h3>Address</h3>
          <div className="form-viewer__grid">
            <div className="form-viewer__field form-viewer__field--full">
              <label>Street Address</label>
              <span>{form.data.street}</span>
            </div>
            <div className="form-viewer__field">
              <label>City</label>
              <span>{form.data.city}</span>
            </div>
            <div className="form-viewer__field">
              <label>State</label>
              <span>{form.data.state}</span>
            </div>
            <div className="form-viewer__field">
              <label>ZIP Code</label>
              <span>{form.data.zipCode}</span>
            </div>
            <div className="form-viewer__field">
              <label>Country</label>
              <span>{form.data.country}</span>
            </div>
          </div>
        </div>

        <div className="form-viewer__section">
          <h3>Preferences</h3>
          <div className="form-viewer__grid">
            <div className="form-viewer__field">
              <label>Company</label>
              <span>{form.data.company || 'Not provided'}</span>
            </div>
            <div className="form-viewer__field">
              <label>Job Title</label>
              <span>{form.data.jobTitle || 'Not provided'}</span>
            </div>
            <div className="form-viewer__field form-viewer__field--full">
              <label>Interests</label>
              <span>
                {form.data.interests && form.data.interests.length > 0 
                  ? form.data.interests.join(', ') 
                  : 'None selected'
                }
              </span>
            </div>
            <div className="form-viewer__field">
              <label>Newsletter</label>
              <span>{form.data.newsletter ? 'Subscribed' : 'Not subscribed'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormViewer