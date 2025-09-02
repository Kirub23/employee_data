document.addEventListener('DOMContentLoaded', function() {
  // Form navigation and validation
  const sections = document.querySelectorAll('.form-section');
  const prevBtns = document.querySelectorAll('.prev-btn');
  const nextBtns = document.querySelectorAll('.next-btn');
  let currentSection = 0;

  // Initialize form
  showSection(currentSection);
  updateProgress();
  setupCharacterCounters();
  setupPhoneValidation();

  // Next button click handler
  nextBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      if (validateSection(currentSection)) {
        currentSection++;
        showSection(currentSection);
        updateProgress();
      }
    });
  });

  // Previous button click handler
  prevBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      currentSection--;
      showSection(currentSection);
      updateProgress();
    });
  });

  // Show specific section
  function showSection(index) {
    sections.forEach((section, i) => {
      section.classList.toggle('active', i === index);
    });
    
    // Scroll to top of section
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // Validate current section before proceeding
  function validateSection(index) {
    const currentSection = sections[index];
    const requiredFields = currentSection.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        field.style.borderColor = '#e74c3c';
        isValid = false;
        
        // Create error message if it doesn't exist
        if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
          const errorMsg = document.createElement('div');
          errorMsg.className = 'error-message';
          errorMsg.textContent = 'This field is required';
          field.parentNode.insertBefore(errorMsg, field.nextSibling);
        }
        
        // Scroll to first invalid field
        if (isValid === false) {
          field.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      } else {
        field.style.borderColor = '#ddd';
        // Remove error message if it exists
        if (field.nextElementSibling && field.nextElementSibling.classList.contains('error-message')) {
          field.nextElementSibling.remove();
        }
      }
    });

    // Special validation for phone numbers
    if (index === 0) {
      const phoneInput = document.querySelector('input[name="entry.297979220"]');
      if (phoneInput && phoneInput.value && !validatePhoneNumber(phoneInput.value)) {
        phoneInput.style.borderColor = '#e74c3c';
        isValid = false;
        
        if (!phoneInput.nextElementSibling || !phoneInput.nextElementSibling.classList.contains('error-message')) {
          const errorMsg = document.createElement('div');
          errorMsg.className = 'error-message';
          errorMsg.textContent = 'Please enter a valid Ethiopian phone number (+2519... or 09...)';
          phoneInput.parentNode.insertBefore(errorMsg, phoneInput.nextSibling);
        }
      }
    }

    if (!isValid) {
      alert('Please fill in all required fields correctly before continuing.');
    }

    return isValid;
  }

  // Update progress indicator
  function updateProgress() {
    const progressSteps = document.querySelectorAll('.progress-step');
    const progressBar = document.querySelector('.progress');
    
    // Update active class on steps
    progressSteps.forEach((step, index) => {
      step.classList.toggle('active', index <= currentSection);
    });
    
    // Update progress bar width
    const progressPercent = (currentSection / (sections.length - 1)) * 100;
    progressBar.style.width = `${progressPercent}%`;
  }

  // Phone number validation
  function validatePhoneNumber(phone) {
    const ethiopianRegex = /^(\+251|0)(9[0-9]{8})$/;
    return ethiopianRegex.test(phone.replace(/\s/g, ''));
  }

  function setupPhoneValidation() {
    const phoneInput = document.querySelector('input[name="entry.297979220"]');
    if (phoneInput) {
      phoneInput.addEventListener('blur', function() {
        if (this.value && !validatePhoneNumber(this.value)) {
          this.style.borderColor = '#e74c3c';
          if (!this.nextElementSibling || !this.nextElementSibling.classList.contains('error-message')) {
            const errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            errorMsg.textContent = 'Please enter a valid Ethiopian phone number (+2519... or 09...)';
            this.parentNode.insertBefore(errorMsg, this.nextSibling);
          }
        } else {
          this.style.borderColor = '#ddd';
          if (this.nextElementSibling && this.nextElementSibling.classList.contains('error-message')) {
            this.nextElementSibling.remove();
          }
        }
      });
    }
  }

  // Character counter implementation
  function setupCharacterCounters() {
    const textareas = document.querySelectorAll('textarea[maxlength]');
    textareas.forEach(textarea => {
      const maxLength = parseInt(textarea.getAttribute('maxlength')) || 500;
      const counter = document.createElement('div');
      counter.className = 'char-counter';
      counter.style.fontSize = '0.8em';
      counter.style.color = '#666';
      counter.style.textAlign = 'right';
      counter.style.marginTop = '-15px';
      counter.style.marginBottom = '10px';
      textarea.parentNode.insertBefore(counter, textarea.nextSibling);
      
      textarea.addEventListener('input', function() {
        const remaining = maxLength - this.value.length;
        counter.textContent = `${remaining} characters remaining`;
        
        if (remaining < 50) {
          counter.className = 'char-counter warning';
        } else if (remaining < 0) {
          counter.className = 'char-counter limit-reached';
          this.value = this.value.substring(0, maxLength);
        } else {
          counter.className = 'char-counter';
        }
      });
      
      // Initial update
      textarea.dispatchEvent(new Event('input'));
    });
  }

  // Enhanced form submission validation
  const form = document.querySelector('form');
  form.addEventListener('submit', function(e) {
    // Validate all sections before submission
    for (let i = 0; i < sections.length; i++) {
      if (!validateSection(i)) {
        e.preventDefault();
        // Show the first section with errors
        showSection(i);
        updateProgress();
        alert('Please fix all errors before submitting the form.');
        return false;
      }
    }
    
    // Final phone validation
    const phoneInput = document.querySelector('input[name="entry.297979220"]');
    if (phoneInput && !validatePhoneNumber(phoneInput.value)) {
      e.preventDefault();
      showSection(0);
      updateProgress();
      alert('Please enter a valid Ethiopian phone number.');
      return false;
    }
    
    submitted = true;
    return true;
  });
});

// Education, Experience, and Training dynamic fields
document.addEventListener('DOMContentLoaded', function() {
  // Education
  const maxEducations = 8;
  let currentEducationCount = 1;
  
  document.getElementById('addEducation').addEventListener('click', function() {
    if (currentEducationCount >= maxEducations) {
      alert('Maximum of 8 education entries allowed');
      return;
    }
    
    const container = document.getElementById('educationContainer');
    const nextEducationNum = currentEducationCount + 1;
    const template = container.querySelector(`.education-entry[data-entry-set="${nextEducationNum}"]`);
    
    if (template) {
      template.style.display = 'block';
      currentEducationCount++;
    } else {
      alert('No more education slots available');
    }
  });

  // Experience
  const maxExperiences = 9;
  let currentExperienceCount = 1;
  
  document.getElementById('addExperience').addEventListener('click', function() {
    if (currentExperienceCount >= maxExperiences) {
      alert('Maximum of 9 experiences allowed');
      return;
    }
    
    const container = document.getElementById('experienceContainer');
    const nextExperienceNum = currentExperienceCount + 1;
    const template = container.querySelector(`.experience-entry[data-entry-set="${nextExperienceNum}"]`);
    
    if (template) {
      template.style.display = 'block';
      currentExperienceCount++;
    } else {
      alert('No more experience slots available');
    }
  });

  // Training
  const maxTrainings = 6;
  let currentTrainingCount = 1;
  
  document.getElementById('addTraining').addEventListener('click', function() {
    if (currentTrainingCount >= maxTrainings) {
      alert('Maximum of 6 training entries allowed');
      return;
    }
    
    const container = document.getElementById('trainingContainer');
    const nextTrainingNum = currentTrainingCount + 1;
    const template = container.querySelector(`.training-entry[data-entry-set="${nextTrainingNum}"]`);
    
    if (template) {
      template.style.display = 'block';
      currentTrainingCount++;
    } else {
      alert('No more training slots available');
    }
  });

  // Event delegation for remove buttons
  document.addEventListener('click', function(e) {
    // Education remove
    if (e.target.classList.contains('remove-education')) {
      const entryToRemove = e.target.closest('.education-entry');
      const entrySet = parseInt(entryToRemove.dataset.entrySet);
      
      if (entrySet > 1 && confirm('Remove this education entry?')) {
        entryToRemove.style.display = 'none';
        entryToRemove.querySelectorAll('input, select').forEach(field => {
          field.value = '';
        });
        currentEducationCount--;
      }
    }
    
    // Experience remove
    if (e.target.classList.contains('remove-experience')) {
      const entryToRemove = e.target.closest('.experience-entry');
      const entrySet = parseInt(entryToRemove.dataset.entrySet);
      
      if (entrySet > 1 && confirm('Remove this experience entry?')) {
        entryToRemove.style.display = 'none';
        entryToRemove.querySelectorAll('input').forEach(field => {
          field.value = '';
        });
        currentExperienceCount--;
      }
    }
    
    // Training remove
    if (e.target.classList.contains('remove-training')) {
      const entryToRemove = e.target.closest('.training-entry');
      const entrySet = parseInt(entryToRemove.dataset.entrySet);
      
      if (entrySet > 1 && confirm('Remove this training entry?')) {
        entryToRemove.style.display = 'none';
        entryToRemove.querySelectorAll('input').forEach(field => {
          field.value = '';
        });
        currentTrainingCount--;
      }
    }
  });
});
