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
window.onscroll = function() {
    const goToTopBtn = document.getElementById("goToTopBtn");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        goToTopBtn.style.display = "block";
    } else {
        goToTopBtn.style.display = "none";
    }
};

document.getElementById("feedbackForm").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Message sent! Thank you for your feedback.");
    document.getElementById("feedbackForm").reset();
});

document.addEventListener('DOMContentLoaded', () => {
    const nameElement = document.getElementById('typed-name');
    const nameText = 'NUTENKI SRIVARDHAN';
    const typingSpeed = 200; // Milliseconds per character
    const pauseBeforeRestart = 2000; // Milliseconds to pause before restarting

    let index = 0;

    function typeEffect() {
        if (index < nameText.length) {
            nameElement.textContent += nameText.charAt(index);
            index++;
            setTimeout(typeEffect, typingSpeed);
        } else {
            setTimeout(resetEffect, pauseBeforeRestart);
        }
    }

    function resetEffect() {
        nameElement.textContent = '';
        index = 0;
        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();
});
