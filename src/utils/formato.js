/* ============================================================
   UTILIDADES REUTILIZABLES — Nexus Play
   PFY2201 Desarrollo Frontend I · Duoc UC
   Actividad Formativa 5 (Semana 7)

   Funciones puras, sin estado ni dependencia de React: reciben
   valores y devuelven valores. Viven fuera de los componentes
   justamente para poder usarse desde cualquiera de ellos, que es lo
   que pide el criterio 6 de la pauta.
   ============================================================ */

/* Porcentaje de descuento a partir del cual una oferta se considera
   destacada. Se declara aquí, y no suelto dentro de un componente,
   para que el criterio sea el mismo en toda la aplicación. */
export const DESCUENTO_DESTACADO = 30;

/**
 * Formatea un número como precio en pesos chilenos.
 * Heredada de la Semana 6 sin cambios de comportamiento.
 * @param {number} valor - Monto en pesos, sin decimales.
 * @returns {string} El monto con separador de miles, por ejemplo "$34.990".
 */
export function formatearPrecio(valor) {
    return valor.toLocaleString("es-CL", {
        style: "currency",
        currency: "CLP",
        maximumFractionDigits: 0,
    });
}

/**
 * Calcula el descuento de un producto en porcentaje entero.
 * @param {number} precio - Precio normal.
 * @param {number} oferta - Precio de oferta.
 * @returns {number} El descuento redondeado, por ejemplo 22.
 */
export function calcularAhorro(precio, oferta) {
    return Math.round(((precio - oferta) / precio) * 100);
}

/**
 * Decide si un producto merece la etiqueta de oferta destacada.
 * La usa TarjetaProducto para el renderizado condicional del criterio 5.
 * @param {number} precio - Precio normal.
 * @param {number} oferta - Precio de oferta.
 * @returns {boolean} true si el descuento llega al umbral destacado.
 */
export function esOfertaDestacada(precio, oferta) {
    return calcularAhorro(precio, oferta) >= DESCUENTO_DESTACADO;
}

/* Valor con el que el filtro de categorías muestra el catálogo entero.
   Se exporta para que el componente del filtro y App usen la misma
   constante y no dos cadenas sueltas que puedan dejar de coincidir. */
export const TODAS_LAS_CATEGORIAS = "Todas";

/**
 * Devuelve las categorías presentes en el catálogo, sin repetir y en
 * orden alfabético. Se calculan a partir de los datos en lugar de
 * escribirlas a mano: si mañana se agrega un producto de un género
 * nuevo, su categoría aparece sola.
 * @param {Array} listado - Los productos del catálogo.
 * @returns {string[]} Las categorías, con "Todas" al principio.
 */
export function obtenerCategorias(listado) {
    const generos = [...new Set(listado.map((producto) => producto.genero))];
    return [TODAS_LAS_CATEGORIAS, ...generos.sort()];
}

/**
 * Filtra un listado de productos por categoría.
 * @param {Array} listado - Los productos del catálogo.
 * @param {string} categoria - La categoría elegida.
 * @returns {Array} Los productos de esa categoría, o todos.
 */
export function filtrarPorCategoria(listado, categoria) {
    if (categoria === TODAS_LAS_CATEGORIAS) {
        return listado;
    }

    return listado.filter((producto) => producto.genero === categoria);
}

/**
 * Filtra un listado de productos por coincidencia de texto en el nombre.
 * Ignora mayúsculas y espacios sobrantes. Con el texto vacío devuelve
 * el listado completo, que es lo que debe ocurrir al borrar la búsqueda.
 * @param {Array} listado - Los productos del catálogo.
 * @param {string} texto - Lo que el usuario escribió en el buscador.
 * @returns {Array} Los productos que coinciden.
 */
export function filtrarPorNombre(listado, texto) {
    const busqueda = texto.trim().toLowerCase();

    if (busqueda === "") {
        return listado;
    }

    return listado.filter((producto) =>
        producto.nombre.toLowerCase().includes(busqueda)
    );
}
