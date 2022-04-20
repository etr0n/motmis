import Wrapper from '../assets/wrappers/Navbar'
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'
import { useAppContext } from '../context/appContext'
import { AiOutlineUser } from "react-icons/ai"
import { useState } from 'react'
const Navbar = () => {
    const [showLogout, setShowLogout] = useState(false)

    const { toggleSidebar, user, logoutUser } = useAppContext()
    return (
        <Wrapper>
            <div className="nav-center">
                <button
                    type="button"
                    className='toggle-btn'
                    onClick={toggleSidebar}
                >
                    <FaAlignLeft />
                </button>

                <div>
                    {/* <Logo /> */}
                    <h3 className='logo-text'>dashboard</h3>
                </div>

                <div className="btn-container">
                    <button
                        type="button"
                        className='btn'
                        onClick={() => setShowLogout(!showLogout)}
                    // arrow function because we are passing a value,
                    // we dont want to invoke this when application starts,
                    // but only when clicked
                    >
                        <AiOutlineUser />
                        {user?.name} {/* I only get the name if the user exist*/}
                        {user?.lastName}
                        <FaCaretDown />
                    </button>
                    <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
                        <button
                            type="button"
                            className="dropdown-btn"
                            onClick={logoutUser}
                        >
                            Log out
                        </button>
                    </div>
                </div>
            </div>
        </Wrapper >
    )
}

export default Navbar