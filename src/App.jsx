import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import Motos from "./components/Motos";
import MotoForm from "./components/MotoForm";
import CartDetail from "./components/CartDetail";
import { db } from "./data/db";
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart');
        return localStorageCart ? JSON.parse(localStorageCart) : [];
    };

    const [data, setData] = useState(db);
    const [cart, setCart] = useState(initialCart);
    const [showModal, setShowModal] = useState(false);

    const MAX_ITEMS = 99;
    const MIN_ITEMS = 1;

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    function addNewMoto(moto) {
        const newMoto = {
            ...moto,
            id: data.length + 1 // Generar un nuevo id
        };
        setData([...data, newMoto]); // Actualiza la lista de motos
        setShowModal(false); // Cierra el modal
    }

    function addToCart(item) {
        const itemExists = cart.findIndex(motos => motos.id === item.id);
        if (itemExists >= 0) { // Entonces existe en el carrito
            const updatedCart = [...cart];
            updatedCart[itemExists].quantity++;
            setCart(updatedCart);
        } else { // no existe
            item.quantity = 1;
            setCart([...cart, item]);
        }
    }

    function removeFromCart(id) {
        setCart(prevCart => prevCart.filter(motos => motos.id !== id));
    }

    function increaseQuantity(id) {
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                };
            }
            return item;
        });
        setCart(updatedCart);
    }

    function decreaseQuantity(id) {
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                };
            }
            return item;
        });
        setCart(updatedCart);
    }

    function clearCart() {
        setCart([]);
    }

    return (
        <Router>
            <Header
                cart={cart}
                removeFromCart={removeFromCart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                clearCart={clearCart}
            />
            <main className="container-xl mt-5">
                <Routes>
                    <Route path="/" element={
                        <>
                            <h2 className="text-center">Nuestra Colección</h2>
                            <div className="row mt-5">
                                {data.map(motos => (
                                    <Motos
                                        key={motos.id}
                                        motos={motos}
                                        cart={cart}
                                        setCart={setCart}
                                        addToCart={addToCart}
                                    />
                                ))}
                            </div>
                            <div className="fixed-bottom d-flex justify-content-end p-3">
                                <Button className="add-moto-button" onClick={() => setShowModal(true)}>
                                    Añadir Nueva Moto
                                </Button>
                            </div>
                            <Modal show={showModal} onHide={() => setShowModal(false)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Agregar Nueva Moto</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <MotoForm onAddMoto={addNewMoto} />
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                                        Cerrar
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </>
                    } />
                    <Route path="/cart-detail" element={<CartDetail />} />
                </Routes>
            </main>
            <footer className="bg-dark mt-5 py-5">
                <div className="container-xl">
                    <p className="text-white text-center fs-4 mt-4 m-md-0">Motazas - Todos los derechos Reservados</p>
                </div>
            </footer>
        </Router>
    );
}

export default App;
