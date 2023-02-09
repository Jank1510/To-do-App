let Object_To_Do = {}
let propiertiesADD = 0
let output = ''
//condicion que lee el localstorage para cargar los datos 
let imprimir_to_do = () => {
    if (localStorage.getItem('Data_ToDo') != null) {
        Object_To_Do = (JSON.parse(localStorage.getItem('Data_ToDo')))
        for (let i = 0; i < Object.keys(Object_To_Do).length; i++) {
            output += `        
                 <div class="design_ToDO">
                    <div class="${Object_To_Do[`ChildTodoObject${i}`]['check'] == true ? 'imgcheck' : 'imgNoCheck'}" id="${i}" onClick='check_To_Do(${i})'>
                        <img src="./assets/icon-check.svg" alt="chek">
                    </div>
                    <span class="${Object_To_Do[`ChildTodoObject${i}`]['check'] == true ? 'previewTxt finish' : 'previewTxt'}"}" id="${i}${i}" >
                        ${Object_To_Do[`ChildTodoObject${i}`]['nameTodo']}
                    </span>
                </div>
                `//vamos creando un template string que contenga todos los todo añadidos  
        }
    }
    document.getElementById('new_toDOs').innerHTML = output//y añadimos todos los todos ala vista    
    output = ''
}
//funcion para agregar to-do
let New_To_Do = () => {
    let txtTodo = document.getElementById("todo").value//traemos el texto del input
    Object_To_Do[`ChildTodoObject${propiertiesADD}`] = {
        check: false,
        nameTodo: txtTodo
    };//añadimos un objeto todo dentro del objeto padre
    localStorage.setItem('Data_ToDo', JSON.stringify(Object_To_Do))//lo guardamos en el localstorage    
    imprimir_to_do()
    propiertiesADD++//lleva el orden de la cantidad de veces que se crea un todo          
    to_do_finished()

}
//funcion para marcar cuando el to-do esta listo
let check_To_Do = (id) => {//aqui el id es lo mismo que la posicion en el objeto ya que cmparten esa igualdad
    console.log(id)
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
//funcion que indica los to-do Terminados

let to_do_finished = () => {
    let To_do_Finisheds = 0
    let To_do_Left=0
    for (let i = 0; i < Object.keys(Object_To_Do).length; i++) {
        if (Object_To_Do[`ChildTodoObject${i}`]['check'] == true) {
            To_do_Finisheds++
        }
    }
    To_do_Left=(Object.keys(Object_To_Do).length)-To_do_Finisheds
    document.getElementById('To_do_Finisheds').innerHTML = `${To_do_Left} items left`
}
imprimir_to_do()
to_do_finished()