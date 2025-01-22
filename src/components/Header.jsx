import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { TbShoppingCart } from "react-icons/tb"

const Header = () => {
    const cart = useSelector((state) => state.cart.products)

    return (
        <header className="w-full min-h-[10vh] bg-white flex flex-col">
            <div className="container grow flex justify-between items-center gap-4 border-b-2">
                <NavLink to="/" className="font-bold text-2xl">DC.</NavLink>
                <div className="flex items-center gap-4">
                    <NavLink to="/cart" className="relative flex justify-center items-center">
                        <TbShoppingCart size={32} /> 
                        {cart.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-600 w-6 h-6 rounded-full text-xs font-semibold text-white leading-none flex justify-center items-center">
                            {cart.length}
                        </span>
                        )}
                    </NavLink>
                </div>
            </div>
        </header>
    )
}

export default Header