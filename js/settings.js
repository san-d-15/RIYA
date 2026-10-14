/**
 * MedCare - Store Settings & Administration Module
 */

document.addEventListener('DOMContentLoaded', () => {
  renderAppShell('settings');
  loadSettingsForm();
  setupSettingsEvents();
});

function loadSettingsForm() {
  const settings = MedCareDB.getSettings();
  const user = MedCareAuth.getCurrentUser();
  if (!MedCareAuth.can('settings.write')) {
    document.getElementById('store-config-card')?.classList.add('hidden');
    document.getElementById('btn-reset-db')?.classList.add('hidden');
  }

  // Store information
  document.getElementById('setting-store-name').value = settings.storeName || '';
  document.getElementById('setting-store-tagline').value = settings.storeTagline || '';
  document.getElementById('setting-store-address').value = settings.storeAddress || '';
  document.getElementById('setting-city').value = settings.city || '';
  document.getElementById('setting-phone').value = settings.phone || '';
  document.getElementById('setting-email').value = settings.email || '';
  document.getElementById('setting-gst').value = settings.gstNumber || '';
  document.getElementById('setting-dl').value = settings.drugLicenseNo || '';
  document.getElementById('setting-inv-prefix').value = settings.invoicePrefix || '';
  document.getElementById('setting-tax-rate').value = settings.taxRate ?? 5.0;

  // Profile
  document.getElementById('profile-name').value = user.name || '';
  document.getElementById('profile-email').value = user.email || '';
  document.getElementById('profile-role').value = user.role || '';

  const displayNameEl = document.getElementById('profile-display-name');
  if (displayNameEl) displayNameEl.textContent = user.name || 'Signed In User';
  const displayRoleEl = document.getElementById('profile-display-role');
  if (displayRoleEl) displayRoleEl.textContent = user.role || 'Staff';
  const initialsEl = document.getElementById('profile-initials');
  if (initialsEl && user.name) {
    const parts = user.name.trim().split(/\s+/).filter(Boolean);
    initialsEl.textContent = parts.length > 1 ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() : parts[0].substring(0, 2).toUpperCase();
  }
}

function setupSettingsEvents() {
  // Save Store Settings
  document.getElementById('store-settings-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const taxRate = Number(document.getElementById('setting-tax-rate').value);
    if (!Number.isFinite(taxRate) || taxRate < 0 || taxRate > 30) {
      MedCareUI.showToast("Tax rate must be between 0 and 30%.", "danger");
      return;
    }
    const updated = {
      storeName: document.getElementById('setting-store-name').value.trim(),
      storeTagline: document.getElementById('setting-store-tagline').value.trim(),
      storeAddress: document.getElementById('setting-store-address').value.trim(),
      city: document.getElementById('setting-city').value.trim(),
      phone: document.getElementById('setting-phone').value.trim(),
      email: document.getElementById('setting-email').value.trim(),
      gstNumber: document.getElementById('setting-gst').value.trim(),
      drugLicenseNo: document.getElementById('setting-dl').value.trim(),
      invoicePrefix: document.getElementById('setting-inv-prefix').value.trim(),
      taxRate
    };

    if (!MedCareDB.updateSettings(updated)) {
      MedCareUI.showToast("Unable to save store settings to browser storage.", "danger");
      return;
    }
    MedCareUI.showToast("Store configuration and invoice rules saved successfully!", "success");
  });

  // Change Password form
  document.getElementById('change-password-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const currentPass = document.getElementById('current-password').value;
    const newPass = document.getElementById('new-password').value;
    const confirmPass = document.getElementById('confirm-password').value;

    if (!currentPass || !newPass || !confirmPass) {
      MedCareUI.showToast("Please complete all password fields.", "danger");
      return;
    }

    if (newPass !== confirmPass) {
      MedCareUI.showToast("New passwords do not match.", "danger");
      return;
    }

    if (newPass.length < 8) {
      MedCareUI.showToast("New password must be at least 8 characters.", "warning");
      return;
    }

    try {
      const user = MedCareAuth.getCurrentUser();
      const changed = await MedCareAuth.changePassword(user.id, currentPass, newPass);
      if (!changed) {
        MedCareUI.showToast("Current password is incorrect or the credential could not be saved.", "danger");
        return;
      }
    } catch (error) {
      console.error('Password update failed.', error);
      MedCareUI.showToast(error.message || "Password update failed. Please try again.", "danger");
      return;
    }

    document.getElementById('change-password-form').reset();
    MedCareUI.showToast("Password updated successfully.", "success");
  });

  // Reset Database to Demo Defaults
  document.getElementById('btn-reset-db')?.addEventListener('click', () => {
    if (!MedCareAuth.authorize('admin')) return;
    MedCareUI.confirmAction("Are you sure you want to reset all inventory, sales and records back to initial demo seeds?", () => {
      if (!MedCareDB.resetToDefault()) {
        MedCareUI.showToast("Unable to reset browser data. No success was reported.", "danger");
        return;
      }
      MedCareUI.showToast("Browser demo data restored to defaults.", "success");
      setTimeout(() => window.location.reload(), 800);
    });
  });
}
