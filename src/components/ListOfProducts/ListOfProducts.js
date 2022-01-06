import mayonesa from '../img/mayonesa.jpg'
import queso from '..//img/queso.jpg'
import salame from '../img/salame.jpg'
import huevo from '../img/huevo.jpg'
import tomate from '../img/tomate.jpg'
import jamon from '../img/jamon.jpg'

const ListOfProducts = [{
    "id": "1",
    "name": "huevo",
    "category": "comida",
    "description": "Un rico huevo duro",
    "price": 450,
    "noTacc": true,
    "vegan": false,
    "fit": false,
    "img": huevo,
    "stock": 20
},
{
    "id": "2",
    "name": "jamon",
    "category": "comida",
    "description": "Fetas de jamon",
    "price": 650,
    "noTacc": false,
    "vegan": false,
    "fit": true,
    "img": jamon,
    "stock": 100
},
{
    "id": "3",
    "name": "mayonesa",
    "category": "adereso",
    "description": "Una deliciosa mayonesa",
    "price": 300,
    "noTacc": false,
    "vegan": false,
    "fit": false,
    "img": mayonesa,
    "stock": 40
},
{
    "id": "4",
    "name": "queso",
    "category": "comida",
    "description": "Un oloroso queso",
    "price": 450,
    "noTacc": true,
    "vegan": false,
    "fit": false,
    "img": queso,
    "stock": 5
},
{
    "id": "5",
    "name": "salame",
    "category": "comida",
    "description": "Un rico salame",
    "price": 600,
    "noTacc": false,
    "vegan": false,
    "fit": true,
    "img": salame,
    "stock": 100
},
{
    "id": "6",
    "name": "tomate",
    "category": "comida",
    "description": "Un tomate bien rojo",
    "price": 350,
    "noTacc": false,
    "vegan": false,
    "fit": false,
    "img": tomate,
    "stock": 10
}


]

export default ListOfProducts;