import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export const Login = () => {
    
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        contrasena: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Validaciones
        if (!formData.email || !formData.contrasena) {
            setError("Por favor, complete todos los campos.");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setError("Por favor, ingrese un correo electrónico válido.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("https://effective-couscous-pjq9qjr49xwg3rw55-3001.app.github.dev/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: formData.email,
                    contrasena: formData.contrasena
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.msg || "Error al iniciar sesión");
                setLoading(false);
                return;
            }

            // ✅ GUARDAR EL TOKEN Y LA INFORMACIÓN DEL USUARIO
            localStorage.setItem("token", data.access_token);
            localStorage.setItem("user", JSON.stringify(data.user));

            // Opcional: Mostrar mensaje de éxito
            console.log("Login exitoso:", data.user);

            // Redirigir al dashboard o página principal
            navigate("/dashboard"); // Cambia esto a la ruta que necesites

        } catch (err) {
            setError("Error de conexión con el servidor.");
            console.error("Error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="container mt-5 px-3 px-sm-4">
                <button type="button" className="btn btn-link mb-3 d-flex p-0">
                    <Link to="/" className="text-danger fs-3">
                        <i className="fa-solid fa-angle-left"></i>
                    </Link>
                </button>
                <h1 className="text-center text-danger text-bold" style={{fontSize: "clamp(30px, 5vw, 60px)"}}>
                    Login
                </h1>

                {/* Mostrar error si existe */}
                {error && (
                    <div className="alert alert-danger text-center mx-auto mt-3" style={{maxWidth: "500px"}}>
                        {error}
                    </div>
                )}

                <form className="mt-4 mx-auto" style={{maxWidth: "500px"}} onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Ingrese su email"
                            disabled={loading}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="contrasena" className="form-label">Contraseña</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="contrasena"
                            name="contrasena"
                            value={formData.contrasena}
                            onChange={handleChange}
                            placeholder="Ingrese su contraseña"
                            disabled={loading}
                            required
                        />
                    </div>
                    <div className="d-flex justify-content-center">
                        <button 
                            type="submit" 
                            className="btn btn-danger w-100 w-sm-auto px-5 rounded-5"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Cargando...
                                </>
                            ) : (
                                "Iniciar Sesión"
                            )}
                        </button>
                    </div>
                    <button type="button" className="btn btn-link mt-3 d-flex mx-auto p-0">
                        <Link to="/reset-password" className="text-danger">
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </button>
                </form>
            </div>      
            <div className="mt-3">
                <p className="text-center mt-3">
                    ¿No tienes una cuenta? <Link to="/registro-usuario" className="text-danger">Regístrate aquí</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;