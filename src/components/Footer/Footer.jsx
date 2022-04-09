import './Footer.css'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__container__left">
                    <div className="footer__container__left__logo">logo
                        {/* <img src={logo} alt="logo" /> */}
                    </div>
                    <div className="footer__container__left__text">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Pellentesque euismod, urna eu tincidunt consectetur,
                            nisi nisl tincidunt nisi, eget consectetur nisl nisi
                            vitae nisl.
                        </p>
                    </div>
                </div>
                <div className="footer__container__right">
                    <div className="footer__container__right__text">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Pellentesque euismod, urna eu tincidunt consectetur,
                            nisi nisl tincidunt nisi, eget consectetur nisl nisi
                            vitae nisl.
                        </p>
                    </div>
                    <div className="footer__container__right__links">
                        <div className="footer__container__right__links__item">
                            {/* <a href="#">facebook
                                <img src={facebook} alt="facebook" />
                            </a> */}
                        </div>
                        <div className="footer__container__right__links__item">
                            {/* <a href="#">twitter
                                <img src={twitter} alt="twitter" />
                            </a> */}
                        </div>
                        <div className="footer__container__right__links__item">
                            {/* <a href="#">instagram
                                <img src={instagram} alt="instagram" />
                            </a> */}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}