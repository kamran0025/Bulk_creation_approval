import './FormInput.css'

const FormInput = ({ 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  placeholder = '', 
  required = false,
  error = '',
  className = ''
}) => {
  return (
    <div className={`form-input ${className}`}>
      {label && (
        <label htmlFor={name} className="form-input__label">
          {label}
          {required && <span className="form-input__required">*</span>}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`form-input__field ${error ? 'form-input__field--error' : ''}`}
      />
      {error && <span className="form-input__error">{error}</span>}
    </div>
  )
}

export default FormInput