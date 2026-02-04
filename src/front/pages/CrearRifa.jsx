import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const CrearRifa = () => {

    const handleIdUser = window.location.pathname.split("/")[2];

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        tituloRifa: "",
        descripcionRifa: "",
        precioTicket: "",
        metodoPagos: "",
        cantidadTickets: "",
        loteria: "",
        fechaSorteo: "",
        imagenPremio: null,
        titularZelle: "",
        contactoZelle: "",
        titularTransferencia: "",
        numeroRuta: "",
        numeroCuenta: ""
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === "file" ? files[0] : value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.tituloRifa || !formData.descripcionRifa || !formData.precioTicket || !formData.metodoPagos || !formData.cantidadTickets || !formData.loteria || !formData.fechaSorteo) {
            setError("Por favor, complete todos los campos.");
            return;
        }
        if (isNaN(formData.precioTicket) || formData.precioTicket <= 0) {
            setError("Por favor, ingrese un precio válido para el ticket.");
            return;
        }
        if (!formData.imagenPremio) {
            setError("Por favor, seleccione una imagen para el premio.");
            return;
        }

        try {
            const response = await fetch(`https://effective-couscous-pjq9qjr49xwg3rw55-3001.app.github.dev/api/rifa/${handleIdUser}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    titulo: formData.tituloRifa,
                    descripcion: formData.descripcionRifa,
                    precio_ticket: formData.precioTicket,
                    metodo_pagos: formData.metodoPagos,
                    cantidad_tickets: formData.cantidadTickets,
                    loteria: formData.loteria,
                    fecha_sorteo: formData.fechaSorteo,
                    imagen: formData.imagenPremio,
                    titular_zelle: formData.titularZelle,
                    contacto_zelle: formData.contactoZelle,
                    titular_transferencia: formData.titularTransferencia,
                    numero_ruta: formData.numeroRuta,
                    numero_cuenta: formData.numeroCuenta
                })
            });
            if (response.ok) {
                navigate("/rifas");
            } else {
                setError("Error al crear la rifa");
            }
        } catch (error) {
            setError("Error en la solicitud: " + error.message);
        }
    }

    return (
        <div>
            <div className="container mt-5 px-3 px-sm-4">
                <button type="button" className="btn btn-link mb-3 d-flex p-0">
                    <Link to="/" className="text-danger fs-3"><i className="fa-solid fa-angle-left"></i></Link>
                </button>
                <h1 className="text-center text-danger text-bold" style={{fontSize: "clamp(32px, 5vw, 60px)"}}>Crear Rifa</h1>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                <form className="mt-4 mx-auto" style={{maxWidth: "600px"}} onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="tituloRifa" className="form-label">Título de la Rifa</label>
                        <input type="text" className="form-control" name="tituloRifa" id="tituloRifa" placeholder="Ingrese el título de la rifa" value={formData.tituloRifa} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="descripcionRifa" className="form-label">Descripción</label>
                        <textarea className="form-control" name="descripcionRifa" id="descripcionRifa" rows="3" placeholder="Ingrese una descripción para la rifa" value={formData.descripcionRifa} onChange={handleChange}></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="precioTicket" className="form-label">Precio por Ticket</label>
                        <input type="number" className="form-control" name="precioTicket" id="precioTicket" placeholder="Ingrese el precio por ticket" value={formData.precioTicket} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="metodoPagos" className="form-label">Métodos de Pagos</label>
                        <select className="form-select" name="metodoPagos" id="metodoPagos" aria-label="Default select example" value={formData.metodoPagos} onChange={handleChange}>
                            <option value="">Seleccione un método de pago</option>
                            <option value="ZELLE">ZELLE</option>
                            <option value="Transferencia-Bancaria">Transferencia Bancaria</option>
                            <option value="Llenar-Despues">Llenar Después</option>
                        </select>
                    </div>

                    {formData.metodoPagos === "ZELLE" && (
                        <div className="mb-3 p-3 border rounded bg-light">
                            <h5 className="text-danger mb-3">Información de Zelle</h5>
                            <div className="mb-3">
                                <label htmlFor="titularZelle" className="form-label">Titular de la Cuenta</label>
                                <input type="text" className="form-control" id="titularZelle" name="titularZelle" placeholder="Nombre del titular" value={formData.titularZelle} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="contactoZelle" className="form-label">Correo Electrónico o Número de Teléfono</label>
                                <input type="text" className="form-control" id="contactoZelle" name="contactoZelle" placeholder="correo@ejemplo.com o +1234567890" value={formData.contactoZelle} onChange={handleChange} />
                            </div>
                        </div>
                    )}

                    {formData.metodoPagos === "Transferencia-Bancaria" && (
                        <div className="mb-3 p-3 border rounded bg-light">
                            <h5 className="text-danger mb-3">Información de Transferencia Bancaria</h5>
                            <div className="mb-3">
                                <label htmlFor="titularTransferencia" className="form-label">Titular de la Cuenta</label>
                                <input type="text" className="form-control" id="titularTransferencia" name="titularTransferencia" placeholder="Nombre del titular" value={formData.titularTransferencia} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="numeroRuta" className="form-label">Número de Ruta</label>
                                <input type="text" className="form-control" id="numeroRuta" name="numeroRuta" placeholder="Número de ruta bancaria" value={formData.numeroRuta} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="numeroCuenta" className="form-label">Número de Cuenta</label>
                                <input type="text" className="form-control" id="numeroCuenta" name="numeroCuenta" placeholder="Número de cuenta bancaria" value={formData.numeroCuenta} onChange={handleChange} />
                            </div>
                        </div>
                    )}

                    <div className="mb-3">
                        <label htmlFor="cantidadTickets" className="form-label">Cantidad de Tickets</label>
                        <select className="form-select" name="cantidadTickets" id="cantidadTickets" aria-label="Default select example" value={formData.cantidadTickets} onChange={handleChange}>
                            <option value="">Cantidad de Tickets</option>
                            <option value="100">100</option>
                            <option value="1000">1.000</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="loteria" className="form-label">Loteria</label>
                        <input type="text" className="form-control" name="loteria" id="loteria" placeholder="Ingrese la loteria" value={formData.loteria} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="fechaSorteo" className="form-label">Fecha y hora del Sorteo</label>
                        <input type="datetime-local" className="form-control" name="fechaSorteo" id="fechaSorteo" value={formData.fechaSorteo} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="imagenPremio" className="form-label">Imagen del premio</label>
                        <p className="text-muted small mb-2">Dimensiones recomendadas: 550 x 700 píxeles (Proporción vertical)</p>
                        <div className="mb-2 text-center">
                            <p className="small text-danger mb-2"><strong>Ejemplo de plantilla:</strong></p>
                            <img 
                                src="src/front/assets/img/plantilla-rifa-ejemplo.jpg" 
                                alt="Ejemplo de plantilla" 
                                className="img-fluid rounded" 
                                style={{maxWidth: "300px", border: "2px solid #d90429"}}
                            />
                        </div>
                        <input type="file" className="form-control" name="imagenPremio" id="imagenPremio" accept="image/jpeg,image/png,image/jpg" onChange={handleChange} />
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-danger w-100 w-sm-auto px-5">Crear Rifa</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CrearRifa;