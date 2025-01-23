import { useSelector } from "react-redux"
import CardProduct from "../components/CardProduct"
import NavBack from "../components/NavBack"

const Wishlist = () => {
    const wishlist = useSelector((state) => state.wishlist.products)

    return (
        <section className="container min-h-[90vh] py-4">
            <NavBack />
            <h2 className="mb-8">Wishlist</h2>
            <div className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {wishlist.length > 0 ? wishlist.map(product => (
                <CardProduct key={product.id} product={product} />
            )) : 
                <div className="col-span-2 md:col-span-4 lg:col-span-6 text-center text-slate-400 italic py-8">
                    Your wishlist is empty. Start adding your favorite products!
                </div>
            }
            </div>
        </section>
    )
}

export default Wishlist