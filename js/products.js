const productChoose = "cameras"
const API = "http://localhost:3000/api/" + productChoose + "/"; 
//id tri dans l'API

let idProduct = "";

if(localStorage.getItem("userCart")){
	console.log("Admin : le panier existe dans le localStorage");
}else{
	console.log("Admin : Le panier n'existe pas, vas être créer et l'envoyer dans le localStorage");
  	let cartInit = [];
  	localStorage.setItem("userCart", JSON.stringify(cartInit));
  };

  	let contact;
  	let products = [];
	let userCart = JSON.parse(localStorage.getItem("userCart"));

//Appel de l'API


getProducts = () =>{
	return new Promise((resolve) =>{
		let request = new XMLHttpRequest();
		request.onreadystatechange = function() {
			if(this.readyState == XMLHttpRequest.DONE && this.status == 200) 
			{
				resolve(JSON.parse(this.responseText));
				console.log("Admin : connection ok");
				error = document.getElementById("error");
				if(error){
					error.remove();
				}
			}else{
				console.log("Admin : ERROR connection API");
			}
		}
		request.open("GET", API + idProduct);
		request.send();
	});
};


/*Création du HTML après appel de l'API
**********************************************/
    
async function allProductsList(){
		const products = await getProducts();
		let listProduct = document.createElement("section")
		listProduct.setAttribute("class", "list-product");
		
		let main = document.getElementById("main");
		main.appendChild(listProduct);

		products.forEach((product) =>
		{ 
      	let productBlock = document.createElement("div");
      	let productLeft = document.createElement("div");
      	let productRight = document.createElement("div");
      	let productImage = document.createElement("img");
      	let productNom = document.createElement("h2");
      	let productPrix = document.createElement("p");
      	let productLink = document.createElement("a");

      	productBlock.setAttribute("class", "list-product__block");
      	productLeft.setAttribute("class", "list-product__block--left");
      	productRight.setAttribute("class", "list-product__block--right");
      	productImage.setAttribute("src", product.imageUrl);
      	productImage.setAttribute("alt", "image du produit"); 
      	productLink.setAttribute("href", "product.html?id=" + product._id);

		listProduct.appendChild(productBlock);
     	productBlock.appendChild(productLeft);
     	productLeft.appendChild(productImage);
     	productBlock.appendChild(productRight);
     	productRight.appendChild(productNom);
     	productRight.appendChild(productPrix);
     	productRight.appendChild(productLink);

      	productNom.textContent = product.name;
      	productPrix.textContent = product.price / 100 + " euros";
      	productLink.textContent = "Voir le produit";
      });
	};


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
};

 //Fonction ajouter le produit au panier
 
 addCart = () =>{
  	let inputBuy = document.getElementById("addProductCart");
  	inputBuy.addEventListener("click", async function() {
  		const products = await getProducts();
  	userCart.push(products);
  	localStorage.setItem("userCart", JSON.stringify(userCart));
  	console.log("Admin : le produit a été ajouté au panier");
  	alert("Vous avez ajouté ce produit dans votre panier")
  });
};