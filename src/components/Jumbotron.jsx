import JumbotronImage from "../assets/images/jumbotron-image.jpg"

const Jumbotron = () => {
    return (
        <header
            className="h-[50vh] bg-center bg-cover bg-no-repeat bg-gray-700 bg-blend-multiply flex flex-col justify-center items-center gap-4 rounded-lg shadow mb-4"
            style={{
                backgroundImage: `url(${JumbotronImage})`,
            }}
        >
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
                DreamCommerce
            </h1>
            <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
                Turning Your Dream Purchases into Reality
            </p>
        </header>
    )
}

export default Jumbotron