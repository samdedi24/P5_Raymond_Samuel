function validOrder () {
    if (sessionStorage.getItem("order") != null){
        let order = JSON.parse(sessionStorage.getItem("order"));
        document.getElementById("lastName").innerHTML = order.contact.lastName
        document.getElementById("orderId").innerHTML = order.orderId
        sessionStorage.removeItem("order");
    } else {
        alert("Aucune commande, erreur");
        window.open("./index.html");
    }
}