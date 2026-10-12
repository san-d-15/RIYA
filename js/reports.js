/**
 * MedCare - Comprehensive Pharma Reports & Analytics
 * Daily/Monthly Sales, Purchases, Stock Valuation, CSV/PDF Export & Printing
 */

let currentReportType = 'sales_daily';
let reportData = [];

document.addEventListener('DOMContentLoaded', () => {
  renderAppShell('reports');
  initReports();
  setupReportEvents();
});

function initReports() {
  // Set default dates
  const today = new Date().toISOString().split('T')[0];
  const startDateInput = document.getElementById('report-start-date');
  const endDateInput = document.getElementById('report-end-date');
  if (startDateInput) startDateInput.value = '2026-09-01';
  if (endDateInput) endDateInput.value = today;

  generateReport();
}

function setupReportEvents() {
  document.getElementById('report-type-select')?.addEventListener('change', (e) => {
    currentReportType = e.target.value;
    generateReport();
  });

  document.getElementById('btn-generate-report')?.addEventListener('click', generateReport);
  document.getElementById('btn-export-csv')?.addEventListener('click', exportToCSV);
  document.getElementById('btn-print-report')?.addEventListener('click', () => window.print());
}

function generateReport() {
  const type = document.getElementById('report-type-select')?.value || 'sales_daily';
  const startDate = document.getElementById('report-start-date')?.value || '';
  const endDate = document.getElementById('report-end-date')?.value || '';

  const tableHead = document.getElementById('report-table-head');
  const tableBody = document.getElementById('report-table-body');
  const titleEl = document.getElementById('report-title-display');
  const summaryBox = document.getElementById('report-metric-summary');

  if (!tableHead || !tableBody) return;

  reportData = [];

  if (type === 'sales_daily' || type === 'sales_monthly') {
    const sales = MedCareDB.getSales();
    reportData = sales.filter(s => (!startDate || s.date >= startDate) && (!endDate || s.date <= endDate));

    const totalRevenue = reportData.reduce((acc, s) => acc + (s.grandTotal || 0), 0);
    const totalTax = reportData.reduce((acc, s) => acc + (s.taxAmount || 0), 0);
    const totalDiscount = reportData.reduce((acc, s) => acc + (s.discountAmount || 0), 0);

    titleEl.innerText = type === 'sales_daily' ? 'Daily Sales & Revenue Report' : 'Monthly Sales Aggregation Report';
    summaryBox.innerHTML = `
      <div class="stat-card blue">
        <div class="stat-content">
          <p class="stat-label">Total Invoices</p>
          <h3 class="stat-value">${reportData.length}</h3>
        </div>
      </div>
      <div class="stat-card green">
        <div class="stat-content">
          <p class="stat-label">Gross Revenue</p>
          <h3 class="stat-value font-mono">${MedCareUI.formatCurrency(totalRevenue)}</h3>
        </div>
      </div>
      <div class="stat-card amber">
        <div class="stat-content">
          <p class="stat-label">Tax Collected (GST)</p>
          <h3 class="stat-value font-mono">${MedCareUI.formatCurrency(totalTax)}</h3>
        </div>
      </div>
      <div class="stat-card sky">
        <div class="stat-content">
          <p class="stat-label">Total Discounts Given</p>
          <h3 class="stat-value font-mono">${MedCareUI.formatCurrency(totalDiscount)}</h3>
        </div>
      </div>
    `;

    tableHead.innerHTML = `
      <tr>
        <th>Invoice #</th>
        <th>Date & Time</th>
        <th>Customer Name</th>
        <th>Payment</th>
        <th class="text-right">Subtotal</th>
        <th class="text-right">GST</th>
        <th class="text-right">Grand Total</th>
      </tr>
    `;

    tableBody.innerHTML = reportData.map(s => `
      <tr>
        <td><span class="font-mono font-bold text-primary-700">${s.invoiceNumber}</span></td>
        <td class="font-mono text-xs">${MedCareUI.formatDate(s.date)} ${s.time || ''}</td>
        <td><strong class="text-slate-900">${s.customerName}</strong></td>
        <td><span class="badge badge-primary">${s.paymentMethod || 'Cash'}</span></td>
        <td class="text-right font-mono">${MedCareUI.formatCurrency(s.subtotal)}</td>
        <td class="text-right font-mono">${MedCareUI.formatCurrency(s.taxAmount)}</td>
        <td class="text-right font-mono font-bold text-slate-900">${MedCareUI.formatCurrency(s.grandTotal)}</td>
      </tr>
    `).join('');

  } else if (type === 'purchases') {
    const purchases = MedCareDB.getPurchases();
    reportData = purchases.filter(p => (!startDate || p.date >= startDate) && (!endDate || p.date <= endDate));
    const totalPurchased = reportData.reduce((acc, p) => acc + (p.totalAmount || 0), 0);

    titleEl.innerText = 'Stock Purchases & Procurement Report';
    summaryBox.innerHTML = `
      <div class="stat-card green">
        <div class="stat-content">
          <p class="stat-label">Purchase Orders</p>
          <h3 class="stat-value">${reportData.length}</h3>
        </div>
      </div>
      <div class="stat-card blue">
        <div class="stat-content">
          <p class="stat-label">Total Outflow</p>
          <h3 class="stat-value font-mono">${MedCareUI.formatCurrency(totalPurchased)}</h3>
        </div>
      </div>
    `;

    tableHead.innerHTML = `
      <tr>
        <th>Order Ref</th>
        <th>Date</th>
        <th>Supplier</th>
        <th>Items Received</th>
        <th class="text-right">Order Valuation</th>
      </tr>
    `;

    tableBody.innerHTML = reportData.map(p => `
      <tr>
        <td><span class="font-mono font-bold">${p.purchaseInvoiceNo}</span></td>
        <td class="font-mono text-xs">${MedCareUI.formatDate(p.date)}</td>
        <td><strong>${p.supplierName}</strong></td>
        <td>${p.items ? p.items.map(i => `${i.medicineName} (${i.quantity})`).join(', ') : 'Stock'}</td>
        <td class="text-right font-mono font-bold text-slate-900">${MedCareUI.formatCurrency(p.totalAmount)}</td>
      </tr>
    `).join('');

  } else if (type === 'stock') {
    const medicines = MedCareDB.getMedicines();
    reportData = [...medicines];
    const totalQty = medicines.reduce((acc, m) => acc + m.quantity, 0);
    const stockValuation = medicines.reduce((acc, m) => acc + (m.quantity * m.sellingPrice), 0);

    titleEl.innerText = 'Comprehensive Inventory Stock Report';
    summaryBox.innerHTML = `
      <div class="stat-card blue">
        <div class="stat-content">
          <p class="stat-label">Total SKUs</p>
          <h3 class="stat-value">${medicines.length}</h3>
        </div>
      </div>
      <div class="stat-card green">
        <div class="stat-content">
          <p class="stat-label">Total Units on Hand</p>
          <h3 class="stat-value">${totalQty.toLocaleString('en-IN')}</h3>
        </div>
      </div>
      <div class="stat-card sky">
        <div class="stat-content">
          <p class="stat-label">Total Stock Value (MRP)</p>
          <h3 class="stat-value font-mono">${MedCareUI.formatCurrency(stockValuation)}</h3>
        </div>
      </div>
    `;

    tableHead.innerHTML = `
      <tr>
        <th>Medicine Name</th>
        <th>Category</th>
        <th>Batch</th>
        <th class="text-center">Current Stock</th>
        <th class="text-right">Selling Price</th>
        <th class="text-right">Total Valuation</th>
        <th>Status</th>
      </tr>
    `;

    tableBody.innerHTML = reportData.map(m => {
      const status = MedCareUI.getStockStatus(m);
      return `
        <tr>
          <td><strong>${m.name}</strong></td>
          <td>${m.category}</td>
          <td class="font-mono text-xs">${m.batchNumber}</td>
          <td class="text-center font-mono font-bold">${m.quantity}</td>
          <td class="text-right font-mono">${MedCareUI.formatCurrency(m.sellingPrice)}</td>
          <td class="text-right font-mono font-bold">${MedCareUI.formatCurrency(m.quantity * m.sellingPrice)}</td>
          <td><span class="badge ${status.class}">${status.label}</span></td>
        </tr>
      `;
    }).join('');

  } else if (type === 'low_stock') {
    const medicines = MedCareDB.getMedicines().filter(m => m.quantity <= m.minStockLevel);
    reportData = [...medicines];

    titleEl.innerText = 'Low Stock Alert & Critical Reorder Report';
    summaryBox.innerHTML = `
      <div class="stat-card amber">
        <div class="stat-content">
          <p class="stat-label">Understocked Medicines</p>
          <h3 class="stat-value">${medicines.length}</h3>
        </div>
      </div>
    `;

    tableHead.innerHTML = `
      <tr>
        <th>Medicine Name</th>
        <th>Category</th>
        <th>Manufacturer</th>
        <th class="text-center">Current Stock</th>
        <th class="text-center">Min Required</th>
        <th>Preferred Supplier</th>
      </tr>
    `;

    tableBody.innerHTML = reportData.map(m => `
      <tr>
        <td><strong>${m.name}</strong></td>
        <td>${m.category}</td>
        <td>${m.manufacturer}</td>
        <td class="text-center font-mono font-bold text-amber-600">${m.quantity}</td>
        <td class="text-center font-mono">${m.minStockLevel}</td>
        <td>${m.supplier || 'Any Authorized Vendor'}</td>
      </tr>
    `).join('');

  } else if (type === 'expired') {
    const medicines = MedCareDB.getMedicines().filter(m => MedCareUI.calculateExpiryDays(m.expiryDate) <= 0);
    reportData = [...medicines];

    titleEl.innerText = 'Expired Drugs & Quarantine Report';
    summaryBox.innerHTML = `
      <div class="stat-card red">
        <div class="stat-content">
          <p class="stat-label">Expired Batches</p>
          <h3 class="stat-value">${medicines.length}</h3>
        </div>
      </div>
    `;

    tableHead.innerHTML = `
      <tr>
        <th>Medicine Name</th>
        <th>Batch Number</th>
        <th>Expired Date</th>
        <th class="text-center">Quantity Quarantined</th>
        <th>Manufacturer</th>
        <th>Supplier</th>
      </tr>
    `;

    tableBody.innerHTML = reportData.map(m => `
      <tr>
        <td><strong>${m.name}</strong></td>
        <td class="font-mono text-xs font-bold text-danger-600">${m.batchNumber}</td>
        <td class="font-mono text-xs">${MedCareUI.formatDate(m.expiryDate)}</td>
        <td class="text-center font-mono font-bold">${m.quantity}</td>
        <td>${m.manufacturer}</td>
        <td>${m.supplier || 'Vendor'}</td>
      </tr>
    `).join('');
  }
}

function exportToCSV() {
  if (reportData.length === 0) {
    MedCareUI.showToast("No data to export.", "warning");
    return;
  }

  // Convert objects to CSV string
  const keys = Object.keys(reportData[0]).filter(k => typeof reportData[0][k] !== 'object');
  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += keys.join(",") + "\r\n";

  reportData.forEach(row => {
    const values = keys.map(k => {
      let val = row[k] === null || row[k] === undefined ? '' : String(row[k]);
      val = val.replace(/"/g, '""');
      if (val.includes(",") || val.includes("\n")) val = `"${val}"`;
      return val;
    });
    csvContent += values.join(",") + "\r\n";
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `medcare_${currentReportType}_report_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  MedCareUI.showToast("Report exported successfully to CSV!", "success");
}
