import './FormsList.css'
import Button from './Button'

const FormsList = ({ 
  forms, 
  onApprove, 
  onMassApprove, 
  onSelectForm,
  selectedFormId 
}) => {
  const pendingForms = forms.filter(form => form.status === 'pending')
  const approvedForms = forms.filter(form => form.status === 'approved')

  const handleSelectAll = () => {
    const allPendingIds = pendingForms.map(form => form.id)
    onMassApprove(allPendingIds)
  }

  const formatFormTitle = (form) => {
    return `${form.data.firstName} ${form.data.lastName}`
  }

  const formatSubmissionTime = (timestamp) => {
    return new Date(timestamp).toLocaleString()
  }

  return (
    <div className="forms-list">
      <div className="forms-list__header">
        <h3 className="forms-list__title">Submitted Forms</h3>
        {pendingForms.length > 0 && (
          <Button 
            variant="primary" 
            onClick={handleSelectAll}
            className="forms-list__approve-all"
          >
            Approve All ({pendingForms.length})
          </Button>
        )}
      </div>

      <div className="forms-list__content">
        {pendingForms.length > 0 && (
          <div className="forms-list__section">
            <h4 className="forms-list__section-title">Pending Approval ({pendingForms.length})</h4>
            {pendingForms.map(form => (
              <div 
                key={form.id} 
                className={`forms-list__item ${selectedFormId === form.id ? 'forms-list__item--selected' : ''}`}
                onClick={() => onSelectForm?.(form)}
              >
                <div className="forms-list__item-header">
                  <span className="forms-list__item-name">
                    {formatFormTitle(form)}
                  </span>
                  <span className="forms-list__item-status forms-list__item-status--pending">
                    Pending
                  </span>
                </div>
                <div className="forms-list__item-details">
                  <div className="forms-list__item-email">{form.data.email}</div>
                  <div className="forms-list__item-time">{formatSubmissionTime(form.submittedAt)}</div>
                </div>
                <div className="forms-list__item-actions">
                  <Button 
                    variant="primary" 
                    onClick={(e) => {
                      e.stopPropagation()
                      onApprove(form.id)
                    }}
                    className="forms-list__approve-btn"
                  >
                    Approve
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {approvedForms.length > 0 && (
          <div className="forms-list__section">
            <h4 className="forms-list__section-title">Approved ({approvedForms.length})</h4>
            {approvedForms.map(form => (
              <div 
                key={form.id} 
                className={`forms-list__item ${selectedFormId === form.id ? 'forms-list__item--selected' : ''}`}
                onClick={() => onSelectForm?.(form)}
              >
                <div className="forms-list__item-header">
                  <span className="forms-list__item-name">
                    {formatFormTitle(form)}
                  </span>
                  <span className="forms-list__item-status forms-list__item-status--approved">
                    ✓ Approved
                  </span>
                </div>
                <div className="forms-list__item-details">
                  <div className="forms-list__item-email">{form.data.email}</div>
                  <div className="forms-list__item-time">{formatSubmissionTime(form.submittedAt)}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {forms.length === 0 && (
          <div className="forms-list__empty">
            <p>No forms submitted yet</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default FormsList