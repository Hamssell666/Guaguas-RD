export function calcularTotales(tramos, condicionesActivas) {
    const tiempoBase = tramos.reduce((acc, t) => acc + t.tiempo_min, 0);
    const costoBase = tramos.reduce((acc, t) => acc + t.costo, 0);
    const pctAumento = condicionesActivas.reduce((acc, c) => acc + c.tiempo_pct, 0);
    const extraCosto = condicionesActivas.reduce((acc, c) => acc + c.costo_extra, 0);
    
    return {
        tiempoTotal: Math.round(tiempoBase * (1 + (pctAumento / 100))),
        costoTotal: costoBase + extraCosto
    };
}