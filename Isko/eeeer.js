document.addEventListener('DOMContentLoaded', () => {
    // 1. Бөлімдерді ауыстыру логикасы
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');
    let mapInitialized = false;
    let map;

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetTab = item.getAttribute('data-tab');

            // Мәзірдің белсенді класын ауыстыру
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // Секцияларды көрсету / жасыру
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetTab) {
                    section.classList.add('active');
                }
            });

            // Карта бөлімі ашылғанда картаны іске қосу
            if (targetTab === 'map-location' && !mapInitialized) {
                setTimeout(() => {
                    initMap();
                    mapInitialized = true;
                }, 100);
            }
        });
    });

    // 2. Интерактивті картаны баптау (Leaflet.js)
    function initMap() {
        // Алматы қаласындағы BMW Центр координатасы [43.2220, 76.9500]
        const almatyCoords = [43.2220, 76.9500];

        map = L.map('map').setView(almatyCoords, 13);

        // OpenStreetMap карта қабаты
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        }).addTo(map);

        // Автосалон маркерін картаға қосу
        const marker = L.marker(almatyCoords).addTo(map);
        marker.bindPopup("<b>BMW Центр Алматы</b><br>әл-Фараби даңғылы, 140A").openPopup();
    }
});