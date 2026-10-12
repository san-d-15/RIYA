/**
 * MedCare - Medicine Management Module
 * Complete CRUD, Multi-filter, Search & Pagination
 */

let currentPage = 1;
const itemsPerPage = 8;
let filteredMedicines = [];
let editingMedicineId = null;

document.addEventListener('DOMContentLoaded', () => {
  renderAppShell('medicines');
  initMedicineFilters();
  loadMedicines();
  setupEventListeners();

  // Check if search query was passed via URL
  const urlParams = new URLSearchParams(window.location.search);
  const searchParam = urlParams.get('search');
  if (searchParam) {
    const searchInput = document.getElementById('medicine-search-input');
    if (searchInput) {
      searchInput.value = searchParam;
      applyFilters();
    }
  }
});

function initMedicineFilters() {
  const categories = MedCareDB.getCategories();
  const suppliers = MedCareDB.getSuppliers();
  const medicines = MedCareDB.getMedicines();

  // Populate category filter dropdown
  const catSelect = document.getElementById('filter-category');
  if (catSelect) {
    catSelect.innerHTML = `<option value="">All Categories (${categories.length})</option>` +
      categories.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
  }

  // Populate category in Add/Edit modal
  const modalCatSelect = document.getElementById('med-category');
  if (modalCatSelect) {
    modalCatSelect.innerHTML = `<option value="">Select Category</option>` +
      categories.map(c => `<option value="${c.name}" data-id="${c.id}">${c.name}</option>`).join('');
  }

  // Populate manufacturer filter dropdown
  const mfgSelect = document.getElementById('filter-manufacturer');
  if (mfgSelect) {
    const manufacturers = [...new Set(medicines.map(m => m.manufacturer).filter(Boolean))];
    mfgSelect.innerHTML = `<option value="">All Manufacturers</option>` +
      manufacturers.map(m => `<option value="${m}">${m}</option>`).join('');
  }

  // Populate supplier in Add/Edit modal
  const modalSuppSelect = document.getElementById('med-supplier');
  if (modalSuppSelect) {
    modalSuppSelect.innerHTML = `<option value="">Select Supplier</option>` +
      suppliers.map(s => `<option value="${s.supplierName}" data-id="${s.id}">${s.supplierName} (${s.companyName})</option>`).join('');
  }
}

function loadMedicines() {
  filteredMedicines = [...MedCareDB.getMedicines()];
  applyFilters();
}

function applyFilters() {
  const searchInput = document.getElementById('medicine-search-input')?.value.toLowerCase().trim() || '';
  const categoryFilter = document.getElementById('filter-category')?.value || '';
  const manufacturerFilter = document.getElementById('filter-manufacturer')?.value || '';
  const stockFilter = document.getElementById('filter-stock')?.value || '';

  const allMeds = MedCareDB.getMedicines();

  filteredMedicines = allMeds.filter(med => {
    // Search match: name, generic name, batch, description
    const matchSearch = !searchInput || 
      med.name.toLowerCase().includes(searchInput) ||
      (med.genericName && med.genericName.toLowerCase().includes(searchInput)) ||
      (med.batchNumber && med.batchNumber.toLowerCase().includes(searchInput));

    // Category match
    const matchCategory = !categoryFilter || med.category === categoryFilter;

    // Manufacturer match
    const matchMfg = !manufacturerFilter || med.manufacturer === manufacturerFilter;

    // Stock Status match
    let matchStock = true;
    const status = MedCareUI.getStockStatus(med);
    if (stockFilter === 'in_stock') matchStock = status.label === 'In Stock';
    else if (stockFilter === 'low_stock') matchStock = status.label === 'Low Stock';
    else if (stockFilter === 'expired') matchStock = status.label === 'Expired';
    else if (stockFilter === 'out_of_stock') matchStock = status.label === 'Out of Stock';

    return matchSearch && matchCategory && matchMfg && matchStock;
  });

  currentPage = 1;
  renderTable();
}

function renderTable() {
  const tbody = document.getElementById('medicines-tbody');
  const countEl = document.getElementById('medicine-count-display');
  if (!tbody) return;

  if (countEl) {
    countEl.innerText = `Showing ${filteredMedicines.length} of ${MedCareDB.getMedicines().length} Medicines`;
  }

  if (filteredMedicines.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="10" class="text-center py-8">
          <div class="py-6 text-slate-400">
            <i class="fa-solid fa-pills text-4xl mb-3 text-slate-300"></i>
            <p class="font-bold text-slate-700">No medicines found</p>
            <p class="text-xs text-slate-500">Try modifying your search or filter criteria.</p>
          </div>
        </td>
      </tr>
    `;
    renderPagination(0);
    return;
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const pageItems = filteredMedicines.slice(startIndex, startIndex + itemsPerPage);

  tbody.innerHTML = pageItems.map(m => {
    const status = MedCareUI.getStockStatus(m);
    const daysLeft = MedCareUI.calculateExpiryDays(m.expiryDate);

    return `
      <tr>
        <td><span class="font-mono text-xs text-slate-500">MED-${m.id.toString().slice(-4)}</span></td>
        <td>
          <div class="font-bold text-slate-900">${m.name}</div>
          <div class="text-xs text-slate-500">${m.genericName || '—'}</div>
        </td>
        <td><span class="badge badge-neutral">${m.category}</span></td>
        <td class="font-mono text-xs">${m.batchNumber || '—'}</td>
        <td class="text-xs text-slate-600">${m.manufacturer}</td>
        <td class="text-right font-mono">${MedCareUI.formatCurrency(m.purchasePrice)}</td>
        <td class="text-right font-mono font-bold text-slate-900">${MedCareUI.formatCurrency(m.sellingPrice)}</td>
        <td class="text-center">
          <span class="font-mono font-bold ${m.quantity <= m.minStockLevel ? 'text-amber-600' : 'text-slate-800'}">${m.quantity}</span>
          <span class="text-xs text-slate-400 block">Min: ${m.minStockLevel}</span>
        </td>
        <td>
          <div class="text-xs font-mono">${MedCareUI.formatDate(m.expiryDate)}</div>
          <span class="badge ${status.class} mt-1">${status.label}</span>
        </td>
        <td class="text-right">
          <div class="flex items-center justify-end gap-1">
            <button class="btn-icon" title="Edit Medicine" onclick="openEditMedicineModal(${m.id})">
              <i class="fa-solid fa-pen-to-square text-primary-600"></i>
            </button>
            <button class="btn-icon" title="Delete Medicine" onclick="deleteMedicineConfirm(${m.id})">
              <i class="fa-solid fa-trash-can text-danger-600"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  renderPagination(filteredMedicines.length);
}

function renderPagination(totalItems) {
  const container = document.getElementById('pagination-wrapper');
  if (!container) return;

  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  let pagesHtml = '';
  for (let p = 1; p <= totalPages; p++) {
    pagesHtml += `
      <button class="page-btn ${p === currentPage ? 'active' : ''}" onclick="goToPage(${p})">${p}</button>
    `;
  }

  container.innerHTML = `
    <div class="text-xs text-slate-500">
      Page ${currentPage} of ${totalPages} · Total ${totalItems} medicines
    </div>
    <div class="pagination-controls">
      <button class="page-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="goToPage(${currentPage - 1})">
        <i class="fa-solid fa-chevron-left text-xs"></i>
      </button>
      ${pagesHtml}
      <button class="page-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="goToPage(${currentPage + 1})">
        <i class="fa-solid fa-chevron-right text-xs"></i>
      </button>
    </div>
  `;
}

window.goToPage = function(page) {
  currentPage = page;
  renderTable();
};

function setupEventListeners() {
  document.getElementById('medicine-search-input')?.addEventListener('input', applyFilters);
  document.getElementById('filter-category')?.addEventListener('change', applyFilters);
  document.getElementById('filter-manufacturer')?.addEventListener('change', applyFilters);
  document.getElementById('filter-stock')?.addEventListener('change', applyFilters);

  // Reset Filters Button
  document.getElementById('reset-filters-btn')?.addEventListener('click', () => {
    document.getElementById('medicine-search-input').value = '';
    document.getElementById('filter-category').value = '';
    document.getElementById('filter-manufacturer').value = '';
    document.getElementById('filter-stock').value = '';
    applyFilters();
  });

  // Modal Form Submission
  const form = document.getElementById('medicine-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      saveMedicine();
    });
  }
}

// Modal management
window.openAddMedicineModal = function() {
  editingMedicineId = null;
  document.getElementById('modal-medicine-title').innerText = 'Add New Medicine';
  document.getElementById('medicine-form').reset();
  document.getElementById('med-id-field').value = '';
  MedCareUI.openModal('medicine-modal');
};

window.openEditMedicineModal = function(id) {
  editingMedicineId = id;
  const med = MedCareDB.getMedicines().find(m => m.id === parseInt(id, 10));
  if (!med) return;

  document.getElementById('modal-medicine-title').innerText = 'Edit Medicine Details';
  document.getElementById('med-id-field').value = med.id;
  document.getElementById('med-name').value = med.name;
  document.getElementById('med-generic').value = med.genericName || '';
  document.getElementById('med-category').value = med.category;
  document.getElementById('med-manufacturer').value = med.manufacturer;
  document.getElementById('med-batch').value = med.batchNumber;
  document.getElementById('med-purchase-price').value = med.purchasePrice;
  document.getElementById('med-selling-price').value = med.sellingPrice;
  document.getElementById('med-quantity').value = med.quantity;
  document.getElementById('med-min-stock').value = med.minStockLevel;
  document.getElementById('med-mfg-date').value = med.mfgDate || '';
  document.getElementById('med-expiry-date').value = med.expiryDate;
  document.getElementById('med-supplier').value = med.supplier || '';
  document.getElementById('med-description').value = med.description || '';

  MedCareUI.openModal('medicine-modal');
};

function saveMedicine() {
  const name = document.getElementById('med-name').value.trim();
  const category = document.getElementById('med-category').value;
  const manufacturer = document.getElementById('med-manufacturer').value.trim();
  const batchNumber = document.getElementById('med-batch').value.trim();
  const purchasePrice = parseFloat(document.getElementById('med-purchase-price').value);
  const sellingPrice = parseFloat(document.getElementById('med-selling-price').value);
  const quantity = parseInt(document.getElementById('med-quantity').value, 10);
  const minStockLevel = parseInt(document.getElementById('med-min-stock').value, 10);
  const expiryDate = document.getElementById('med-expiry-date').value;

  if (!name || !category || !batchNumber || isNaN(purchasePrice) || isNaN(sellingPrice) || isNaN(quantity) || !expiryDate) {
    MedCareUI.showToast('Please fill all mandatory fields properly.', 'danger');
    return;
  }

  const supplier = document.getElementById('med-supplier').value;
  const genericName = document.getElementById('med-generic').value.trim();
  const mfgDate = document.getElementById('med-mfg-date').value;
  const description = document.getElementById('med-description').value.trim();

  const medData = {
    name,
    genericName,
    category,
    manufacturer,
    batchNumber,
    purchasePrice,
    sellingPrice,
    quantity,
    minStockLevel,
    mfgDate,
    expiryDate,
    supplier,
    description
  };

  if (editingMedicineId) {
    MedCareDB.updateMedicine(editingMedicineId, medData);
    MedCareUI.showToast(`Updated "${name}" successfully.`, 'success');
  } else {
    MedCareDB.addMedicine(medData);
    MedCareUI.showToast(`Added "${name}" to store inventory.`, 'success');
  }

  MedCareUI.closeModal('medicine-modal');
  loadMedicines();
}

window.deleteMedicineConfirm = function(id) {
  const med = MedCareDB.getMedicines().find(m => m.id === parseInt(id, 10));
  if (!med) return;

  MedCareUI.confirmAction(`Are you sure you want to delete "${med.name}" (Batch ${med.batchNumber}) from inventory? This action cannot be undone.`, () => {
    MedCareDB.deleteMedicine(id);
    MedCareUI.showToast(`Medicine "${med.name}" deleted.`, 'warning');
    loadMedicines();
  });
};
