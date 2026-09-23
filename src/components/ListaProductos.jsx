/* ============================================================
   COMPONENTE ListaProductos
   La rejilla del catálogo.

   Recibe (props):
     - productos: los productos ya filtrados que hay que mostrar.
     - busqueda: el texto buscado, solo para poder citarlo en el aviso.
     - alAgregar: función que se pasa tal cual a cada tarjeta.

   Devuelve: la sección del catálogo.

   No filtra nada: recibe el listado ya resuelto y se limita a
   pintarlo. Mantener el filtrado en App y el pintado aquí es lo que
   hace que este componente sirva igual para el catálogo completo que
   para un resultado de búsqueda.
   ============================================================ */

import TarjetaProducto from "./TarjetaProducto";

function ListaProductos({ productos, busqueda, alAgregar }) {
    /* RENDERIZADO CONDICIONAL (criterio 5).
       Si la búsqueda no encontró nada, en lugar de una rejilla vacía
       se muestra un aviso que cita lo que el usuario escribió. */
    if (productos.length === 0) {
        return (
            <section id="catalogo">
                <h2>Catálogo</h2>
                <p className="alert alert-secondary mt-3" role="status">
                    No encontramos juegos que coincidan con «{busqueda}».
                    Prueba con otro nombre.
                </p>
            </section>
        );
    }

    return (
        <section id="catalogo">
            <h2>Catálogo</h2>
            <p className="text-body-secondary">
                {productos.length}{" "}
                {/* Concordancia de singular y plural: con un solo
                    resultado, "juegos disponibles" chirría */}
                {productos.length === 1
                    ? "juego disponible"
                    : "juegos disponibles"}
                , todos con precio de oferta.
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
