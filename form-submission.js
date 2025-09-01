document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.main-form');
    
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validate all sections
      let allSectionsValid = true;
      document.querySelectorAll('.form-section').forEach((_, index) => {
        if (!validateSection(index)) {
          allSectionsValid = false;
        }
      });
      
      if (!allSectionsValid) {
        alert('Please correct all errors before submitting');
        return;
      }
      
      // Proceed with submission
      submitForm();
    });
  
    async function submitForm() {
      const submitBtn = document.querySelector('button[type="submit"]');
      try {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
        
        await fetch(form.action, {
          method: 'POST',
          body: new URLSearchParams(new FormData(form)),
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          mode: 'no-cors'
        });
        
        window.location.href = 'confirmation.html';
      } catch (error) {
        console.error('Error:', error);
        alert('Submission failed. Please try again.');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit';
      }
    }
  });