document.addEventListener('DOMContentLoaded', function () {
    var deleteButtons = document.querySelectorAll('[data-bs-toggle="modal"]');
    var deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    var deleteForm = document.getElementById('deleteMarkerForm');
    var actionUrlBase = deleteForm.getAttribute('data-url');

    deleteButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            var markerId = button.getAttribute('data-marker-id');
            var actionUrl = actionUrlBase + '?id=' + markerId;
            deleteForm.setAttribute('action', actionUrl);
            deleteModal.show();
        });
    });
});
