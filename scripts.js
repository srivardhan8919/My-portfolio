// Function to scroll to the specific section
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  section.scrollIntoView({ behavior: 'smooth' });
}

// Function to scroll back to the top
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Show the "Go to Top" button when the user scrolls down
window.onscroll = function () {
  const goToTopBtn = document.getElementById("goToTopBtn");
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    goToTopBtn.style.display = "block";
  } else {
    goToTopBtn.style.display = "none";
  }
};

emailjs.init("hodX2j1r5XyUT4iZ9");

document.getElementById("feedbackForm").addEventListener("submit", function (event) {
  event.preventDefault();

  // Collect form data
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name && email && message) {
    const templateParams = {
      user_name: name,
      user_email: email,
      user_message: message
    };

    // Send the email using EmailJS
    emailjs.send("service_uveadgc", "template_v8oexfn", templateParams)
      .then(response => {
        alert("Message sent successfully!");
        document.getElementById("feedbackForm").reset();
      })
      .catch(error => {
        console.error("Email sending failed:", error);
        alert("Failed to send message. Try again later.");
      });

    // Send Auto-Reply to the Sender
    emailjs.send("service_uveadgc", "template_poa1j6a", templateParams)
      .then(response => {
        alert("Message sent! A confirmation email has been sent to you.");
        document.getElementById("feedbackForm").reset();
      })
      .catch(error => {
        console.error("Auto-reply failed:", error);
        alert("Failed to send auto-reply. Please try again later.");
      });

  } else {
    alert("Please fill out all fields.");
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const nameElement = document.getElementById('typed-name');
  const textArray = ['Cloud Engineer', 'AI Enthusiast', 'Front End Developer', 'ML Developer']; // Add more if needed
  const typingSpeed = 200; // Milliseconds per character
  const pauseBeforeDelete = 1000; // Pause before deleting text
  const pauseBeforeNext = 1500; // Pause before typing the next text
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentText = textArray[textIndex];
    if (!isDeleting) {
      nameElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentText.length) {
        setTimeout(() => (isDeleting = true), pauseBeforeDelete);
      }
    } else {
      nameElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        setTimeout(typeEffect, pauseBeforeNext);
        return;
      }
    }
    setTimeout(typeEffect, isDeleting ? 100 : typingSpeed);
  }

  typeEffect();
});


document.addEventListener("DOMContentLoaded", function () {
  const progressBars = document.querySelectorAll('.progress-bar');
  progressBars.forEach(bar => {
    const percentage = bar.getAttribute('data-percentage');
    // Use setTimeout to allow a brief delay before the animation begins
    setTimeout(() => {
      bar.style.width = percentage + '%';
    }, 300);
  });
});

/* ========= Animated Character's Eyes Following the Cursor ========= */
const leftEye = document.querySelector('.left-eye');
const rightEye = document.querySelector('.right-eye');
const characterContainer = document.querySelector('.character-container');

document.addEventListener('mousemove', (e) => {
  const rect = characterContainer.getBoundingClientRect();
  const eyeCenterX = rect.left + rect.width / 2;
  const eyeCenterY = rect.top + rect.height / 2;
  const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
  const eyeMovement = rect.width * 0.02; // Adjust for how far the eyes move

  leftEye.style.transform = `translate(${Math.cos(angle) * eyeMovement}px, ${Math.sin(angle) * eyeMovement}px)`;
  rightEye.style.transform = `translate(${Math.cos(angle) * eyeMovement}px, ${Math.sin(angle) * eyeMovement}px)`;
});

document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.querySelector(".cursor");

  document.addEventListener("mousemove", (e) => {
    let x = e.clientX;
    let y = e.clientY;

    // Move cursor smoothly
    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;

    createStormParticle(x, y);
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const sliderContainer = document.querySelector('.slider-container');
  const projectsGrid = document.querySelector('.projects-grid');
  const leftArrow = document.querySelector('.slider-arrow.left');
  const rightArrow = document.querySelector('.slider-arrow.right');
  let autoScrollInterval;

  // ----- Infinite Loop Setup -----
  // Clone all original project items to enable seamless looping.
  const originalProjects = Array.from(projectsGrid.querySelectorAll('.project'));
  originalProjects.forEach(project => {
    const clone = project.cloneNode(true);
    projectsGrid.appendChild(clone);
  });
  // Calculate the width occupied by the original projects.
  const originalScrollWidth = projectsGrid.scrollWidth / 2;

  // ----- Auto-Scroll with Infinite Loop -----
  // Start auto-scrolling every 3 seconds.
  function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
      projectsGrid.scrollBy({ left: 400, behavior: 'smooth' });
      // If we've scrolled past the original projects, reset instantly.
      if (projectsGrid.scrollLeft >= originalScrollWidth) {
        projectsGrid.scrollTo({ left: 0, behavior: 'auto' });
      }
    }, 3000);
  }

  function stopAutoScroll() {
    clearInterval(autoScrollInterval);
  }

  sliderContainer.addEventListener('mouseenter', stopAutoScroll);
  sliderContainer.addEventListener('mouseleave', startAutoScroll);
  startAutoScroll();

  // ----- Manual Navigation -----
  leftArrow.addEventListener('click', () => {
    projectsGrid.scrollBy({ left: -300, behavior: 'smooth' });
  });

  rightArrow.addEventListener('click', () => {
    projectsGrid.scrollBy({ left: 300, behavior: 'smooth' });
    // Also check if we've passed the original items.
    if (projectsGrid.scrollLeft >= originalScrollWidth) {
      const excess = projectsGrid.scrollLeft - originalScrollWidth;
      projectsGrid.scrollTo({ left: excess, behavior: 'auto' });
    }
  });

  // ----- Intersection Observer for Entry Animations -----
  const observerOptions = { threshold: 0.1 };
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.project').forEach(project => {
    observer.observe(project);
  });

  // ----- Ripple Effect on Button Click -----
  document.querySelectorAll('.project-info button').forEach(button => {
    button.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
      ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
      ripple.classList.add('ripple-effect');
      this.appendChild(ripple);

      // Remove the ripple after the animation completes.
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});
