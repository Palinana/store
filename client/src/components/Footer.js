import React from 'react'

export default (props) => {
    return(
        <footer>
            <div className="row">
                <div class="col">
                    <p class="pull-left muted credit">Nova</p>
                    <p class="pull-right muted credit">©{(new Date()).getFullYear()} • Nova Inc. All rights reserved.</p>
                </div>   
                <div class="col-6">
                    <p>45 Main Street New York, NY</p>
                    <p>info.contactnova@gmail.com</p>
                    <p>555-123-4567</p>
                </div> 
                <div class="col-md-auto">
                    <ul class="footer-nav">
                    <li> <a href="https://www.facebook.com/"> Facebook </a> </li>
                    <li> <a href="https://twitter.com/"> Twitter </a> </li>
                    <li> <a href="https://plus.google.com/"> Google+ </a> </li>
                </ul>
                </div>
            </div>
        </footer>
    )
}