import { HiArrowLongLeft } from "react-icons/hi2"
import { useNavigate } from "react-router-dom"

const NavBack = () => {
    const navigate = useNavigate()

    return (
        <button type="button" onClick={() => navigate(-1)} className="w-full cursor-pointer mb-4">
            <span className="flex items-center">
                <HiArrowLongLeft size={18}/>
                &nbsp;
                Back
            </span>
        </button>
    )
}

export default NavBack