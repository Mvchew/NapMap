﻿document.addEventListener("DOMContentLoaded", function () {
    const map = L.map('map').setView([51.0486, -114.0708], 12);

    const markerForm = document.getElementById("marker-form");
    const addMarkerForm = document.getElementById("add-marker-form");

    function loadMarkers() {
        fetch("/api/markers")
            .then(response => response.json())
            .then(markers => {
                console.log("Fetched markers:", markers); // Log the fetched markers
                markers.forEach(marker => {
                    if (marker.latitude && marker.longitude) {
                        const markerInstance = L.marker([marker.latitude, marker.longitude], { title: marker.title, draggable: true }).addTo(map);

                        // Add click event listener to the marker
                        markerInstance.on('click', function (e) {
                            const infoDiv = document.getElementById('info');
                            const infoHTML = `
                            <h4>${marker.title}</h4>
                            <p>${marker.description}</p>
                        `;
                            infoDiv.innerHTML = infoHTML;
                        });

                    } else {
                        console.error('Invalid marker data:', marker);
                    }
                });
            })
            .catch(error => {
                console.error("Error fetching markers:", error);
            });
    }


    loadMarkers();

    map.on('click', function (e) {
        markerForm.style.display = "block";
        addMarkerForm.dataset.lat = e.latlng.lat;
        addMarkerForm.dataset.lng = e.latlng.lng;
    });

    addMarkerForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const lat = parseFloat(addMarkerForm.dataset.lat);
        const lng = parseFloat(addMarkerForm.dataset.lng);

        console.log('Submitting LatLng:', lat, lng);

        // Save the marker to the database
        fetch("/api/markers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ Title: title, Description: description, Latitude: lat, Longitude: lng })
        }).then(response => {
            if (response.ok) {
                // Clear the map of existing markers
                map.eachLayer(function (layer) {
                    if (layer instanceof L.Marker && layer !== markerLayer) {
                        map.removeLayer(layer);
                    }
                });

                // Reload markers from the server
                loadMarkers();

                // Hide the marker form and reset its contents
                markerForm.style.display = "none";
                addMarkerForm.reset();
            } else {
                alert("Error saving marker");
            }
        });
    });


    const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    const markerLayer = L.marker([51.0486, -114.0708], {
        title: "City of Calgary",
        draggable: true,
        properties: {
            population: 1392609,
            website: "https://www.calgary.ca",
            industries: [
                {
                    name: "Energy"
                },
                {
                    name: "Technology"
                },
                {
                    name: "Financial Services"
                }
            ]
        }
    });

    const baseMaps = {
        "OpenStreetMap": osmLayer
    };

    const overlayMaps = {
        "City of Calgary": markerLayer
    };

    osmLayer.addTo(map);
    markerLayer.addTo(map);

    L.control.layers(baseMaps, overlayMaps).addTo(map);

    markerLayer.on('click', function (e) {
        const infoDiv = document.getElementById('info');
        const industries = e.target.options.properties.industries.map(i => i.name).join(", ");
        const infoHTML = `
            <h4>${e.target.options.title}</
                <h4>${e.target.options.title}</h4>
            <ul>
                <li>Population: ${e.target.options.properties.population}</li>
                <li>Website: <a href="${e.target.options.properties.website}">${e.target.options.properties.website}</a></li>
                <li>Top industries: ${industries}</li>
            </ul>
        `;
        infoDiv.innerHTML = infoHTML;
    });
});
