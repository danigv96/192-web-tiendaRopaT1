var productsList = {
    "products": [{
            "name": "Bright Perspex Heels",
            "price": 30000,
            "colour": "blue"
        },
        {
            "name": "Can't Snake Leather Platform Heels",
            "price": 30000,
            "colour": "beige"
        },
        {
            "name": "Croc Groovy Faux Leather Heels",
            "price": 30000,
            "colour": "green"
        },
        {
            "name": "Chelsea Boots",
            "price": 30000,
            "colour": "green"
        },
        {
            "name": "Faux Suede Heels",
            "price": 30000,
            "colour": "beige"
        },
        {
            "name": "Gold Heels",
            "price": 30000,
            "colour": "gold"
        },
        {
            "name": "Leather Embellished Boots",
            "price": 30000,
            "colour": "gold"
        },
        {
            "name": "Leopard mixed fabric chunky Trainers",
            "price": 30000,
            "colour": "beige"
        },
        {
            "name": "Platform 2 Part Heels",
            "price": 30000,
            "colour": "gold"
        },
        {
            "name": "Snake Faux Leather Loafers",
            "price": 30000,
            "colour": "beige"
        },
        {
            "name": "Sneaking Croc Sneakers",
            "price": 30000,
            "colour": "white"
        },
        {
            "name": "Western Boots",
            "price": 30000,
            "colour": "beige",
            "imagen" : "./admakdad/imagen1.png"
        }
    ]
};

productsList.products.map( (item) => {
    document.getElementById('products').innerHTML += `<div class="product">
<div>
    <img class="product_img" src="./imgShoes/Bright Perspex Heels.jpg" alt="">
</div>
<div class="productDescription">
    <p class="productDescription_name">`+ item.name + `</p>
    <p class="productDescription_price"> <strong>$`+ item.price +`</strong></p>
</div>
</div>`
});

for (let index = 0; index < productsList.products.length; index++) {

console.log("pinta");
}