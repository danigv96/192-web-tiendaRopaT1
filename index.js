const express = require('express');
const hbs = require('express-handlebars');
const Handlebars = require('handlebars');
const path = require('path');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'Tienda';
const client = new MongoClient(url, {
    useUnifiedTopology: true
});
var db = null;

client.connect(function (err) {
    if (err) {
        console.error(err);
        return;
    }
    db = client.db(dbName);
});

app.use(express.static('public'));
app.engine('handlebars', hbs({
    extname: '.handlebars',
    defaultLayout: '',
    layoutsDir: path.join(__dirname, 'views')
}));

app.set('view engine', 'handlebars');

app.get('/', function (request, response) {
    response.render('index1');
});

app.get('/store', function (request, response) {
    const coleccion = db.collection('productos');
    var obj = {},
        va = request.query.var;
    if (va !== 'general' && va !== 'ordenar') obj[va] = {
        '$eq': request.query.val
    };

    coleccion.find(obj).toArray(function (err, docs) {
        if (err) {
            console.log(err);
            response.send(err);
            return;
        }
        if (va === 'ordenar') {
            if (request.query.val === 'des') docs.sort((a, b) => {
                return (b.price - a.price)
            });
            if (request.query.val === 'asc') docs.sort((a, b) => {
                return (a.price - b.price)
            });
        }
        var contexto = {
            productos: docs
        };
        response.render('store', contexto);
    });
});

app.get('/detalle', function (request, response) {
    const coleccion = db.collection('productos');
    var prod = request.query.producto;

    coleccion.find({
        name: {
            '$eq': prod
        }
    }).toArray(function (err, docs) {
        if (err) {
            console.log(err);
            response.send(err);
            return;
        }
        response.render('detalle', {
            producto: docs,
            nombre: docs[0].name
        });
    });
});

app.get('/checkout', function (request, response) {
    const coleccion = db.collection('Carrito');
    coleccion.find({}).toArray(function (err, docs) {
        if (err) {
            console.log(err);
            response.send(err);
            return;
        }
        var total = 0;
        docs.map((elem) => {
            total += elem.price;
        });
        response.render('checkout', {
            productos: docs,
            total: total
        });
    });
});

app.get('/informacion', function (request, response) {
    response.render('informacion');
});

app.get('/congrats', function (request, response) {
    response.render('congrats');
});

app.post('/api/AgregarAlCarrito', function (request, response) {
    const coleccion = db.collection('productos');
    const coleccion2 = db.collection('Carrito');
    let titulo = request.body.nombre;

    coleccion.find({
            name: {
                '$eq': titulo
            }
        })
        .toArray(function (err, doc) {
            if (err) {
                console.log(err);
                response.send(err);
                return;
            }
                console.log("insertò" + doc);
                coleccion2.insert({ 
                    name: doc[0].name,
                    price: doc[0].price,
                    description: doc[0].description,
                    size: doc[0].size,
                    imagen: doc[0].imagen,
                    category: doc[0].category,
                    colour: doc[0].colour
                });
            
        });
});

app.post('/api/nuevaSolicitud', function (request, response) {
    const coleccion = db.collection('Peticiones');
    coleccion.insert({
        nombre: request.body.nombre,
        apellido: request.body.nombre,
        cedula: request.body.cedula,
        direccion: request.body.direccion,
        cuenta: request.body.cuenta,
        fecha: request.body.fecha,
        codigo: request.body.codigo
    });
    response.send("Nueva solicitud creada");
});

Handlebars.registerPartial('header', `<header>
<div class="top">
    <div class="left">
        <h1>VTG</h1>
    </div>
    <div class="center">
        <button class="centerBtn"> <strong>Search</strong> </button>
        <input class="centerInput" type="text">
    </div>
    <div class="rigth">
        <a class="rigthItem">Login</a>
        <a class="rigthItem">Sing</a>
    </div>
</div>
<nav class="menu">
    <ul class="menuList">
        <a class="menuItems" href="">Sale</a>
        <a class="menuItems" href="">New</a>
        <a class="menuItems" href="">Clothes</a>
        <article>
            <div class="pCont">
                <a class="menuItems" href="">Shoes</a>
            </div>
            <ul>
                <li><a href="/store?var=general&val=general">All Shoes</a></li>
                <li><a href="/store?var=category&val=boots">Boots</a></li>
                <li><a href="/store?var=category&val=tennis">Sneakers</a></li>
                <li><a href="/store?var=category&val=heels">Heels</a></li>
            </ul>
        </article>
        <a class="menuItems" href="">Accessories</a>
    </ul>
</nav>

<div class="emty"></div>
<div></div>
</header>`);

Handlebars.registerPartial('footer', `<footer>
<div class="footerGroup">
        <div class="account">
                <ul class="footerList">
                    <a class="listH"> <strong>MY ACCOUNT</strong></a>
                    <a class="listI">My Crushes</a>
                    <a class="listI">Order History</a>
                    <a class="listI">Recycling Options</a>
                </ul>
            </div>
            <div class="care">
                <ul class="footerList">
                    <a class="listH"> <strong>CUSTOMER CARE</strong></a>
                    <a class="listI">Help</a>
                    <a class="listI">Returns</a>
                    <a class="listI">Delivery info</a>
                    <a class="listI">Contact Us</a>
                </ul>
            </div>
            <div class="more">
                    <ul class="footerList">
                        <a class="listH"> <strong>ABOUT US  MORE</strong></a>
                        <a class="listI">About Us</a>
                        <a class="listI">Student Discount</a>
                        <a class="listI">Gift Vouchers</a>
                        <a class="listI">Become an Affiliate</a>
                    </ul>
        </div></div></footer>`);
app.listen(5500);