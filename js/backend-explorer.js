document.addEventListener('DOMContentLoaded', () => {
  renderAppShell('backend');

  const preview = document.getElementById('source-preview-content');
  const pathLabel = document.getElementById('source-path-label');
  const buttons = [...document.querySelectorAll('#source-tabs [data-source]')];

  async function loadSource(path) {
    if (!path || !preview) return;
    preview.textContent = 'Loading source file…';
    pathLabel.textContent = path;
    try {
      const response = await fetch(`/${path}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      preview.textContent = await response.text();
    } catch (error) {
      preview.textContent = `Source preview unavailable: ${error.message}. Open the repository source file directly.`;
      console.error(`Unable to load developer reference source "${path}".`, error);
      MedCareUI.showToast('Source preview could not be loaded from this deployment.', 'danger');
    }
  }

  buttons.forEach(button => button.addEventListener('click', () => {
    buttons.forEach(tab => tab.classList.toggle('active', tab === button));
    loadSource(button.dataset.source);
  }));

  document.getElementById('copy-source-button')?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(preview?.textContent || '');
      MedCareUI.showToast('Source copied to clipboard.', 'success');
    } catch (error) {
      console.error('Unable to copy developer reference source.', error);
      MedCareUI.showToast('Unable to access the clipboard in this browser context.', 'danger');
    }
  });

  loadSource(buttons[0]?.dataset.source);
});
