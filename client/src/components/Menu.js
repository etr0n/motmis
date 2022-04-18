import NavbarWrapper from '../assets/wrappers/Menu'
import { Link } from 'react-router-dom'

const Menu = () => {
    return (
        <NavbarWrapper>
            <div className="nav-center">
                <Link to='#' className='btn-hero'>
                    UAPMIS
                </Link>
                <div>
                    <Link to='/map' className='btn-hero'>
                        Map
                    </Link>
                </div>

                <div className='spacer'>
                    <Link to="/register" className='btn-hero login'>
                        Log in
                    </Link>
                </div>
                <div className='user-menu'>
                    <Link to='/register' className='btn btn-hero'>
                        Register
                    </Link>
                </div>

            </div>
        </NavbarWrapper>
    )
}

export default Menu