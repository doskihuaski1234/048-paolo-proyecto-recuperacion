# Analisis de estabilidad - Sauce Demo

Fecha de ejecucion: 2026-11-21. Destino: `https://www.saucedemo.com`.

## Suite completa

Una ejecucion completa de Playwright termino con 75/75 resultados aprobados: 25 pruebas en Chromium, 25 en Firefox y 25 en WebKit. Los cuatro casos de defectos conocidos por navegador estan declarados como fallas esperadas y no cuentan como fallas inesperadas de la suite. `npx tsc --noEmit` tambien termino correctamente.

## Repeticiones de smoke

Cada ejecucion incluyo 18 casos (`@smoke`) en los tres navegadores.

| Ejecucion | Aprobadas | Fallidas | Observacion |
|---|---:|---:|---|
| 1 | 18 | 0 | Sin fallas |
| 2 | 17 | 1 | WebKit no abrio el menu lateral durante el cierre de sesion |
| 3 | 16 | 2 | Firefox no pudo guardar trazas por falta de espacio (`ENOSPC`); no fueron fallas de asercion |

Registros: [ejecucion 1](./estabilidad-ejecucion-1.txt), [ejecucion 2](./estabilidad-ejecucion-2.txt) y [ejecucion 3](./estabilidad-ejecucion-3.txt).

## Investigacion del menu en WebKit

La prueba de cierre de sesion se repitio diez veces en WebKit con un solo worker: seis pasaron y cuatro dejaron el menu oculto despues del clic. La verificacion ahora espera explicitamente los productos y comprueba la visibilidad del menu mediante su Page Object, pero la intermitencia sigue presente. No se clasifica como defecto confirmado de Sauce Demo.

El workflow de GitHub Actions ejecuta smoke en Chromium, por lo que esta intermitencia local de WebKit no bloquea la verificacion configurada en CI. Firefox y WebKit permanecen disponibles para la suite local; revisar esta condicion antes de exigir estabilidad total en esos motores.
