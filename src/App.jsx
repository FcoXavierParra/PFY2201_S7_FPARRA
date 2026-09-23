/* ============================================================
   COMPONENTE App — Nexus Play
   PFY2201 Desarrollo Frontend I · Duoc UC
   Actividad Formativa 5 (Semana 7)

   Componente raíz. Aquí vive el estado que comparten varios
   componentes y desde aquí baja por props.

   Por qué está aquí y no repartido: el contador del carrito lo pinta
   el encabezado, las líneas las pinta la sección del carrito y quien
   agrega productos es una tarjeta del catálogo. Son tres ramas
   distintas del árbol leyendo el mismo dato, así que el dato tiene que
   vivir en el ancestro común. Es el patrón que React llama "levantar
   el estado".

   Lo contrario también vale: el menú desplegable del encabezado guarda
   su estado dentro de Encabezado, porque no le importa a nadie más.
   ============================================================ */

import { useState } from "react";

import Buscador from "./components/Buscador";
import Carrito from "./components/Carrito";
import Encabezado from "./components/Encabezado";
import FiltroCategorias from "./components/FiltroCategorias";
import Inicio from "./components/Inicio";
import ListaProductos from "./components/ListaProductos";
import PieDePagina from "./components/PieDePagina";
import productos from "./data/productos";
import {
    calcularAhorro,
    filtrarPorCategoria,
    filtrarPorNombre,
    obtenerCategorias,
    TODAS_LAS_CATEGORIAS,
} from "./utils/formato";

/* Las categorías no cambian nunca, así que se calculan una sola vez al
   cargar el módulo y no en cada renderizado */
const CATEGORIAS = obtenerCategorias(productos);

/* El mayor descuento del catálogo, para la presentación de la portada */
const AHORRO_MAXIMO = Math.max(
    ...productos.map((p) => calcularAhorro(p.precio, p.oferta))
);

function App() {
    /* ---------- Estado con useState ---------- */

    /* El carrito guarda solo id y cantidad, no el producto entero.
       Duplicar aquí los datos del catálogo obligaría a mantener dos
       copias sincronizadas de la misma información. */
    const [carrito, setCarrito] = useState([]);

    /* El texto del buscador */
    const [busqueda, setBusqueda] = useState("");

    /* La categoría elegida en el filtro */
    const [categoria, setCategoria] = useState(TODAS_LAS_CATEGORIAS);

    /* ---------- Valores derivados ----------
       Estos NO son estado: se recalculan en cada renderizado a partir
       del estado y del catálogo. Guardarlos en su propio useState es
       el error clásico, porque entonces hay que acordarse de
       actualizarlos a mano y tarde o temprano se desincronizan. */

    /* Los dos filtros se encadenan: primero la categoría, luego el
       texto. El orden da igual para el resultado, pero encadenarlos
       así deja claro que ambos se aplican a la vez. */
    const productosVisibles = filtrarPorNombre(
        filtrarPorCategoria(productos, categoria),
        busqueda
    );

    /* El carrito resuelto: cada línea con su producto completo al lado */
    const lineasCarrito = carrito.map((linea) => ({
        producto: productos.find((p) => p.id === linea.id),
        cantidad: linea.cantidad,
    }));

    /* Total de unidades, para el contador del encabezado */
    const unidades = carrito.reduce((suma, linea) => suma + linea.cantidad, 0);

    /* ---------- Acciones sobre el carrito ---------- */

    /**
     * Agrega un producto al carrito. Si ya estaba, suma una unidad a su
     * línea en lugar de crear una línea repetida.
     * @param {number} id - Identificador del producto.
     */
    function agregarAlCarrito(id) {
        setCarrito((actual) => {
            const existente = actual.find((linea) => linea.id === id);

            if (existente) {
                return actual.map((linea) =>
                    linea.id === id
                        ? { ...linea, cantidad: linea.cantidad + 1 }
                        : linea
                );
            }

            return [...actual, { id, cantidad: 1 }];
        });
    }

    /**
     * Quita una unidad de un producto. No baja de uno: para dejarlo en
     * cero está el botón de eliminar, que es más claro para el usuario.
     * @param {number} id - Identificador del producto.
     */
    function quitarUnaUnidad(id) {
        setCarrito((actual) =>
            actual.map((linea) =>
                linea.id === id && linea.cantidad > 1
                    ? { ...linea, cantidad: linea.cantidad - 1 }
                    : linea
            )
        );
    }

    /**
     * Elimina del carrito la línea completa de un producto.
     * @param {number} id - Identificador del producto.
     */
    function eliminarDelCarrito(id) {
        setCarrito((actual) => actual.filter((linea) => linea.id !== id));
    }

    /** Deja el carrito vacío. */
    function vaciarCarrito() {
        setCarrito([]);
    }

    /* ---------- Interfaz ---------- */

    return (
        <>
            <Encabezado unidades={unidades}>
                <Buscador busqueda={busqueda} alBuscar={setBusqueda} />
            </Encabezado>

            {/* El catálogo y el carrito van lado a lado desde 992 px, con el
                carrito fijo al hacer scroll. Puestos uno debajo del otro, el
                carrito quedaba a nueve tarjetas de distancia y la tienda
                parecía solo un catálogo. Por debajo de 992 px se apilan, y
                para llegar al carrito está el enlace del encabezado. */}
            <main className="container pb-4">
                <Inicio
                    totalProductos={productos.length}
                    ahorroMaximo={AHORRO_MAXIMO}
                />

                <div className="row g-4">
                    <div className="col-lg-8">
                        <FiltroCategorias
                            categorias={CATEGORIAS}
                            seleccionada={categoria}
                            alSeleccionar={setCategoria}
                        />

                        <ListaProductos
                            productos={productosVisibles}
                            busqueda={busqueda}
                            categoria={categoria}
                            alAgregar={agregarAlCarrito}
                        />
                    </div>

                    <aside className="col-lg-4">
                        <Carrito
                            lineas={lineasCarrito}
                            alQuitar={quitarUnaUnidad}
                            alEliminar={eliminarDelCarrito}
                            alVaciar={vaciarCarrito}
                        />
                    </aside>
                </div>
            </main>

            <PieDePagina />
        </>
    );
}

export default App;
