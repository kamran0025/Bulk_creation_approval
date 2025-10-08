import './FormStep.css'

const FormStep = ({ children, title, description }) => {
  return (
    <div className="form-step">
      {title && <h2 className="form-step__title">{title}</h2>}
      {description && <p className="form-step__description">{description}</p>}
      <div className="form-step__content">
        {children}
      </div>
    </div>
  )
}

export default FormStep