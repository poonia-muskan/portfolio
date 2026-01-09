const roles = [
  "Full-Stack Python Developer",
  "Data Science Student",
  "Machine Learning Enthusiast"
];

let roleIndex = 0;
let charIndex = 0;
const typingSpeed = 80;
const eraseSpeed = 45;
const pauseDelay = 1600;

document.addEventListener("DOMContentLoaded", () => {
  
  const typewriter = document.querySelector(".typewriter");
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");
  const scrollIndicator = document.querySelector(".scroll-indicator");

  const modal = document.getElementById("certModal");
  const modalImg = document.getElementById("certImage");
  const resumeFrame = document.getElementById("resumeFrame");
  const modalDownload = document.getElementById("certDownload");
  const closeBtn = document.querySelector(".cert-close");

  const certButtons = document.querySelectorAll(".view-cert-btn");
  const resumeBtn = document.querySelector(".view-resume-btn");

  function typeText() {
    if (!typewriter) return;

    if (charIndex < roles[roleIndex].length) {
      typewriter.textContent += roles[roleIndex].charAt(charIndex);
      charIndex++;
      setTimeout(typeText, typingSpeed);
    } else {
      setTimeout(eraseText, pauseDelay);
    }
  }

  function eraseText() {
    if (charIndex > 0) {
      typewriter.textContent = roles[roleIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(eraseText, eraseSpeed);
    } else {
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeText, 120);
    }
  }

  typeText();

  window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        currentSection = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });

    if (scrollIndicator) {
      scrollIndicator.style.opacity = window.scrollY > 80 ? "0" : "0.7";
    }
  });

  certButtons.forEach(button => {
    button.addEventListener("click", () => {
      const imgSrc = button.dataset.cert;

      modalImg.style.display = "block";
      resumeFrame.style.display = "none";
      resumeFrame.src = "";

      modalImg.src = imgSrc;
      modalDownload.href = imgSrc;

      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  if (resumeBtn) {
    resumeBtn.addEventListener("click", () => {
      const resumeSrc = resumeBtn.dataset.resume;

      modalImg.style.display = "none";
      modalImg.src = "";

      resumeFrame.style.display = "block";
      resumeFrame.src = resumeSrc;

      modalDownload.href = resumeSrc;

      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  }

  function closeModal() {
    modal.classList.remove("active");

    modalImg.src = "";
    resumeFrame.src = "";

    modalImg.style.display = "block";
    resumeFrame.style.display = "none";

    document.body.style.overflow = "";
  }

  closeBtn.addEventListener("click", closeModal);

  modal.addEventListener("mousedown", e => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
});