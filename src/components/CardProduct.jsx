import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { toggleWishlist } from "../store/wishlistSlice"
import { FaHeart, FaRegHeart } from "react-icons/fa6"

import useValidImage from "../hooks/useValidImage"

const CardProduct = ({ product }) => {
    const wishlist = useSelector((state) => state.wishlist.products.find(wishProduct => wishProduct.id === product.id))
    const dispatch = useDispatch()
    return (
        <article 
            className="relative w-full bg-white flex flex-col border-[0.05em] rounded-lg overflow-hidden"
            aria-labelledby={`product-title-${product.id}`}
        >
            <button
                type="button"
                onClick={() => dispatch(toggleWishlist(product))}
                className="absolute right-2 top-2 bg-secondary text-primary-red flex justify-center items-center rounded-full p-2"
                aria-pressed={wishlist} // Menyediakan status toggle untuk aksesibilitas
                aria-label={wishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
                {wishlist ? <FaHeart /> : <FaRegHeart />}
            </button>
            <figure className="aspect-square">
                <img 
                    src={useValidImage(product.images[0])} 
                    alt={`Image of ${product.title}`} // Deskripsi gambar yang lebih informatif
                    loading="lazy"
                    className="w-full h-full object-center object-cover"
                />
            </figure>
            <div className="grow flex flex-col justify-between gap-4 p-4">
                <Link 
                    to={`/product/${product.id}`} 
                    id={`product-title-${product.id}`}
                    className="hover:underline focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary"
                >
                    <h3 className="text-sm font-bold line-clamp-2">{product.title}</h3>
                </Link>
                <span className="font-bold">${product.price}</span>
            </div>
        </article>
    )
}

export default CardProduct