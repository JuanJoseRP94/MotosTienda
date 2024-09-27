import React, { useState } from 'react';

const MotoForm = ({ onAddMoto }) => {
    const [newMoto, setNewMoto] = useState({
        name: '',
        image: null, // Aquí guardaremos la imagen como archivo
        description: '',
        price: ''
    });

    // Manejador para campos de texto
    const handleChange = (e) => {
        setNewMoto({
            ...newMoto,
            [e.target.name]: e.target.value
        });
    };

    // Manejador para la subida de archivos
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Crear una URL temporal para mostrar la imagen
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewMoto((prevState) => ({
                    ...prevState,
                    image: reader.result // Guardar la imagen como URL temporal
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Verifica que todos los campos estén llenos, incluyendo la imagen
        if (newMoto.name && newMoto.image && newMoto.description && newMoto.price) {
            onAddMoto(newMoto); // Llama a la función que añade la nueva moto
            setNewMoto({ name: '', image: null, description: '', price: '' }); // Limpia el formulario
        } else {
            alert('Por favor, completa todos los campos.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label>Nombre de la Moto</label>
                <input
                    type="text"
                    name="name"
                    value={newMoto.name}
                    onChange={handleChange}
                    required
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label>Imagen de la Moto</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    required
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label>Descripción</label>
                <input
                    type="text"
                    name="description"
                    value={newMoto.description}
                    onChange={handleChange}
                    required
                    className="form-control"
                />
            </div>
            <div className="mb-3">
                <label>Precio</label>
                <input
                    type="number"
                    name="price"
                    value={newMoto.price}
                    onChange={handleChange}
                    required
                    className="form-control"
                />
            </div>
            <button type="submit" className="btn btn-primary">Añadir Moto</button>
        </form>
    );
};

export default MotoForm;


