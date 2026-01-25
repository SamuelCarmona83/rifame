import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {

	return (
		<div>
			<section className="row justify-content-center align-items-center mx-5 mb-5" style={{backgroundImage: "url('src/front/assets/img/red_wavy_with_halftone_background.jpg')", backgroundSize: "cover", height: "750px", borderRadius: "15px"}}>
				<div className="text-start mt-5 col-4 align-self-start" style={{color:"#d90429"}}>
					<h1  style={{fontSize: "94px", fontWeight: "bold"}}>Sistema de Rifas Online</h1>
					<p className="fs-3" style={{color:"#961623"}}>Vende tickets por Internet en nuestra plataforma digital de <strong>sorteos online</strong> con números de la lotería y <strong>boletos virtuales</strong>.</p>
				</div>
				<div className="col-4">
					<img 
						src="src/front/assets/img/MagicEraser_260125_114439.PNG" 
						alt="Rifame Logo" 
						className="d-block m-auto"
						width="500"
						height="500"
					/>
				</div>
			</section>


		</div>
	);
}; 