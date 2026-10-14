/**
 * MedCare - Dashboard Analytics & Chart Visualizations
 */

document.addEventListener('DOMContentLoaded', () => {
  renderAppShell('dashboard');
  loadDashboardData();
  initDashboardCharts();
});

function loadDashboardData() {
  const medicines = MedCareDB.getMedicines();
  const categories = MedCareDB.getCategories();
  const suppliers = MedCareDB.getSuppliers();
  const customers = MedCareDB.getCustomers();
  const sales = MedCareDB.getSales();
  const purchases = MedCareDB.getPurchases();

  // Metrics computation — all values derived from the actual dataset, no hardcoded offsets
  const totalMeds = medicines.length;
  const lowStockMeds = medicines.filter(m => m.quantity <= m.minStockLevel && MedCareUI.calculateExpiryDays(m.expiryDate) > 0);
  const expiredMeds = medicines.filter(m => MedCareUI.calculateExpiryDays(m.expiryDate) <= 0);

  // Today's metrics include only records dated today; an empty day is zero.
  const todayStr = localDateKey();
  const todaySales = sales.filter(s => s.date === todayStr);
  const todaySalesTotal = todaySales.reduce((acc, s) => acc + (s.grandTotal || 0), 0);
  const todayPurchasesTotal = purchases
    .filter(p => p.date === todayStr)
    .reduce((acc, p) => acc + (p.totalAmount || 0), 0);

  // Populate Stat Card Values
  document.getElementById('stat-total-medicines').innerText = totalMeds.toLocaleString('en-IN');
  document.getElementById('stat-total-categories').innerText = categories.length;
  document.getElementById('stat-low-stock').innerText = lowStockMeds.length.toString();
  document.getElementById('stat-expired').innerText = expiredMeds.length.toString();
  document.getElementById('stat-today-sales').innerText = '₹' + Math.round(todaySalesTotal).toLocaleString('en-IN');
  document.getElementById('stat-today-purchases').innerText = '₹' + Math.round(todayPurchasesTotal).toLocaleString('en-IN');
  document.getElementById('stat-total-customers').innerText = customers.length.toString();
  document.getElementById('stat-total-suppliers').innerText = suppliers.length.toString();

  // Render Recent Sales Table
  const recentSalesBody = document.getElementById('recent-sales-tbody');
  if (recentSalesBody) {
    if (sales.length === 0) {
      recentSalesBody.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-slate-400">No sales have been recorded.</td></tr>`;
    } else {
      recentSalesBody.innerHTML = sales.slice(0, 5).map(sale => `
        <tr>
          <td><span class="font-mono font-bold text-primary-700">${sale.invoiceNumber}</span></td>
          <td>
            <div class="font-semibold text-slate-800">${sale.customerName}</div>
            <div class="text-xs text-slate-400">${sale.customerPhone || ''}</div>
          </td>
          <td><span class="badge badge-neutral">${sale.items ? sale.items.length : 1} items</span></td>
          <td><span class="badge badge-primary">${sale.paymentMethod || 'Cash'}</span></td>
          <td class="font-mono font-bold text-slate-900">${MedCareUI.formatCurrency(sale.grandTotal)}</td>
          <td>
            <button class="btn btn-outline btn-sm" onclick="viewSaleDetails(${sale.id})">
              <i class="fa-regular fa-eye"></i> View
            </button>
          </td>
        </tr>
      `).join('');
    }
  }

  // Render Low Stock Alert List
  const lowStockListEl = document.getElementById('low-stock-alert-list');
  if (lowStockListEl) {
    const criticalMeds = medicines.filter(m => m.quantity <= m.minStockLevel && m.quarantineStatus !== 'Quarantined').slice(0, 4);
    lowStockListEl.innerHTML = criticalMeds.map(m => `
      <div class="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition">
        <div>
          <h4 class="font-bold text-slate-800 text-sm">${m.name}</h4>
          <p class="text-xs text-slate-500">${m.category} · Min: ${m.minStockLevel} units</p>
        </div>
        <div class="text-right">
          <span class="badge badge-warning font-mono font-bold">${m.quantity} left</span>
          <div class="mt-1">
            <a href="purchases.html?medicineId=${m.id}" class="text-xs text-primary-600 font-semibold hover:underline">Reorder <i class="fa-solid fa-arrow-right ms-1"></i></a>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Render Expired Alert List
  const expiredListEl = document.getElementById('expired-alert-list');
  if (expiredListEl) {
    const expiredList = medicines.filter(m => MedCareUI.calculateExpiryDays(m.expiryDate) <= 60 && m.quarantineStatus !== 'Quarantined').slice(0, 4);
    expiredListEl.innerHTML = expiredList.map(m => {
      const days = MedCareUI.calculateExpiryDays(m.expiryDate);
      const isExpired = days <= 0;
      return `
        <div class="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition">
          <div>
            <h4 class="font-bold text-slate-800 text-sm">${m.name}</h4>
            <p class="text-xs text-slate-500">Batch: <span class="font-mono">${m.batchNumber}</span> · Exp: ${MedCareUI.formatDate(m.expiryDate)}</p>
          </div>
          <div class="text-right">
            <span class="badge ${isExpired ? 'badge-danger' : 'badge-warning'} font-mono font-bold">
              ${isExpired ? 'Expired' : days + ' days left'}
            </span>
            <div class="mt-1">
              <a href="expiry.html?filter=${isExpired ? 'expired' : '60days'}" class="text-xs text-slate-600 hover:text-danger-600 font-semibold">Review expiry</a>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }
}

function initDashboardCharts() {
  if (typeof Chart === 'undefined') return;

  const today = new Date();
  const dayKeys = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - (6 - index));
    return {
      key: localDateKey(date),
      label: date.toLocaleDateString(undefined, { weekday: 'short' })
    };
  });
  const salesByDay = new Map(dayKeys.map(day => [day.key, 0]));
  const purchasesByDay = new Map(dayKeys.map(day => [day.key, 0]));
  MedCareDB.getSales().forEach(sale => {
    if (salesByDay.has(sale.date)) salesByDay.set(sale.date, salesByDay.get(sale.date) + (sale.grandTotal || 0));
  });
  MedCareDB.getPurchases().forEach(purchase => {
    if (purchasesByDay.has(purchase.date)) purchasesByDay.set(purchase.date, purchasesByDay.get(purchase.date) + (purchase.totalAmount || 0));
  });

  const salesChartCtx = document.getElementById('salesRevenueChart')?.getContext('2d');
  if (salesChartCtx) {
    new Chart(salesChartCtx, {
      type: 'line',
      data: {
        labels: dayKeys.map(day => day.label),
        datasets: [
          {
            label: 'Sales Revenue (₹)',
            data: dayKeys.map(day => salesByDay.get(day.key)),
            borderColor: '#0284c7',
            backgroundColor: 'rgba(2, 132, 199, 0.08)',
            borderWidth: 2.5,
            fill: true,
            tension: 0.35,
            pointBackgroundColor: '#0284c7',
            pointRadius: 4
          },
          {
            label: 'Stock Purchases (₹)',
            data: dayKeys.map(day => purchasesByDay.get(day.key)),
            borderColor: '#059669',
            backgroundColor: 'rgba(5, 150, 105, 0.04)',
            borderWidth: 2,
            borderDash: [5, 5],
            fill: false,
            tension: 0.35,
            pointBackgroundColor: '#059669',
            pointRadius: 3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: { font: { family: 'Plus Jakarta Sans', size: 12, weight: 600 } }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.dataset.label}: ₹${context.raw.toLocaleString('en-IN')}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: val => '₹' + (val / 1000) + 'k',
              font: { family: 'IBM Plex Mono' }
            },
            grid: { color: 'rgba(226, 232, 240, 0.6)' }
          },
          x: {
            grid: { display: false },
            ticks: { font: { family: 'Plus Jakarta Sans', weight: 500 } }
          }
        }
      }
    });
  }

  const categoryStock = new Map();
  MedCareDB.getMedicines().forEach(medicine => {
    const category = medicine.category || 'Uncategorized';
    categoryStock.set(category, (categoryStock.get(category) || 0) + Math.max(0, medicine.quantity || 0));
  });
  const categoryEntries = [...categoryStock.entries()];
  const chartColors = ['#0284c7', '#059669', '#8b5cf6', '#f59e0b', '#06b6d4', '#64748b', '#e11d48', '#84cc16'];

  const stockCategoryCtx = document.getElementById('stockCategoryChart')?.getContext('2d');
  if (stockCategoryCtx) {
    new Chart(stockCategoryCtx, {
      type: 'doughnut',
      data: {
        labels: categoryEntries.map(([name]) => name),
        datasets: [{
          data: categoryEntries.map(([, quantity]) => quantity),
          backgroundColor: categoryEntries.map((_, index) => chartColors[index % chartColors.length]),
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { boxWidth: 12, font: { family: 'Plus Jakarta Sans', size: 11 } }
          }
        },
        cutout: '70%'
      }
    });
  }
}

// Global helper to view sale details in modal
window.viewSaleDetails = function(saleId) {
  const sale = MedCareDB.getSales().find(s => s.id === parseInt(saleId, 10));
  if (!sale) return;

  const modalBody = document.getElementById('sale-detail-modal-body');
  if (modalBody) {
    modalBody.innerHTML = `
      <div class="invoice-print-container">
        <div class="invoice-header-row">
          <div class="invoice-brand">
            <img src="/assets/logo.svg" alt="MedCare Logo" style="height: 44px; width: auto; object-fit: contain;">
            <div>
              <h2>${MedCareDB.getSettings().storeName}</h2>
              <p class="text-xs text-slate-500">${MedCareDB.getSettings().storeAddress}</p>
              <p class="text-xs text-slate-500">GSTIN: ${MedCareDB.getSettings().gstNumber} · DL: ${MedCareDB.getSettings().drugLicenseNo}</p>
            </div>
          </div>
          <div class="invoice-meta-block">
            <div class="inv-num">${sale.invoiceNumber}</div>
            <p class="text-slate-500 text-xs">Date: ${MedCareUI.formatDate(sale.date)} ${sale.time || ''}</p>
            <p class="text-slate-500 text-xs">Payment: <span class="font-bold text-slate-800">${sale.paymentMethod || 'Cash'}</span></p>
          </div>
        </div>

        <div class="invoice-details-grid">
          <div class="inv-detail-box">
            <h4>Billed To (Patient / Customer):</h4>
            <p class="font-bold text-slate-900">${sale.customerName}</p>
            <p class="text-xs text-slate-500">Phone: ${sale.customerPhone || 'N/A'}</p>
          </div>
          <div class="inv-detail-box">
            <h4>Dispensed By:</h4>
            <p class="font-bold text-slate-900">${sale.userName || 'Registered Pharmacist'}</p>
            <p class="text-xs text-slate-500">Terminal: POS-Counter-01</p>
          </div>
        </div>

        <table class="invoice-items-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Medicine Description</th>
              <th class="text-center">Qty</th>
              <th class="text-right">Unit Price</th>
              <th class="text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            ${(sale.items || []).map((item, idx) => `
              <tr>
                <td>${idx + 1}</td>
                <td><span class="font-semibold text-slate-800">${item.name}</span></td>
                <td class="text-center font-mono">${item.quantity}</td>
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
            <div class="invoice-summary-row">
              <span>Discount (${sale.discountPercent}%):</span>
              <span class="font-mono text-emerald-600">- ${MedCareUI.formatCurrency(sale.discountAmount)}</span>
            </div>
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
          <p>Thank you for choosing MedCare. Medicines once sold cannot be returned without original prescription & invoice.</p>
        </div>
      </div>
    `;
    MedCareUI.openModal('sale-detail-modal');
  }
};
