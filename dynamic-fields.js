// Dynamic field management for experiences, educations, etc.
document.addEventListener('DOMContentLoaded', function() {
    const MAX_VALUES = {
      experiences: 9,
      educations: 8,
      trainings: 8,
      languages: 5
    };
  
    function setupDynamicFields(type) {
      const container = document.getElementById(`${type}Container`);
      if (!container) return;
  
      const addBtn = document.getElementById(`add${type.charAt(0).toUpperCase() + type.slice(1)}`);
      let currentCount = 1;
  
      addBtn?.addEventListener('click', () => {
        if (currentCount >= MAX_VALUES[type]) {
          alert(`Maximum of ${MAX_VALUES[type] - 1} ${type} allowed`);
          return;
        }
  
        const nextNum = currentCount + 1;
        const template = container.querySelector(`.${type}-entry[data-entry-set="${nextNum}"]`);
  
        if (template) {
          const newEntry = template.cloneNode(true);
          newEntry.style.display = 'block';
          container.appendChild(newEntry);
          currentCount++;
        }
      });
  
      container.addEventListener('click', (e) => {
        if (e.target.classList.contains(`remove-${type}`)) {
          const entry = e.target.closest(`.${type}-entry`);
          if (entry?.dataset?.entrySet && confirm(`Remove this ${type}?`)) {
            entry.style.display = 'none';
            entry.querySelectorAll('input').forEach(input => input.value = '');
            currentCount--;
          }
        }
      });
    }
  
    // Initialize all dynamic fields
    ['experience', 'education', 'training', 'language'].forEach(setupDynamicFields);
  });