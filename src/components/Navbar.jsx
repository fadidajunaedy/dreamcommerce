import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { HiOutlineHeart, HiOutlineInboxStack } from "react-icons/hi2"

const Navbar = () => {
    const cart = useSelector((state) => state.cart.products)

    return (
        <nav 
            className="w-full bg-white min-h-[10vh] bg-base flex flex-col" 
            aria-label="Main Navigation"
        >
            <div className="container grow flex justify-between items-center gap-4">
                <NavLink 
                    to="/" 
                    className="font-bold text-2xl focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary"
                >
                    DC.
                </NavLink>
                <ul className="flex items-center gap-4">
                    <li>
                        <NavLink 
                            to="/wishlist" 
                            className="relative flex flex-col justify-center items-center hover:text-primary focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary"
                        >
                            <HiOutlineHeart size={24} />
                            <span className="text-sm font-bold">Wishlist</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/cart" 
                            className="relative flex flex-col justify-center items-center hover:text-primary focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-primary"
                        >
                            {cart.length > 0 && (
                                <span 
                                    className="absolute -top-2 -right-2 bg-primary-red w-6 h-6 rounded-full text-xs font-semibold text-white leading-none flex justify-center items-center" 
                                    aria-label={`Cart contains ${cart.length} items`}
                                >
                                    {cart.length}
                                </span>
                            )}
                            <HiOutlineInboxStack size={24} />
                            <span className="text-sm font-bold">Cart</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>

    )
}

export default Navbar