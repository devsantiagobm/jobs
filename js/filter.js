import ui from "./ui.js"
export default function filter(){
    const box = document.querySelector('.jobs')
    const headerContent = document.querySelector('.header__box')
    box.addEventListener('click', e => {
        if(e.target.classList.contains("filters__item")){
            ui.filtrar(e.target.dataset.filter)
        }
    })

    headerContent.addEventListener('click', e => {
        if(e.target.classList.contains("header__picture")){
            ui.eliminarFiltro(e.target.parentElement)
        }
    })

}