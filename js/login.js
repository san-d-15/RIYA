/**
 * MedCare Pharmacy - Login Controller & Logo Animation Orchestrator
 */

document.addEventListener('DOMContentLoaded', () => {
  initLogoFloatState();
  initLoginForm();
  initPasswordToggle();
  initDemoPresets();
});

/**
 * Activates subtle floating breath on the logo only after entrance completes (~1.8s)
 */
function initLogoFloatState() {
  const logoEl = document.querySelector('.animated-logo-root');
  if (logoEl) {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      setTimeout(() => {
        logoEl.classList.add('has-float');
      }, 1900);
    }
  }
}

/**
 * Password Visibility Toggle
 */
function initPasswordToggle() {
  const toggleBtn = document.getElementById('toggle-password-btn');
  const passwordInput = document.getElementById('login-password');
  const eyeIcon = document.getElementById('password-eye-icon');

  if (toggleBtn && passwordInput && eyeIcon) {
    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isPassword = passwordInput.getAttribute('type') === 'password';
      passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
      eyeIcon.classList.toggle('fa-eye', !isPassword);
      eyeIcon.classList.toggle('fa-eye-slash', isPassword);
    });
  }
}

/**
 * Quick Fill Demo Presets
 */
function initDemoPresets() {
  const ROLE_PRESETS = {
    admin: { email: 'admin@medcare.com', pass: 'admin123' },
    pharmacist: { email: 'pharmacist@medcare.com', pass: 'pharm123' },
    cashier: { email: 'cashier@medcare.com', pass: 'cash123' }
  };

  window.quickFillRole = function(role) {
    const preset = ROLE_PRESETS[role];
    if (!preset) return;
    const idInput = document.getElementById('login-identifier');
    const passInput = document.getElementById('login-password');
    const alertBox = document.getElementById('login-error-alert');

    if (idInput && passInput) {
      idInput.value = preset.email;
      passInput.value = preset.pass;
      if (alertBox) {
        alertBox.classList.add('hidden');
        alertBox.innerText = '';
      }
    }
  };

  window.quickFill = function(identifier, password) {
    const idInput = document.getElementById('login-identifier');
    const passInput = document.getElementById('login-password');
    const alertBox = document.getElementById('login-error-alert');

    if (idInput && passInput) {
      idInput.value = identifier;
      passInput.value = password;
      if (alertBox) {
        alertBox.classList.add('hidden');
        alertBox.innerText = '';
      }
    }
  };
}

/**
 * Login Form Submission with Anti-Double-Click & Button Spinner Animation
 */
function initLoginForm() {
  const form = document.getElementById('login-form');
  const submitBtn = document.getElementById('btn-login-submit');
  const btnText = document.getElementById('btn-login-text');
  const alertBox = document.getElementById('login-error-alert');

  if (!form || !submitBtn) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const identifier = document.getElementById('login-identifier')?.value.trim();
    const password = document.getElementById('login-password')?.value;

    if (!identifier || !password) {
      showLoginError('Please enter both username/email and password.');
      return;
    }

    // Set Loading State on Button to prevent multiple clicks
    setLoadingState(true);

    // Simulate realistic server/JDBC verification latency (~400-600ms)
    setTimeout(() => {
      try {
        const result = window.MedCareAuth.login(identifier, password);

        if (result && result.success) {
          // Success State
          if (btnText) {
            btnText.innerHTML = '<i class="fa-solid fa-check me-1.5"></i> Access Granted';
          }
          submitBtn.style.background = 'linear-gradient(135deg, #00A896 0%, #059669 100%)';
          
          setTimeout(() => {
            window.location.href = 'dashboard.html';
          }, 350);
        } else {
          // Failure State
          setLoadingState(false);
          showLoginError(result ? result.message : 'Invalid credentials. Please verify your details.');
        }
      } catch (err) {
        setLoadingState(false);
        showLoginError('Authentication error occurred. Please try again.');
        console.error('Login error:', err);
      }
    }, 500);
  });

  function setLoadingState(isLoading) {
    if (isLoading) {
      submitBtn.disabled = true;
      if (btnText) {
        btnText.innerHTML = '<span class="btn-spinner"></span> Authenticating...';
      }
      if (alertBox) alertBox.classList.add('hidden');
    } else {
      submitBtn.disabled = false;
      if (btnText) {
        btnText.innerHTML = '<i class="fa-solid fa-arrow-right-to-bracket me-1.5"></i> Sign In to MedCare';
      }
    }
  }

  function showLoginError(msg) {
    if (!alertBox) return;
    alertBox.innerHTML = `
      <div class="flex items-center gap-2">
        <i class="fa-solid fa-circle-exclamation text-red-500 text-sm"></i>
        <span>${msg}</span>
      </div>
    `;
    alertBox.classList.remove('hidden');
  }
}
