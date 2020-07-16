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