// Utility functions
document.addEventListener('DOMContentLoaded', function() {
    // Character counter
    const textarea = document.getElementById('yourTextareaId');
    const charCounter = document.getElementById('charCounter');
    
    if (textarea && charCounter) {
      textarea.addEventListener('input', function() {
        const max = 500;
        const remaining = max - this.value.length;
        charCounter.textContent = `${remaining} characters remaining`;
      });
    }
  
    // Deadline check
    const deadline = new Date("2025-07-01T23:59:59");
    const form = document.querySelector('.main-form');
    const deadlineMessage = document.getElementById('deadline-message');
    
    if (new Date() > deadline && form && deadlineMessage) {
      form.style.display = 'none';
      deadlineMessage.style.display = 'block';
    }
  });