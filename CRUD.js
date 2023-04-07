const IDBrequest = indexedDB.open("databaseCrud",1)

IDBrequest.addEventListener("upgradeneeded", ()=>{
    const db = IDBrequest.result;
    db.createObjectStore("nombres",{
        autoIncrement: true
    });
})

IDBrequest.addEventListener("success",()=>{
    console.log("Todo salio bien")
    leerObjetos()
})
IDBrequest.addEventListener("",()=>{
    console.log("Todo lo que ha podido fallar ha fallado")
})


document.querySelector(".add").addEventListener("click", ()=>{
    let nombre = document.querySelector(".name").value
    if (nombre.length >= 0) {
        if (document.querySelector(".posible") != undefined) {
            if(confirm("Hay elementos sin guardar, Quieres Continuar sin guardar?")){
                addObjeto({nombre : nombre})
                nombre.value = ""
                leerObjetos()
            }
        }
        else {
            console.log("1")
            addObjeto({nombre : nombre})
            console.log(nombre)
            nombre.value = ""
            leerObjetos()
        }
    }
})

const addObjeto = objeto =>{
    const IDBData = getIDBData("readwrite","Objecto Añadido");
    IDBData.add(objeto);
    console.log(objeto)
}

const leerObjetos = ()=>{
    const IDBData = getIDBData("readonly");
    const cursor = IDBData.openCursor();
    const fragment = document.createDocumentFragment();
    document.querySelector(".nombres").innerHTML = "";
    cursor.addEventListener("success", ()=>{
        if(cursor.result){
            let elemento = nombresHTML(cursor.result.key, cursor.result.value)
            fragment.appendChild(elemento)
            cursor.result.continue()
        }
        else document.querySelector(".nombres").appendChild(fragment)
    })
}

const modificarObjeto = (key,objeto) =>{
    const IDBData = getIDBData("readwrite","Objecto Modificado");
    IDBData.put(objeto,key);
//    modificarObjeto(3,{nombre: "cofla"})
}

const eliminarObjeto = key =>{
    const IDBData = getIDBData("readwrite","Objecto Eliminado");
    IDBData.delete(key);
}

const getIDBData = (mode,msg) =>{
    const db = IDBrequest.result;
    const IDBtransaction = db.transaction("nombres", mode)
    const objectStore = IDBtransaction.objectStore("nombres")
    IDBtransaction.addEventListener("complete", ()=>{
        //console.log(msg)
    })
    return objectStore;
}

const nombresHTML = (id,name)=> {
    const container = document.createElement("div")
    const h2 = document.createElement("h2")
    const options = document.createElement("div")
    const saveButton = document.createElement("button")
    const deleteButton = document.createElement("button")

    container.classList.add("nombre")
    options.classList.add("options")
    saveButton.classList.add("imposible")
    deleteButton.classList.add("delete")

    saveButton.textContent = "Guardar"
    deleteButton.textContent = "Eliminar"

    h2.textContent = name.nombre;
    h2.setAttribute("contenteditable", "true")
    h2.setAttribute("spellcheck", "false")

    options.appendChild(saveButton)
    options.appendChild(deleteButton)

    container.appendChild(h2)
    container.appendChild(options)

    h2.addEventListener("keyup" , ()=>{
        saveButton.classList.replace("imposible","posible")
    })

    saveButton.addEventListener("click", ()=>{
        if (saveButton.className == "posible") {
            modificarObjeto(id,{nombre: h2.textContent})
            saveButton.classList.replace ("posible", "imposible")
        }
    })

    deleteButton.addEventListener("click", ()=>{
        eliminarObjeto(id);
        document.querySelector(".nombres").removeChild(container)
    })

    return container
}