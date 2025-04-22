// Portfolio Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Add page transition element
  const pageTransition = document.createElement('div');
  pageTransition.className = 'page-transition';
  document.body.appendChild(pageTransition);
  
  // First load animation
  setTimeout(() => {
    document.body.classList.add('loaded');
    
    // Set initial sections as visible
    const visibleSections = document.querySelectorAll('section');
    visibleSections.forEach(section => {
      if (isElementInViewport(section)) {
        section.classList.add('visible');
      }
    });
  }, 100);
  
  // Mobile menu toggle with animation
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  mobileMenuButton.addEventListener('click', function() {
    if (mobileMenu.classList.contains('hidden')) {
      // Show menu with animation
      mobileMenu.classList.remove('hidden');
      mobileMenu.style.opacity = '0';
      mobileMenu.style.transform = 'translateY(-10px)';
      
      setTimeout(() => {
        mobileMenu.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        mobileMenu.style.opacity = '1';
        mobileMenu.style.transform = 'translateY(0)';
      }, 10);
    } else {
      // Hide menu with animation
      mobileMenu.style.opacity = '0';
      mobileMenu.style.transform = 'translateY(-10px)';
      
      setTimeout(() => {
        mobileMenu.classList.add('hidden');
        mobileMenu.style.transition = '';
      }, 300);
    }
  });
  
  // Close mobile menu when a link is clicked
  const mobileMenuLinks = mobileMenu.querySelectorAll('a');
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', function() {
      // Hide menu with animation
      mobileMenu.style.opacity = '0';
      mobileMenu.style.transform = 'translateY(-10px)';
      
      setTimeout(() => {
        mobileMenu.classList.add('hidden');
        mobileMenu.style.transition = '';
      }, 300);
    });
  });
  
  // Smooth scrolling for anchor links with page transition effect
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href').substring(1);
      if (!targetId) return; // Handle empty hash
      
      const targetElement = document.getElementById(targetId);
      if (!targetElement) return; // Handle non-existent target
      
      // Add active class to the clicked link
      navLinks.forEach(link => link.classList.remove('active'));
      this.classList.add('active');
      
      // Offset for fixed header
      const yOffset = -80;
      const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      // Create mini scroll animation effect
      pageTransition.style.opacity = '0.1';
      pageTransition.style.transform = 'scaleY(0.02) translateY(0)';
      pageTransition.style.top = '50%';
      pageTransition.style.display = 'block';
      
      setTimeout(() => {
        pageTransition.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
        pageTransition.style.opacity = '0';
        pageTransition.style.transform = 'scaleY(0) translateY(0)';
        
        // Scroll to target
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
        
        // Hide transition element after animation
        setTimeout(() => {
          pageTransition.style.display = 'none';
          pageTransition.style.transition = '';
        }, 300);
      }, 300);
    });
  });
  
  // Header scroll effect
  const header = document.querySelector('header');
  let lastScrollTop = 0;
  
  function handleHeaderScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add .scrolled class when page is scrolled
    if (scrollTop > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Add show/hide classes based on scroll direction
    if (scrollTop > lastScrollTop && scrollTop > 150) {
      // Scrolling down and not at the top
      header.classList.add('scroll-down');
      header.classList.remove('scroll-up');
    } else {
      // Scrolling up or at the top
      header.classList.remove('scroll-down');
      header.classList.add('scroll-up');
    }
    
    lastScrollTop = scrollTop;
  }
  
  window.addEventListener('scroll', handleHeaderScroll);
  
  // Add animation to skill bars
  const skillBars = document.querySelectorAll('.h-1\\.5 > div');
  skillBars.forEach(bar => {
    // Get percentage from the width style or from a previous element
    let percentText = bar.parentElement.previousElementSibling?.querySelector('.text-gray-500')?.textContent;
    if (percentText) {
      const percent = parseFloat(percentText);
      bar.style.setProperty('--percent', `${percent}%`);
      bar.classList.add('skill-bar-fill');
    } else {
      // If we can't find the percentage text, use the inline width
      const styleWidth = bar.style.width;
      if (styleWidth) {
        bar.style.width = '0';
        bar.style.setProperty('--percent', styleWidth);
        bar.classList.add('skill-bar-fill');
      }
    }
  });
  
  // Form submission handling with enhanced feedback
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Validate form (simple validation)
      if (!name || !email || !subject || !message) {
        showFormMessage('Please fill in all fields', 'error');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showFormMessage('Please enter a valid email address', 'error');
        return;
      }
      
      // Show loading state
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.innerHTML;
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
      submitButton.disabled = true;
      
      // Simulate API call delay
      setTimeout(() => {
        // In a real implementation, you would send this data to a server
        // For this static version, we'll just show a success message
        showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
      }, 1500);
    });
  }
  
  // Form feedback message function
  function showFormMessage(message, type) {
    // Check if a message already exists and remove it
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message px-4 py-3 rounded mb-4 ${type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`;
    messageElement.innerHTML = message;
    
    // Add to DOM before the form
    contactForm.parentNode.insertBefore(messageElement, contactForm);
    
    // Animate the message
    messageElement.style.opacity = '0';
    messageElement.style.transform = 'translateY(-10px)';
    
    setTimeout(() => {
      messageElement.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      messageElement.style.opacity = '1';
      messageElement.style.transform = 'translateY(0)';
    }, 10);
    
    // Auto-remove after 5 seconds
    if (type === 'success') {
      setTimeout(() => {
        messageElement.style.opacity = '0';
        messageElement.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
          messageElement.remove();
        }, 300);
      }, 5000);
    }
  }
  
  // Add active class to nav links based on scroll position
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('header nav a');
  
  function highlightNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          link.classList.remove('text-indigo-600');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
            link.classList.add('text-indigo-600');
          }
        });
      }
    });
  }
  
  // Reveal sections when scrolled into view
  function revealSections() {
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (sectionTop < windowHeight * 0.75) {
        section.classList.add('visible');
      }
    });
  }
  
  // Check if element is in viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }
  
  // Add event listeners
  window.addEventListener('scroll', highlightNavLink);
  window.addEventListener('scroll', revealSections);
  
  // Trigger initial functions
  highlightNavLink();
  revealSections();
  
  // Add slideIn animations to appropriate elements
  document.querySelectorAll('.md\\:w-1\\/3').forEach(el => {
    el.classList.add('slide-in-left');
  });
  
  document.querySelectorAll('.md\\:w-2\\/3').forEach(el => {
    el.classList.add('slide-in-right');
  });
  
  // Make project cards interactive
  const projectCards = document.querySelectorAll('.transition-shadow');
  projectCards.forEach(card => {
    card.classList.add('project-card');
    const imageContainer = card.querySelector('.relative.h-48');
    if (imageContainer) {
      imageContainer.classList.add('project-image');
    }
  });
  
  // Dark mode functionality
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Check for saved theme preference or use system preference
  if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && prefersDarkScheme.matches)) {
    document.documentElement.classList.add('dark');
  }
  
  // Toggle dark mode
  darkModeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  });
  
  // Text animation observer
  const textObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('text-animate');
        textObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  
  // Apply text animation to all text elements
  document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a, span').forEach(element => {
    textObserver.observe(element);
  });
});