//Détails des produits quand l'utilisateur clique sur afficher le poduit

async function detailProduct() {
    
    idProduct = location.search.substring(4);
    const productSelected = await getProducts();
    let section = document.getElementById("section");
    section.style.display = "block";
	
	//Détail du produit selectionné grâce aux ID 
    document.getElementById("productImg").setAttribute("src", productSelected.imageUrl);
    document.getElementById("productName").innerHTML = productSelected.name;
    document.getElementById("productDescription").innerHTML = productSelected.description;
	document.getElementById("productPrice").innerHTML = productSelected.price / 100 + " euros";
	
	switch(productChoose){
		case "cameras":
		productSelected.lenses.forEach((product)=>{				//Option choisir sa lentille
			let optionProduct = document.createElement("option");
			document.getElementById("optionSelect").appendChild(optionProduct).innerHTML = product;
		});
		break;
	}
};
 
//nombre ajouter au panier dans le nav

function onLoardCartNumbers() {
	let productNumbers = localStorage.getItem('cartNumbers');

	if(productNumbers) {
		document.querySelector('.cart span').textContent = productNumbers;
	}
}

//nombre de produit ajouté

let carts = document.querySelectorAll('#addProductCart');
let products = []
for (let i=0; i < carts.length; i++) {
	carts[i].addEventListener('click', () => {
		cartNumbers(products[i]);
	})
}

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

//produit ajouter au panier au clic

function addCart () { 
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
	  let productPrice = localStorage.getItem("price");
	  localStorage.setItem("totalCost", productPrice / 100);
	} else {
	  let productPrice = localStorage.getItem("price");
	  totalPrice = parseInt(totalPrice);
	  totalPrice = localStorage.setItem("totalCost",totalPrice + productPrice / 100);
	}
  }


onLoardCartNumbers();
totalCost();

