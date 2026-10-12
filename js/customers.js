/**
 * MedCare - Customer Management Module
 */

let editingCustomerId = null;

document.addEventListener('DOMContentLoaded', () => {
  renderAppShell('customers');
  loadCustomers();
  setupCustomerEvents();
});

function loadCustomers() {
  const tbody = document.getElementById('customers-tbody');
  const countDisplay = document.getElementById('customer-count-display');
  if (!tbody) return;

  const customers = MedCareDB.getCustomers();
  const search = document.getElementById('customer-search-input')?.value.toLowerCase().trim() || '';

  const filtered = customers.filter(c => 
    !search || 
    c.customerName.toLowerCase().includes(search) || 
    c.phone.includes(search) || 
    (c.email && c.email.toLowerCase().includes(search))
  );

  if (countDisplay) countDisplay.innerText = `Total Registered Patients & Customers: ${customers.length}`;

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="text-center py-6 text-slate-400">No customers found matching "${search}".</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(c => `
    <tr>
      <td><span class="font-mono text-xs text-primary-700 font-bold">CUST-${c.id.toString().padStart(4, '0')}</span></td>
      <td>
        <div class="font-bold text-slate-900">${c.customerName}</div>
        <div class="text-xs text-slate-500">${c.email || 'No email provided'}</div>
      </td>
      <td class="font-mono text-xs">${c.phone}</td>
      <td><div class="text-xs text-slate-600 max-w-xs truncate">${c.address || 'Local Resident'}</div></td>
      <td class="text-center">
        <span class="badge badge-neutral font-mono font-bold">${c.purchaseHistoryCount || 0} visits</span>
      </td>
      <td class="text-right font-mono font-bold text-slate-900">${MedCareUI.formatCurrency(c.totalSpent || 0)}</td>
      <td class="text-right">
        <div class="flex items-center justify-end gap-1">
          <button class="btn-icon" onclick="openEditCustomerModal(${c.id})" title="Edit Customer">
            <i class="fa-solid fa-user-pen text-primary-600"></i>
          </button>
          <button class="btn-icon" onclick="deleteCustomerConfirm(${c.id})" title="Delete Customer">
            <i class="fa-solid fa-trash-can text-danger-600"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function setupCustomerEvents() {
  document.getElementById('customer-search-input')?.addEventListener('input', loadCustomers);

  document.getElementById('customer-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    saveCustomer();
  });
}

window.openAddCustomerModal = function() {
  editingCustomerId = null;
  document.getElementById('modal-cust-title').innerText = 'Add New Customer / Patient';
  document.getElementById('customer-form').reset();
  MedCareUI.openModal('customer-modal');
};

window.openEditCustomerModal = function(id) {
  editingCustomerId = id;
  const c = MedCareDB.getCustomers().find(cust => cust.id === parseInt(id, 10));
  if (!c) return;

  document.getElementById('modal-cust-title').innerText = 'Edit Customer Details';
  document.getElementById('cust-name').value = c.customerName;
  document.getElementById('cust-phone').value = c.phone;
  document.getElementById('cust-email').value = c.email || '';
  document.getElementById('cust-address').value = c.address || '';

  MedCareUI.openModal('customer-modal');
};

function saveCustomer() {
  const customerName = document.getElementById('cust-name').value.trim();
  const phone = document.getElementById('cust-phone').value.trim();
  const email = document.getElementById('cust-email').value.trim();
  const address = document.getElementById('cust-address').value.trim();

  if (!customerName || !phone) {
    MedCareUI.showToast("Customer name and phone number are required.", "danger");
    return;
  }

  const payload = { customerName, phone, email, address };

  if (editingCustomerId) {
    MedCareDB.updateCustomer(editingCustomerId, payload);
    MedCareUI.showToast(`Updated customer "${customerName}".`, "success");
  } else {
    MedCareDB.addCustomer(payload);
    MedCareUI.showToast(`Customer "${customerName}" registered.`, "success");
  }

  MedCareUI.closeModal('customer-modal');
  loadCustomers();
}

window.deleteCustomerConfirm = function(id) {
  const c = MedCareDB.getCustomers().find(cust => cust.id === parseInt(id, 10));
  if (!c) return;

  MedCareUI.confirmAction(`Delete customer record for "${c.customerName}"?`, () => {
    MedCareDB.deleteCustomer(id);
    MedCareUI.showToast(`Customer "${c.customerName}" deleted.`, "warning");
    loadCustomers();
  });
};
