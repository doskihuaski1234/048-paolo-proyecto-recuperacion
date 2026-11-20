# Reporte de defectos

## DEF-001: Las imagenes no son distintas

- Ambiente: Sauce Demo, sistema operativo del navegador, Chromium/Firefox segun la ejecucion.
- Pasos: iniciar sesion con `problem_user`, abrir el catalogo y comparar las imagenes.
- Resultado esperado: los seis productos muestran imagenes distintas.
- Resultado obtenido: todos los productos muestran la misma imagen.
- Evidencia: adjunto `defecto-001.png` en el reporte HTML.
- Severidad: Media.
- Prioridad: Media.
- Frecuencia: Siempre.

## DEF-002: Name Z to A no invierte el catalogo

- Ambiente: Sauce Demo, sistema operativo del navegador, Chromium/Firefox segun la ejecucion.
- Pasos: iniciar sesion con `problem_user`, seleccionar `Name (Z to A)`.
- Resultado esperado: la lista comienza con Test.allTheThings() T-Shirt (Red).
- Resultado obtenido: la lista permanece sin el orden descendente.
- Evidencia: [detalle del reporte](../capturas/detalle-defecto.png) y adjunto `defecto-002.png` en el reporte HTML.
- Issue: https://github.com/doskihuaski1234/048-paolo-proyecto-recuperacion/issues/1
- Severidad: Alta.
- Prioridad: Alta.
- Frecuencia: Siempre.

## DEF-003: Bolt T-Shirt no se agrega

- Ambiente: Sauce Demo, sistema operativo del navegador, Chromium/Firefox segun la ejecucion.
- Pasos: iniciar sesion con `problem_user`, abrir el catalogo y pulsar Add to cart de Sauce Labs Bolt T-Shirt.
- Resultado esperado: el boton cambia a Remove y la insignia muestra 1.
- Resultado obtenido: el boton no cambia y la insignia no aparece.
- Evidencia: adjunto `defecto-003.png` en el reporte HTML.
- Issue: https://github.com/doskihuaski1234/048-paolo-proyecto-recuperacion/issues/2
- Severidad: Alta.
- Prioridad: Alta.
- Frecuencia: Siempre.

## DEF-004: Los datos del formulario cambian de campo

- Ambiente: Sauce Demo, sistema operativo del navegador, Chromium/Firefox segun la ejecucion.
- Pasos: iniciar sesion con `problem_user`, agregar un producto, continuar al checkout y completar nombre y apellido.
- Resultado esperado: Nombre conserva Ana y Apellido conserva Perez.
- Resultado obtenido: el valor Perez aparece en el campo de nombre y el apellido queda vacio.
- Evidencia: adjunto `defecto-004.png` en el reporte HTML.
- Severidad: Alta.
- Prioridad: Alta.
- Frecuencia: Siempre.
