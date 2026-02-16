lucide.createIcons();

const html = document.documentElement;
const toggle = document.getElementById('toggle');
const optBrowser = document.getElementById('opt-browser');
const optServer = document.getElementById('opt-server');
const themeToggle = document.getElementById('theme-toggle');
const refreshBtn = document.getElementById('refresh-btn');
const chooseScreen = document.getElementById('choose-screen');
const loadingScreen = document.getElementById('loading-screen');
const errorScreen = document.getElementById('error-screen');
const dataScreen = document.getElementById('data-screen');
const ipBadge = document.getElementById('ip-badge');

let map = null;
let marker = null;
let currentSource = null;
let currentTheme = localStorage.getItem('theme') || 'dark';
let apiToken = null;

fetch('/api/token')
    .then(res => res.json())
    .then(data => { apiToken = data.token; })
    .catch(() => { console.warn('Token not available'); });

if (currentTheme === 'light') {
    html.setAttribute('data-theme', 'light');
}

themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    if (currentTheme === 'light') {
        html.setAttribute('data-theme', 'light');
    } else {
        html.removeAttribute('data-theme');
    }
    localStorage.setItem('theme', currentTheme);
    
    if (map) {
        updateMapTiles();
    }
});

function getMapTiles() {
    return currentTheme === 'light' 
        ? 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
}

let tileLayer = null;
function updateMapTiles() {
    if (tileLayer) {
        map.removeLayer(tileLayer);
    }
    tileLayer = L.tileLayer(getMapTiles(), { maxZoom: 19 }).addTo(map);
}

function getFlag(countryCode) {
    if (!countryCode || countryCode === 'XX') return '🏳️';
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
}

function showScreen(screen) {
    [chooseScreen, loadingScreen, errorScreen, dataScreen].forEach(s => s.classList.add('hidden'));
    screen.classList.remove('hidden');
    if (screen === dataScreen) {
        dataScreen.classList.add('active');
    } else {
        dataScreen.classList.remove('active');
    }
}

function updateUI(data) {
    document.getElementById('ip-text').textContent = data.ip;
    document.getElementById('city').textContent = data.city;
    document.getElementById('region-country').textContent = `${data.region}, ${data.country}`;
    document.getElementById('flag').textContent = getFlag(data.country);
    document.getElementById('org').textContent = data.org;
    document.getElementById('timezone').textContent = data.timezone;
    document.getElementById('postal').textContent = data.postal || '—';
    document.getElementById('hostname').textContent = data.hostname || '—';
    document.getElementById('coords').textContent = `${data.lat}, ${data.lon}`;

    if (!map) {
        map = L.map('map', { zoomControl: false, attributionControl: false })
            .setView([data.lat, data.lon], 10);
        tileLayer = L.tileLayer(getMapTiles(), { maxZoom: 19 }).addTo(map);
        marker = L.marker([data.lat, data.lon]).addTo(map);
    } else {
        map.setView([data.lat, data.lon], 10);
        marker.setLatLng([data.lat, data.lon]);
    }

    showScreen(dataScreen);
    
    setTimeout(() => map.invalidateSize(), 100);
}

async function fetchData(source) {
    showScreen(loadingScreen);
    
    try {
        let data;
        if (source === 'browser') {
            const fetchOptions = apiToken 
                ? { headers: { 'Authorization': `Bearer ${apiToken}` } }
                : {};
            const res = await fetch('https://ipinfo.io/json', fetchOptions);
            const raw = await res.json();
            const [lat, lon] = raw.loc ? raw.loc.split(',') : ['0', '0'];
            data = {
                ip: raw.ip || 'N/A',
                city: raw.city || 'Unknown',
                region: raw.region || 'Unknown',
                country: raw.country || 'XX',
                org: raw.org ? raw.org.split(' ').slice(1).join(' ') : 'Unknown',
                timezone: raw.timezone || 'UTC',
                postal: raw.postal || '—',
                hostname: raw.hostname || '—',
                lat: parseFloat(lat),
                lon: parseFloat(lon)
            };
        } else {
            const res = await fetch('/api/serverip');
            data = await res.json();
        }
        updateUI(data);
    } catch (err) {
        console.error(err);
        document.getElementById('error-message').textContent = 'Ошибка при загрузке данных';
        showScreen(errorScreen);
    }
}

function setActiveOption(source) {
    toggle.classList.remove('inactive');
    
    if (source === 'browser') {
        optBrowser.classList.add('active');
        optServer.classList.remove('active');
        toggle.classList.remove('server');
    } else {
        optServer.classList.add('active');
        optBrowser.classList.remove('active');
        toggle.classList.add('server');
    }
    
    if (currentSource !== source) {
        currentSource = source;
        fetchData(source);
    }
}

optBrowser.addEventListener('click', () => setActiveOption('browser'));
optServer.addEventListener('click', () => setActiveOption('server'));

ipBadge.addEventListener('click', async () => {
    const ip = document.getElementById('ip-text').textContent;
    if (ip && ip !== '—') {
        await navigator.clipboard.writeText(ip);
        ipBadge.classList.add('copied');
        setTimeout(() => ipBadge.classList.remove('copied'), 1500);
    }
});

refreshBtn.addEventListener('click', () => {
    if (currentSource) {
        refreshBtn.classList.add('spinning');
        setTimeout(() => refreshBtn.classList.remove('spinning'), 800);
        fetchData(currentSource);
        fetchUsage();
    }
});

async function fetchUsage() {
    try {
        const res = await fetch('/api/usage');
        const data = await res.json();
        
        if (data.error) {
            document.getElementById('usage-card').style.display = 'none';
            return;
        }
        
        const used = data.used;
        const limit = data.limit;
        const remaining = data.remaining;
        const day = data.day;
        const percentage = (used / limit) * 100;
        
        document.getElementById('usage-used').textContent = used.toLocaleString();
        document.getElementById('usage-limit').textContent = limit.toLocaleString();
        document.getElementById('usage-day').textContent = day.toLocaleString();
        document.getElementById('usage-remaining').textContent = `Осталось: ${remaining.toLocaleString()}`;
        
        const progressFill = document.getElementById('progress-fill');
        progressFill.style.width = `${Math.min(percentage, 100)}%`;
        
        const remainingEl = document.getElementById('usage-remaining');
        progressFill.classList.remove('warning', 'danger');
        remainingEl.classList.remove('warning', 'danger');
        
        if (percentage >= 90) {
            progressFill.classList.add('danger');
            remainingEl.classList.add('danger');
        } else if (percentage >= 70) {
            progressFill.classList.add('warning');
            remainingEl.classList.add('warning');
        }
        
    } catch (err) {
        console.error('Failed to fetch usage:', err);
    }
}

fetchUsage();
