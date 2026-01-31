const fondo1 = "/red-curved-sheets-paper.jpg";


const Configuracion = () => {


    return (
        <div>

            {/*Sección Configuracionees*/}         
            <section>
                <div 
                    className="d-flex justify-content-center align-items-center bg-opacity-50 gt3-page-title_wrapper mb-5" 
                    style={{height:"200px", backgroundImage: `url(${fondo1})`, backgroundSize: "cover", backgroundPosition: "center" }} >
                    <h1 className="text-white fw-bold ">Configuraciones</h1> 
                </div>
            </section>

            <section className="container d-flex ps-5">
                <div>
                    <h5 className="text-dark mb-4">Opciones Configurables en el sistema</h5>
                    <div>
                        <p className="ms-4 fs-5 text-danger pb-2 mb-0" >TU MARCA</p>
                        <h2 className="ms-4 mb-4 text-secondary" >Dominio  Wep  Propio</h2>
                        <p className="ms-4 text-secondary fs-5" >El sistema funciona tu dominio <span className=" text-danger fw-bold">www.tumarca.com</span> o <span className="text-danger fw-bold">subdominio rifas.tumarca.com</span>
                            <ul className="ms-3 mt-3">
                                <li>Cualquier proveedor de dominio</li>
                                <li>Activación en 1 hora</li>
                                <li>Registros nuevos y existentes</li>
                            </ul>                
                        </p>
                    </div>
                </div>

                 <div>
                    <h2 className="text-success text-opacity-25">Aquí va la imagen de la sección de configuracines</h2>
                </div>                
            </section>
            

        </div>

    );
}


export default Configuracion;
