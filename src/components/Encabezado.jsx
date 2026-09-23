/* ============================================================
   COMPONENTE Encabezado
   Barra superior con la marca y el contador del carrito.

   Recibe (props):
     - unidades: número total de juegos en el carrito.
     - children: el buscador, que se inserta dentro de la barra.

   Devuelve: el <header> del sitio.

   No tiene estado propio. El contador que muestra es un dato que le
   llega calculado desde App: el componente solo lo pinta.
   ============================================================ */

import logo from "../assets/img/logo.svg";

function Encabezado({ unidades, children }) {
    return (
        <header>
            <nav
                className="navbar sticky-top border-bottom border-3 border-primary"
                aria-label="Menú principal"
            >
                <div className="container d-flex flex-wrap align-items-center gap-3">
                    {/* Marca de la tienda: logo y nombre */}
                    <a
                        className="navbar-brand d-flex align-items-center gap-2 me-0"
                        href="#catalogo"
                    >
                        <img
                            src={logo}
                            alt="Logo de Nexus Play: un mando de videojuegos junto a las letras NP"
                            width="40"
                            height="40"
                        />
                        <span className="fw-bold">Nexus Play</span>
                    </a>

                    {/* El buscador llega como children para que el encabezado no
                        tenga que conocer su funcionamiento interno */}
                    {children}

                    {/* Contador del carrito: exigido por las instrucciones.
                        aria-live avisa a los lectores de pantalla cada vez que
                        el número cambia. */}
                    <a
                        className="btn btn-outline-primary btn-sm ms-auto"
                        href="#carrito"
                    >
                        Carrito{" "}
                        <span
                            className="badge text-bg-primary"
                            aria-live="polite"
                        >
                            {unidades}
                        </span>
                    </a>
                </div>
            </nav>
        </header>
    );
}

export default Encabezado;
