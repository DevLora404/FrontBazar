// ====== LOADER ======
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
  }, 1000);
});

// ====== MENU TOGGLE ======
const menuToggle = document.getElementById('menuToggle');
const navMobile = document.getElementById('navMobile');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navMobile.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
const navLinks = document.querySelectorAll('.nav-mobile-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navMobile.classList.remove('active');
  });
});

// ====== HEADER SCROLL ======
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    header.style.padding = '16px 40px';
    header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
  } else {
    header.style.padding = '24px 40px';
    header.style.boxShadow = 'none';
  }
  
  lastScroll = currentScroll;
});

// ====== ACTIVE NAV LINK ======
const sections = document.querySelectorAll('section[id]');
const navLinksDesktop = document.querySelectorAll('.nav-desktop a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinksDesktop.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ====== ANIMACIÓN DE ESTADÍSTICAS ======
let statsAnimated = false;

const animateStats = () => {
  if (statsAnimated) return;
  statsAnimated = true;
  
  const statNumbers = document.querySelectorAll('.stat-number');
  
  statNumbers.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        // Agregar + a proyectos y clientes, /7 a soporte, % a uptime
        if (stat.parentElement.querySelector('.stat-label').textContent.includes('Proyectos')) {
          stat.textContent = target + '+';
        } else if (stat.parentElement.querySelector('.stat-label').textContent.includes('Clientes')) {
          stat.textContent = target + '+';
        } else if (stat.parentElement.querySelector('.stat-label').textContent.includes('Soporte')) {
          stat.textContent = target + '/7';
        } else if (stat.parentElement.querySelector('.stat-label').textContent.includes('Uptime')) {
          stat.textContent = target + '%';
        } else {
          stat.textContent = target;
        }
        clearInterval(timer);
      } else {
        stat.textContent = Math.floor(current);
      }
    }, 16);
  });
};

// ====== FADE IN OBSERVER ======
const fadeInElements = document.querySelectorAll('.fade-in');

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      // Si es la sección de estadísticas, animar números
      if (entry.target.closest('.stats-section')) {
        animateStats();
      }
    }
  });
}, {
  threshold: 0.1
});

fadeInElements.forEach(element => {
  fadeInObserver.observe(element);
});

// ====== TESTIMONIOS (Ya no hay carrusel, solo un testimonio) ======
// Si en el futuro quieres agregar más testimonios, aquí puedes agregar el código del carrusel

// ====== FAQ ACCORDION ======
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  
  question.addEventListener('click', () => {
    const isActive = item.classList.contains('active');
    
    // Cerrar todos los items
    faqItems.forEach(faq => faq.classList.remove('active'));
    
    // Abrir el clickeado si no estaba activo
    if (!isActive) {
      item.classList.add('active');
    }
  });
});

// ====== FORMULARIO CONTACTO ======
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Aquí puedes agregar la lógica para enviar el formulario
  alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
  contactForm.reset();
});

// ====== SCROLL TO TOP ======
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 500) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ====== SMOOTH SCROLL ======
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});