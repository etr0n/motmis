import Wrapper from '../../src/assets/wrappers/MapSidebar'
import { useAppContext } from "../context/appContext";
const MapSidebar = () => {
    const { showMapSidebar, toggleMapSidebar } = useAppContext()
    return (
        <Wrapper>
            <div className={showMapSidebar ? 'sidebar-container' : 'sidebar-container show-sidebar'}>
                <div className="content">
                    <header>
                        <h4>SIDEBAR FOR SENSOR DATA</h4>
                        <button
                            type="button"
                            className='toggle-btn'
                            onClick={toggleMapSidebar}
                        >
                            Close
                        </button>
                    </header>

                </div>
            </div>
        </Wrapper>
    )
}

export default MapSidebar