document.addEventListener('DOMContentLoaded', function () {

    //delete
    var deleteButtons = document.querySelectorAll('.delete-button');
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

    //edit
    var editButtons = document.querySelectorAll('.edit-button');
    var editModal = new bootstrap.Modal(document.getElementById('editModal'));
    var editForm = document.getElementById('editMarkerForm');
    var editUrlBase = editForm.getAttribute('data-url');

    editButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            var markerId = button.getAttribute('data-marker-id');
            var actionUrl = editUrlBase + '?id=' + markerId;
            editForm.setAttribute('action', actionUrl);

            fetch(`/api/markers/${markerId}`)
                .then(response => response.json())
                .then(data => {
                    document.getElementById('editMarkerId').value = data.id;
                    document.getElementById('editTitle').value = data.title;
                    document.getElementById('editLatitude').value = data.latitude;
                    document.getElementById('editLongitude').value = data.longitude;
                })
                .catch(error => {
                    console.error('Error fetching marker:', error);
                });

            editModal.show();
        });
    });
});

