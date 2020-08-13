function onLoardCartNumbers() {
	let productNumbers = localStorage.getItem('cartNumbers');
	if(productNumbers) {
		document.querySelector('.cart span').textContent = productNumbers;
	}
};

onLoardCartNumbers();

function summary () {
    if(JSON.parse(localStorage.getItem("userCart")).length > 0){
    document.getElementById("resume-cart").remove(); 

    let bill = document.createElement("table");
    let rowTable = document.createElement("tr");
    let columnName = document.createElement("th");
    let columnPriceUnit = document.createElement("th");
    let columnRemove = document.createElement("th");
    let rowTotal = document.createElement("tr");
    let columnTotal = document.createElement("th");
    let columnPayed = document.createElement("td");

    let contact;

    let billSection = document.getElementById("cart-summary");
    billSection.appendChild(bill);
    bill.appendChild(rowTable);
    rowTable.appendChild(columnName);
    columnName.textContent = "Nom du produit";
    columnPriceUnit.textContent = "Prix";
    rowTable.appendChild(columnPriceUnit);
    columnPayed.textContent = "Prix du produit";

    let i = 0;

    JSON.parse(localStorage.getItem("userCart")).forEach((product)=> {
        
        let rowProduct = document.createElement("tr");
        let nameProduct = document.createElement("td");
        let productPriceUnit = document.createElement("td");
        let removeProduct = document.createElement("i");

        rowTable.setAttribute("id", "product"+ i);
        removeProduct.setAttribute("id", "remove"+ i);
        removeProduct.setAttribute('class', "fas fa-trash cancelProduct");
        removeProduct.addEventListener('click', cancelProduct.bind(i));
        i++;

        bill.appendChild(rowProduct);
        rowProduct.appendChild(nameProduct);
        rowProduct.appendChild(productPriceUnit);
        rowProduct.appendChild(removeProduct);
        
        nameProduct.innerHTML = product.name;
        productPriceUnit.textContent = product.price / 100 + " €";
        });

        bill.appendChild(rowTotal);
        rowTotal.appendChild(columnTotal);
        columnTotal.textContent = "Montant/total à payer";
        rowTotal.appendChild(columnPayed);
        columnPayed.setAttribute("id", "sumTotal");

        let totalPayed = 0;
        JSON.parse(localStorage.getItem("userCart")).forEach((product)=>{
            totalPayed += product.price / 100;
        });

        document.getElementById("sumTotal").textContent = totalPayed + " €";
        console.log("Total : " + totalPayed);
    };
}

function cancelProduct (i) {
    console.log("Retire le produit " + i);
    userCart.splice(i, 1);
    console.log("Administration : " + userCart);
    localStorage.clear();
    localStorage.setItem('userCart', JSON.stringify(userCart));
    window.location.reload();
};

function verifInput () {
    let forNom = document.getElementById("forNom").value;
    let forPrenom = document.getElementById("forPrenom").value;
    let forMail = document.getElementById("forMail").value;
    let forAdresse = document.getElementById("forAdresse").value;
    let forVille = document.getElementById("forVille").value;
    let verifString = /[a-zA-Z]/;
    let verifNumber = /[0-9]/;
    let verifMail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    let verifSpeChara = /[§!@#$%^&*(),.?":{}|<>]/;
    let verifMessage = "";
    
    if (verifNumber.test(forNom) == true || verifSpeChara.test(forNom) == true || forNom == ""){
        verifMessage = "Vérifier votre nom";
    } else {
        console.log("Le nom est ok");
    };

    if (verifNumber.test(forPrenom) == true || verifSpeChara.test(forPrenom) == true || forPrenom == ""){
        verifMessage = verifMessage + "\n" + "Vérifier votre prénom";
    } else {
        console.log("Le prénom et ok");
    };

    if(verifMail.test(forMail) == false){
        verifMessage = verifMessage + "\n" + "Vérifier votre email";
    } else {
        console.log("Adresse email ok");
    };
    
    if(verifSpeChara.test(forAdresse) == true || forAdresse == ""){
        verifMessage = verifMessage + "\n" + "Vérifier votre adresse";
    } else {
        console.log("l'adresse est ok");
    };
    
    if(verifSpeChara.test(forVille) == true && verifNumber.test(forVille) == true || forVille == ""){
        verifMessage = verifMessage + "\n" + "Vérifier votre ville"
    } else {
        console.log("La ville est ok")
    };

    if (verifMessage != "") {
        alert("Il est nécessaire de :" + "\n" + verifMessage);
    } else {
        contact = {
            firstName : forNom,
            lastName : forPrenom,
            address : forAdresse,
            city : forVille,
            email : forMail
        };
        return contact;
    };
};

function verifCart () {
    let statutCart = JSON.parse(localStorage.getItem("userCart"));
    if (statutCart == null) {
        alert("Il y a eu un problème, recharger votre page");
        return false
    } else if (statutCart.length < 1 || statutCart == null) {
        alert("Panier vide");
        return false;
    } else {
        JSON.parse(localStorage.getItem("userCart")).forEach((product) =>{
            products.push(product._id);
        });
        return true;
    }
};

function validCart () {
    let btnPrimary = document.getElementById("passedOrder");
    btnPrimary.addEventListener("click", function(){
        if (verifCart() == true && verifInput() != null){
            console.log("Envoi possible");
            let object = {
                contact,
                products
            };
            let objectRequest = JSON.stringify(object);
            sendData(objectRequest);
            console.log("Admin : " + objectRequest);
            contact = {};
            products = [];
            localStorage.clear();
        } else {
            console.log("Erreur");
        };
    });
};

//Post de l'API

function sendData (objectRequest) {
    return new Promise((resolve) =>{
        let request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if(this.readyState == XMLHttpRequest.DONE && this.status == 201) {
                sessionStorage.setItem("order", this.responseText);
                document.forms["form-cart"].action = './order-comfirm.html';
                document.forms["form-cart"].submit();
                resolve(JSON.parse(this.responseText));
            }
        };
        request.open("POST", API + "order");
        request.setRequestHeader("Content-Type", "application/json");
        request.send(objectRequest);
    });
};

summary();
verifInput();
verifCart();
validCart();

