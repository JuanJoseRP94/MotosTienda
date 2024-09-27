import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function CartDetail() {
    const location = useLocation();
    const cart = location.state?.cart || [];

    const cartTotal = cart.reduce((total, item) => total + (item.quantity * item.price), 0);

    return (
        <div className="container-xl mt-5">
            <h2 className="text-center">Detalles del Carrito</h2>
            {cart.length === 0 ? (
                <p className="text-center">El carrito está vacío</p>
            ) : (
                <table className="w-100 table">
                    <thead>
                        <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map(item => (
                            <tr key={item.id}>
                                <td>
                                    <img
                                        className="img-fluid"
                                        src={item.image.startsWith('data:image') ? item.image : `/img/${item.image}.jpg`}
                                        alt={item.name}
                                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                    />
                                </td>
                                <td>{item.name}</td>
                                <td>{item.price}€</td>
                                <td>{item.quantity}</td>
                                <td>{item.quantity * item.price}€</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <p className="text-end">Total a pagar: <span className="fw-bold">{cartTotal}€</span></p>
            <Link to="/" className="btn btn-dark">Volver a la Tienda</Link>
        </div>
    );
}
