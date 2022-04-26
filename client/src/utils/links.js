import { FaWifi } from "react-icons/fa";
import { AiTwotoneNotification, AiOutlineUser } from "react-icons/ai"
import { RiListUnordered } from "react-icons/ri"

const links = [
    {
        id: 1,
        text: "devices",
        path: "/",
        otherPaths: ["add-device"],
        icon: <FaWifi />
    },
    {
        id: 2,
        text: "Data",
        path: "/all-device-data",
        otherPaths: [],
        icon: <RiListUnordered />
    },
    {
        id: 3,
        text: "subscriptions",
        path: "/subscriptions",
        otherPaths: [],
        icon: <AiTwotoneNotification />
    },
    {
        id: 4,
        text: "profile",
        path: "/profile",
        otherPaths: [],
        icon: <AiOutlineUser />
    },
]

export default links