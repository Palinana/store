import React from 'react';

export default () => {
    return(
        <footer>
            <div className="row footer-box">
                <div className="col-xs-12 col-sm-4 col-lg-3 footer-box__logo">
                    <p className="pull-left muted credit footer-logo">Nova</p>
                    <p className="pull-right muted credit footer-rights">©{(new Date()).getFullYear()} • Nova Inc. All rights reserved.</p>
                </div>   
                <div className="col-xs-12 col-sm-4 col-lg-6 footer-box__address">
                    <ul className="footer-box__address-info">
                        <li>45 Main Street New York, NY</li>
                        <li>info.contactnova@gmail.com</li>
                        <li>555-123-4567</li>
                    </ul>
                </div> 
                <div className="col-xs-12 col-sm-4 col-lg-3 footer-box__social">
                    <ul className="footer-nav">
                        <li className="footer-nav__item"><a href="https://www.facebook.com/">
                            <svg className="footer-social__icon">
                                <use xlinkHref="/images/sprite.svg#icon-facebook-with-circle"></use>
                            </svg>
                        </a></li>
                        <li className="footer-nav__item"><a href="https://twitter.com/">
                            <svg className="footer-social__icon">
                                <use xlinkHref="/images/sprite.svg#icon-instagram-with-circle"></use>
                            </svg>
                        </a></li>
                        <li className="footer-nav__item"><a href="https://plus.google.com/">
                            <svg className="footer-social__icon">
                                <use xlinkHref="/images/sprite.svg#icon-twitter-with-circle"></use>
                            </svg>
                        </a></li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}