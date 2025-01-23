import { HiArrowLongLeft } from "react-icons/hi2"

const NavBack = () => {
    return (
        <button type="button" onClick={() => window.history.back()} className="w-full cursor-pointer mb-4">
            <span className="flex items-center">
                <HiArrowLongLeft size={18}/>
                &nbsp;
                Back
            </span>
        </button>
    )
}

export default NavBack