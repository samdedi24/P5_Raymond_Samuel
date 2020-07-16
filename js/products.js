//detail produit selectioné

async function detailProduct(){
    
    idProduct = location.search.substring(4);
    const productSelected = await getProducts();
    console.log("Admin : Vous regardez la page du product id_"+productSelected._id);

    let section = document.getElementById("section");
    section.style.display = "block";
    
    document.getElementById("imgProduct").setAttribute("src", productSelected.imageUrl);
    document.getElementById("nameProduct").innerHTML = productSelected.name;
    document.getElementById("descriptionProduct").innerHTML = productSelected.description;
	document.getElementById("priceProduct").innerHTML = productSelected.price / 100 + " euros";
	
	switch(productChoose){
		case "cameras":
		productSelected.lenses.forEach((product)=>{
			let optionProduct = document.createElement("option");
			document.getElementById("optionSelect").appendChild(optionProduct).innerHTML = product;
		});
		break;
	}
};
 
let carts = document.querySelectorAll('#addProductCart');
let products = [];

for (let i=0; i < carts.length; i++) {
	carts[i].addEventListener('click', () => {
		cartNumbers(products[i]);
	})
}


//nombre ajouter au panier dans le nav

function onLoardCartNumbers() {
	let productNumbers = localStorage.getItem('cartNumbers');

	if(productNumbers) {
		document.querySelector('.cart span').textContent = productNumbers;
	}
}

//nombre de produit ajouté

function cartNumbers(product) {
	console.log("Produit ajouté au panier", product);
	let productNumbers = localStorage.getItem('cartNumbers');
	productNumbers = parseInt(productNumbers);

	if (productNumbers) {
		localStorage.setItem('cartNumbers', productNumbers + 1);
		document.querySelector('.cart span').textContent = productNumbers + 1;
	} else {
		localStorage.setItem('cartNumbers', 1);
		document.querySelector('.cart span').textContent = 1;
	}
}

//let cartInit = [];
//localStorage.setItem("userCart", JSON.stringify(cartInit));

if(localStorage.getItem("userCart")){
	console.log("le panier existe dans le localStorage");
} else {
	console.log("Le panier n'existe pas");
  	let cartInit = [];
  	localStorage.setItem("userCart", JSON.stringify(cartInit));
  };

let userCart = JSON.parse(localStorage.getItem("userCart"));

//produit ajouter au panier

addCart = () =>{
	
	let inputBuy = document.getElementById("addProductCart");
	inputBuy.addEventListener("click", async function() {
		const products = await getProducts();
	userCart.push(products);
	localStorage.setItem("userCart", JSON.stringify(userCart));
	console.log("Le produit a été ajouté au panier");
	});
};

//fonction prix total


function totalCost() {
	let totalPrice = localStorage.getItem("totalCost");
	 if (totalPrice == undefined) {
		 let productPrix = localStorage.getItem("price");
		 localStorage.setItem("totalCost", productPrix / 100);
	 } else {
		 let productPrice = localStorage.getItem("price");
		 totalPrice = parseInt(totalPrice);
		 totalPrice = localStorage.setItem("totalCost", totalPrice + productPrice / 100)
	 };
}

totalCost();
onLoardCartNumbers();
