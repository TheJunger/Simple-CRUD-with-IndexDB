# CRUD con IndexedDB y Javascript

Este es un pequeño proyecto que implementa un **CRU**D básico utilizando **IndexedDB**, una API de base de datos en el navegador que permite almacenar y recuperar objetos en un almacenamiento local.

Puede agregar nuevos elementos a la base de datos (IndexedDB)escribiendo un nombre en el cuadro de texto y haciendo clic en el botón **"Añadir"**. 

Los elementos existentes se mostrarán en una lista debajo del cuadro de texto, y **puede editarlos** haciendo clic en su nombre, **o eliminarlos** haciendo clic en el botón "Eliminar".

La base de datos se abre usando la función **indexedDB.open().** 

En este caso, se utiliza una base de datos denominada "databaseCrud" con una versión de 1. **Si la base de datos aún no existe, se creará una nueva con esta versión.**

Se agregan varios eventos al objeto IDBrequest que se activan durante la creación y actualización de la base de datos. En el evento "upgradeneeded", se crea un nuevo almacén de objetos llamado "nombres".

En el evento **"success"**, se registran los objetos en la base de datos y se llama a la función leerObjetos() para mostrarlos.

En el evento **"error"**, se registran los errores que puedan ocurrir al interactuar con la base de datos.

Cuando se hace clic en el botón **"Añadir"**, **se verifica que el cuadro de texto no esté vacío y que no haya elementos sin guardar** en la lista existente. 

Si no hay problemas, se llama a la función **addObjeto()** para agregar el nuevo objeto a la base de datos.

Cuando se modifica el nombre de un objeto y se hace clic en el botón **"Guardar"**, se actualiza el objeto correspondiente en la tabla **"nombres".**
