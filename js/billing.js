/**
 * MedCare - Pharmacy POS Billing Module
 * Live Search, Dynamic Cart Calculations, Stock Control & Print Invoice
 */

let cart = [];
let selectedCustomer = null;
let currentPaymentMethod = 'Cash';

function getTaxRate() {
  const configuredTaxRate = Number(MedCareDB.getSettings().taxRate);
  return Number.isFinite(configuredTaxRate) && configuredTaxRate >= 0 ? configuredTaxRate : 5.0;
}

document.addEventListener('DOMContentLoaded', () => {
  renderAppShell('sales');
  initBillingModule();
  setupBillingEvents();
});

function initBillingModule() {
  renderMedicineCatalog();
  populateCustomerSelect();
  renderCart();
  updateTotals();
}

function renderMedicineCatalog(searchQuery = '', selectedCategory = '') {
  const container = document.getElementById('pos-medicine-list');
  if (!container) return;

  const medicines = MedCareDB.getMedicines();
  const search = searchQuery.toLowerCase().trim();

  const filtered = medicines.filter(m => {
    const matchSearch = !search || 
      m.name.toLowerCase().includes(search) || 
      (m.genericName && m.genericName.toLowerCase().includes(search)) ||
      (m.batchNumber && m.batchNumber.toLowerCase().includes(search));
    const matchCat = !selectedCategory || m.category === selectedCategory;
    return matchSearch && matchCat;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="text-center py-8 text-slate-400">
        <i class="fa-solid fa-prescription-bottle text-3xl mb-2"></i>
        <p class="text-sm font-semibold">No medicines match "${searchQuery}"</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(m => {
    const isOut = m.quantity <= 0;
    const isLow = m.quantity <= m.minStockLevel;
    const daysLeft = MedCareUI.calculateExpiryDays(m.expiryDate);
    const isExpired = daysLeft <= 0;

    return `
      <div class="pos-med-card ${isOut || isExpired ? 'out-of-stock' : ''}" onclick="addToCart(${m.id})">
        <div class="pos-med-info">
          <h4>${m.name}</h4>
          <p>${m.category} · Batch: <span class="font-mono">${m.batchNumber}</span></p>
          <div class="mt-1 flex items-center gap-2">
            ${isExpired ? '<span class="badge badge-danger">Expired</span>' : 
              (isOut ? '<span class="badge badge-danger">Out of Stock</span>' : 
              (isLow ? `<span class="badge badge-warning">${m.quantity} Left (Low)</span>` : 
              `<span class="badge badge-success">${m.quantity} in stock</span>`))}
            <span class="text-xs text-slate-400">Exp: ${MedCareUI.formatDate(m.expiryDate)}</span>
          </div>
        </div>
        <div class="pos-med-pricing">
          <div class="price font-mono">${MedCareUI.formatCurrency(m.sellingPrice)}</div>
          <button class="btn btn-outline btn-sm mt-1" ${isOut || isExpired ? 'disabled' : ''}>
            <i class="fa-solid fa-plus text-xs"></i> Add
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function populateCustomerSelect() {
  const select = document.getElementById('billing-customer-select');
  if (!select) return;

  const customers = MedCareDB.getCustomers();
  select.innerHTML = `<option value="">Walk-in Customer (General Patient)</option>` +
    customers.map(c => `<option value="${c.id}">${c.customerName} - ${c.phone}</option>`).join('');
}

window.addToCart = function(medId) {
  const med = MedCareDB.getMedicines().find(m => m.id === parseInt(medId, 10));
  if (!med) return;

  const daysLeft = MedCareUI.calculateExpiryDays(med.expiryDate);
  if (daysLeft <= 0) {
    MedCareUI.showToast(`Cannot sell "${med.name}": Batch is expired.`, 'danger');
    return;
  }

  if (med.quantity <= 0) {
    MedCareUI.showToast(`Cannot sell "${med.name}": Item is out of stock.`, 'danger');
    return;
  }

  const existing = cart.find(item => item.medicineId === med.id);
  if (existing) {
    if (existing.quantity >= med.quantity) {
      MedCareUI.showToast(`Maximum available stock reached for ${med.name} (${med.quantity} units).`, 'warning');
      return;
    }
    existing.quantity++;
    existing.total = existing.quantity * existing.unitPrice;
  } else {
    cart.push({
      medicineId: med.id,
      name: med.name,
      batchNumber: med.batchNumber,
      unitPrice: med.sellingPrice,
      quantity: 1,
      availableStock: med.quantity,
      total: med.sellingPrice
    });
  }

  renderCart();
  updateTotals();
};

window.updateCartQty = function(medId, change) {
  const item = cart.find(i => i.medicineId === parseInt(medId, 10));
  if (!item) return;

  const newQty = item.quantity + change;
  if (newQty <= 0) {
    removeFromCart(medId);
    return;
  }

  if (newQty > item.availableStock) {
    MedCareUI.showToast(`Cannot exceed current stock level of ${item.availableStock}.`, 'warning');
    return;
  }

  item.quantity = newQty;
  item.total = item.quantity * item.unitPrice;
  renderCart();
  updateTotals();
};

window.setCartQtyDirect = function(medId, inputVal) {
  const item = cart.find(i => i.medicineId === parseInt(medId, 10));
  if (!item) return;

  let qty = parseInt(inputVal, 10);
  if (isNaN(qty) || qty <= 0) qty = 1;
  if (qty > item.availableStock) {
    qty = item.availableStock;
    MedCareUI.showToast(`Set to max available stock (${item.availableStock}).`, 'warning');
  }

  item.quantity = qty;
  item.total = item.quantity * item.unitPrice;
  renderCart();
  updateTotals();
};

window.removeFromCart = function(medId) {
  cart = cart.filter(i => i.medicineId !== parseInt(medId, 10));
  renderCart();
  updateTotals();
};

window.clearCart = function() {
  if (cart.length === 0) return;
  MedCareUI.confirmAction("Are you sure you want to clear all items in the current bill?", () => {
    cart = [];
    renderCart();
    updateTotals();
    MedCareUI.showToast("Current billing cart cleared.", "info");
  });
};

function renderCart() {
  const container = document.getElementById('cart-items-container');
  const cartBadge = document.getElementById('cart-count-badge');
  if (!container) return;

  if (cartBadge) {
    const totalQty = cart.reduce((acc, i) => acc + i.quantity, 0);
    cartBadge.innerText = `${cart.length} items (${totalQty} units)`;
  }

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="text-center py-16 text-slate-400">
        <i class="fa-solid fa-cart-shopping text-4xl mb-3 text-slate-300"></i>
        <p class="font-bold text-slate-700">Billing Cart is Empty</p>
        <p class="text-xs text-slate-500 mt-1">Select medicines from the catalog on the left to add items.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item-row">
      <div>
        <div class="font-bold text-slate-900 text-sm">${item.name}</div>
        <div class="text-xs text-slate-500 font-mono">Batch: ${item.batchNumber}</div>
      </div>
      <div class="qty-control">
        <button type="button" onclick="updateCartQty(${item.medicineId}, -1)">
          <i class="fa-solid fa-minus"></i>
        </button>
        <input type="text" value="${item.quantity}" onchange="setCartQtyDirect(${item.medicineId}, this.value)">
        <button type="button" onclick="updateCartQty(${item.medicineId}, 1)">
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>
      <div class="text-right font-mono text-sm">${MedCareUI.formatCurrency(item.unitPrice)}</div>
      <div class="text-right font-mono font-bold text-primary-700">${MedCareUI.formatCurrency(item.total)}</div>
      <div class="text-center">
        <button class="btn-icon" onclick="removeFromCart(${item.medicineId})" title="Remove item">
          <i class="fa-solid fa-xmark text-danger-500"></i>
        </button>
      </div>
    </div>
  `).join('');
}

function updateTotals() {
  const subtotal = cart.reduce((acc, i) => acc + i.total, 0);
  const discountInput = document.getElementById('discount-percentage');
  const discountPercent = discountInput ? (Number(discountInput.value) || 0) : 0;
  const discountValid = Number.isFinite(discountPercent) && discountPercent >= 0 && discountPercent <= 100;
  const discountError = document.getElementById('discount-validation-message');
  if (discountInput) {
    discountInput.setCustomValidity(discountValid ? '' : 'Discount must be between 0 and 100%.');
    discountInput.setAttribute('aria-invalid', String(!discountValid));
  }
  if (discountError) {
    discountError.classList.toggle('hidden', discountValid);
  }
  const appliedDiscountPercent = discountValid ? discountPercent : 0;
  const discountAmount = (subtotal * appliedDiscountPercent) / 100;

  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const taxRate = getTaxRate();
  const taxAmount = (taxableAmount * taxRate) / 100;
  const grandTotal = taxableAmount + taxAmount;

  document.getElementById('pos-subtotal').innerText = MedCareUI.formatCurrency(subtotal);
  document.getElementById('pos-discount-amount').innerText = `- ${MedCareUI.formatCurrency(discountAmount)}`;
  document.getElementById('pos-tax-amount').innerText = `+ ${MedCareUI.formatCurrency(taxAmount)}`;
  document.getElementById('pos-grand-total').innerText = MedCareUI.formatCurrency(grandTotal);

  const checkoutBtn = document.getElementById('pos-checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.disabled = cart.length === 0 || !discountValid;
  }
}

function setupBillingEvents() {
  // Live medicine search
  document.getElementById('pos-search-input')?.addEventListener('input', (e) => {
    const category = document.getElementById('pos-category-filter')?.value || '';
    renderMedicineCatalog(e.target.value, category);
  });

  // Category filter buttons or dropdown
  document.getElementById('pos-category-filter')?.addEventListener('change', (e) => {
    const query = document.getElementById('pos-search-input')?.value || '';
    renderMedicineCatalog(query, e.target.value);
  });

  // Discount change
  document.getElementById('discount-percentage')?.addEventListener('input', updateTotals);

  // Payment method buttons
  const paymentBtns = document.querySelectorAll('.payment-method-btn');
  paymentBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      paymentBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentPaymentMethod = btn.dataset.method || 'Cash';
    });
  });

  // Customer dropdown
  document.getElementById('billing-customer-select')?.addEventListener('change', (e) => {
    const custId = parseInt(e.target.value, 10);
    selectedCustomer = MedCareDB.getCustomers().find(c => c.id === custId) || null;
  });

  // Complete & Generate Invoice
  document.getElementById('pos-checkout-btn')?.addEventListener('click', completeSale);
}

function completeSale() {
  if (cart.length === 0) {
    MedCareUI.showToast("Cannot complete sale: Cart is empty.", "warning");
    return;
  }

  const subtotal = cart.reduce((acc, i) => acc + i.total, 0);
  const discountInput = document.getElementById('discount-percentage');
  const discountPercent = Number(discountInput?.value) || 0;
  if (!Number.isFinite(discountPercent) || discountPercent < 0 || discountPercent > 100) {
    MedCareUI.showToast('Discount must be between 0 and 100%. Sale was not completed.', 'danger');
    discountInput?.reportValidity();
    return;
  }
  const discountAmount = (subtotal * discountPercent) / 100;
  const taxable = subtotal - discountAmount;
  const taxRate = getTaxRate();
  const taxAmount = (taxable * taxRate) / 100;
  const grandTotal = taxable + taxAmount;

  const customerId = selectedCustomer ? selectedCustomer.id : null;
  const customerName = selectedCustomer ? selectedCustomer.customerName : 'Walk-in Customer';
  const customerPhone = selectedCustomer ? selectedCustomer.phone : '';

  const salePayload = {
    customerId,
    customerName,
    customerPhone,
    userId: MedCareAuth.getCurrentUser().id,
    userName: MedCareAuth.getCurrentUser().name,
    items: [...cart],
    subtotal,
    discountPercent,
    discountAmount,
    taxPercent: taxRate,
    taxAmount,
    grandTotal,
    paymentMethod: currentPaymentMethod
  };

  // Record sale in DB (Decreases medicine stock automatically)
  const savedSale = MedCareDB.recordSale(salePayload);
  if (!savedSale) return;

  MedCareUI.showToast(`Sale completed! Invoice ${savedSale.invoiceNumber} generated.`, 'success');

  // Display printable invoice modal
  displayInvoiceModal(savedSale);

  // Reset cart
  cart = [];
  renderCart();
  updateTotals();
  renderMedicineCatalog(); // Re-render to show updated quantities
}

function displayInvoiceModal(sale) {
  const container = document.getElementById('invoice-render-box');
  if (!container) return;

  const settings = MedCareDB.getSettings();

  container.innerHTML = `
    <div class="invoice-print-container" id="printable-bill-area">
      <div class="invoice-header-row">
        <div class="invoice-brand">
          <img src="/assets/logo.svg" alt="MedCare Logo" style="height: 44px; width: auto; object-fit: contain;">
          <div>
            <h2>${settings.storeName}</h2>
            <p class="text-xs text-slate-600">${settings.storeAddress}</p>
            <p class="text-xs text-slate-500">${settings.city} · Ph: ${settings.phone}</p>
            <p class="text-xs text-slate-500 font-mono">GSTIN: ${settings.gstNumber} | Drug Lic: ${settings.drugLicenseNo}</p>
          </div>
        </div>
        <div class="invoice-meta-block">
          <div class="inv-num text-primary-700">${sale.invoiceNumber}</div>
          <p class="text-slate-600 text-xs">Date: ${MedCareUI.formatDate(sale.date)} ${sale.time}</p>
          <p class="text-slate-600 text-xs">Payment Mode: <strong class="text-slate-900">${sale.paymentMethod}</strong></p>
          <p class="text-slate-500 text-xs">Cashier: ${sale.userName}</p>
        </div>
      </div>

      <div class="invoice-details-grid">
        <div class="inv-detail-box">
          <h4>Patient / Customer Details:</h4>
          <p class="font-bold text-slate-900">${sale.customerName}</p>
          <p class="text-xs text-slate-500">Phone: ${sale.customerPhone || 'Not Provided'}</p>
        </div>
        <div class="inv-detail-box">
          <h4>Prescription & Dispensing:</h4>
          <p class="text-slate-800 text-sm font-semibold">Store Dispensed Counter</p>
          <p class="text-xs text-slate-500">Verified by Registered Pharmacist</p>
        </div>
      </div>

      <table class="invoice-items-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Medicine Name</th>
            <th>Batch No</th>
            <th class="text-center">Qty</th>
            <th class="text-right">Price</th>
            <th class="text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${sale.items.map((item, idx) => `
            <tr>
              <td>${idx + 1}</td>
              <td><strong class="text-slate-900">${item.name}</strong></td>
              <td class="font-mono text-xs">${item.batchNumber || '—'}</td>
              <td class="text-center font-mono font-bold">${item.quantity}</td>
              <td class="text-right font-mono">${MedCareUI.formatCurrency(item.unitPrice)}</td>
              <td class="text-right font-mono font-bold">${MedCareUI.formatCurrency(item.total)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="invoice-summary-box">
        <div class="invoice-summary-inner">
          <div class="invoice-summary-row">
            <span>Subtotal:</span>
            <span class="font-mono">${MedCareUI.formatCurrency(sale.subtotal)}</span>
          </div>
          ${sale.discountAmount > 0 ? `
            <div class="invoice-summary-row">
              <span>Discount (${sale.discountPercent}%):</span>
              <span class="font-mono text-emerald-600">- ${MedCareUI.formatCurrency(sale.discountAmount)}</span>
            </div>
          ` : ''}
          <div class="invoice-summary-row">
            <span>GST (${sale.taxPercent}%):</span>
            <span class="font-mono">+ ${MedCareUI.formatCurrency(sale.taxAmount)}</span>
          </div>
          <div class="invoice-summary-row total">
            <span>Grand Total:</span>
            <span class="font-mono">${MedCareUI.formatCurrency(sale.grandTotal)}</span>
          </div>
        </div>
      </div>

      <div class="invoice-footer-notes">
        <p class="font-bold text-slate-800">Thank you for your visit! Wishing you a speedy recovery.</p>
        <p class="text-xs text-slate-400 mt-1">Please keep medicines in a cool, dry place away from direct sunlight.</p>
        <div class="mt-4 pt-4 border-t border-slate-200 flex justify-between items-center text-xs text-slate-400">
          <span>Electronically Generated Invoice (No physical signature required)</span>
          <span>Powered by MedCare System</span>
        </div>
      </div>
    </div>
  `;

  MedCareUI.openModal('invoice-modal');
}

window.printInvoice = function() {
  window.print();
};
