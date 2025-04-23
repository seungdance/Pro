// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const body = document.body;

  if (hamburger && navLinks) {
    // Toggle hamburger menu
    hamburger.addEventListener("click", function (e) {
      e.stopPropagation(); // Prevent document click from immediately closing menu
      this.classList.toggle("active");
      navLinks.classList.toggle("active");
      body.style.overflow = navLinks.classList.contains("active") ? "hidden" : "";
    });

    // Close menu when clicking a link
    const navItems = document.querySelectorAll(".nav-links a");
    navItems.forEach((item) => {
      item.addEventListener("click", function () {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
        body.style.overflow = "";
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
      if (navLinks.classList.contains("active") && !hamburger.contains(event.target) && !navLinks.contains(event.target)) {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
        body.style.overflow = "";
      }
    });
  }
});

// Navbar scroll behavior
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Active link highlighting
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((item) => {
    item.classList.remove("active");
    if (item.getAttribute("href").includes(current)) {
      item.classList.add("active");
    }
  });
});

// Project Filtering
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    // Add active class to clicked button
    button.classList.add("active");

    const filterValue = button.getAttribute("data-filter");

    projectCards.forEach((card) => {
      if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
        card.style.display = "block";
        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "scale(1)";
        }, 200);
      } else {
        card.style.opacity = "0";
        card.style.transform = "scale(0.8)";
        setTimeout(() => {
          card.style.display = "none";
        }, 200);
      }
    });
  });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Close mobile menu after clicking
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    }
  });
});

// Contact Form Handling
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const formObject = Object.fromEntries(formData.entries());

    // Basic form validation
    if (!formObject.name || !formObject.email || !formObject.subject || !formObject.message) {
      alert("Please fill in all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formObject.email)) {
      alert("Please enter a valid email address");
      return;
    }

    try {
      // Here you would typically send the form data to your server
      // For now, we'll just simulate a successful submission
      console.log("Form submitted:", formObject);

      // Show success message
      alert("Thank you for your message! I will get back to you soon.");

      // Reset form
      contactForm.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error sending your message. Please try again later.");
    }
  });
}

// Add loading animation to project cards
projectCards.forEach((card, index) => {
  card.style.animationDelay = `${index * 0.1}s`;
});

// Add hover effect to project images
const projectImages = document.querySelectorAll(".project-image");
projectImages.forEach((image) => {
  image.addEventListener("mouseenter", () => {
    image.querySelector("img").style.transform = "scale(1.1)";
  });

  image.addEventListener("mouseleave", () => {
    image.querySelector("img").style.transform = "scale(1)";
  });
});
