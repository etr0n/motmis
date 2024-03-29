import Wrapper from '../assets/wrappers/SmallSidebar'
import { FaTimes } from "react-icons/fa";
import { useAppContext } from "../context/appContext";
import NavLinks from './NavLinks';

const SmallSidebar = () => {
    const { showSidebar, toggleSidebar } = useAppContext()
    return (
        <Wrapper>
            <div className={showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"}>
                <div className="content">
                    <button
                        type="button"
                        className='close-btn'
                        onClick={toggleSidebar}> {/*since we are not passing anything
                         in the function we don't need to set up the arrow function, we simply pas in the reference*/}
                        <FaTimes />
                    </button>
                    <header>
                        <h4>UAPMIS</h4>
                    </header>
                    <NavLinks toggleSidebar={toggleSidebar} />
                </div>
            </div>
        </Wrapper>
    )
}

export default SmallSidebar