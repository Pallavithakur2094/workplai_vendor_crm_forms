document.addEventListener('DOMContentLoaded', () => {
  // Make all inputs, selects, and textareas editable for testing
  document.querySelectorAll('input, select, textarea').forEach(el => {
    el.removeAttribute('readonly');
    el.removeAttribute('disabled');
  });

  // Prevent all form submissions (stops button clicks from reloading page)
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => e.preventDefault());
  });

  const viewSignup = document.getElementById('view-signup');
  const viewDashboard = document.getElementById('view-dashboard');
  const signupForm = document.getElementById('signup-form');
  
  const userProfile = document.getElementById('user-profile');
  const userDisplayName = document.getElementById('user-display-name');
  const userAvatarChar = document.getElementById('user-avatar-char');
  const btnLogout = document.getElementById('btn-logout');

  const stepItems = document.querySelectorAll('.step-item');
  const forms = document.querySelectorAll('.stage-form');
  const welcomeScreen = document.getElementById('stage-welcome');

  // 1. Initial State: Show signup/login screen, hide dashboard
  if (viewSignup) viewSignup.classList.remove('hidden');
  if (viewDashboard) viewDashboard.classList.add('hidden');
  if (userProfile) userProfile.classList.add('hidden');

  // 2. Handle Login / Signup Submission
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('signup-name');
      const name = nameInput ? nameInput.value.trim() : 'Guest Vendor';

      // Transition to Dashboard
      if (viewSignup) viewSignup.classList.add('hidden');
      if (viewDashboard) viewDashboard.classList.remove('hidden');

      // Update User Header Info
      if (userProfile) userProfile.classList.remove('hidden');
      if (userDisplayName) userDisplayName.textContent = name || 'Guest Vendor';
      if (userAvatarChar) userAvatarChar.textContent = (name || 'G').charAt(0).toUpperCase();

      // Show welcome screen, hide all forms, and reset active stepper highlight
      if (welcomeScreen) welcomeScreen.classList.remove('hidden');
      forms.forEach(form => form.classList.add('hidden'));
      stepItems.forEach(step => step.classList.remove('active'));
    });
  }

  // 3. Tab Clicking Switcher
  stepItems.forEach(item => {
    item.style.cursor = 'pointer';

    item.addEventListener('click', () => {
      // Toggle active class on stepper
      stepItems.forEach(step => step.classList.remove('active'));
      item.classList.add('active');

      // Extract Stage Code (e.g. "PQ-001")
      const codeEl = item.querySelector('.step-code');
      if (!codeEl) return;
      const stageId = codeEl.textContent.trim();

      // Switch displayed form
      if (welcomeScreen) welcomeScreen.classList.add('hidden');
      forms.forEach(form => form.classList.add('hidden'));

      const targetForm = document.getElementById(`form-${stageId}`);
      if (targetForm) {
        targetForm.classList.remove('hidden');
      }
    });
  });

  // 4. Logout / Reset view handler
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      // Hide dashboard, show signup
      if (viewDashboard) viewDashboard.classList.add('hidden');
      if (viewSignup) viewSignup.classList.remove('hidden');
      if (userProfile) userProfile.classList.add('hidden');

      // Clear input fields
      if (signupForm) signupForm.reset();
    });
  }
});
