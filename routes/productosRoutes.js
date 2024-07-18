const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

router.get('/', productosController.getProductos); //Trae todos los Productos

router.get('/item/:id', productosController.getProductoById); //Trae un Producto por ID

router.put('/:id', productosController.updateProducto); //Actualiza un Producto por ID

router.get('/categoria/:categoria', productosController.getProductosByCategoria); //Trae los Productos por Categoría (Cuando se selecciona una categoría en la vista de productos)

router.get('/employeeview/categoria/:categoria', productosController.getProductosByCategoriaForEmployeeView);
router.put('/:id', productosController.updateProducto);
router.get('/employeeview', productosController.getProductosForEmployeeView);




module.exports = router;
