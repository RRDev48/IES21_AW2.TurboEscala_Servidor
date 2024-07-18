const { collection, addDoc, getDocs, getDoc, doc, where, query, limit } = require('firebase/firestore');
const { baseDeDatos } = require('../db');

const crearPedido = async (req, res) => {
    try {
        const { nombre, apellido, telefono, email, dni, productos } = req.body;

        const pedido = {
            estado: 'Generado',
            fecha: new Date(),
            cliente: {
                nombre,
                apellido,
                telefono,
                email,
                dni,
            },
            productos,
            total: calcularTotal(productos),
        };

        console.log('Pedido:', pedido);

        const referenciaPedido = await addDoc(collection(baseDeDatos, 'PedidosDeCompra'), pedido);
        res.status(201).json({ id: referenciaPedido.id });
    } catch (error) {
        console.error('Error al crear pedido:', error);
        res.status(500).json({ message: 'Error al crear pedido' });
    }
};

// Función para calcular el total del pedido
const calcularTotal = (productos) => {
    return productos.reduce((total, producto) => {
        return total + (producto.price * producto.cantidad);
    }, 0);
};

const obtenerPedidoPorId = async (req, res) => {
    try {
        const { id, email, dni } = req.query; // Cambiar req.body por req.query

        console.log('ID del pedido:', id);
        console.log('Email proporcionado:', email);
        console.log('DNI proporcionado:', dni);

        // Validación de campos requeridos
        if (!id || !email || !dni) {
            console.log('Campos requeridos no proporcionados.');
            return res.status(400).json({ message: 'Se requieren el ID del pedido, email y DNI en el cuerpo de la solicitud' });
        }

        // Consulta del pedido
        const pedidoRef = doc(baseDeDatos, 'PedidosDeCompra', id);
        console.log('Referencia del pedido:', pedidoRef.path);

        const pedidoSnap = await getDoc(pedidoRef);

        if (!pedidoSnap.exists()) {
            console.log('Pedido no encontrado.');
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }

        const pedidoData = pedidoSnap.data();
        console.log('Datos del pedido encontrado:', pedidoData);

        // Validación de email y DNI dentro de los datos del pedido
        if (
            pedidoData.cliente.email.toLowerCase() !== email.toLowerCase() ||  // Normalizamos a minúsculas para comparación
            pedidoData.cliente.dni !== dni
        ) {
            console.log('Email o DNI no coinciden con los datos del pedido.');
            return res.status(404).json({ message: 'No se encontró ningún pedido con el email y DNI proporcionados' });
        }

        console.log('Pedido encontrado y validado correctamente.');

        const pedido = { ...pedidoData, id: pedidoSnap.id };
        return res.status(200).json(pedido);

    } catch (error) {
        console.error('Error al obtener pedido por ID:', error);
        return res.status(500).json({ message: 'Error al obtener pedido' });
    }
};


module.exports = {
    crearPedido,
    obtenerPedidoPorId,
};
