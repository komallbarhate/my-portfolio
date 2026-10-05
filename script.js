const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const yearEl = document.getElementById('year');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));

    projectCards.forEach((card) => {
      const categories = card.dataset.category || '';
      const shouldShow = filter === 'all' || categories.includes(filter);
      card.classList.toggle('hidden', !shouldShow);
    });
  });
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = entry.target.classList.contains('fade-in-up')
        ? 'fadeInUp 0.6s ease-out forwards'
        : entry.target.classList.contains('slide-in-right')
        ? 'slideInRight 0.6s ease-out forwards'
        : entry.target.classList.contains('slide-in-left')
        ? 'slideInLeft 0.6s ease-out forwards'
        : 'none';
      observer.unobserve(entry.target);
    }
  });
});

document.querySelectorAll('.fade-in-up, .slide-in-right, .slide-in-left').forEach((el) => {
  observer.observe(el);
});
