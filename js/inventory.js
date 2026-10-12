/**
 * MedCare - Inventory Management Module
 * Comprehensive Stock Tracking, Status Badges & Procurement Shortcuts
 */

document.addEventListener('DOMContentLoaded', () => {
  renderAppShell('inventory');
  loadInventory();
  setupInventoryEvents();
});

function loadInventory() {
  const tbody = document.getElementById('inventory-tbody');
  if (!tbody) return;

  const medicines = MedCareDB.getMedicines();
  const search = document.getElementById('inv-search-input')?.value.toLowerCase().trim() || '';
  const statusFilter = document.getElementById('inv-status-filter')?.value || '';

  const filtered = medicines.filter(m => {
    const matchSearch = !search || 
      m.name.toLowerCase().includes(search) || 
      (m.batchNumber && m.batchNumber.toLowerCase().includes(search)) ||
      m.category.toLowerCase().includes(search);

    const status = MedCareUI.getStockStatus(m);
    let matchStatus = true;
    if (statusFilter === 'in_stock') matchStatus = status.label === 'In Stock';
    else if (statusFilter === 'low_stock') matchStatus = status.label === 'Low Stock';
    else if (statusFilter === 'out_of_stock') matchStatus = status.label === 'Out of Stock';
    else if (statusFilter === 'expired') matchStatus = status.label === 'Expired';

    return matchSearch && matchStatus;
  });

  // Calculate summary badges
  let inStockCount = 0, lowStockCount = 0, outCount = 0, expiredCount = 0;
  medicines.forEach(m => {
    const s = MedCareUI.getStockStatus(m);
    if (s.label === 'In Stock') inStockCount++;
    else if (s.label === 'Low Stock') lowStockCount++;
    else if (s.label === 'Out of Stock') outCount++;
    else if (s.label === 'Expired') expiredCount++;
  });

  document.getElementById('badge-in-stock').innerText = inStockCount;
  document.getElementById('badge-low-stock').innerText = lowStockCount;
  document.getElementById('badge-out-stock').innerText = outCount;
  document.getElementById('badge-expired').innerText = expiredCount;

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="text-center py-6 text-slate-400">No inventory items matching current filters.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(m => {
    const status = MedCareUI.getStockStatus(m);
    const daysLeft = MedCareUI.calculateExpiryDays(m.expiryDate);

    return `
      <tr>
        <td>
          <div class="font-bold text-slate-900">${m.name}</div>
          <div class="text-xs text-slate-500">${m.category} · Mfr: ${m.manufacturer}</div>
        </td>
        <td class="font-mono text-xs font-semibold">${m.batchNumber}</td>
        <td class="text-center">
          <span class="font-mono font-bold text-base ${m.quantity <= m.minStockLevel ? 'text-amber-600' : 'text-slate-800'}">
            ${m.quantity}
          </span>
        </td>
        <td class="text-center font-mono text-xs text-slate-500">${m.minStockLevel} units</td>
        <td>
          <div class="font-mono text-xs">${MedCareUI.formatDate(m.expiryDate)}</div>
          <span class="text-xs text-slate-400">${daysLeft <= 0 ? 'Expired' : `${daysLeft} days remaining`}</span>
        </td>
        <td>
          <span class="badge ${status.class}">
            <i class="fa-solid fa-circle text-[8px] me-1"></i> ${status.label}
          </span>
        </td>
        <td class="text-right">
          ${m.quantity <= m.minStockLevel ? `
            <a href="purchases.html?medicineId=${m.id}" class="btn btn-primary btn-sm">
              <i class="fa-solid fa-cart-plus text-xs"></i> Restock
            </a>
          ` : `
            <a href="medicines.html?search=${encodeURIComponent(m.name)}" class="btn btn-outline btn-sm">
              <i class="fa-solid fa-sliders text-xs"></i> Manage
            </a>
          `}
        </td>
      </tr>
    `;
  }).join('');
}

function setupInventoryEvents() {
  document.getElementById('inv-search-input')?.addEventListener('input', loadInventory);
  document.getElementById('inv-status-filter')?.addEventListener('change', loadInventory);
}
