/**
 * MedCare - Expiry Tracking & Medicine Quarantine Module
 */

document.addEventListener('DOMContentLoaded', () => {
  renderAppShell('expiry');
  const requestedFilter = new URLSearchParams(window.location.search).get('filter');
  const filterSelect = document.getElementById('expiry-timeframe-filter');
  if (filterSelect && [...filterSelect.options].some(option => option.value === requestedFilter)) {
    filterSelect.value = requestedFilter;
  }
  loadExpiryTracking();
  setupExpiryEvents();
});

function loadExpiryTracking() {
  const tbody = document.getElementById('expiry-tbody');
  if (!tbody) return;

  const medicines = MedCareDB.getMedicines();
  const search = document.getElementById('expiry-search-input')?.value.toLowerCase().trim() || '';
  const filter = document.getElementById('expiry-timeframe-filter')?.value || 'all';

  const mapped = medicines.map(m => {
    const days = MedCareUI.calculateExpiryDays(m.expiryDate);
    return { ...m, daysRemaining: days };
  });

  // Sort by expiry date ascending (soonest to expire first)
  mapped.sort((a, b) => a.daysRemaining - b.daysRemaining);

  const filtered = mapped.filter(m => {
    const matchSearch = !search || 
      m.name.toLowerCase().includes(search) || 
      m.batchNumber.toLowerCase().includes(search) || 
      m.manufacturer.toLowerCase().includes(search);

    let matchTime = true;
    if (filter === 'expired') matchTime = m.daysRemaining <= 0;
    else if (filter === '30days') matchTime = m.daysRemaining > 0 && m.daysRemaining <= 30;
    else if (filter === '60days') matchTime = m.daysRemaining > 0 && m.daysRemaining <= 60;
    else if (filter === '90days') matchTime = m.daysRemaining > 0 && m.daysRemaining <= 90;
    else if (filter === 'critical') matchTime = m.daysRemaining <= 90;

    return matchSearch && matchTime;
  });

  const expiredTotal = mapped.filter(m => m.daysRemaining <= 0).length;
  const soonTotal = mapped.filter(m => m.daysRemaining > 0 && m.daysRemaining <= 60).length;

  document.getElementById('expiry-count-expired').innerText = expiredTotal;
  document.getElementById('expiry-count-soon').innerText = soonTotal;

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="text-center py-6 text-slate-400">No medicines found matching the selected expiry timeframe.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(m => {
    let statusClass = 'badge-success';
    let statusLabel = 'Safe Stock';
    let rowHighlight = '';

    if (m.daysRemaining <= 0) {
      statusClass = 'badge-danger';
      statusLabel = 'Already Expired';
      rowHighlight = 'bg-red-50/40';
    } else if (m.daysRemaining <= 30) {
      statusClass = 'badge-danger';
      statusLabel = 'Expiring in < 30 days';
      rowHighlight = 'bg-amber-50/40';
    } else if (m.daysRemaining <= 60) {
      statusClass = 'badge-warning';
      statusLabel = 'Expiring in < 60 days';
    } else if (m.daysRemaining <= 90) {
      statusClass = 'badge-warning';
      statusLabel = 'Expiring in < 90 days';
    }

    return `
      <tr class="${rowHighlight}">
        <td>
          <div class="font-bold text-slate-900">${m.name}</div>
          <div class="text-xs text-slate-500">${m.genericName || '—'} · ${m.manufacturer}</div>
        </td>
        <td class="font-mono text-xs font-semibold">${m.batchNumber}</td>
        <td class="font-mono text-xs font-bold text-slate-900">${MedCareUI.formatDate(m.expiryDate)}</td>
        <td class="text-center font-mono font-bold">${m.quantity}</td>
        <td>
          <span class="font-mono font-bold ${m.daysRemaining <= 0 ? 'text-danger-600' : (m.daysRemaining <= 60 ? 'text-warning-600' : 'text-slate-700')}">
            ${m.daysRemaining <= 0 ? `${Math.abs(m.daysRemaining)} days ago` : `${m.daysRemaining} days left`}
          </span>
        </td>
        <td>
          <span class="badge ${statusClass}">
            <i class="fa-solid ${m.daysRemaining <= 0 ? 'fa-ban' : 'fa-clock'} me-1"></i> ${statusLabel}
          </span>
        </td>
        <td class="text-right">
          ${m.daysRemaining <= 0 && m.quarantineStatus !== 'Quarantined' && m.quantity > 0 ? `
            <button class="btn btn-danger btn-sm" onclick="quarantineBatch(${m.id})">
              <i class="fa-solid fa-box-archive text-xs"></i> Quarantine Stock
            </button>
          ` : m.quarantineStatus === 'Quarantined' ? `
            <span class="badge badge-neutral">Quarantined (${m.quarantinedQuantity || 0})</span>
          ` : `
            <span class="text-xs text-slate-500" title="No controlled markdown workflow is configured">Markdown not supported</span>
          `}
        </td>
      </tr>
    `;
  }).join('');
}

function setupExpiryEvents() {
  document.getElementById('expiry-search-input')?.addEventListener('input', loadExpiryTracking);
  document.getElementById('expiry-timeframe-filter')?.addEventListener('change', loadExpiryTracking);
}

window.quarantineBatch = function(medId) {
  const med = MedCareDB.getMedicines().find(m => m.id === parseInt(medId, 10));
  if (!med) return;

  MedCareUI.confirmAction(`Quarantine expired Batch "${med.batchNumber}" of ${med.name} and remove its units from saleable stock? Supplier return and credit are not recorded.`, () => {
    const quarantined = MedCareDB.quarantineExpiredMedicine(medId);
    if (!quarantined) {
      MedCareUI.showToast('Unable to quarantine this batch. It must be expired, in stock, and not already quarantined.', 'danger');
      return;
    }
    MedCareUI.showToast(`Batch ${med.batchNumber} quarantined and removed from saleable stock. Supplier return or credit is not recorded.`, "warning");
    loadExpiryTracking();
  });
};
