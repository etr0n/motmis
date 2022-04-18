import main from '../assets/images/main.svg'
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from '../components';
import Menu from './../components/Menu';

const Landing = () => {
    return (
        <>
            <Menu />
            <Wrapper>
                <div className="container page">
                    {/* info */}
                    <div className='info'>
                        <h1>
                            Urban Air Pollution Monitoring Information System
                        </h1>
                        <p>
                            I'm baby wolf unicorn farm-to-table, cliche hashtag twee taiyaki snackwave schlitz
                            fingerstache glossier. Listicle etsy pickled waistcoat messenger bag freegan affogato
                            migas fanny pack artisan prism small batch copper mug. Scenester snackwave raclette
                            celiac bespoke, keytar hashtag shaman slow-carb farm-to-table ugh fashion axe hella
                            meditation.
                        </p>
                    </div>
                    <img src={main} alt="Environment" className='img main-img' />
                </div>
            </Wrapper >
        </>
    )
}

export default Landing