document.addEventListener('DOMContentLoaded', () => {
  // Confirmation dialog for delete links
  const deleteLinks = document.querySelectorAll('.delete-link');
  deleteLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (!confirm('Are you sure you want to delete this item?')) {
        e.preventDefault();
      }
    });
  });
});
