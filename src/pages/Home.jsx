import { useEffect, useState } from "react"

import CardProduct from "../components/CardProduct"
import useDebounce from "../hooks/useDebounce"
import Jumbotron from "../components/Jumbotron"

const Home = () => {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [filterCategoryId, setFilterCategoryId] = useState("")
    const [keyword, setKeyword] = useState("")
    const [loading, setLoading] = useState(false)

    const debounceKeyword = useDebounce(keyword)

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal

        const fetchCategories = async () => {
            try {
                setLoading(true)

                const response = await fetch(`https://api.escuelajs.co/api/v1/categories`, { signal })
                const data = await response.json()
                setCategories(data)
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("Fetch aborted");
                } else {
                    console.log(error);
                }
            } finally {
                setLoading(false)
            }
        }

        fetchCategories()

        return () => controller.abort()
    }, [])

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal  

        const fetchProducts = async () => {
            try {
                setLoading(true)

                const response = await fetch(`https://api.escuelajs.co/api/v1/products/?title=${debounceKeyword}&categoryId=${filterCategoryId}`, { signal })
                const data = await response.json()
                console.log(data)
                setProducts(data)
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("Fetch aborted");
                } else {
                    console.log(error);
                }
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()

        return () => controller.abort()
    }, [filterCategoryId, debounceKeyword])

    return (
        <>
            <section className="container min-h-[90vh] py-4">
                <Jumbotron />
                <div className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
                    <select 
                    name="filterCategory" 
                    id="filterCategory"
                    value={filterCategoryId}
                    onChange={(e) => setFilterCategoryId(e.target.value)}
                    className="col-span-2 md:col-span-2 bg-white rounded-lg border-2 py-2 px-4">
                        <option value="">Semua</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                    <label htmlFor="keyword" className="w-full col-span-2 md:col-span-2 lg:col-span-3 lg:col-start-4 ">
                        <input 
                            type="search" 
                            name="keyboard" 
                            id="keyboard"
                            placeholder="Search by title..."
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            className="w-full rounded-lg border-2 py-2 px-4"/>
                    </label>
                </div>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {loading ? (
                    // Skeleton loading saat data sedang dimuat
                    Array.from({ length: 18 }).map((_, index) => (
                        <div key={index} className="skeleton w-full h-[16em]"></div>
                    ))
                ) : products.length > 0 ? (
                    // Tampilkan produk jika ada data
                    products.map(product => (
                        <CardProduct key={product.id} product={product} />
                    ))
                ) : (
                    // Tampilkan pesan jika tidak ada data
                    <div className="col-span-2 md:col-span-4 ld:col-span-6 text=center">Data tidak tersedia</div>
                )}

                </div>
            </section>

        </>
    )
}

export default Home