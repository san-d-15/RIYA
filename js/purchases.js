/**
 * MedCare - Purchase Management Module
 * Supplier Procurement, Stock Increment & Purchase Invoices
 */

document.addEventListener('DOMContentLoaded', () => {
  renderAppShell('purchases');
  initPurchasesModule();
  setupPurchaseEvents();
});

function initPurchasesModule() {
  populateSuppliersDropdown();
  populateMedicinesDropdown();
  loadPurchasesTable();

  // Check URL params for pre-selecting a low-stock medicine
  const urlParams = new URLSearchParams(window.location.search);
  const medId = urlParams.get('medicineId');
  if (medId) {
    openNewPurchaseModal(parseInt(medId, 10));
  }
}

function populateSuppliersDropdown() {
  const select = document.getElementById('purchase-supplier-select');
  if (!select) return;

  const suppliers = MedCareDB.getSuppliers();
  select.innerHTML = `<option value="">Select Supplier</option>` +
    suppliers.map(s => `<option value="${s.id}">${s.supplierName} (${s.companyName})</option>`).join('');
}

function populateMedicinesDropdown() {
  const select = document.getElementById('purchase-medicine-select');
  if (!select) return;

  const medicines = MedCareDB.getMedicines();
  select.innerHTML = `<option value="">Select Medicine to Restock</option>` +
    medicines.map(m => `<option value="${m.id}" data-price="${m.purchasePrice}" data-batch="${m.batchNumber}">${m.name} - Current Stock: ${m.quantity}</option>`).join('');
}

function loadPurchasesTable() {
  const tbody = document.getElementById('purchases-tbody');
  if (!tbody) return;

  const purchases = MedCareDB.getPurchases();
  if (purchases.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="text-center py-6 text-slate-400">No purchase records found.</td></tr>`;
    return;
  }

  tbody.innerHTML = purchases.map(p => {
    const itemCount = (p.items || []).reduce((acc, i) => acc + parseInt(i.quantity, 10), 0);
    return `
      <tr>
        <td><span class="font-mono font-bold text-primary-700">${p.purchaseInvoiceNo}</span></td>
        <td>
          <div class="font-bold text-slate-900">${p.supplierName}</div>
          <div class="text-xs text-slate-500">ID: SUP-${p.supplierId}</div>
        </td>
        <td class="font-mono text-xs">${MedCareUI.formatDate(p.date)}</td>
        <td>
          <div class="font-semibold text-slate-800">${p.items ? p.items[0]?.medicineName || 'Pharma Stock' : 'Stock Batch'}</div>
          ${p.items && p.items.length > 1 ? `<span class="text-xs text-slate-400">+ ${p.items.length - 1} more items</span>` : ''}
        </td>
        <td class="text-center font-mono font-bold">${itemCount} units</td>
        <td class="text-right font-mono font-bold text-slate-900">${MedCareUI.formatCurrency(p.totalAmount)}</td>
        <td class="text-center">
          <span class="badge badge-success">Received & Stocked</span>
        </td>
      </tr>
    `;
  }).join('');
}

function setupPurchaseEvents() {
  // When medicine is selected in purchase modal, autofill purchase price
  document.getElementById('purchase-medicine-select')?.addEventListener('change', (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const price = selectedOption.getAttribute('data-price');
    if (price) {
      document.getElementById('purchase-unit-price').value = price;
      calculatePurchaseTotal();
    }
  });

  document.getElementById('purchase-quantity')?.addEventListener('input', calculatePurchaseTotal);
  document.getElementById('purchase-unit-price')?.addEventListener('input', calculatePurchaseTotal);

  // Form submit
  document.getElementById('purchase-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    savePurchaseOrder();
  });
}

function calculatePurchaseTotal() {
  const qty = parseInt(document.getElementById('purchase-quantity')?.value, 10) || 0;
  const price = parseFloat(document.getElementById('purchase-unit-price')?.value) || 0;
  const total = qty * price;
  const totalDisplay = document.getElementById('purchase-total-display');
  if (totalDisplay) {
    totalDisplay.innerText = MedCareUI.formatCurrency(total);
  }
}

window.openNewPurchaseModal = function(preselectedMedId = null) {
  document.getElementById('purchase-form')?.reset();
  if (preselectedMedId) {
    const select = document.getElementById('purchase-medicine-select');
    if (select) {
      select.value = preselectedMedId;
      const option = select.options[select.selectedIndex];
      if (option) {
        document.getElementById('purchase-unit-price').value = option.getAttribute('data-price') || '';
      }
    }
  }
  calculatePurchaseTotal();
  MedCareUI.openModal('purchase-modal');
};

function savePurchaseOrder() {
  const supplierId = parseInt(document.getElementById('purchase-supplier-select').value, 10);
  const medicineId = parseInt(document.getElementById('purchase-medicine-select').value, 10);
  const quantity = parseInt(document.getElementById('purchase-quantity').value, 10);
  const purchasePrice = parseFloat(document.getElementById('purchase-unit-price').value);
  const batchNumber = document.getElementById('purchase-batch').value.trim();
  const expiryDate = document.getElementById('purchase-expiry').value;
  const supplierInvoice = document.getElementById('purchase-inv-no').value.trim() || `PUR-2026-${Date.now().toString().slice(-4)}`;

  if (!supplierId || !medicineId || !quantity || isNaN(purchasePrice) || !batchNumber || !expiryDate) {
    MedCareUI.showToast("Please fill all mandatory purchase fields.", "danger");
    return;
  }

  const supplier = MedCareDB.getSuppliers().find(s => s.id === supplierId);
  const medicine = MedCareDB.getMedicines().find(m => m.id === medicineId);

  const totalAmount = quantity * purchasePrice;

  const purchaseRecord = {
    purchaseInvoiceNo: supplierInvoice,
    supplierId,
    supplierName: supplier ? supplier.supplierName : 'Vendor Supply',
    totalAmount,
    items: [
      {
        medicineId,
        medicineName: medicine ? medicine.name : 'Procured Medicine',
        quantity,
        purchasePrice,
        total: totalAmount,
        batchNumber,
        expiryDate
      }
    ],
    paymentStatus: 'Paid'
  };

  // Record purchase in DB (Increases stock automatically)
  MedCareDB.recordPurchase(purchaseRecord);

  MedCareUI.showToast(`Purchase logged successfully! Stock for ${medicine.name} increased by ${quantity} units.`, "success");
  MedCareUI.closeModal('purchase-modal');
  loadPurchasesTable();
  populateMedicinesDropdown();
}
