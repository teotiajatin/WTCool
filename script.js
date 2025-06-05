// Animated stats bar
function animateStats() {
  const stats = document.querySelectorAll('.stat-number');
  stats.forEach(stat => {
    const target = +stat.getAttribute('data-target');
    let count = 0;
    const increment = Math.ceil(target / 60);
    function update() {
      count += increment;
      if (count > target) count = target;
      stat.textContent = count;
      if (count < target) {
        requestAnimationFrame(update);
      }
    }
    update();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  animateStats();

  // Optional: Card hover ripple effect
  document.querySelectorAll('.sdg-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      this.style.setProperty('--mouse-x', `${x}px`);
      this.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // Add JavaScript for the Contact Form
  const contactForm = document.querySelector('.contact-form');
  const thankYouMessage = document.getElementById('thankYouMessage');

  if (contactForm && thankYouMessage) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent default form submission

      // In a real application, you would send the form data here
      // e.g., using fetch() or XMLHttpRequest

      // Hide the form and show the thank you message
      contactForm.style.display = 'none';
      thankYouMessage.style.display = 'block';

      // Set a timer to revert back after 5 seconds (adjust as needed)
      setTimeout(() => {
        thankYouMessage.style.display = 'none';
        contactForm.style.display = 'block';

        // Reset the form fields
        contactForm.reset();

      }, 5000); // 5000 milliseconds = 5 seconds
    });
  }
}); 