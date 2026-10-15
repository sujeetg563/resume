// Set Current Year in Footer
  document.getElementById('current-year').textContent = new Date().getFullYear();

  // Dark Mode Toggle Logic with LocalStorage
  const themeToggleBtn = document.getElementById('theme-toggle');
  const darkIcon = document.getElementById('theme-toggle-dark-icon');
  const lightIcon = document.getElementById('theme-toggle-light-icon');

  function applyTheme(isDark) {
   if (isDark) {
    document.documentElement.classList.add('dark');
    lightIcon.classList.remove('hidden');
    darkIcon.classList.add('hidden');
   } else {
    document.documentElement.classList.remove('dark');
    darkIcon.classList.remove('hidden');
    lightIcon.classList.add('hidden');
   }
  }

  const savedTheme = localStorage.getItem('sg_theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialDark = savedTheme ? savedTheme === 'dark' : systemPrefersDark;
  applyTheme(initialDark);

  themeToggleBtn.addEventListener('click', function () {
   const isCurrentlyDark = document.documentElement.classList.contains('dark');
   const nextDark = !isCurrentlyDark;
   applyTheme(nextDark);
   localStorage.setItem('sg_theme', nextDark ? 'dark' : 'light');
  });

  // Project links: replace href="#" with your actual GitHub/live demo URLs before publishing.
  document.querySelectorAll('.project-link').forEach(link => {
   link.addEventListener('click', event => {
    if (link.getAttribute('href') === '#') {
     event.preventDefault();
     link.textContent = 'Add your project URL in HTML';
    }
   });
  });

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  mobileMenuBtn.addEventListener('click', () => {
   mobileMenu.classList.toggle('hidden');
  });

  function closeMobileMenu() {
   mobileMenu.classList.add('hidden');
  }

  // Skills Filter Functionality
  function filterSkills(category) {
   const cards = document.querySelectorAll('.skill-card');
   const buttons = document.querySelectorAll('.skill-tab-btn');

   // Update button active styles
   buttons.forEach(btn => {
    if (btn.getAttribute('data-category') === category) {
     btn.className = 'skill-tab-btn px-4 py-2 rounded-xl text-sm font-semibold transition-all bg-blue-600 text-white shadow-sm';
    } else {
     btn.className = 'skill-tab-btn px-4 py-2 rounded-xl text-sm font-semibold transition-all bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700';
    }
   });

   // Filter visible cards
   cards.forEach(card => {
    const cardCat = card.getAttribute('data-category');
    if (category === 'all' || cardCat === category) {
     card.style.display = 'block';
    } else {
     card.style.display = 'none';
    }
   });
  }

  // About Me quick card modal
  const aboutCardModal = document.getElementById('about-card-modal');
  function openAboutCard() {
   aboutCardModal.classList.remove('hidden');
   document.body.style.overflow = 'hidden';
  }
  function closeAboutCard() {
   aboutCardModal.classList.add('hidden');
   document.body.style.overflow = 'auto';
  }
  aboutCardModal.addEventListener('click', (e) => {
   if (e.target === aboutCardModal) closeAboutCard();
  });

  // Resume Modal Open & Close
  const resumeModal = document.getElementById('resume-modal');

  function openResumeModal() {
   resumeModal.classList.remove('hidden');
   document.body.style.overflow = 'hidden';
  }

  function closeResumeModal() {
   resumeModal.classList.add('hidden');
   document.body.style.overflow = 'auto';
  }

  // Close modal when clicking outside content
  resumeModal.addEventListener('click', (e) => {
   if (e.target === resumeModal) {
    closeResumeModal();
   }
  });

  // Keyboard support for modal
  window.addEventListener('keydown', (e) => {
   if (e.key === 'Escape' && !resumeModal.classList.contains('hidden')) closeResumeModal();
   if (e.key === 'Escape' && !aboutCardModal.classList.contains('hidden')) closeAboutCard();
  });

  // Copy Contact Details using fallback execCommand
  function copyContactInfo() {
   const infoText = "Sujeet Gautam | Phone: +91 8303660710 | Email: sujeetgautam563@gmail.com | Location: Gainsari, Balrampur, UP";
   const dummyInput = document.createElement("textarea");
   dummyInput.value = infoText;
   document.body.appendChild(dummyInput);
   dummyInput.select();
   
   try {
    document.execCommand('copy');
    const btnText = document.getElementById('copy-btn-text');
    btnText.textContent = "✓ Copied Contact Info!";
    setTimeout(() => {
     btnText.textContent = "Copy Contact Info to Clipboard";
    }, 3000);
   } catch (err) {
    console.error('Copy fallback error:', err);
   } finally {
    document.body.removeChild(dummyInput);
   }
  }

  // Handle Contact Form Submission (Safe feedback without alert())
  function handleContactSubmit(event) {
   event.preventDefault();
   
   const name = document.getElementById('name').value.trim();
   const email = document.getElementById('email').value.trim();
   const subject = document.getElementById('subject').value.trim();
   const message = document.getElementById('message').value.trim();
   const feedback = document.getElementById('form-feedback');

   if (!name || !email || !message) {
    feedback.className = 'my-4 p-4 rounded-xl text-sm font-medium bg-red-100 text-red-800 dark:bg-red-950/70 dark:text-red-300 border border-red-200 dark:border-red-800';
    feedback.textContent = 'Please fill out all required fields.';
    feedback.classList.remove('hidden');
    return;
   }

   // Show friendly confirmation container
   feedback.className = 'my-4 p-4 rounded-xl text-sm font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800';
   feedback.innerHTML = `<strong>Thank you, ${name}!</strong> Your mail client will now open to send this message directly to <em>sujeetgautam563@gmail.com</em>.`;
   feedback.classList.remove('hidden');

   // Create mailto link for direct transmission
   const mailtoUrl = `mailto:sujeetgautam563@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry from ' + name)}&body=${encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message)}`;
   
   setTimeout(() => {
    window.location.href = mailtoUrl;
   }, 700);

   // Reset form
   document.getElementById('contact-form').reset();
  }


// Export the complete About Me card as a PNG image.
async function downloadAboutCardImage() {
  const card = document.getElementById('about-card-content');
  if (!card) return;
  if (typeof html2canvas === 'undefined') {
    alert('Image export library could not load. Please check your internet connection and try again.');
    return;
  }

  const button = card.querySelector('button[aria-label="Download About Me card as image"]');
  const closeButton = card.querySelector('button[aria-label="Close About Me card"]');
  const oldMaxHeight = card.style.maxHeight;
  const oldOverflow = card.style.overflow;
  const oldButtonDisplay = button ? button.style.display : '';
  const oldCloseDisplay = closeButton ? closeButton.style.display : '';

  try {
    if (button) button.style.display = 'none';
    if (closeButton) closeButton.style.display = 'none';
    // Temporarily expose the full card height so the complete content is captured.
    card.style.maxHeight = 'none';
    card.style.overflow = 'visible';
    const canvas = await html2canvas(card, {
      backgroundColor: null,
      scale: 2,
      useCORS: true,
      logging: false,
      windowWidth: Math.max(document.documentElement.clientWidth, card.scrollWidth),
      windowHeight: Math.max(document.documentElement.clientHeight, card.scrollHeight)
    });
    const link = document.createElement('a');
    link.download = 'Sujeet-Gautam-About-Me.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (error) {
    alert('Could not create the image. Please try again after the page finishes loading.');
    console.error(error);
  } finally {
    card.style.maxHeight = oldMaxHeight;
    card.style.overflow = oldOverflow;
    if (button) button.style.display = oldButtonDisplay;
    if (closeButton) closeButton.style.display = oldCloseDisplay;
  }
}
