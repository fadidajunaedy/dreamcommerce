import { useEffect, useState } from "react"
import { IoSearch } from "react-icons/io5"

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
            <div className="container min-h-[90vh] py-4">
                <Jumbotron />
                <form 
                    className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4" 
                    role="search" 
                    aria-labelledby="search-filter"
                >
                    <fieldset className="col-span-2 md:col-span-2">
                        <legend id="filterCategoryLabel" className="sr-only">Filter by Category</legend>
                        <select 
                            name="filterCategory" 
                            id="filterCategory"
                            value={filterCategoryId}
                            onChange={(e) => setFilterCategoryId(e.target.value)}
                            className="w-full bg-white text-lg rounded-lg border-2 p-4"
                            aria-labelledby="filterCategoryLabel"
                        >
                            <option value="">All</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </fieldset>

                    <div className="col-span-2 md:col-span-2 lg:col-span-3 lg:col-start-4">
                        <label 
                            htmlFor="keyword" 
                            className="sr-only"
                        >
                            Search by title
                        </label>
                        <div 
                            className="w-full bg-white rounded-lg border-2 flex items-center overflow-hidden focus-within:border-primary"
                        >
                            <input
                                type="search"
                                name="keyword"
                                id="keyword"
                                placeholder="Search by title..."
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                className="grow outline-none text-lg p-4 border-none"
                                aria-label="Search by title"
                            />
                            <button
                                type="submit"
                                className="p-4"
                                aria-label="Search"
                            >
                                <IoSearch />
                            </button>
                        </div>
                    </div>
                </form>
                <section className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {loading ? (
                    Array.from({ length: 18 }).map((_, index) => (
                        <div key={index} className="skeleton w-full h-[16em]" aria-hidden="true"></div>
                    ))
                ) : products.length > 0 ? (
                    products.map(product => (
                        <CardProduct key={product.id} product={product} aria-labelledby={`product-${product.id}`}  />
                    ))
                ) : 
                    <div className="col-span-2 md:col-span-4 lg:col-span-6 text-center text-slate-400 italic py-8">
                        Products not found!
                    </div>
                }

                </section>
            </div>

        </>
    )
}

export default Home