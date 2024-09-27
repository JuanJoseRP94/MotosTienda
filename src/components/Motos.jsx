export default function Motos({ motos, addToCart }) {
    const { id, name, image, description, price } = motos;

    return (
        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
            <div className="col-4">
                {/* Si "image" es una URL (por ejemplo, una imagen subida), la usamos directamente. 
                Si no, asumimos que es una imagen local y usamos la carpeta /img */}
                <img 
                    className="img-fluid" 
                    src={image.startsWith('data:image') ? image : `/img/${image}.jpg`} 
                    alt={`imagen de ${name}`} 
                />
            </div>
            <div className="col-8">
                <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
                <p>{description}</p>
                <p className="fw-black text-primary fs-3">{price}€</p>
                <button
                    type="button"
                    className="btn btn-dark w-100"
                    onClick={() => addToCart(motos)}
                >
                    Agregar al Carrito
                </button>
            </div>
        </div>
    );
}

