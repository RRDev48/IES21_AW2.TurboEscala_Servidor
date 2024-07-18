const { collection, query, where, getDoc, getDocs, updateDoc, doc } = require('firebase/firestore');
const { baseDeDatos } = require('../db');

//Me traigo todos los productos
exports.getProductos = async (req, res) => {
    try {
        const querySnapshot = await getDocs(collection(baseDeDatos, 'Productos'));
        const productos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos.' });
    }
};

//Me traigo un producto por ID (Esto es para el detalle de un producto)
exports.getProductoById = async (req, res) => {
    const { id } = req.params;

    try {
        const productoRef = doc(baseDeDatos, 'Productos', id);
        const docSnap = await getDoc(productoRef);

        if (!docSnap.exists()) {
            res.status(404).json({ error: 'Producto no encontrado' });
            return;
        }

        const producto = {
            id: docSnap.id,
            ...docSnap.data()
        };

        res.json(producto);
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).json({ error: 'Error al obtener el producto.' });
    }
};

//Me traigo los productos por categoría (Cuando se selecciona una categoría en la vista de productos)
exports.getProductosByCategoria = async (req, res) => {
    try {
        const { categoria } = req.params;

        const collectionRef = collection(baseDeDatos, 'Productos');

        const q = query(collectionRef, where('categoria', '==', categoria));

        const querySnapshot = await getDocs(q);
        console.log('Query:', querySnapshot);
        querySnapshot.forEach(doc => {
            console.log(`Documento encontrado - ID: ${doc.id}, Datos: ${JSON.stringify(doc.data())}`);
        });

        if (querySnapshot.empty) {
            return res.status(404).json({ error: 'No hay productos en esta categoría.' });
        }

        const productos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(productos);

    } catch (error) {
        console.error('Error al obtener productos por categoría:', error); // Mejorar el manejo de errores con más detalles
        res.status(500).json({ error: 'Error al obtener productos por categoría.' });
    }
};

//=======================================================================================================

// Me traigo todos los productos (para employeeview)
exports.getProductosForEmployeeView = async (req, res) => {
    try {
        const querySnapshot = await getDocs(collection(baseDeDatos, 'Productos'));
        const productos = querySnapshot.docs.map(doc => ({
            id: doc.id,
            nameProduct: doc.data().nameProduct,
            price: doc.data().price,
            stock: doc.data().stock
            // Añadir otros campos necesarios para la vista de empleado
        }));
        res.json(productos);
    } catch (error) {
        console.error('Error al obtener productos para employeeview:', error);
        res.status(500).json({ error: 'Error al obtener productos para employeeview.' });
    }
};

// Actualizo un producto por ID (Vista de empleado)
exports.updateProducto = async (req, res) => {
    const { id } = req.params;
    const { nameProduct, price, stock } = req.body; // Solo permitir modificar estos campos

    // Verificar que los campos necesarios estén definidos en req.body
    if (!nameProduct && !price && !stock) {
        return res.status(400).json({ error: 'Se requiere al menos uno de los campos (nameProduct, price, stock) para actualizar el producto.' });
    }

    try {
        const productoRef = doc(baseDeDatos, 'Productos', id);

        // Construir el objeto de actualización solo con los campos definidos en req.body
        const updateData = {};
        if (nameProduct) updateData.nameProduct = nameProduct;
        if (price) updateData.price = price;
        if (stock) updateData.stock = stock;

        await updateDoc(productoRef, updateData);
        res.json({ message: 'Producto actualizado correctamente.' });
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).json({ error: 'Error al actualizar producto.' });
    }
};

// Me traigo los productos por categoría para employeeview (Cuando se selecciona una categoría en la vista de empleado)
exports.getProductosByCategoriaForEmployeeView = async (req, res) => {
    try {
        const { categoria } = req.params;

        const collectionRef = collection(baseDeDatos, 'Productos');

        const q = query(collectionRef, where('categoria', '==', categoria));

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return res.status(404).json({ error: 'No hay productos en esta categoría para employeeview.' });
        }

        const productos = querySnapshot.docs.map(doc => ({
            id: doc.id,
            nameProduct: doc.data().nameProduct,
            price: doc.data().price,
            stock: doc.data().stock
            // Añadir otros campos necesarios para la vista de empleado
        }));

        res.status(200).json(productos);

    } catch (error) {
        console.error('Error al obtener productos por categoría para employeeview:', error);
        res.status(500).json({ error: 'Error al obtener productos por categoría para employeeview.' });
    }
};