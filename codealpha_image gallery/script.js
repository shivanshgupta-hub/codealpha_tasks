document.addEventListener('DOMContentLoaded', () => {
  // Select DOM Elements
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('close-btn');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  let currentIndex = 0;
  let currentVisibleImages = [];

  // --- Filtering Logic ---
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons and add to the clicked one
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      // Show/Hide items based on category
      galleryItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.classList.add('show');
        } else {
          item.classList.remove('show');
        }
      });

      // Update the list of currently visible images for the lightbox navigation
      updateVisibleImages();
    });
  });

  function updateVisibleImages() {
    currentVisibleImages = Array.from(document.querySelectorAll('.gallery-item.show img'));
  }

  // Initialize visible images on load
  updateVisibleImages();

  // --- Lightbox Logic ---
  galleryItems.forEach(item => {
    item.addEventListener('click', (e) => {
      if (item.classList.contains('show')) {
        const img = item.querySelector('img');
        currentIndex = currentVisibleImages.indexOf(img);
        showLightbox(img.src);
      }
    });
  });

  function showLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add('active');
  }

  // Close Lightbox
  closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });

  // Close on outside click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
    }
  });

  // --- Navigation Logic (Next/Prev) ---
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : currentVisibleImages.length - 1;
    lightboxImg.src = currentVisibleImages[currentIndex].src;
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex < currentVisibleImages.length - 1) ? currentIndex + 1 : 0;
    lightboxImg.src = currentVisibleImages[currentIndex].src;
  });

  // Keyboard Navigation Support
  document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
      if (e.key === 'ArrowRight') nextBtn.click();
      if (e.key === 'ArrowLeft') prevBtn.click();
      if (e.key === 'Escape') closeBtn.click();
    }
  });
});