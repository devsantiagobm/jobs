import ui from "./ui.js";
import data from "./data.js"
export default function getData() {
    ui.generarContenido(data)
    ui.ocultarModal()
}