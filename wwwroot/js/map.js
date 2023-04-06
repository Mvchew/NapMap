document.addEventListener("DOMContentLoaded", function () {
    const map = L.map('map').setView([51.0486, -114.0708], 12);

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
