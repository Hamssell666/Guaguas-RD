import { calcularTotales } from './calculator.js';
import { getFavs, saveFav, removeFav } from './storage.js';

let appData = {};

async function init() {
    const res = await fetch('./data/routes.json');
    appData = await res.json();
    renderUI();
}

function renderUI() {
    const origin = document.getElementById('origin-select');
    const dest = document.getElementById('destination-select');
    const conds = document.getElementById('conditions-container');

    appData.sectores.forEach(s => {
        const opt = `<option value="${s.id}">${s.nombre}</option>`;
        origin.innerHTML += opt; dest.innerHTML += opt;
    });

    appData.condiciones.forEach(c => {
        conds.innerHTML += `<label><input type="checkbox" name="cond" value="${c.id}"> ${c.icono} ${c.etiqueta}</label>`;
    });
    renderFavs();
}

document.getElementById('route-form').onsubmit = (e) => {
    e.preventDefault();
    const oId = document.getElementById('origin-select').value;
    const dId = document.getElementById('destination-select').value;
    const checked = Array.from(document.querySelectorAll('input[name="cond"]:checked')).map(i => i.value);
    const activeConds = appData.condiciones.filter(c => checked.includes(c.id));
    
    const matches = appData.rutas.filter(r => r.origen_id === oId && r.destino_id === dId);
    const container = document.getElementById('routes-container');
    container.innerHTML = matches.map(r => {
        const { tiempoTotal, costoTotal } = calcularTotales(r.tramos, activeConds);
        return `<div class="route-card">
            <h3>${r.nombre}</h3>
            <p>⏱️ ${tiempoTotal} min | 💰 RD$ ${costoTotal}</p>
            <button onclick="addFav('${r.id}')">⭐ Guardar</button>
        </div>`;
    }).join('') || '<p>No hay rutas.</p>';
};

window.addFav = (id) => { saveFav(id); renderFavs(); };
window.delFav = (id) => { removeFav(id); renderFavs(); };

function renderFavs() {
    const favs = getFavs();
    document.getElementById('favorites-container').innerHTML = favs.map(id => {
        const r = appData.rutas.find(ruta => ruta.id === id);
        return r ? `<div>${r.nombre} <button onclick="delFav('${id}')">🗑️</button></div>` : '';
    }).join('');
}

document.getElementById('theme-toggle').onclick = () => document.body.classList.toggle('dark-theme');

init();