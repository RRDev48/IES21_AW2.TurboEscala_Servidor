const authController = {
    registerUser: async (req, res) => {
        try {
            const { firstName, lastName, email, password } = req.body;
            res.status(201).json({ message: 'Usuario registrado exitosamente' });
        } catch (error) {
            res.status(500).json({ message: 'Error al registrar usuario' });
        }
    },

    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Credenciales para 'employeeview'
            const employeeEmail = 'rodrigoerodriguez48@gmail.com';
            const employeePassword = '43813748';

            // Credenciales válidas para la tienda (ejemplo)
            const storeValidEmail = email;
            const storeValidPassword = password;

            if (email === employeeEmail && password === employeePassword) {
                // Redirigir a employeeview
                res.status(200).json({ message: 'Inicio de sesión exitoso', redirectUrl: '/employeeview' });
            } else if (email === storeValidEmail && password === storeValidPassword) {
                // Redirigir a la página principal de la tienda
                res.status(200).json({ message: 'Inicio de sesión exitoso', redirectUrl: '/' });
            } else {
                // Credenciales incorrectas
                res.status(401).json({ message: 'Credenciales incorrectas' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al iniciar sesión' });
        }
    }
};

module.exports = authController;
