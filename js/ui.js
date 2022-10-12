export class UI {
    constructor() {
        this.elementos = []
        this.filtros = []
    }

    generarContenido(datos) {
        const cajaPadre = document.querySelector('.jobs')
        this.limpiarHTML(cajaPadre)

        datos.forEach(job => {
            const caja = document.createElement("div")
            const { languages, tools, level, role } = job
            const filtros = [...languages, ...tools, level, role].toString()

            caja.classList.add('jobs__work')
            caja.innerHTML = this.generarHTML(job)
            caja.dataset.filtros = filtros
            caja.dataset.id = job.id;

            cajaPadre.appendChild(caja);

        });
        this.elementos = datos
    }

    mostrarError(error) {
        console.log(error)
    }

    generarHTML(job) {
        const { company, contract, featured, languages, level, location, logo, position, postedAt, role, tools } = job;
        const filtros = [...languages, ...tools, level, role]

        return `
            <div class="jobs__data data">
                <picture class="data__picture">
                    <img src="${logo}"
                         alt="company logo">
                </picture>
                <div class="data__information">
                    <div class="data__company">
                        <span class="data__company-name">${company}</span>
                        ${this.revisarNuevo(job.new)}
                        ${this.revisarDestacado(featured)}</span>
                    </div>
                    <div class="data__job-name">${position}</div>
                    <ul class="data__list">
                        <li class="data__item">${postedAt}</li>
                        <li class="data__item">${contract}</li>
                        <li class="data__item">${location}</li>
                    </ul>
                </div>
            </div>
            <div class="jobs__filters filters">
                <ul class="filters__list">
                    ${this.generarFiltros(filtros)}
                </ul>
            </div>`
    }

    generarFiltros(filtros) {
        let html = ""

        filtros.forEach(filtro => {
            const elemento = `<span class="filters__item" data-filter=${filtro}>${filtro}</span>`
            html += elemento
        })

        return html
    }


    filtrar(filtro) {
        this.filtros = Array.from(new Set([...this.filtros, filtro]))
        this.crearFiltros(this.filtros); // html
        this.filtrarContenido(this.filtros) // lógica
    }

    crearFiltros(filtros) {
        const cajaPadre = document.querySelector('.header__box')

        this.limpiarHTML(cajaPadre)
        filtros.forEach(filtro => {
            const caja = document.createElement("div")
            caja.classList.add('header__filter')
            caja.dataset.filtro = filtro
            caja.innerHTML = `
                    <span class="header__item">${filtro}</span>
                    <img src="images/close.svg" alt="close icon" class="header__picture">
                    `
            cajaPadre.appendChild(caja)
        })

        this.mostrarFiltros(this.filtros)
    }

    filtrarContenido(filtros) {

        this.scrollUp()
        const trabajos = Array.from(document.querySelectorAll(".jobs__work"))

        trabajos.forEach(trabajo => {
            const tieneFiltro = filtros.every(f => trabajo.dataset.filtros.includes(f))
            tieneFiltro ? trabajo.classList.remove("jobs__work--hidden") : trabajo.classList.add("jobs__work--hidden") 
        })

        this.mostrarAnimacion()
        
    }

    scrollUp(){
        window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth"

        })
    }

    mostrarAnimacion(){
        const caja = document.querySelector(".jobs")
        caja.classList.add('jobs--active')


        setTimeout(() => caja.classList.remove('jobs--active'), 1000);
    }

    mostrarFiltros(filtros) {
        const filtrosCaja = document.querySelector('.header__filters')
        if (!filtrosCaja.classList.contains("header__filters--active") && filtros.length > 0) {
            filtrosCaja.classList.add('header__filters--active')
        }

        if(filtros.length === 0){
            filtrosCaja.classList.remove('header__filters--active')
        }
    }

    limpiarHTML(elemento) {
        while (elemento.firstChild) {
            elemento.removeChild(elemento.firstChild)
        }
    }

    eliminarFiltro(elemento){
        this.filtros = this.filtros.filter(item => item != elemento.dataset.filtro)
        this.crearFiltros(this.filtros); // html
        this.filtrarContenido(this.filtros) // lógica
    }

    ocultarModal(){
        const modal = document.querySelector('.modal')

        modal.classList.add('modal--hidden')
    }

    revisarNuevo = nuevo => nuevo ? `<span class="data__new">new!</span>` : ""
    revisarDestacado = destacado => destacado ? `<span class="data__featured">featured</span>` : ""

}

const ui = new UI();

export default ui;

