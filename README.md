Patrón de Igual a Igual

Aplicación basica realizada en Node.js

Logica del patron realizado:

1. peer.js
El archivo peer.js configura un sistema Peer-to-Peer en Node.js utilizando socket.io. Cada instancia del script actúa como un nodo en la red, creando un servidor de WebSockets que puede recibir y enviar mensajes a otros nodos. Se conecta a una lista de otros nodos especificados y reenvía mensajes recibidos a todos los nodos conectados. Además, cada nodo se identifica por un puerto específico y puede comunicarse directamente con todos los demás nodos en la red, permitiendo una comunicación distribuida y descentralizada entre pares.