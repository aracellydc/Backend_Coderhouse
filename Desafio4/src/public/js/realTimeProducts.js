const socket = io()
socket.emit("message", "Hola, me estoy comunicando desde un websocket")

socket.on("evento_socketIndividual", data => {
    console.log(data)
})

socket.on("evento_todos_menos_actual", data =>{
    console.log(data)
})

socket.on("evento_todos", data => {
    console.log(data)
})