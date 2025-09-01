let formIsValid = true;

function validateSection(index) {
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('keypress', function(e) {
          if (!/[0-9.\-]/.test(e.key)) {
            e.preventDefault();
          }
        });
      });
      
    const section = document.querySelectorAll('.form-section')[index];
    if (!section) return true;
  
    const inputs = section.querySelectorAll('input, select, textarea');
    formIsValid = true; // Reset for current validation
    let firstInvalid = null;
  
    inputs.forEach(input => {
        resetValidationStyles(input);
        if (input.disabled) return;
  
        const value = input.value.trim();
        const isRequired = input.hasAttribute('required');
        const isEmpty = !value;
  
        // Skip validation if field is not required and empty
        if (!isRequired && isEmpty) return;
  
        // Required field validation
        if (isRequired && isEmpty) {
            showError(input, 'This field is required');
            if (!firstInvalid) firstInvalid = input;
            formIsValid = false;
            return;
        }
  
        // Type-specific validation
        const inputType = input.type || input.getAttribute('type');
        
        switch(inputType) {
            case 'number':
              if (value === '') break;

              if (!/^-?\d+(\.\d+)?$/.test(value)) {
                    field.style.borderColor = '#e74c3c';
                    if (!firstInvalidField) firstInvalidField = field;
                    alert('🔢 Please enter a valid numeric value (integer or decimal).');
                        isValid = false;
  }
  break;
            case 'email':
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    showError(input, 'Please enter a valid email');
                    if (!firstInvalid) firstInvalid = input;
                    formIsValid = false;
                }
                break;
            case 'url':
                try {
                    new URL(value);
                } catch {
                    showError(input, 'Please enter a valid URL');
                    if (!firstInvalid) firstInvalid = input;
                    formIsValid = false;
                }
                break;
                case 'tel':
            case 'phone':
              if (!/^\+?[0-9]{7,15}$/.test(value)) {
                field.style.borderColor = '#e74c3c';
                if (!firstInvalidField) firstInvalidField = field;
                alert('📞 Invalid phone number.');
                isValid = false;
              }
              break;
            case 'date':
                if (isNaN(Date.parse(value))) {
                  field.style.borderColor = '#e74c3c';
                  if (!firstInvalidField) firstInvalidField = field;
                  alert('📅 Invalid date format.');
                  isValid = false;
                }
                break;
        }
    });
  
    if (!formIsValid && firstInvalid) {
        firstInvalid.focus();
        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return false;
    }
  
    return formIsValid;
}

function validateNumberField(input, value) {
    // Check for invalid number input
    if (isNaN(input.valueAsNumber) || input.validity?.badInput) {
        showError(input, 'Please enter a valid number');
        return false;
    }
    return true;
}

function showError(field, message) {
    field.style.borderColor = '#ff0000';
    field.style.boxShadow = '0 0 0 2px rgba(255, 0, 0, 0.2)';
    
    // Remove existing error if present
    const existingError = field.nextElementSibling;
    if (existingError && existingError.classList.contains('error-message')) {
        existingError.remove();
    }
    
    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = '#ff0000';
    errorElement.style.fontSize = '0.8em';
    errorElement.style.marginTop = '5px';
    
    field.insertAdjacentElement('afterend', errorElement);
    
    // Show alert for immediate feedback
    alert(message);
}

function resetValidationStyles(input) {
    input.style.borderColor = '';
    input.style.boxShadow = '';
    const errorMsg = input.nextElementSibling;
    if (errorMsg && errorMsg.classList.contains('error-message')) {
        errorMsg.remove();
    }
}