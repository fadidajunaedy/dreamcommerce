import { useDispatch, useSelector } from "react-redux"
import { addToCart, decreaseQuantityCart, deleteCart } from "../store/cartSlice"
import { IoIosCloseCircleOutline } from "react-icons/io"

const Cart = () => {
    const cart = useSelector((state) => state.cart.products)
    const totalPriceCart = useSelector((state) => state.cart.total)

    const dispatch = useDispatch()

    return (
        <>
            <section className="container min-h-[90vh] py-4">
                <div className="w-full grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="md:col-span-3 flex flex-col gap-4">
                    {cart.length > 0 && cart.map(product => (
                        <div key={product.id} className="bg-white flex justify-between rounded-lg shadow overflow-hidden">
                            <figure className="max-w-32 h-full max-h-32 aspect-square overflow-hidden">
                                <img 
                                    src={product.images[0]} 
                                    alt={product.title}
                                    loading="lazy"
                                    className="w-full h-full object-center object-cover"
                                />
                            </figure>
                            <div className="grow flex flex-col items-start gap-2 p-4">
                                <span className="text-xs border-[0.1em] border-black rounded-full py-[0.5em] px-[1em]">{product.category.name}</span>
                                <h3 className="font-semibold">{product.title}</h3>
                            </div>
                            <div className="flex flex-col justify-between items-end gap-4 p-4">
                                <span className="font-semibold">${product.total_price}</span>
                                <div className="text-sm flex justify-between items-center gap-4 border-[0.1em] border-black rounded-full py-[0.5em] px-[1em]">
                                    <button
                                        type="button"
                                        disabled={product.quantity === 1}
                                        onClick={() => dispatch(decreaseQuantityCart(product))}
                                    >
                                        -
                                    </button>
                                    {product.quantity}
                                    <button
                                        type="button"
                                        onClick={() => dispatch(addToCart(product))}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <hr />
                        </div>
                    ))}
                    </div>

                    <div className="md:col-span-2 rounded-lg shadow p-4">
                        <h2 className="font-bold mb-8">Cart</h2>
                        <div className="flex flex-col gap-4">
                            {cart && cart.length > 0 && cart.map(product => (
                                <>
                                <div key={product.id} className="w-full flex justify-between items-center">
                                    <div className="grow flex flex-col gap-2">
                                        <p className="text-base font-bold">{product.title}</p>
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold">{product.quantity}x</span>
                                            <span className="font-thin">@ ${product.price}</span>
                                            <span className="ml-2">${product.total_price}</span>
                                        </div>
                                    </div>
                                    <button type="button" onClick={() => dispatch(deleteCart(product))}>
                                        <IoIosCloseCircleOutline size={24} />
                                    </button>
                                </div>
                                <hr />
                                </>
                            ))}
                            <div className="flex justify-between items-center">
                                <p>Total</p>
                                <span className="text-4xl font-semibold">${totalPriceCart}</span>
                            </div>
                            <button type="button" className="btn btn-lg bg-blue-600 text-white font-bold text-xl">
                                Confirm Order
                            </button>
                        </div>
                        
                    </div>

                </div>
            </section>

        </>
    )
}

export default Cart