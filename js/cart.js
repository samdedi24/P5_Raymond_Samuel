function onLoardCartNumbers() {
	let productNumbers = localStorage.getItem('cartNumbers');

	if(productNumbers) {
		document.querySelector('.cart span').textContent = productNumbers;
	}
};

onLoardCartNumbers();

function summary () {
    if(JSON.parse(localStorage.getItem("userCart")).length > 0){
        document.getElementById("resume-cart").remove();  //Si le panier est vide le message apparait 

    /*<table class="table">
        <thead>
            <tr><th>Article</th><th>Prix</th><th>Quantité</th></tr>
        </thead>
        <tbody id="cart-tablebody"></tbody>
    </table>*/

    //Creation du tableau en JS, reprise exemple avec du html

    let bill = document.createElement("table");
    let rowTable = document.createElement("tr");
    let columnName = document.createElement("th");
    let columnPriceUnit = document.createElement("th");
    let columnRemove = document.createElement("th");
    let rowTotal = document.createElement("tr");
    let columnTotal = document.createElement("th");
    let columnPayed = document.createElement("td");

    //Placement dans mon cart html
    let billSection = document.getElementById("cart-summary");
    billSection.appendChild(bill);
    bill.appendChild(rowTable);
    rowTable.appendChild(columnName);
    columnName.textContent = "Nom du produit";
    columnPriceUnit.textContent = "Prix";
    rowTable.appendChild(columnPriceUnit);
    columnPayed.textContent = "Prix du produit";

    //rowTable.appendChild(columnRemove);
    //columnRemove.textContent = "Annuler";

        //Init ID
    let i = 0;

    JSON.parse(localStorage.getItem("userCart")).forEach((product)=> {
        //Lignes
        let rowProduct = document.createElement("tr");
        let nameProduct = document.createElement("td");
        let productPriceUnit = document.createElement("td");
        let removeProduct = document.createElement("i");

        //Annuler le produit selectionner sur l'icone
        rowTable.setAttribute("id", "product"+ i);
        removeProduct.setAttribute("id", "remove"+ i);
        removeProduct.setAttribute('class', "fas fa-trash cancelProduct");
        removeProduct.addEventListener('click', cancelProduct.bind(i));
        i++;

        //HTML
        bill.appendChild(rowProduct);
        rowProduct.appendChild(nameProduct);
        rowProduct.appendChild(productPriceUnit);
        rowProduct.appendChild(removeProduct);
        
        //Row content
        nameProduct.innerHTML = product.name;
        productPriceUnit.textContent = product.price / 100 + " €";
        });

        //Ligne total de tout 
        bill.appendChild(rowTotal);
        rowTotal.appendChild(columnTotal);
        columnTotal.textContent = "Montant/total à payer";
        rowTotal.appendChild(columnPayed);
        columnPayed.setAttribute("id", "sumTotal");

        //Addition du total
        let totalPayed = 0;
        JSON.parse(localStorage.getItem("userCart")).forEach((product)=>{
            totalPayed += product.price / 100;
        });

        //Insertion prox total last column
        document.getElementById("sumTotal").textContent = totalPayed + " €";
        console.log("Total : " + totalPayed);
    };
}

//Supprimer un produit (icon poubelle plus haut)

function cancelProduct (i) {
    console.log("Retire le produit " + i);
    userCart.splice(i, 1);
    console.log("Administration : " + userCart);
    localStorage.clear();
    localStorage.setItem('userCart', JSON.stringify(userCart));
    window.location.reload();
};

//Vérification des inputs

function verifInput () {
    let forNom = document.getElementById("forTheNom").value;
    let forPrenom = document.getElementById("forThePrenom").value;
    let forMail = document.getElementById("forTheMail").value;
    let forAdresse = document.getElementById("forTheAdresse").value;
    let forVille = document.getElementById("forTheVille").value;

    //utilisez [A-Za-z] pour minuscules et majuscules et [A-Z] pour les majuscules uniquement
    let verifString = /[a-zA-Z]/;
    //correspond à tout nombre compris entre 0 et 9
    let verifNumber = /[0-9]/;
    //verif email et spécial caract
    let verifMail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    let verifSpeChara = /[§!@#$%^&*(),.?":{}|<>]/;
    //fin de controle
    let verifMessage = "";
    let contact;

    //Verif des différents inputs 2
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

    //Input pas bon message alertant
    if (verifMessage != "") {
        alert("Il est nécessaire de :" + "\n" + verifMessage);
    } else {
        //objet contact controllers ligne 39
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

//fonction on vérifie si l'utilisateur à bien un artcile au panier pour pourvoir continuer

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

//Post de l'API
function sendData (objectRequest) {
    return new Promise((resolve) =>{
        let request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if(this.readyState == XMLHttpRequest.DONE && this.status == 201) {
                sessionStorage.setItem("order", this.responseText);
                document.forms["form-cart"].action = './order-confirm.html';
                document.forms["form-cart"].submit();
                resolve(JSON.parse(this.responseText));
            }
        };
        request.open("POST", API + "order");
        request.setRequestHeader("Content-Type", "application/json");
        request.send(objectRequest);
    });
};

//Validation infos et panier

function validCart () {
    let btn = document.getElementById("passedOrder");
    btn.addEventListener("click", function(){
        if (verifCart() == true && verifInput() != null){
            console.log("Envoi possible");
            let object = {
                contact,
                products
            };
            let objectRequest = JSON.stringify(object);
            sendData(objectRequest);

            //Après commande effectuée
            contact = {};
            products = [];
            localStorage.clear();
        } else {
            console.log("Erreur comme d'hab");
        };
    });
};


summary();
verifInput();
verifCart();
validCart();

