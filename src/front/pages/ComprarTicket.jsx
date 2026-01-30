import { number } from 'prop-types';
import React, { useState } from 'react';


export const ComprarTicket = () => {

    const LimiteDeTickets = 10;

    const generarTickets = (total) => {
        const tickets = [];
        for (let i = 0; i < total; i++) {
            tickets.push({
                numero: String(i).padStart(3, '0'),
                disponible: true,
                precio: 5
            });
        }
        return tickets;
    };

    const [tickets, setTickets] = useState(() => generarTickets(1000));
    const [ticketsSeleccionados, setTicketsSeleccionados] = useState([]);


    const seleccionarTicket = (numero) => {
        setTicketsSeleccionados(prev => {
            if (prev.includes(numero)) {
                return prev.filter(n => n !== numero);
            } else {
                if (prev.length < 10) {
                    return [...prev, numero];
                }
                return prev;
            }
        });
    };

    return (
        <div>
            <div className="container mt-5 col-7" style={{ borderRadius: '18px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>

                <h1 className="text-center text-danger text-bold" style={{ fontSize: "60px" }} >Lista de Ticket</h1>
                
                <div className="text-center mb-4">
                    <div className='d-flex justify-content-center align-items-center gap-2'>
                        {/* <button className="btn btn-danger rounded-circle" onClick={() => ticketsSeleccionados.length > 0 && setTicketsSeleccionados(ticketsSeleccionados.slice(0, -1))}>
                            <i className="fa-solid fa-minus"></i>
                        </button> */}
                        <div className='d-flex flex-column align-items-center'>
                            <h1 className="rounded-5 text-center m-2 mb-0 fs-1">{ticketsSeleccionados.length}</h1>
                            <span className="text-danger" style={{fontSize:"0.75rem"}}>Tickets</span>
                        </div>
                        {/* <button className="btn btn-danger rounded-circle" onClick={() => ticketsSeleccionados.length < LimiteDeTickets && setTicketsSeleccionados([...ticketsSeleccionados, String(ticketsSeleccionados.length).padStart(3, '0')])}>
                            <i className="fa-solid fa-plus"></i>
                        </button> */}
                    </div>

                    <h5 className="text-center text-danger font-bold mt-2 mb-0">
                        Total: ${ticketsSeleccionados.length * tickets[0].precio}
                    </h5>

                    <input className="form-control input-sin-estilos rounded-5 m-auto mt-2 text-center" style={{width:"6rem"}} type="text" placeholder="Buscar"></input>

                    <button className="btn btn-outline-danger btn-lg mt-2 px-3 rounded-5">
                        <i className="fa-solid fa-fire"></i> Elegir a la suerte <i className="fa-solid fa-fire"></i>
                    </button>
                </div>

                <div className="row mx-5" style={{ height: '500px', overflowY: 'scroll' }}>
                    <div className='col d-flex flex-wrap justify-content-center'>
                        {tickets.map((ticket) => (
                            <button
                                key={ticket.numero}
                                className="btn btn-secondary m-1"
                                onClick={() => seleccionarTicket(ticket.numero)}
                                style={{ width: '4rem', height: '2rem', fontSize: '12px', fontWeight: 'bold', borderRadius: '18px' }}
                            >
                                {ticket.numero}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="text-center my-4 d-flex flex-column align-items-center">
                    <h3 className="text-center">Seleccionados</h3>
                    <div className="text-center text-danger font-bold">
                        {ticketsSeleccionados.length} de {LimiteDeTickets} 
                    </div>
                    {ticketsSeleccionados.length > 0 && (
                        <div className="d-flex flex-wrap gap-2 mt-2">
                            {ticketsSeleccionados.map(num => (
                            <button
                                key={num}
                                className="btn btn-primary m-1"
                                onClick={() => seleccionarTicket(num)}
                                style={{ width: '4rem', height: '2rem', fontSize: '12px', fontWeight: 'bold', borderRadius: '18px' }}
                            >
                                {num}
                            </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="text-center my-4 ">
                    <button className="btn btn-outline-danger btn-lg px-5">
                        Comprar Ticket
                    </button>
                </div>

            </div>
        </div>
    );
};
export default ComprarTicket;