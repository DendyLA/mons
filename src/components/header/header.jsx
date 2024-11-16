import './header.scss'
//photo
import logo from '../../assets/logo.svg'

function Header(){

    return(
        <header className="header">
            <div className="container">
                <div className="header__wrapper">
                    <img src={logo} alt="logo" className="header__logo" />
                    <nav>
                        <ul className="header__nav">
                            <a href="">
                                <li className="header__item">проекты</li>
                            </a>
                            <a href="">
                                <li className="header__item">о нас</li>
                            </a>
                            <a href="">
                                <li className="header__item">контакты</li>
                            </a>
                        </ul>
                    </nav>
                    <a href=""><div className="header__contact">связаться</div></a>
                </div>
            </div>
        </header>
    )
}

export default Header;