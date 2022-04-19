import NavbarWrapper from '../assets/wrappers/Menu'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/appContext'

const Menu = () => {
    const { isMember, toggleIsMember } = useAppContext()
    return (
        <NavbarWrapper>
            <div className="nav-center">
                <div className='spacer'>
                    <Link to='/' style={{ color: 'inherit', textDecoration: 'inherit' }} className='btn-hero'>
                        UAPMIS
                    </Link>
                </div>
                <div className='spacer'>
                    <Link to='/map' style={{ color: 'inherit', textDecoration: 'inherit' }} className='btn-hero'>
                        Map
                    </Link>
                </div>
                <div>
                    <Link onClick={() => toggleIsMember(true)} to="/register" style={{ color: 'inherit', textDecoration: 'inherit' }} className='btn-hero'>
                        Log in
                    </Link>
                </div>
                <div>
                    <Link onClick={() => toggleIsMember(false)} to='/register' className='btn btn-hero'>
                        Register
                    </Link>
                </div>

            </div>
        </NavbarWrapper>
    )
}

export default Menu