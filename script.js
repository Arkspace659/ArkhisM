// Portfolio Website JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Set current year in footer
  document.getElementById("current-year").textContent =
    new Date().getFullYear();

  // Add page transition element
  const pageTransition = document.createElement("div");
  pageTransition.className = "page-transition";
  document.body.appendChild(pageTransition);

  // First load animation
  setTimeout(() => {
    document.body.classList.add("loaded");

    // Set initial sections as visible
    const visibleSections = document.querySelectorAll("section");
    visibleSections.forEach((section) => {
      if (isElementInViewport(section)) {
        section.classList.add("visible");
      }
    });
  }, 100);

  // Mobile menu toggle with animation
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  mobileMenuButton.addEventListener("click", function () {
    if (mobileMenu.classList.contains("hidden")) {
      // Show menu with animation
      mobileMenu.classList.remove("hidden");
      mobileMenu.style.opacity = "0";
      mobileMenu.style.transform = "translateY(-10px)";

      setTimeout(() => {
        mobileMenu.style.transition = "opacity 0.3s ease, transform 0.3s ease";
        mobileMenu.style.opacity = "1";
        mobileMenu.style.transform = "translateY(0)";
      }, 10);
    } else {
      // Hide menu with animation
      mobileMenu.style.opacity = "0";
      mobileMenu.style.transform = "translateY(-10px)";

      setTimeout(() => {
        mobileMenu.classList.add("hidden");
        mobileMenu.style.transition = "";
      }, 300);
    }
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (event) {
    if (
      !mobileMenu.classList.contains("hidden") &&
      !mobileMenu.contains(event.target) &&
      !mobileMenuButton.contains(event.target)
    ) {
      // Hide menu with animation
      mobileMenu.style.opacity = "0";
      mobileMenu.style.transform = "translateY(-10px)";

      setTimeout(() => {
        mobileMenu.classList.add("hidden");
        mobileMenu.style.transition = "";
      }, 300);
    }
  });

  // Close mobile menu when a link is clicked
  const mobileMenuLinks = mobileMenu.querySelectorAll("a");
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", function () {
      // Hide menu with animation
      mobileMenu.style.opacity = "0";
      mobileMenu.style.transform = "translateY(-10px)";

      setTimeout(() => {
        mobileMenu.classList.add("hidden");
        mobileMenu.style.transition = "";
      }, 300);
    });
  });

  // Smooth scrolling for anchor links with page transition effect
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      if (!targetId) return; // Handle empty hash

      const targetElement = document.getElementById(targetId);
      if (!targetElement) return; // Handle non-existent target

      // Add active class to the clicked link
      navLinks.forEach((link) => link.classList.remove("active"));
      this.classList.add("active");

      // Offset for fixed header
      const yOffset = -80;
      const y =
        targetElement.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;

      // Create mini scroll animation effect
      pageTransition.style.opacity = "0.1";
      pageTransition.style.transform = "scaleY(0.02) translateY(0)";
      pageTransition.style.top = "50%";
      pageTransition.style.display = "block";

      setTimeout(() => {
        pageTransition.style.transition =
          "transform 0.3s ease, opacity 0.3s ease";
        pageTransition.style.opacity = "0";
        pageTransition.style.transform = "scaleY(0) translateY(0)";

        // Scroll to target
        window.scrollTo({
          top: y,
          behavior: "smooth",
        });

        // Hide transition element after animation
        setTimeout(() => {
          pageTransition.style.display = "none";
          pageTransition.style.transition = "";
        }, 300);
      }, 300);
    });
  });

  // Add animation to skill bars
  const skillBars = document.querySelectorAll(".h-1\\.5 > div");
  skillBars.forEach((bar) => {
    // Get percentage from the width style or from a previous element
    let percentText =
      bar.parentElement.previousElementSibling?.querySelector(
        ".text-gray-500"
      )?.textContent;
    if (percentText) {
      const percent = parseFloat(percentText);
      bar.style.setProperty("--percent", `${percent}%`);
      bar.classList.add("skill-bar-fill");
    } else {
      // If we can't find the percentage text, use the inline width
      const styleWidth = bar.style.width;
      if (styleWidth) {
        bar.style.width = "0";
        bar.style.setProperty("--percent", styleWidth);
        bar.classList.add("skill-bar-fill");
      }
    }
  });

  // Form submission handling with enhanced feedback
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    // Initialize EmailJS
    emailjs.init("B35yFONCGBRODiS5G"); // You'll need to replace this with your actual EmailJS public key

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      // Validate form (simple validation)
      if (!name || !email || !subject || !message) {
        showFormMessage("Please fill in all fields", "error");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showFormMessage("Please enter a valid email address", "error");
        return;
      }

      // Show loading state
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.innerHTML;
      submitButton.innerHTML =
        '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
      submitButton.disabled = true;

      // Prepare email parameters
      const templateParams = {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
        to_email: "arkhismhamed@gmail.com", // Your email address
      };

      // Send email using EmailJS
      emailjs
        .send("service_bggi0tv", "template_lkdxfx7", templateParams)
        .then(function (response) {
          showFormMessage(
            "Thank you for your message! I'll get back to you soon.",
            "success"
          );
          contactForm.reset();
        })
        .catch(function (error) {
          showFormMessage(
            "Sorry, there was an error sending your message. Please try again later.",
            "error"
          );
        })
        .finally(function () {
          // Reset button
          submitButton.innerHTML = originalButtonText;
          submitButton.disabled = false;
        });
    });
  }

  // Form feedback message function
  function showFormMessage(message, type) {
    // Check if a message already exists and remove it
    const existingMessage = document.querySelector(".form-message");
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create message element
    const messageElement = document.createElement("div");
    messageElement.className = `form-message px-4 py-3 rounded mb-4 ${
      type === "error"
        ? "bg-red-100 text-red-700"
        : "bg-green-100 text-green-700"
    }`;
    messageElement.innerHTML = message;

    // Add to DOM before the form
    contactForm.parentNode.insertBefore(messageElement, contactForm);

    // Animate the message
    messageElement.style.opacity = "0";
    messageElement.style.transform = "translateY(-10px)";

    setTimeout(() => {
      messageElement.style.transition =
        "opacity 0.3s ease, transform 0.3s ease";
      messageElement.style.opacity = "1";
      messageElement.style.transform = "translateY(0)";
    }, 10);

    // Auto-remove after 5 seconds
    if (type === "success") {
      setTimeout(() => {
        messageElement.style.opacity = "0";
        messageElement.style.transform = "translateY(-10px)";

        setTimeout(() => {
          messageElement.remove();
        }, 300);
      }, 5000);
    }
  }

  // Add active class to nav links based on scroll position
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("header nav a");

  function highlightNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          link.classList.remove("text-indigo-600");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
            link.classList.add("text-indigo-600");
          }
        });
      }
    });
  }

  // Reveal sections when scrolled into view
  function revealSections() {
    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight * 0.75) {
        section.classList.add("visible");
      }
    });
  }

  // Check if element is in viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }

  // Add event listeners
  window.addEventListener("scroll", highlightNavLink);
  window.addEventListener("scroll", revealSections);

  // Trigger initial functions
  highlightNavLink();
  revealSections();

  // Add slideIn animations to appropriate elements
  document.querySelectorAll(".md\\:w-1\\/3").forEach((el) => {
    el.classList.add("slide-in-left");
  });

  document.querySelectorAll(".md\\:w-2\\/3").forEach((el) => {
    el.classList.add("slide-in-right");
  });

  // Make project cards interactive
  const projectCards = document.querySelectorAll(".transition-shadow");
  projectCards.forEach((card) => {
    card.classList.add("project-card");
    const imageContainer = card.querySelector(".relative.h-48");
    if (imageContainer) {
      imageContainer.classList.add("project-image");
    }
  });

  // Dark mode functionality
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const body = document.body;

  // Check for saved dark mode preference
  if (localStorage.getItem("darkMode") === "true") {
    body.classList.add("dark");
    darkModeToggle.innerHTML = '<i class="fas fa-sun text-xl"></i>';
  }

  darkModeToggle.addEventListener("click", () => {
    // Remove any existing rotation class
    darkModeToggle.classList.remove("rotate");

    // Force a reflow
    void darkModeToggle.offsetWidth;

    // Add rotation class
    darkModeToggle.classList.add("rotate");

    // Toggle dark mode
    body.classList.toggle("dark");
    const isDarkMode = body.classList.contains("dark");
    localStorage.setItem("darkMode", isDarkMode);

    // Update icon after rotation completes
    setTimeout(() => {
      darkModeToggle.innerHTML = isDarkMode
        ? '<i class="fas fa-sun text-xl"></i>'
        : '<i class="fas fa-moon text-xl"></i>';
    }, 400);
  });

  // Text animation observer
  const textObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("text-animate");
          textObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  // Apply text animation to all text elements
  document
    .querySelectorAll("h1, h2, h3, h4, h5, h6, p, a, span")
    .forEach((element) => {
      textObserver.observe(element);
    });
});
