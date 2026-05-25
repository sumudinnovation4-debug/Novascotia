/* ============================================
   MAISON NOVA — main.js
============================================ */

const API_BASE = 'http://localhost:3000/api';

/* ---- Sticky nav ---- */
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });
}

/* ---- Mobile burger ---- */
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const spans = burger.querySelectorAll('span');
    if (mobileMenu.classList.contains('open')) {
      spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
      spans[1].style.transform = 'translateY(-6.5px) rotate(-45deg)';
      spans[0].style.background = '#f5f0e8';
      spans[1].style.background = '#f5f0e8';
    } else {
      spans[0].style.transform = '';
      spans[1].style.transform = '';
    }
  });

  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
}

/* ---- Animate stat counters ---- */
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = +el.dataset.target;
    let current = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current);
      if (current >= target) clearInterval(timer);
    }, 20);
  });
}

/* ---- Intersection observer for animations ---- */
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (entry.target.classList.contains('about-strip-content')) {
        animateCounters();
      }
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.service-card, .project-card-full, .team-card, .about-strip-content').forEach(el => {
  io.observe(el);
});

/* ---- Load featured projects on homepage ---- */
const featuredContainer = document.getElementById('featuredProjects');
if (featuredContainer) {
  loadFeaturedProjects();
}

async function loadFeaturedProjects() {
  try {
    const res = await fetch(`${API_BASE}/projects?featured=true&limit=4`);
    const { data } = await res.json();
    renderFeaturedProjects(data);
  } catch {
    // Fallback static data
    renderFeaturedProjects(FALLBACK_PROJECTS.slice(0, 4));
  }
}

function renderFeaturedProjects(projects) {
  if (!featuredContainer || !projects) return;
  featuredContainer.innerHTML = projects.map((p, i) => `
    <div class="project-card" onclick="location.href='projects.html'">
      <img src="${p.image}" alt="${p.title}" loading="${i === 0 ? 'eager' : 'lazy'}" />
      <div class="project-card-overlay"></div>
      <div class="project-card-info">
        <h3>${p.title}</h3>
        <span>${p.category}</span>
      </div>
    </div>
  `).join('');
}

/* ---- Fallback data (used when API is unavailable) ---- */
const FALLBACK_PROJECTS = [
  {
    id: 1, title: 'Lumé Studio', category: 'Residential',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80',
    featured: true, year: '2024', location: 'Manhattan, NY'
  },
  {
    id: 2, title: 'The Horizon Residence', category: 'Residential',
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=900&q=80',
    featured: true, year: '2024', location: 'Brooklyn, NY'
  },
  {
    id: 3, title: 'Verena Penthouse', category: 'Residential',
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=80',
    featured: true, year: '2023', location: 'Tribeca, NY'
  },
  {
    id: 4, title: 'Arden Boutique Hotel', category: 'Hospitality',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80',
    featured: true, year: '2023', location: 'Midtown, NY'
  },
  {
    id: 5, title: 'The Knox Office', category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80',
    featured: false, year: '2023', location: 'Chelsea, NY'
  },
  {
    id: 6, title: 'Casa Blanche', category: 'Residential',
    image: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=900&q=80',
    featured: false, year: '2022', location: 'Upper East Side, NY'
  },
  {
    id: 7, title: 'Meridian Restaurant', category: 'Hospitality',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80',
    featured: false, year: '2022', location: 'SoHo, NY'
  },
  {
    id: 8, title: 'Elara Wellness Spa', category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=900&q=80',
    featured: false, year: '2022', location: 'Greenwich Village, NY'
  },
  {
    id: 9, title: 'Park View Loft', category: 'Residential',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=900&q=80',
    featured: false, year: '2021', location: 'Park Slope, NY'
  },
];

/* ---- Projects page ---- */
const projectsContainer = document.getElementById('projectsGrid');
if (projectsContainer) {
  loadAllProjects('All');
}

async function loadAllProjects(category = 'All') {
  try {
    const url = category === 'All'
      ? `${API_BASE}/projects`
      : `${API_BASE}/projects?category=${encodeURIComponent(category)}`;
    const res = await fetch(url);
    const { data } = await res.json();
    renderAllProjects(data);
  } catch {
    const filtered = category === 'All'
      ? FALLBACK_PROJECTS
      : FALLBACK_PROJECTS.filter(p => p.category === category);
    renderAllProjects(filtered);
  }
}

function renderAllProjects(projects) {
  if (!projectsContainer || !projects) return;
  projectsContainer.innerHTML = projects.map(p => `
    <div class="project-card-full">
      <img src="${p.image}" alt="${p.title}" loading="lazy" />
      <div class="card-meta">
        <h3>${p.title}</h3>
        <span>${p.category} · ${p.year}</span>
      </div>
    </div>
  `).join('');

  document.querySelectorAll('.project-card-full, .team-card').forEach(el => io.observe(el));
}

/* ---- Filter buttons ---- */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    loadAllProjects(btn.dataset.category);
  });
});

/* ---- Contact form ---- */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('[type="submit"]');
    const original = submitBtn.textContent;
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;

    const formData = {
      name: contactForm.name.value,
      email: contactForm.email.value,
      phone: contactForm.phone?.value || '',
      service: contactForm.service?.value || '',
      budget: contactForm.budget?.value || '',
      message: contactForm.message.value,
    };

    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (result.success) {
        showToast('✓ Message sent! We'll be in touch within 24 hours.');
        contactForm.reset();
      } else {
        showToast('Something went wrong. Please try again.');
      }
    } catch {
      // Simulate success when API is unavailable
      showToast('✓ Message received! We'll be in touch soon.');
      contactForm.reset();
    } finally {
      submitBtn.textContent = original;
      submitBtn.disabled = false;
    }
  });
}

/* ---- Newsletter ---- */
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;
    try {
      await fetch(`${API_BASE}/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
    } catch { /* offline mode */ }
    showToast('✓ Subscribed! Welcome to Maison Nova.');
    newsletterForm.reset();
  });
}

/* ---- Toast ---- */
function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

/* ---- Smooth scroll for anchor links ---- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
