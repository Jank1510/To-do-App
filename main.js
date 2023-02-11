let Object_To_Do = {}
let propiertiesADD = 0
let output = ''
let position_ToDoGlobalDeleteToDo
let nofocusToDO = false

//FUncion que imprime en pantalla segun el localstorage

let imprimir_to_do = () => {
    if ((localStorage.getItem('Data_ToDo') != null) && (localStorage.getItem('Data_ToDo') != '{}')) {
        Object_To_Do = (JSON.parse(localStorage.getItem('Data_ToDo')))//condicion que lee el localstorage para cargar los datos 
        for (let i = 0; i < Object.keys(Object_To_Do).length; i++) {
            output += `        
                 <div id="${i + 1}${i + 1}${i + 1}${i + 1}" class="design_ToDO" onmouseover="Showdelete(${i + 1}${i + 1}${i + 1})" onmouseout="Ocultdelete(${i + 1}${i + 1}${i + 1})">
                    <div class="${Object_To_Do[`ChildTodoObject${i}`]['check'] == true ? 'imgcheck' : 'imgNoCheck'}" id="${i}" onClick='check_To_Do(${i})'>
                        <img src="./assets/icon-check.svg" alt="chek">
                    </div>
                    <span tabindex="${propiertiesADD}" class="${Object_To_Do[`ChildTodoObject${i}`]['check'] == true ? 'previewTxt finish' : 'previewTxt'}" id="${i}${i}" >
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

let idTODO
let Showdelete = (id) => {
    document.getElementById(id).style.display = 'block'
    idTODO = id
    switch (idTODO.toString().length) {//hay un bug cuando el numero es mayor a 9 digitos ya q extraemos 
        //el id del img q se muestra con el cursor y nos otca agregar unos digitos mas para q se asimile alid del padre
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
    document.getElementById(id).style.display = 'none'
}
let Delete_To_Do = (position_ToDo) => { //esta funcion muestra el diseño de eliminar un todo
    position_ToDoGlobalDeleteToDo = position_ToDo
    document.getElementById('deleteTODO').style.display = 'flex'
    let txtSpan = 'Are you sure you want to delete the task "' + Object_To_Do[`ChildTodoObject${position_ToDo}`]['nameTodo'] + '"'
    document.getElementById('txt_Delete_To_Do').innerHTML = txtSpan
}
let OpcionUser = (deleteTODO) => {//esta funcion tiene la logica de eliminar un todo
    if (deleteTODO == true) {
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

            imprimir_to_do()
        }, 1000);
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
        imprimir_to_do()
        to_do_finished()
        setTimeout(() => {
            input.focus()
        }, 2000);
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
    if (Object_To_Do[`ChildTodoObject${id}`]['check'] == false) {//identificamos que ese elemento este check o no y guardamos los cambios en el objeto
        Object_To_Do[`ChildTodoObject${id}`]['check'] = true
        document.getElementById(id).className = 'imgcheck'
        document.getElementById(`${id}${id}`).className = 'previewTxt finish'
    } else {
        if (Object_To_Do[`ChildTodoObject${id}`]['check'] == true) {
            Object_To_Do[`ChildTodoObject${id}`]['check'] = false
            document.getElementById(id).className = 'imgNoCheck'
            document.getElementById(`${id}${id}`).className = 'previewTxt'
        }
    }
    localStorage.setItem('Data_ToDo', JSON.stringify(Object_To_Do))//guarda los cambios
    to_do_finished()
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
}

imprimir_to_do()
to_do_finished()

// FUNCIONES DE FILTRADO

let show_all=()=>{
    document.getElementById('show_Active').style.color='hsl(235, 19%, 35%)'
    document.getElementById('show_all').style.color='#4070dd'
    document.getElementById('show_Completed').style.color='hsl(235, 19%, 35%)'
   
}
let Object_To_Do_Filter_active={}
let show_actived=()=>{
    document.getElementById('show_all').style.color='hsl(235, 19%, 35%)'
    document.getElementById('show_Active').style.color='#4070dd'
    document.getElementById('show_Completed').style.color='hsl(235, 19%, 35%)'
    let propiertiesADDFilterActive=0
    for (const key in Object_To_Do) {
        if(Object_To_Do[key]['check']==true){
            console.log(Object_To_Do[key])
            Object_To_Do_Filter_active[`ChildTodoObject${propiertiesADDFilterActive}`] = {
                check: Object_To_Do[key]['check'],
                nameTodo: Object_To_Do[key]['nameTodo']
            };//añadimos un objeto todo dentro del objeto padre
        }
        propiertiesADDFilterActive++
    } 
    console.log(Object_To_Do_Filter_active)
}
let completed=()=>{
    document.getElementById('show_Active').style.color='hsl(235, 19%, 35%)'
    document.getElementById('show_all').style.color='hsl(235, 19%, 35%)'
    document.getElementById('show_Completed').style.color='#4070dd'

}