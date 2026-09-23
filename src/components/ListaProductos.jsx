/* ============================================================
   COMPONENTE ListaProductos
   La rejilla del catálogo.

   Recibe (props):
     - productos: los productos ya filtrados que hay que mostrar.
     - busqueda: el texto buscado, solo para poder citarlo en el aviso.
     - categoria: la categoría activa, para el mismo aviso.
     - alAgregar: función que se pasa tal cual a cada tarjeta.

   Devuelve: la sección del catálogo.

   No filtra nada: recibe el listado ya resuelto y se limita a
   pintarlo. Mantener el filtrado en App y el pintado aquí es lo que
   hace que este componente sirva igual para el catálogo completo que
   para un resultado de búsqueda o de categoría.
   ============================================================ */

import { TODAS_LAS_CATEGORIAS } from "../utils/formato";
import TarjetaProducto from "./TarjetaProducto";

function ListaProductos({ productos, busqueda, categoria, alAgregar }) {
    const hayCategoria = categoria !== TODAS_LAS_CATEGORIAS;

    /* RENDERIZADO CONDICIONAL (criterio 5).
       Si los filtros no dejaron nada, en lugar de una rejilla vacía se
       muestra un aviso que explica por cuál de los dos se quedó sin
       resultados: el texto, la categoría, o ambos a la vez. */
    if (productos.length === 0) {
        return (
            <section id="catalogo" className="pt-4">
                <h2>Catálogo</h2>
                <p className="alert alert-secondary mt-3" role="status">
                    No encontramos juegos
                    {busqueda !== "" && <> que coincidan con «{busqueda}»</>}
                    {hayCategoria && <> en la categoría {categoria}</>}. Prueba
                    con otro nombre o vuelve a «{TODAS_LAS_CATEGORIAS}».
                </p>
            </section>
        );
    }

    return (
        <section id="catalogo" className="pt-4">
            <h2>Catálogo</h2>
            <p className="text-body-secondary">
                {productos.length}{" "}
                {/* Concordancia de singular y plural: con un solo
                    resultado, "juegos disponibles" chirría */}
                {productos.length === 1
                    ? "juego disponible"
                    : "juegos disponibles"}
                {/* Renderizado condicional: el nombre de la categoría solo
                    aparece cuando hay una activa */}
                {hayCategoria && <> en {categoria}</>}, todos con precio de
                oferta.
            </p>

            <div className="row g-4 mt-1">
                {/* .map() recorre el listado y crea una tarjeta por
                    producto. La prop key es obligatoria para que React
                    identifique cada elemento entre renderizados: sin ella
                    avisa por consola y puede reutilizar mal el DOM. */}
                {productos.map((producto) => (
                    <TarjetaProducto
                        key={producto.id}
                        producto={producto}
                        alAgregar={alAgregar}
                    />
                ))}
            </div>
        </section>
    );
}

export default ListaProductos;
