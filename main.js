let Object_To_Do = {}//objeto con el data 
let propiertiesADD = 0 //int que nos almacena la posicion del todo que se va a manejar
let output = ''//string que nos concatena los to-do para imprimirlos
let position_ToDoGlobalDeleteToDo //int que almacena la posicion del to-do a eliminar
let nofocusToDO = false //boolean q controla la logica de focus en los elementos
let idTODO //int para estructurar el id de los elmenttos a eliminar
let themeDark = false //boolean para configurar el cambio de tema

//FUncion que imprime en pantalla segun el localstorage

let imprimir_to_do = () => {
    //variables que nos identifican en que tema esta para asi no perder el diseño del tema al agregar un elemento
    //-fondo y borde del to-do
    let DesignTodoSwitchTheme = `background-color:${themeDark ? "rgb(37, 39, 60);" : "rgb(255, 255, 255);"}` +
        `border-bottom: ${themeDark ? "0.08vw solid rgb(72, 75, 106);" : "0.08vw solid rgb(210, 211, 219);"}`
    //color del texto del span
    let spanSwitchTheme = `color:${themeDark ? "rgb(210, 211, 219);" : "rgb(72, 75, 106);"}`
    //indica que el to-do esta terminado
    let spanFinishedSwitchTheme = `color:${themeDark ? "rgb(72, 75, 106);" : "rgb(210, 211, 219);"}`
    let BorderFinishedSwitchTheme = `${themeDark ? "0.1vw solid rgb(72, 75, 106);" : "0.05vw solid rgb(210, 211, 219);"}`
    if ((localStorage.getItem('Data_ToDo') != null) && (localStorage.getItem('Data_ToDo') != '{}')) {
        output = ''
        Object_To_Do = (JSON.parse(localStorage.getItem('Data_ToDo')))//condicion que lee el localstorage para cargar los datos 
        for (let i = 0; i < Object.keys(Object_To_Do).length; i++) {
            output += `        
                 <div style='${DesignTodoSwitchTheme}' id="${i + 1}${i + 1}${i + 1}${i + 1}" class="design_ToDO" onpointerdown="Showdelete(${i + 1}${i + 1}${i + 1})" onmouseover="Showdelete(${i + 1}${i + 1}${i + 1})" onmouseout="Ocultdelete(${i + 1}${i + 1}${i + 1})">
                    <div style='border:${Object_To_Do[`ChildTodoObject${i}`]['check'] == true ? 'none' : BorderFinishedSwitchTheme}' class="${Object_To_Do[`ChildTodoObject${i}`]['check'] == true ? 'imgcheck' : 'imgNoCheck'}" id="${i}" onClick='check_To_Do(${i})'>
                        <img src="./assets/icon-check.svg" alt="chek">
                    </div>
                    <span style='${Object_To_Do[`ChildTodoObject${i}`]['check'] == true ? spanFinishedSwitchTheme : spanSwitchTheme}' tabindex="${propiertiesADD}" class="${Object_To_Do[`ChildTodoObject${i}`]['check'] == true ? 'previewTxt finish' : 'previewTxt'}" id="${i}${i}" >
                        ${Object_To_Do[`ChildTodoObject${i}`]['nameTodo']}
                    </span>
                    <img id="${i + 1}${i + 1}${i + 1}" onclick="Delete_To_Do(${i})" class="imgCross" src="./assets/icon-cross.svg" alt="Cross">
                </div>
                `//vamos creando un template string que contenga todos los todo añadidos  
        }
        propiertiesADD = Object.keys(Object_To_Do).length//lleva el orden de la cantidad de veces que se crea un todo        
        document.getElementById('new_toDOs').innerHTML = output//y añadimos todos los todos ala vista
        if (nofocusToDO != true) {
            let Ultimo_To_do = document.getElementById(`${propiertiesADD - 1}${propiertiesADD - 1}`)
            Ultimo_To_do.focus()
            Ultimo_To_do.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        output = ''
    } else {
        output = ''
        document.getElementById('new_toDOs').innerHTML = output//y añadimos todos los todos ala vista
        localStorage.clear();
        propiertiesADD = 0
    }
}

//funciones para eliminar un todo

let Showdelete = (id) => {
    document.getElementById(id).style.display = 'block'
    idTODO = id
    switch (idTODO.toString().length) {//hay un bug cuando el numero es mayor a 9 digitos ya q extraemos 
        //el id del img q se muestra con el cursor y nos toca agregar unos digitos mas para q se asimile alid del padre
        case 3:
            idTODO = parseInt(idTODO.toString().charAt(0) + idTODO);
            break;
        case 6:
            idTODO = parseInt(idTODO.toString().substr(0, 2) + idTODO);
            break;
        case 9:
            idTODO = parseInt(idTODO.toString().substr(0, 3) + idTODO);
            break;
    } 

}
let Ocultdelete = (id) => {
    if (document.getElementById('body').clientWidth >= 850) {

        document.getElementById(id).style.display = 'none'
    }
}
let Delete_To_Do = (position_ToDo) => { //esta funcion muestra el diseño de eliminar un todo
    position_ToDoGlobalDeleteToDo = position_ToDo
    document.getElementById('deleteTODO').style.display = 'flex'
    document.getElementById('deleteAll').style.display = 'none'
    document.getElementById('delete').style.display = 'block'
    let txtSpan = 'Are you sure you want to delete the task "' + '"?'
    document.getElementById('txt_Delete_To_Do').innerHTML = txtSpan
}
let OpcionUser = (deleteTODO) => {//esta funcion tiene la logica de eliminar un todo
    if (deleteTODO == 'onlyTodo') {//para borrar un todo seleccionado
        document.getElementById(idTODO).className = 'design_ToDO design_ToDO_Delete'
        setTimeout(() => {
            delete Object_To_Do[`ChildTodoObject${position_ToDoGlobalDeleteToDo}`]
            nofocusToDO = true
            let NewPropiertiesADD = 0
            let NewObject_To_Do = {}//nuevo objeto para restructurar el orden de childobject del objeto anterior 
            for (const iterator in Object_To_Do) {
                NewObject_To_Do[`ChildTodoObject${NewPropiertiesADD}`] = {
                    check: Object_To_Do[iterator]['check'],
                    nameTodo: Object_To_Do[iterator]['nameTodo']
                };//añadimos un objeto todo dentro del objeto padre 
                NewPropiertiesADD++
            }
            Object_To_Do = NewObject_To_Do
            localStorage.setItem('Data_ToDo', JSON.stringify(Object_To_Do))//guarda los cambios
            to_do_finished()
            show_all()
        }, 1000);
    } else {
        if (deleteTODO == 'deleteAll') {//para borrar todos los todo completadps
            nofocusToDO = true
            let propiertiesADDPositionDelete = 0
            let propiertiesADDNew = 0
            let newObject_To_DoDeleted = {}
            show_all()
            for (const key in Object_To_Do) {
                if (Object_To_Do[key]['check'] == true) {
                    let idTODOFORDELETE = `${propiertiesADDPositionDelete + 1}${propiertiesADDPositionDelete + 1}${propiertiesADDPositionDelete + 1}${propiertiesADDPositionDelete + 1}`
                    document.getElementById(idTODOFORDELETE).className = 'design_ToDO design_ToDO_Delete'
                } else {
                    newObject_To_DoDeleted[`ChildTodoObject${propiertiesADDNew}`] = {
                        check: Object_To_Do[key]['check'],
                        nameTodo: Object_To_Do[key]['nameTodo']
                    };//añadimos un objeto todo dentro del objeto padre 
                    propiertiesADDNew++
                }
                propiertiesADDPositionDelete++
            }
            setTimeout(() => {
                Object_To_Do = newObject_To_DoDeleted
                localStorage.setItem('Data_ToDo', JSON.stringify(Object_To_Do))//guarda los cambios
                show_all()
                to_do_finished()
            }, 1000);
        }
    }
    document.getElementById('deleteTODO').style.display = 'none'
}

//funcion para agregar to-do

let New_To_Do = () => {
    let input = document.getElementById("todo")
    let txtTodo = input.value//traemos el texto del input
    if (txtTodo.trim().length > 0) {
        Object_To_Do[`ChildTodoObject${propiertiesADD}`] = {
            check: false,
            nameTodo: txtTodo
        };//añadimos un objeto todo dentro del objeto padre
        localStorage.setItem('Data_ToDo', JSON.stringify(Object_To_Do))//lo guardamos en el localstorage    
        input.value = ''
        nofocusToDO = false
        show_all()
        to_do_finished()
        setTimeout(() => {
            input.focus()
        }, 1000);
    } else {
        input.focus()
    }
}
document.addEventListener("keydown", function (event) {//funcion q permite agregar todos desde el teclado
    if (event.key == 'Enter') {
        New_To_Do()
    }
})

//funcion para marcar cuando el to-do esta listo

let check_To_Do = (id) => {//aqui el id es lo mismo que la posicion en el objeto ya que cmparten esa igualdad
    //variables que nos identifican en que tema esta para asi no perder el diseño del tema al agregar un elemento
    //-fondo y borde del to-do
    let txtSwitchTheme = `${themeDark ? "rgb(72, 75, 106)" : "rgb(210, 211, 219)"}`
    if (Object_To_Do[`ChildTodoObject${id}`]['check'] == false) {//identificamos que ese elemento este check o no y guardamos los cambios en el objeto
        Object_To_Do[`ChildTodoObject${id}`]['check'] = true
        document.getElementById(id).className = 'imgcheck'
        document.getElementById(`${id}${id}`).className = 'previewTxt finish'
        document.getElementById(`${id}${id}`).style.background = txtSwitchTheme
    } else {
        if (Object_To_Do[`ChildTodoObject${id}`]['check'] == true) {
            Object_To_Do[`ChildTodoObject${id}`]['check'] = false
            document.getElementById(id).className = 'imgNoCheck'
            document.getElementById(`${id}${id}`).className = 'previewTxt'
        }
    }
    localStorage.setItem('Data_ToDo', JSON.stringify(Object_To_Do))//guarda los cambios
    nofocusToDO = true
    to_do_finished()
    show_all()
}

//funcion que indica los to-do listos

let to_do_finished = () => {
    let To_do_Finisheds = 0
    let To_do_Left = 0
    for (let i = 0; i < Object.keys(Object_To_Do).length; i++) {
        if (Object_To_Do[`ChildTodoObject${i}`]['check'] == true) {
            To_do_Finisheds++
        }
    }
    To_do_Left = (Object.keys(Object_To_Do).length) - To_do_Finisheds
    document.getElementById('To_do_Finisheds').innerHTML = `${To_do_Left} items left`
    document.getElementById('To_do_Finisheds2').innerHTML = `${To_do_Left} items left`
}

// FUNCIONES DE FILTRADO
let bluetxtFiltrado = 'show_all'

let show_all = () => {
    document.getElementById('show_Active').style.color = 'hsl(235, 19%, 35%)'
    document.getElementById('show_Active2').style.color = 'hsl(235, 19%, 35%)'
    document.getElementById('show_all').style.color = '#4070dd'
    document.getElementById('show_all2').style.color = '#4070dd'
    document.getElementById('show_Completed').style.color = 'hsl(235, 19%, 35%)'
    document.getElementById('show_Completed2').style.color = 'hsl(235, 19%, 35%)'
    imprimir_to_do()
    bluetxtFiltrado = 'show_all'
}
let show_actived = () => {
    document.getElementById('show_all').style.color = 'hsl(235, 19%, 35%)'
    document.getElementById('show_all2').style.color = 'hsl(235, 19%, 35%)'
    document.getElementById('show_Active').style.color = '#4070dd'
    document.getElementById('show_Active2').style.color = '#4070dd'
    document.getElementById('show_Completed').style.color = 'hsl(235, 19%, 35%)'
    document.getElementById('show_Completed2').style.color = 'hsl(235, 19%, 35%)'
    showFilterTodo(false)
    bluetxtFiltrado = 'show_actived'
}
let completed = () => {
    document.getElementById('show_Active').style.color = 'hsl(235, 19%, 35%)'
    document.getElementById('show_Active2').style.color = 'hsl(235, 19%, 35%)'
    document.getElementById('show_all').style.color = 'hsl(235, 19%, 35%)'
    document.getElementById('show_all2').style.color = 'hsl(235, 19%, 35%)'
    document.getElementById('show_Completed').style.color = '#4070dd'
    document.getElementById('show_Completed2').style.color = '#4070dd'
    showFilterTodo(true)
    bluetxtFiltrado = 'completed'

}
let showFilterTodo = (check) => {//recive un boolean q indica si esta completado o no para condicionarlo y motrar solo los marcados
    let propiertiesADDFilterActive = 0
    let empty = true
    //variables que nos identifican en que tema esta para asi no perder el diseño del tema al agregar un elemento
    //-fondo y borde del to-do
    let DesignTodoSwitchTheme = `background-color:${themeDark ? "rgb(37, 39, 60);" : "rgb(255, 255, 255);"}` +
        `border-bottom: ${themeDark ? "0.08vw solid rgb(72, 75, 106);" : "0.08vw solid rgb(210, 211, 219);"}`
    //color del texto del span
    let spanSwitchTheme = `color:${themeDark ? "rgb(210, 211, 219);" : "rgb(72, 75, 106);"}`
    //indica que el to-do esta terminado
    let spanFinishedSwitchTheme = `color:${themeDark ? "rgb(72, 75, 106);" : "rgb(210, 211, 219);"}`
    let BorderFinishedSwitchTheme = `${themeDark ? "0.1vw solid rgb(72, 75, 106);" : "0.05vw solid rgb(210, 211, 219);"}`
    output = ''
    for (const key in Object_To_Do) {
        if (Object_To_Do[key]['check'] == check) {
            output += `        
                <div style='${DesignTodoSwitchTheme}' id="${propiertiesADDFilterActive + 1}${propiertiesADDFilterActive + 1}${propiertiesADDFilterActive + 1}${propiertiesADDFilterActive + 1}" class="design_ToDO" onmouseover="Showdelete(${propiertiesADDFilterActive + 1}${propiertiesADDFilterActive + 1}${propiertiesADDFilterActive + 1})" onmouseout="Ocultdelete(${propiertiesADDFilterActive + 1}${propiertiesADDFilterActive + 1}${propiertiesADDFilterActive + 1})">
                    <div style='border:${Object_To_Do[`ChildTodoObject${propiertiesADDFilterActive}`]['check'] == true ? 'none' : BorderFinishedSwitchTheme}' class="${Object_To_Do[key]['check'] == true ? 'imgcheck' : 'imgNoCheck'}" id="${propiertiesADDFilterActive}" onClick='check_To_Do(${propiertiesADDFilterActive})'>
                        <img src="./assets/icon-check.svg" alt="chek">
                    </div>
                    <span  style='${check == true ? spanFinishedSwitchTheme : spanSwitchTheme}'tabindex="${propiertiesADDFilterActive}" class="${Object_To_Do[key]['check'] == true ? 'previewTxt finish' : 'previewTxt'}" id="${propiertiesADDFilterActive}${propiertiesADDFilterActive}" >
                        ${Object_To_Do[`ChildTodoObject${propiertiesADDFilterActive}`]['nameTodo']}
                    </span>
                    <img id="${propiertiesADDFilterActive + 1}${propiertiesADDFilterActive + 1}${propiertiesADDFilterActive + 1}" onclick="Delete_To_Do(${propiertiesADDFilterActive})" class="imgCross" src="./assets/icon-cross.svg" alt="Cross">
                </div>
                `
            empty = false
        }
        propiertiesADDFilterActive++
    }
    if (empty == true) {
        output += `        
            <div style='${DesignTodoSwitchTheme}' class="design_ToDO"> 
                <span  style='${spanSwitchTheme}' class='sectionEmpty'>
                    Ops! This section is empty
                </span>
            </div>
            `
    }
    document.getElementById('new_toDOs').innerHTML = output//y añadimos todos los todos ala vista 
}

//Funcion para borrar todos los TO-DO completados

let ClearCompleted = () => {
    let emptyCompleted = true//indicamos que existan elementos completados para mostrar el dialogo de delete
    for (const key in Object_To_Do) {
        if (Object_To_Do[key]['check'] == true) {
            emptyCompleted = false
        }
    }
    if (emptyCompleted == false) {
        document.getElementById('deleteTODO').style.display = 'flex'
        document.getElementById('deleteAll').style.display = 'block'
        document.getElementById('delete').style.display = 'none'
        let txtSpan = 'Are you sure you want to delete the completed tasks?'
        document.getElementById('txt_Delete_To_Do').innerHTML = txtSpan
    } else {//animacion para indicar que no hay todos para eliminar que esten completadps
        document.getElementById('completedClear').className = 'empydELETEcoMPLETED clerar_completes hover'
        document.getElementById('completedClear2').className = 'empydELETEcoMPLETED clerar_completes hover'
        setTimeout(() => {
            document.getElementById('completedClear').className = 'clerar_completes hover'
            document.getElementById('completedClear2').className = 'clerar_completes hover'
        }, 1000);
    }
}

//Funcion de diseño 'Temas'

let switchTheme = () => {
    if (themeDark == false) {
        themeDark = true
        document.getElementById('SwitchTheme').style.backgroundImage = 'url(./assets/icon-sun.svg)'
        document.getElementById('imgUp').style.backgroundImage = 'url(./assets/bg-desktop-dark.jpg)'
        document.getElementById('body').style.backgroundColor = '#181824'
        document.getElementById('newTodo').style.backgroundColor = '#25273c'
        document.getElementById('todo').style.color = 'hsl(233, 11%, 84%)'
        const design_ToDO = document.querySelectorAll('.design_ToDO');
        document.getElementById('sectionDelete').style.backgroundColor = '#25273c'
        document.getElementById('txt_Delete_To_Do').style.color = 'hsl(236, 33%, 92%)'
        document.getElementById('deleteAll').style.backgroundColor = 'hsl(233, 11%, 84%)'
        document.getElementById('deleteAll').style.color = 'rgb(72, 75, 106)'
        document.getElementById('delete').style.backgroundColor = 'hsl(233, 11%, 84%)'
        document.getElementById('delete').style.color = 'rgb(72, 75, 106)'
        document.getElementById('cancelDelete').style.color = 'rgb(72, 75, 106)'
        document.getElementById('cancelDelete').style.backgroundColor = 'hsl(233, 11%, 84%)'

        document.getElementById('downcel').style.backgroundColor='rgb(37, 39, 60)'
        document.getElementById('upcel').style.backgroundColor='rgb(37, 39, 60)'
        document.getElementById('upcel').style.boxShadow='rgb(37, 39, 60) 0px 0vw 4vw -1vw'
        document.getElementById('downcel').style.boxShadow='rgb(37, 39, 60) 0px 0vw 4vw -1vw'
        for (let i = 0; i < design_ToDO.length; i++) {
            design_ToDO[i].style.backgroundColor = '#25273c';
            design_ToDO[i].style.borderBottom = '0.08vw solid hsl(235, 19%, 35%)'
        }
        const previewTxt = document.querySelectorAll('.previewTxt');
        for (let i = 0; i < previewTxt.length; i++) {
            previewTxt[i].style.color = 'hsl(233, 11%, 84%)';
        }
        const finish = document.querySelectorAll('.finish');
        for (let i = 0; i < finish.length; i++) {
            finish[i].style.color = 'hsl(235, 19%, 35%)';
        }
        document.getElementById('optioTOdo').style.backgroundColor = '#25273c'
        document.getElementById('optioTOdo2').style.backgroundColor = '#25273c'
        const colorjs = document.querySelectorAll('.colorjs');
        for (let i = 0; i < colorjs.length; i++) {
            colorjs[i].style.color = 'hsl(235, 19%, 35%)';
        }
        document.getElementById('footerCreditos').style.color = 'hsl(235, 19%, 35%)'
        document.getElementById('footer').style.color = 'hsl(235, 19%, 35%)'
        document.getElementById('sectionTodoShadow').style.boxShadow = '0px 4vw 3vw -1vw #040404'
        const imgNoCheck = document.querySelectorAll('.imgNoCheck');
        for (let i = 0; i < imgNoCheck.length; i++) {
            imgNoCheck[i].style.border = '0.1vw solid hsl(235, 19%, 35%)';
        }
        document.getElementById('CheckToDo').style.border = '0.1vw solid hsl(235, 19%, 35%)';
    }
    else {
        if (themeDark == true) {
            themeDark = false
            document.getElementById('SwitchTheme').style.backgroundImage = 'url(./assets/icon-moon.svg)'
            document.getElementById('imgUp').style.backgroundImage = 'url(./assets/bg-desktop-light.jpg)'
            document.getElementById('body').style.backgroundColor = '#FAFAFA'
            document.getElementById('newTodo').style.backgroundColor = '#ffffff'
            document.getElementById('todo').style.color = 'hsl(235, 19%, 35%)'
            document.getElementById('sectionDelete').style.backgroundColor = '#fff'
            document.getElementById('txt_Delete_To_Do').style.color = 'rgb(72, 75, 106)'
            document.getElementById('deleteAll').style.backgroundColor = 'rgb(72, 75, 106)'
            document.getElementById('deleteAll').style.color = 'white'
            document.getElementById('delete').style.backgroundColor = 'rgb(72, 75, 106)'
            document.getElementById('delete').style.color = 'white'
            document.getElementById('cancelDelete').style.color = 'white'
            document.getElementById('cancelDelete').style.backgroundColor = 'rgb(72, 75, 106)'
            document.getElementById('downcel').style.backgroundColor='white'
            document.getElementById('upcel').style.backgroundColor='white'
            document.getElementById('upcel').style.boxShadow='rgb(204, 204, 204) 0px 0vw 4vw -1vw'
            document.getElementById('downcel').style.boxShadow='rgb(204, 204, 204) 0px 0vw 4vw -1vw'
            const design_ToDO = document.querySelectorAll('.design_ToDO');
            for (let i = 0; i < design_ToDO.length; i++) {
                design_ToDO[i].style.backgroundColor = '#ffffff';
                design_ToDO[i].style.borderBottom = '0.08vw solid rgb(210, 211, 219)'
            }
            const previewTxt = document.querySelectorAll('.previewTxt');
            for (let i = 0; i < previewTxt.length; i++) {
                previewTxt[i].style.color = 'rgb(72, 75, 106)';
            }
            const finish = document.querySelectorAll('.finish');
            for (let i = 0; i < finish.length; i++) {
                finish[i].style.color = 'hsl(233, 11%, 84%)';
            }
            document.getElementById('optioTOdo').style.backgroundColor = '#ffffff'
            document.getElementById('optioTOdo2').style.backgroundColor = '#ffffff'
            const colorjs = document.querySelectorAll('.colorjs');
            for (let i = 0; i < colorjs.length; i++) {
                colorjs[i].style.color = 'hsl(236, 9%, 61%)';
            }
            document.getElementById('footerCreditos').style.color = 'rgb(147, 148, 165)'
            document.getElementById('footer').style.color = 'rgb(147, 148, 165)'
            document.getElementById('sectionTodoShadow').style.boxShadow = '0px 4vw 3vw -1vw #ccc'
            const imgNoCheck = document.querySelectorAll('.imgNoCheck');
            for (let i = 0; i < imgNoCheck.length; i++) {
                imgNoCheck[i].style.border = '0.05vw solid rgb(210, 211, 219)';
            }
            document.getElementById('CheckToDo').style.border = '0.05vw solid rgb(210, 211, 219)';
        }
    }
    if (bluetxtFiltrado == 'show_all') {
        document.getElementById('show_all').style.color = 'rgb(64, 112, 221)'
    } else {
        if (bluetxtFiltrado == 'show_actived') {
            document.getElementById('show_Active').style.color = 'rgb(64, 112, 221)'
        } else {
            if (bluetxtFiltrado == 'completed') {
                document.getElementById('show_Completed').style.color = 'rgb(64, 112, 221)'
            }
        }
    }
}

//funciones que arrancan con la app
switchTheme()
show_all()
to_do_finished()
