async function detailProduct() { 
    idProduct = location.search.substring(4);
    const productSelected = await getProducts();
    let section = document.getElementById("section");
    section.style.display = "block";
	
    document.getElementById("productImg").setAttribute("src", productSelected.imageUrl);
    document.getElementById("productName").innerHTML = productSelected.name;
    document.getElementById("productDescription").innerHTML = productSelected.description;
	document.getElementById("productPrice").innerHTML = productSelected.price / 100 + " euros";
	
	switch(API){
		case "cameras":
		productSelected.lenses.forEach((product)=>{				
			let optionProduct = document.createElement("option");
			document.getElementById("optionSelect").appendChild(optionProduct).innerHTML = product;
		});
		break;
	}
};

if(localStorage.getItem("userCart")){
	console.log("le panier existe dans le localStorage");
} else {
	console.log("Le panier n'existe plus");
  	let cartInit = [];
  	localStorage.setItem("userCart", JSON.stringify(cartInit));
};

let userCart = JSON.parse(localStorage.getItem("userCart"));

function addCart () { 
	let inputBuy = document.getElementById("addProductCart");
	inputBuy.addEventListener("click", async function() {
		const products = await getProducts();
	userCart.push(products);
	localStorage.setItem("userCart", JSON.stringify(userCart));
	console.log("Le produit a été ajouté au panier");
	});
};

function cartNumbers() {
	console.log("Produit ajouté au panier", productName);
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

let carts = document.querySelectorAll('#addProductCart');
let products = []
for (let i=0; i < carts.length; i++) {
	carts[i].addEventListener('click', () => {
		cartNumbers(products[i]);
	})
}

function onLoardCartNumbers() {
	let productNumbers = localStorage.getItem('cartNumbers');

	if(productNumbers) {
		document.querySelector('.cart span').textContent = productNumbers;
	}
}


onLoardCartNumbers();

