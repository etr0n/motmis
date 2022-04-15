import { IoBarChartSharp } from "react-icons/io5";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

const links = [
    {
        id: 1,
        text: "Devices",
        path: "/",
        icon: <IoBarChartSharp />
    },
    {
        id: 2,
        text: "add-device",
        path: "/add-device",
        icon: <FaWpforms />
    },
    {
        id: 3,
        text: "profile",
        path: "/profile",
        icon: <ImProfile />
    },
]

export default links