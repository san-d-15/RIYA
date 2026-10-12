/**
 * MedCare - User Management & RBAC Module
 * Roles: Admin, Pharmacist, Cashier
 */

let editingUserId = null;

document.addEventListener('DOMContentLoaded', () => {
  renderAppShell('users');
  loadUsers();
  setupUserEvents();
});

function loadUsers() {
  const tbody = document.getElementById('users-tbody');
  const countDisplay = document.getElementById('user-count-display');
  if (!tbody) return;

  const users = MedCareDB.getUsers();
  if (countDisplay) countDisplay.innerText = `Total System Users: ${users.length}`;

  tbody.innerHTML = users.map(u => {
    let roleBadge = 'badge-primary';
    if (u.role === 'Admin') roleBadge = 'badge-success';
    if (u.role === 'Cashier') roleBadge = 'badge-neutral';
    const initials = (u.name || 'User').split(/\s+/).filter(Boolean).map(n => n[0]).slice(0, 2).join('').toUpperCase() || 'MC';

    return `
      <tr>
        <td>
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs text-white shadow-sm border border-slate-200 select-none flex-shrink-0" style="background: linear-gradient(135deg, #0284c7, #0d9488);">
              ${initials}
            </div>
            <div>
              <div class="font-bold text-slate-900">${u.name}</div>
              <div class="text-xs text-slate-400">@${u.username}</div>
            </div>
          </div>
        </td>
        <td><div class="text-xs font-semibold text-slate-700">${u.email}</div></td>
        <td class="font-mono text-xs">${u.phone || '—'}</td>
        <td>
          <span class="badge ${roleBadge} font-bold">${u.role}</span>
        </td>
        <td>
          <span class="badge badge-success"><i class="fa-solid fa-check text-[9px] me-1"></i> ${u.status || 'Active'}</span>
        </td>
        <td class="font-mono text-xs text-slate-500">${u.createdAt}</td>
        <td class="text-right">
          <div class="flex items-center justify-end gap-1">
            <button class="btn-icon" onclick="openEditUserModal(${u.id})" title="Edit User">
              <i class="fa-solid fa-user-pen text-primary-600"></i>
            </button>
            ${u.id !== 1 ? `
              <button class="btn-icon" onclick="deleteUserConfirm(${u.id})" title="Delete User">
                <i class="fa-solid fa-trash-can text-danger-600"></i>
              </button>
            ` : '<span class="text-xs text-slate-400 px-2">Primary</span>'}
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function setupUserEvents() {
  document.getElementById('user-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    saveUser();
  });
}

window.openAddUserModal = function() {
  editingUserId = null;
  document.getElementById('modal-user-title').innerText = 'Add New System User';
  document.getElementById('user-form').reset();
  document.getElementById('user-password-group').style.display = 'block';
  MedCareUI.openModal('user-modal');
};

window.openEditUserModal = function(id) {
  editingUserId = id;
  const u = MedCareDB.getUsers().find(user => user.id === parseInt(id, 10));
  if (!u) return;

  document.getElementById('modal-user-title').innerText = 'Edit User Permissions';
  document.getElementById('user-name').value = u.name;
  document.getElementById('user-username').value = u.username;
  document.getElementById('user-email').value = u.email;
  document.getElementById('user-phone').value = u.phone || '';
  document.getElementById('user-role').value = u.role;
  document.getElementById('user-status').value = u.status || 'Active';
  document.getElementById('user-password-group').style.display = 'none';

  MedCareUI.openModal('user-modal');
};

function saveUser() {
  const name = document.getElementById('user-name').value.trim();
  const username = document.getElementById('user-username').value.trim();
  const email = document.getElementById('user-email').value.trim();
  const phone = document.getElementById('user-phone').value.trim();
  const role = document.getElementById('user-role').value;
  const status = document.getElementById('user-status').value;

  if (!name || !username || !email) {
    MedCareUI.showToast("Name, username and email are required.", "danger");
    return;
  }

  const payload = {
    name,
    username,
    email,
    phone,
    role,
    status,
    avatar: ''
  };

  if (editingUserId) {
    MedCareDB.updateUser(editingUserId, payload);
    MedCareUI.showToast(`User ${name} updated successfully.`, "success");
  } else {
    MedCareDB.addUser(payload);
    MedCareUI.showToast(`User ${name} created with role ${role}.`, "success");
  }

  MedCareUI.closeModal('user-modal');
  loadUsers();
}

window.deleteUserConfirm = function(id) {
  const u = MedCareDB.getUsers().find(user => user.id === parseInt(id, 10));
  if (!u) return;

  MedCareUI.confirmAction(`Remove user account for "${u.name}" (${u.role})?`, () => {
    MedCareDB.deleteUser(id);
    MedCareUI.showToast(`User account deleted.`, "warning");
    loadUsers();
  });
};
