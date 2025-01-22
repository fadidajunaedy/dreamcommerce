import { Link } from "react-router-dom"
import useValidImage from "../hooks/useValidImage"

const CardProduct = ({ product }) => {
    return (
        <Link 
            to={`product/${product.id}`}
            className="w-full bg-white flex flex-col border-[0.05em] rounded-lg overflow-hidden"
        >
            <figure className="aspect-square">
                <img 
                    src={useValidImage(product.images[0])} 
                    alt={product.title}
                    loading="lazy"
                    className="w-full h-full object-center object-cover"
                />
            </figure>
            <div className="grow flex flex-col justify-between gap-2 p-4">
                <h3 className="text-sm font-semibold line-clamp-2">{product.title}</h3>
                <span className="font-bold">${product.price}</span>
                {/* <p className="text-sm">{product.description.length > 20 ? product.description.substring(0, 72) + "..." : product.description}</p> */}
            </div>
        </Link>
    )
}

export default CardProduct