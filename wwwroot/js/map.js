document.addEventListener("DOMContentLoaded", function () {
    const map = L.map('map').setView([51.0486, -114.0708], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var marker = L.marker([51.0486, -114.0708], {
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
    }).addTo(map);

    marker.bindPopup("<b>" + marker.options.title + "</b><br>" +
        "Top industries: " + marker.options.properties.industries.map(i => i.name).join(", ") + "<br>"
    );
});