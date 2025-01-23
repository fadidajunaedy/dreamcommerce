import { useDispatch, useSelector } from "react-redux"
import { addToCart, decreaseQuantityCart, deleteCart } from "../store/cartSlice"
import { IoIosCloseCircleOutline } from "react-icons/io"
import { FaMinus, FaPlus } from "react-icons/fa6"
import Badge from "../components/Bagde"
import NavBack from "../components/NavBack"
import CardCart from "../components/CardCart"

const Cart = () => {
    const cart = useSelector((state) => state.cart.products)
    const totalPriceCart = useSelector((state) => state.cart.total)

    const dispatch = useDispatch()

    return (
        <>
            <section className="container min-h-[90vh] py-4">
                <NavBack />
                <h2 className="mb-8">Cart</h2>
                <div className="w-full grid grid-cols-1 lg:grid-cols-5 gap-4">
                    <div className="lg:col-span-3 flex flex-col gap-4">
                    {cart.length > 0 ? cart.map(product => <CardCart key={product.id} product={product} />
                    ) : (
                        <div className="bg-white flex justify-center items-center rounded-lg shadow overflow-hidden text-slate-400 italic p-4">
                            Oops! Looks like your cart is empty. Let’s fill it up!
                        </div>
                    )}
                    </div>
                    
                    {cart && cart.length > 0 && (
                    <div className="lg:col-span-2 bg-white rounded-lg shadow p-4">
                        <h3 className="font-bold mb-8">Summary</h3>
                        <div className="flex flex-col gap-4">
                            {cart.map(product => (
                                <>
                                <div key={product.id} className="w-full flex justify-between items-center">
                                    <div className="grow flex flex-col gap-2">
                                        <p className="font-bold">{product.title}</p>
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold">{product.quantity}x</span>
                                            <span className="font-thin">@ ${product.price}</span>
                                            <span className="ml-2">${product.total_price}</span>
                                        </div>
                                    </div>
                                    <button 
                                        type="button" 
                                        onClick={() => dispatch(deleteCart(product))}
                                        className="hover:text-primary"
                                    >
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
                            <button type="button" className="btn btn-lg bg-primary hover:bg-secondary text-white font-bold text-xl">
                                Confirm Order
                            </button>
                        </div>                        
                    </div>
                    )}


                </div>
            </section>

        </>
    )
}

export default Cart