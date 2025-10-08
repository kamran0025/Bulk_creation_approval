import './StepIndicator.css'

const StepIndicator = ({ currentStep, totalSteps, steps }) => {
  return (
    <div className="step-indicator">
      {steps.map((step, index) => (
        <div key={index} className="step-indicator__item">
          <div className={`step-indicator__circle ${
            index < currentStep ? 'step-indicator__circle--completed' : 
            index === currentStep ? 'step-indicator__circle--active' : 
            'step-indicator__circle--pending'
          }`}>
            {index < currentStep ? '✓' : index + 1}
          </div>
          <span className="step-indicator__label">{step}</span>
          {index < totalSteps - 1 && (
            <div className={`step-indicator__line ${
              index < currentStep ? 'step-indicator__line--completed' : ''
            }`} />
          )}
        </div>
      ))}
    </div>
  )
}

export default StepIndicator