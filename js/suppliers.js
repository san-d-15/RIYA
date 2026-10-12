/**
 * MedCare - Supplier Management Module
 */

let editingSupplierId = null;

document.addEventListener('DOMContentLoaded', () => {
  renderAppShell('suppliers');
  loadSuppliers();
  setupSupplierEvents();
});

function loadSuppliers() {
  const tbody = document.getElementById('suppliers-tbody');
  const countDisplay = document.getElementById('supplier-count-display');
  if (!tbody) return;

  const suppliers = MedCareDB.getSuppliers();
  const search = document.getElementById('supplier-search-input')?.value.toLowerCase().trim() || '';

  const filtered = suppliers.filter(s => 
    !search || 
    s.supplierName.toLowerCase().includes(search) || 
    s.companyName.toLowerCase().includes(search) || 
    s.gstNumber.toLowerCase().includes(search) ||
    s.phone.includes(search)
  );

  if (countDisplay) countDisplay.innerText = `Total Suppliers: ${suppliers.length}`;

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="text-center py-6 text-slate-400">No suppliers found matching "${search}".</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(s => `
    <tr>
      <td><span class="font-mono text-xs text-primary-700 font-bold">SUP-${s.id.toString().padStart(3, '0')}</span></td>
      <td>
        <div class="font-bold text-slate-900">${s.supplierName}</div>
        <div class="text-xs text-slate-500">${s.companyName}</div>
      </td>
      <td>
        <div class="text-xs text-slate-800"><i class="fa-solid fa-phone text-slate-400 me-1"></i> ${s.phone}</div>
        <div class="text-xs text-slate-500"><i class="fa-regular fa-envelope text-slate-400 me-1"></i> ${s.email}</div>
      </td>
      <td class="font-mono text-xs">${s.gstNumber || 'N/A'}</td>
      <td><div class="text-xs text-slate-600 max-w-xs">${s.medicinesSupplied || 'All pharma items'}</div></td>
      <td><div class="text-xs text-slate-500 max-w-xs truncate">${s.address}</div></td>
      <td class="text-right">
        <div class="flex items-center justify-end gap-1">
          <button class="btn-icon" onclick="openEditSupplierModal(${s.id})" title="Edit Supplier">
            <i class="fa-solid fa-pen-to-square text-primary-600"></i>
          </button>
          <button class="btn-icon" onclick="deleteSupplierConfirm(${s.id})" title="Delete Supplier">
            <i class="fa-solid fa-trash-can text-danger-600"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function setupSupplierEvents() {
  document.getElementById('supplier-search-input')?.addEventListener('input', loadSuppliers);

  document.getElementById('supplier-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    saveSupplier();
  });
}

window.openAddSupplierModal = function() {
  editingSupplierId = null;
  document.getElementById('modal-sup-title').innerText = 'Add New Supplier';
  document.getElementById('supplier-form').reset();
  MedCareUI.openModal('supplier-modal');
};

window.openEditSupplierModal = function(id) {
  editingSupplierId = id;
  const s = MedCareDB.getSuppliers().find(sup => sup.id === parseInt(id, 10));
  if (!s) return;

  document.getElementById('modal-sup-title').innerText = 'Edit Supplier Details';
  document.getElementById('sup-name').value = s.supplierName;
  document.getElementById('sup-company').value = s.companyName;
  document.getElementById('sup-phone').value = s.phone;
  document.getElementById('sup-email').value = s.email;
  document.getElementById('sup-gst').value = s.gstNumber || '';
  document.getElementById('sup-medicines').value = s.medicinesSupplied || '';
  document.getElementById('sup-address').value = s.address;

  MedCareUI.openModal('supplier-modal');
};

function saveSupplier() {
  const supplierName = document.getElementById('sup-name').value.trim();
  const companyName = document.getElementById('sup-company').value.trim();
  const phone = document.getElementById('sup-phone').value.trim();
  const email = document.getElementById('sup-email').value.trim();
  const gstNumber = document.getElementById('sup-gst').value.trim();
  const medicinesSupplied = document.getElementById('sup-medicines').value.trim();
  const address = document.getElementById('sup-address').value.trim();

  if (!supplierName || !phone || !email) {
    MedCareUI.showToast("Supplier name, contact phone and email are required.", "danger");
    return;
  }

  const payload = {
    supplierName,
    companyName: companyName || supplierName,
    phone,
    email,
    gstNumber,
    medicinesSupplied,
    address
  };

  if (editingSupplierId) {
    MedCareDB.updateSupplier(editingSupplierId, payload);
    MedCareUI.showToast(`Updated supplier "${supplierName}".`, "success");
  } else {
    MedCareDB.addSupplier(payload);
    MedCareUI.showToast(`Supplier "${supplierName}" registered.`, "success");
  }

  MedCareUI.closeModal('supplier-modal');
  loadSuppliers();
}

window.deleteSupplierConfirm = function(id) {
  const s = MedCareDB.getSuppliers().find(sup => sup.id === parseInt(id, 10));
  if (!s) return;

  MedCareUI.confirmAction(`Are you sure you want to delete supplier "${s.supplierName}"?`, () => {
    MedCareDB.deleteSupplier(id);
    MedCareUI.showToast(`Supplier "${s.supplierName}" removed.`, "warning");
    loadSuppliers();
  });
};
