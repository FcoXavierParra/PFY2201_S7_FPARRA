/* ============================================================
   COMPONENTE TarjetaProducto
   La ficha de un producto del catálogo.

   Recibe (props):
     - producto: el objeto con nombre, precio, oferta, descripción e imagen.
     - alAgregar: función que App entrega para sumar el producto al carrito.

   Devuelve: la tarjeta completa de ese producto.

   Es el componente reutilizable por excelencia de la aplicación: se
   instancia nueve veces con datos distintos y la misma estructura.
   Muestra los cinco datos que exige el criterio 1 de la pauta.
   ============================================================ */

import {
    calcularAhorro,
    esOfertaDestacada,
    formatearPrecio,
} from "../utils/formato";

function TarjetaProducto({ producto, alAgregar }) {
    /* Se calculan una sola vez y se usan abajo, para no repetir la
       operación dentro del JSX */
    const ahorro = calcularAhorro(producto.precio, producto.oferta);
    const destacada = esOfertaDestacada(producto.precio, producto.oferta);

    return (
        <article className="col-12 col-sm-6 col-lg-4">
            <div className="card h-100">
                {/* 1. IMAGEN del producto */}
                <img
                    className="card-img-top"
                    src={producto.imagen}
                    alt={producto.alt}
                    width="320"
                    height="400"
                />

                <div className="card-body d-flex flex-column">
                    {/* 2. NOMBRE del producto */}
                    <h3 className="card-title h5">{producto.nombre}</h3>

                    <p className="small text-body-secondary mb-2">
                        {producto.genero}
                    </p>

                    {/* 3. DESCRIPCIÓN corta */}
                    <p className="card-text small">{producto.descripcion}</p>

                    {/* 4 y 5. PRECIO NORMAL y PRECIO DE OFERTA.
                        El normal va tachado para que se lea de un vistazo
                        cuál de los dos es el que se paga. */}
                    <p className="mb-1 mt-auto">
                        <span className="text-body-secondary text-decoration-line-through me-2">
                            {formatearPrecio(producto.precio)}
                        </span>
                        <span className="fs-5 fw-bold text-primary">
                            {formatearPrecio(producto.oferta)}
                        </span>
                    </p>

                    {/* RENDERIZADO CONDICIONAL (criterio 5).
                        La etiqueta destacada aparece solo cuando el descuento
                        llega al umbral; el resto de productos muestran nada
                        más el porcentaje de ahorro. Se ve la diferencia entre
                        unas tarjetas y otras sin tocar el código. */}
                    {destacada ? (
                        <p className="mb-3">
                            <span className="badge text-bg-primary">
                                ¡Mejor precio! −{ahorro} %
                            </span>
                        </p>
                    ) : (
                        <p className="mb-3 small text-body-secondary">
                            Ahorras un {ahorro} %
                        </p>
                    )}

                    {/* Evento onClick del criterio 4: agregar al carrito */}
                    <button
                        type="button"
                        className="btn btn-primary w-100"
                        onClick={() => alAgregar(producto.id)}
                    >
                        Agregar al carrito
                    </button>
                </div>
            </div>
        </article>
    );
}

export default TarjetaProducto;
