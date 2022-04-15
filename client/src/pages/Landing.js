import main from '../assets/images/main.svg'
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from '../components';
import { Link } from 'react-router-dom'


const Landing = () => {
    return (
        <Wrapper>
            <nav>
                <Logo />
            </nav>
            <div className="container page">
                {/* info */}
                <div className='info'>
                    <h1>
                        Miesto <span>oro taršos</span> monitoringo informacinė sistema
                    </h1>
                    <p>
                        I'm baby wolf unicorn farm-to-table, cliche hashtag twee taiyaki snackwave schlitz
                        fingerstache glossier. Listicle etsy pickled waistcoat messenger bag freegan affogato
                        migas fanny pack artisan prism small batch copper mug. Scenester snackwave raclette
                        celiac bespoke, keytar hashtag shaman slow-carb farm-to-table ugh fashion axe hella
                        meditation.
                    </p>
                    <Link to='/register' className='btn btn-hero'>
                        Login/Register
                    </Link>
                </div>
                <img src={main} alt="Environment" className='img main-img' />
            </div>
        </Wrapper>
    )
}

export default Landing