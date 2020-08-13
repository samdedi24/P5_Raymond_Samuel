const productChoose = "cameras"
const API = "http://localhost:3000/api/" + productChoose + "/"; 

let idProduct = "";

function getProducts () {
	return new Promise((resolve) =>{
		let request = new XMLHttpRequest();
		request.onreadystatechange = function() {
			if(this.readyState == XMLHttpRequest.DONE && this.status == 200) 
			{
				resolve(JSON.parse(this.responseText));
				console.log("Connexion ok");
			} else {
				//console.log("ERROR");
			}
		}
		request.open("GET", API + idProduct);
		request.send();
	});
};

    
async function allProductsList(){
	const products = await getProducts();
	let listProduct = document.createElement("section")
	listProduct.setAttribute("class", "list-product");
	let main = document.getElementById("main");
	main.appendChild(listProduct);

	products.forEach((product) => { 
    let productBlock = document.createElement("div");
    let productPto = document.createElement("div");
    let productPtt = document.createElement("div");
    let productImage = document.createElement("img");
    let productName = document.createElement("h2");
    let productPrice = document.createElement("p");
    let productLink = document.createElement("a");
		
    productPto.setAttribute("class", "list-product__block--left");
    productImage.setAttribute("src", product.imageUrl);
    productImage.setAttribute("alt", "image du produit"); 
    productLink.setAttribute("href", "product.html?id=" + product._id);
		
	listProduct.appendChild(productBlock);
	productBlock.appendChild(productPto);
	productPto.appendChild(productImage);
	productBlock.appendChild(productPtt);
	productPtt.appendChild(productName);
	productPtt.appendChild(productPrice);
	productPtt.appendChild(productLink);
		
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


  