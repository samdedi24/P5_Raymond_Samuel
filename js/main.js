const productChoose = "cameras"
const API = "http://localhost:3000/api/" + productChoose + "/"; 

let idProduct = "";

//Appel de l'API


getProducts = () =>{
	return new Promise((resolve) =>{
		let request = new XMLHttpRequest();
		request.onreadystatechange = function() {
			if(this.readyState == XMLHttpRequest.DONE && this.status == 200) 
			{
				resolve(JSON.parse(this.responseText));
				console.log("connection ok");
				error = document.getElementById("error");
				if(error){
					error.remove();
				}
			} else {
				console.log("ERROR");
			}
		}
		request.open("GET", API + idProduct);
		request.send();
	});
};


/*Création du HTML après appel de l'API*/
    
async function allProductsList(){
		const products = await getProducts();
		let listProduct = document.createElement("section")
		listProduct.setAttribute("class", "list-product");
		
		let main = document.getElementById("main");
		main.appendChild(listProduct);

		products.forEach((product) => { 
      	let productBlock = document.createElement("div");
      	let productLeft = document.createElement("div");
      	let productRight = document.createElement("div");
      	let productImage = document.createElement("img");
      	let productName = document.createElement("h2");
      	let productPrice = document.createElement("p");
      	let productLink = document.createElement("a");
		//Class pour modification css
      	productLeft.setAttribute("class", "list-product__block--left");
      	productImage.setAttribute("src", product.imageUrl);
      	productImage.setAttribute("alt", "image du produit"); 
      	productLink.setAttribute("href", "product.html?id=" + product._id);
		
		listProduct.appendChild(productBlock);
		productBlock.appendChild(productLeft);
		productLeft.appendChild(productImage);
		productBlock.appendChild(productRight);
		productRight.appendChild(productName);
		productRight.appendChild(productPrice);
		productRight.appendChild(productLink);
		//Afiichage nom, prix, lien afficher le produit
		productName.textContent = product.name;
		productPrice.textContent = product.price / 100 + " euros";
	   	productLink.textContent = "Afficher la page du produit";
    });
}

function onLoardCartNumbers() {
	let productNumbers = localStorage.getItem('cartNumbers');

	if(productNumbers) {
		document.querySelector('.cart span').textContent = productNumbers;
	}
}

onLoardCartNumbers();


  