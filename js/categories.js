/**
 * MedCare - Category Management Module
 */

let editingCategoryId = null;

document.addEventListener('DOMContentLoaded', () => {
  renderAppShell('categories');
  loadCategories();
  setupCategoryEvents();
});

function loadCategories() {
  const tbody = document.getElementById('categories-tbody');
  const countDisplay = document.getElementById('category-count-display');
  if (!tbody) return;

  const categories = MedCareDB.getCategories();
  const medicines = MedCareDB.getMedicines();
  const search = document.getElementById('category-search-input')?.value.toLowerCase().trim() || '';

  const filtered = categories.filter(c => 
    !search || c.name.toLowerCase().includes(search) || (c.description && c.description.toLowerCase().includes(search))
  );

  if (countDisplay) countDisplay.innerText = `Total Categories: ${categories.length}`;

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="text-center py-6 text-slate-400">No categories found matching "${search}".</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(cat => {
    const medCount = medicines.filter(m => m.categoryId === cat.id || m.category === cat.name).length;
    return `
      <tr>
        <td><span class="font-mono text-xs text-slate-400">CAT-${cat.id.toString().slice(-3)}</span></td>
        <td>
          <div class="font-bold text-slate-900">${cat.name}</div>
        </td>
        <td><div class="text-xs text-slate-600 max-w-md">${cat.description || 'General pharma group'}</div></td>
        <td class="text-center">
          <span class="badge ${medCount > 0 ? 'badge-primary' : 'badge-neutral'} font-mono font-bold">${medCount} medicines</span>
        </td>
        <td class="text-right">
          <div class="flex items-center justify-end gap-1">
            <button class="btn-icon" onclick="openEditCategoryModal(${cat.id})" title="Edit Category">
              <i class="fa-solid fa-pen-to-square text-primary-600"></i>
            </button>
            <button class="btn-icon" onclick="deleteCategoryConfirm(${cat.id})" title="Delete Category">
              <i class="fa-solid fa-trash-can text-danger-600"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function setupCategoryEvents() {
  document.getElementById('category-search-input')?.addEventListener('input', loadCategories);

  document.getElementById('category-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    saveCategory();
  });
}

window.openAddCategoryModal = function() {
  editingCategoryId = null;
  document.getElementById('modal-cat-title').innerText = 'Add Medicine Category';
  document.getElementById('category-form').reset();
  MedCareUI.openModal('category-modal');
};

window.openEditCategoryModal = function(id) {
  editingCategoryId = id;
  const cat = MedCareDB.getCategories().find(c => c.id === parseInt(id, 10));
  if (!cat) return;

  document.getElementById('modal-cat-title').innerText = 'Edit Category';
  document.getElementById('cat-name').value = cat.name;
  document.getElementById('cat-description').value = cat.description || '';
  MedCareUI.openModal('category-modal');
};

function saveCategory() {
  const name = document.getElementById('cat-name').value.trim();
  const description = document.getElementById('cat-description').value.trim();

  if (!name) {
    MedCareUI.showToast("Category name is required.", "danger");
    return;
  }

  if (editingCategoryId) {
    MedCareDB.updateCategory(editingCategoryId, { name, description });
    MedCareUI.showToast(`Updated category "${name}".`, "success");
  } else {
    MedCareDB.addCategory({ name, description });
    MedCareUI.showToast(`Category "${name}" created.`, "success");
  }

  MedCareUI.closeModal('category-modal');
  loadCategories();
}

window.deleteCategoryConfirm = function(id) {
  const cat = MedCareDB.getCategories().find(c => c.id === parseInt(id, 10));
  if (!cat) return;

  MedCareUI.confirmAction(`Delete category "${cat.name}"? Note that medicines assigned to it will remain.`, () => {
    MedCareDB.deleteCategory(id);
    MedCareUI.showToast(`Category "${cat.name}" deleted.`, "warning");
    loadCategories();
  });
};
