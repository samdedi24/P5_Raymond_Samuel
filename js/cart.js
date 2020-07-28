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
        let removeProduct = document.createElement("button");

        //Annuler le produit selectionner sur l'icone
        rowTable.setAttribute("id", "product"+i);
        removeProduct.setAttribute("id", "remove"+i);
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
    //localStorage.setItem('userCart', JSON.stringify(userCart));
};

summary();
cancelProduct();
