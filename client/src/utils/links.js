import { FaWifi } from "react-icons/fa";
import { AiTwotoneNotification, AiOutlineUser } from "react-icons/ai"
import { RiMenuAddLine } from "react-icons/ri"
import { IoAdd } from "react-icons/io5"
const links = [
    {
        id: 1,
        text: "devices",
        path: "/",
        icon: <FaWifi />
    },
    {
        id: 2,
        text: "add-device",
        path: "/add-device",
        icon: <IoAdd />
    },
    {
        id: 3,
        text: "subscriptions",
        path: "/subscriptions",
        icon: <AiTwotoneNotification />
    },
    {
        id: 4,
        text: "add-subscription",
        path: "/add-subscription",
        icon: <RiMenuAddLine />
    },
    {
        id: 5,
        text: "profile",
        path: "/profile",
        icon: <AiOutlineUser />
    },
]

export default links