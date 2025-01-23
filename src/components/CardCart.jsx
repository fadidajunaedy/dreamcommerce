import { FaMinus, FaPlus } from "react-icons/fa6"
import { useDispatch } from "react-redux"
import { addToCart, decreaseQuantityCart } from "../store/cartSlice"
import Badge from "./Bagde"
import useValidImage from "../hooks/useValidImage"

const CardCart = ({ product }) => {
    const dispatch = useDispatch()

    return (
        <div key={product.id} className="bg-white grid grid-cols-1 md:grid-cols-5 rounded-lg shadow overflow-hidden">
            <figure className="w-full aspect-square overflow-hidden">
                <img 
                    src={useValidImage(product.images[0])} 
                    alt={product.title}
                    loading="lazy"
                    className="w-full h-full object-center object-cover"
                />
            </figure>
            <div className="md:col-span-4 flex items-center">
                <div className="grow h-full flex flex-col items-start gap-2 p-4">
                    <Badge>{product.category.name}</Badge>
                    <h3 className="text-sm md:text-xl font-semibold">{product.title}</h3>
                </div>
                <div className="flex flex-col justify-between items-end gap-4 p-4">
                    <span className="text-lg md:text-xl font-semibold">${product.total_price}</span>
                    <div className="bg-base flex justify-between items-center rounded-lg overflow-hidden">
                        <button
                            type="button"
                            onClick={() => dispatch(decreaseQuantityCart(product))}
                            className="w-8 h-full flex justify-center items-center py-2"
                        >
                            <FaMinus size={12} />
                        </button>
                        <span className="px-4 py-2 text-sm font-semibold">
                            {product.quantity}
                        </span>
                        <button
                            type="button"
                            onClick={() => dispatch(addToCart(product))}
                            className="w-8 h-full flex justify-center items-center py-2"
                        >
                            <FaPlus size={12} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardCart