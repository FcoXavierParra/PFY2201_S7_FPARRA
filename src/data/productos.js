/* ============================================================
   FUENTE DE DATOS DEL CATÁLOGO — Nexus Play
   PFY2201 Desarrollo Frontend I · Duoc UC
   Actividad Formativa 5 (Semana 7)

   Los nueve productos de la tienda, heredados de la Semana 6 con sus
   textos y precios intactos. Lo nuevo de esta semana es el campo
   "oferta": las instrucciones piden que cada producto muestre precio
   normal Y precio de oferta, así que los nueve lo llevan.

   Las imágenes se IMPORTAN en vez de referenciarse por ruta. Esto no
   es un capricho de estilo: Vite reescribe la URL de cada archivo
   importado durante el build y respeta la ruta base con la que se
   publica en GitHub Pages. Una ruta escrita a mano como
   "/img/elden-realms.svg" funcionaría en local y se rompería al
   publicar en un subdirectorio.
   ============================================================ */

import auroraDrift from "../assets/img/aurora-drift.svg";
import bosqueDeCenizas from "../assets/img/bosque-de-cenizas.svg";
import contragolpe from "../assets/img/contragolpe.svg";
import eldenRealms from "../assets/img/elden-realms.svg";
import pixelKingdom from "../assets/img/pixel-kingdom.svg";
import shadowOps from "../assets/img/shadow-ops.svg";
import torreDeHierro from "../assets/img/torre-de-hierro.svg";
import umbralProfundo from "../assets/img/umbral-profundo.svg";
import velocityGp from "../assets/img/velocity-gp.svg";

/* Cada producto reúne los cinco datos que exige el criterio 1 de la
   pauta: nombre, precio normal, precio de oferta, descripción e imagen.
   El campo "alt" acompaña a la imagen por accesibilidad, y "genero" se
   conserva de la Semana 6 como dato descriptivo de la ficha. */
const productos = [
    {
        id: 1,
        nombre: "Elden Realms",
        genero: "RPG",
        precio: 44990,
        oferta: 34990,
        imagen: eldenRealms,
        alt: "Portada del videojuego Elden Realms",
        descripcion:
            "RPG de mundo abierto con combate por resistencia y exploración libre.",
    },
    {
        id: 2,
        nombre: "Velocity GP",
        genero: "Deportes",
        precio: 32990,
        oferta: 27990,
        imagen: velocityGp,
        alt: "Portada del videojuego Velocity GP",
        descripcion:
            "Carreras arcade con 24 circuitos y multijugador local para cuatro.",
    },
    {
        id: 3,
        nombre: "Shadow Ops",
        genero: "Acción",
        precio: 39990,
        oferta: 27990,
        imagen: shadowOps,
        alt: "Portada del videojuego Shadow Ops",
        descripcion:
            "Shooter táctico por equipos, con campaña cooperativa y progresión.",
    },
    {
        id: 4,
        nombre: "Pixel Kingdom",
        genero: "Aventura",
        precio: 19990,
        oferta: 14990,
        imagen: pixelKingdom,
        alt: "Portada del videojuego Pixel Kingdom",
        descripcion:
            "Aventura de pixel art con puzles, mapas secretos y jefes finales.",
    },
    {
        id: 5,
        nombre: "Aurora Drift",
        genero: "Deportes",
        precio: 34990,
        oferta: 29990,
        imagen: auroraDrift,
        alt: "Portada del videojuego Aurora Drift",
        descripcion:
            "Conducción de derrape nocturno con rutas de montaña y tuning.",
    },
    {
        id: 6,
        nombre: "Umbral Profundo",
        genero: "RPG",
        precio: 44990,
        oferta: 29990,
        imagen: umbralProfundo,
        alt: "Portada del videojuego Umbral Profundo",
        descripcion:
            "RPG por turnos en mazmorras generadas, con gestión de grupo.",
    },
    {
        id: 7,
        nombre: "Torre de Hierro",
        genero: "Estrategia",
        precio: 29990,
        oferta: 22990,
        imagen: torreDeHierro,
        alt: "Portada del videojuego Torre de Hierro",
        descripcion:
            "Estrategia de defensa por oleadas con mejoras y árbol de talentos.",
    },
    {
        id: 8,
        nombre: "Bosque de Cenizas",
        genero: "Aventura",
        precio: 24990,
        oferta: 17490,
        imagen: bosqueDeCenizas,
        alt: "Portada del videojuego Bosque de Cenizas",
        descripcion:
            "Aventura narrativa de supervivencia con decisiones que ramifican.",
    },
    {
        id: 9,
        nombre: "Contragolpe",
        genero: "Acción",
        precio: 39990,
        oferta: 35990,
        imagen: contragolpe,
        alt: "Portada del videojuego Contragolpe",
        descripcion:
            "Acción cuerpo a cuerpo con parada perfecta y combates de arena.",
    },
];

export default productos;
