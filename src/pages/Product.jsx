import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { addToCart, decreaseQuantityCart, deleteCart } from "../store/cartSlice"
import { TbShoppingCartPlus, TbShoppingCartDown } from "react-icons/tb"
import useValidImage from "../hooks/useValidImage"

const Product = () => {
    const [product, setProduct] = useState(null)
    const [preview, setPreview] = useState("")
    const [loading, setLoading] = useState(false)

    const { id } = useParams()

    const cart = useSelector((state) => state.cart.products.find(product => product?.id === parseInt(id)))
    const dispatch = useDispatch()

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal;

        (async () => {
            try {
                setLoading(true)
                const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, { signal })
                const data = await response.json()
                setPreview(data.images[0])
                setProduct(data)
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("Fetch aborted");
                } else {
                    console.log(error);
                }
            } finally {
                setLoading(false)
            }
        })()

        return () => controller.abort()
    }, [id])

    return (
        <>
            <section className="container min-h-[90vh] flex items-center py-4">
                <div className="w-full bg-white grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                        <figure className="aspect-square bg-white rounded-lg shadow overflow-hidden">
                            <img 
                                src={preview && preview} 
                                alt={product?.title}
                                loading="lazy"
                                className="w-full h-full object-center object-cover"
                            />
                        </figure>
                        <div className="flex items-center gap-4 snap-x snap-mandatory overflow-x-scroll">
                        {Array.isArray(product?.images) && product?.images.length > 0 && product?.images.map((image, index) => (
                            <figure 
                                key={index}
                                onClick={() => setPreview(image)} 
                                className="w-24 h-24 min-w-24 min-h-24 aspect-square bg-white rounded-lg shadow cursor-pointer overflow-hidden snap-always snap-start"
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
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-slate-200 grow flex justify-between items-center rounded-lg overflow-hidden">
                                <button
                                    type="button"
                                    onClick={() => dispatch(decreaseQuantityCart(product))}
                                    className="w-12 h-12 flex justify-center items-center  aspect-square"
                                >
                                    -
                                </button>
                                <span className="px-4">
                                    {cart?.quantity || 0}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => dispatch(addToCart(product))}
                                    className="w-12 h-12 flex justify-center items-center  aspect-square"
                                >
                                    +
                                </button>
                            </div>
                            {cart?.quantity > 0 ? (
                            <button 
                                type="button" 
                                onClick={() => dispatch(deleteCart(product))}
                                disabled={loading}
                                className="grow bg-red-600 hover:bg-red-400 text-xl text-white font-semibold flex justify-center items-center gap-2 rounded-lg px-4 py-2"
                            >
                                <TbShoppingCartDown />
                                {loading ? "Emptying cart..." : "Empty cart"}
                            </button>
                            ) : (
                            <button 
                                type="button" 
                                onClick={() => dispatch(addToCart(product))}
                                disabled={loading}
                                className="grow bg-blue-600 hover:bg-blue-400 text-xl text-white font-semibold flex justify-center items-center gap-2 rounded-lg px-4 py-2"
                            >
                                <TbShoppingCartPlus />
                                {loading ? "Adding to cart..." : "Add to cart"}
                            </button>
                            )}
                            
                        </div>
                    </div>
                    </>
                ) : !loading && product && (
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