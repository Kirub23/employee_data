document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('.form-section');
  const prevBtns = document.querySelectorAll('.prev-btn');
  const nextBtns = document.querySelectorAll('.next-btn');
  let currentSection = 0;

  // Initialize form
  showSection(currentSection);

  // Next button handler
  nextBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Validate current section
      if (!validateSection(currentSection)) {
        return;
      }
      
      // Only proceed if validation passed
      if (formIsValid) {
        currentSection++;
        showSection(currentSection);
      }
    });
  });

  // Previous button handler
  prevBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      currentSection--;
      showSection(currentSection);
    });
  });

  function showSection(index) {
    sections.forEach((section, i) => {
      section.classList.toggle('active', i === index);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});