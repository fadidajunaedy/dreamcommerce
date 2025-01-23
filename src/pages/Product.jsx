import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { addToCart, decreaseQuantityCart, deleteCart } from "../store/cartSlice"
import { HiOutlineInboxArrowDown, HiOutlineInbox } from "react-icons/hi2"
import { FaHeart, FaMinus, FaPlus, FaRegHeart } from "react-icons/fa6"
import { toggleWishlist } from "../store/wishlistSlice"

import NavBack from "../components/NavBack"
import useValidImage from "../hooks/useValidImage"

const Product = () => {
    const [product, setProduct] = useState(null)
    const [preview, setPreview] = useState("")
    const [loading, setLoading] = useState(false)

    const { id } = useParams()

    const cart = useSelector((state) => state.cart.products.find(product => product?.id === parseInt(id)))
    const wishlist = useSelector((state) => state.wishlist.products.find(wishProduct => wishProduct?.id === parseInt(id)))
    const dispatch = useDispatch()

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal

        const fetchProduct = async () => {
            try {
                setLoading(true)
                const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, { signal })
                const data = await response.json()
                setPreview(data.images[0])
                setProduct(data)
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("Fetch aborted")
                } else {
                    console.log(error)
                }
            } finally {
                setLoading(false)
            }
        }

        fetchProduct()

        return () => controller.abort()
    }, [id])

    const validPreview = useValidImage(preview)

    return (
        <>
            <section className="container min-h-[90vh] flex flex-col items-center py-4">
                <NavBack />
                <div className="w-full bg-base grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {loading ? (
                        <>
                            <div className="w-full flex flex-col gap-4">
                                <div className="skeleton w-full h-96"></div>
                            </div>
                            <div className="flex flex-col justify-center items-start gap-8 lg:p-4">
                                <div className="w-full flex flex-col gap-4">
                                    <div className="skeleton w-full h-12"></div>
                                    <div className="skeleton w-[75%] h-12"></div>
                                </div>
                                <div className="w-full flex flex-col gap-4">
                                    <div className="skeleton w-full h-4"></div>
                                    <div className="skeleton w-[90%] h-4"></div>
                                    <div className="skeleton w-full h-4"></div>
                                    <div className="skeleton w-[90%] h-4"></div>
                                </div>
                                <div className="skeleton w-[15%] h-12"></div>
                                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="skeleton w-full h-12"></div>
                                    <div className="skeleton w-full h-12"></div>
                                </div>
                            </div>
                        </>
                    ) : product ? (
                        <>
                            <div className="w-full flex flex-col gap-4">
                                <figure className="aspect-square bg-base rounded-lg shadow overflow-hidden">
                                    {preview ? (
                                        <img 
                                            src={validPreview} 
                                            alt={product?.title}
                                            loading="lazy"
                                            className="w-full h-full object-center object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-300"></div> // Placeholder if preview is not available
                                    )}
                                </figure>
                                <div className="flex items-center gap-4 snap-x snap-mandatory overflow-x-scroll">
                                    {Array.isArray(product?.images) && product?.images.length > 0 && product?.images.map((image, index) => (
                                        <figure 
                                            key={index}
                                            onClick={() => setPreview(image)} 
                                            className="w-24 h-24 min-w-24 min-h-24 aspect-square bg-base rounded-lg shadow cursor-pointer overflow-hidden snap-always snap-start"
                                        >
                                            <img 
                                                src={image} 
                                                alt={product?.title}
                                                loading="lazy"
                                                className={`w-full h-full object-center object-cover ${preview !== image && "brightness-50"}`}
                                            /> 
                                        </figure>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-start gap-8 lg:p-4">
                                <h2 className="text-4xl font-bold">{product?.title}</h2>
                                <p className="text-slate-500 leading-loose">{product?.description}</p>
                                <span className="text-3xl font-semibold">${product?.price}</span>
                                <div className="w-full grid grid-cols-2 gap-4">
                                    {cart?.quantity > 0 && (
                                        <div className="col-span-2 md:col-span-1 bg-slate-200 grow flex justify-between items-center rounded-lg overflow-hidden py-4">
                                            <button
                                                type="button"
                                                onClick={() => dispatch(decreaseQuantityCart(product))}
                                                className="w-14 h-full flex justify-center items-center"
                                            >
                                                <FaMinus />
                                            </button>
                                            <span className="px-4 text-lg font-semibold">
                                                {cart?.quantity || 0}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => dispatch(addToCart(product))}
                                                className="w-14 h-full flex justify-center items-center"
                                            >
                                                <FaPlus />
                                            </button>
                                        </div>
                                    )}
                                    {cart?.quantity > 0 ? (
                                        <button 
                                            type="button" 
                                            onClick={() => dispatch(deleteCart(product))}
                                            disabled={loading}
                                            className="col-span-2 md:col-span-1 grow btn btn-lg bg-primary-red text-base font-semibold"
                                        >
                                            <HiOutlineInbox />
                                            {loading ? "Removing cart..." : "Remove cart"}
                                        </button>
                                    ) : (
                                        <button 
                                            type="button" 
                                            onClick={() => dispatch(addToCart(product))}
                                            disabled={loading}
                                            className={`${cart?.quantity > 0 ? "" : "col-span-2"} grow btn btn-lg bg-primary text-base font-semibold`}
                                        >
                                            <HiOutlineInboxArrowDown />
                                            {loading ? "Adding to cart..." : "Add to cart"}
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => dispatch(toggleWishlist(product))}
                                        className="col-span-2 h-full btn btn-lg bg-secondary text-primary-red font-semibold"
                                    >
                                        {wishlist ? <FaHeart /> : <FaRegHeart />}
                                        Wishlist
                                    </button> 
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="md:col-span-2">
                            <h2>Product not found</h2>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

export default Product