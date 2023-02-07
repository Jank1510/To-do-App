let to_do = []
let idNewTodo = 0
let New_To_Do = () => {
    let txtTodo = document.getElementById("todo").value
    to_do.push(txtTodo)
    idNewTodo++

    let divPadre = document.createElement('div')
    divPadre.className = 'designEmpty'

    let divCheck = document.createElement('div')
    divCheck.className = 'previewCheck'
    divCheck.id = 'previewcheck' + idNewTodo
    divPadre.appendChild(divCheck)

    let imgCheck = document.createElement('div')
    imgCheck.style.background = "url('./assets/icon-check.svg')"
    imgCheck.className = 'imgCheck'
    divCheck.appendChild(imgCheck)

    let spanTodo = document.createElement('span')
    spanTodo.className = 'previewTxt'
    spanTodo.innerHTML = txtTodo
    divPadre.appendChild(spanTodo)

    document.getElementById('seccion_todo').appendChild(divPadre)

    let imgpreview = document.getElementsByClassName('previewCheck')
    console.log(imgpreview.length)
    for (let index = 0; index < imgpreview.length; index++) {
        let id = 'previewCheck' + (index + 1)
        console.log(id, index)
        document.getElementById(id).addEventListener("click", function () {
            alert("El botón ha sido clicado", element.value)

        })
    }

}

