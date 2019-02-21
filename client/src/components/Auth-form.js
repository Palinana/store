import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { auth } from '../store'

const AuthForm = (props) => {
  const {name, displayName, handleSubmit, error} = props
  console.log('this.props.location.state', props.location.state)
  return (
    <div className='container d-flex justify-content-center align-items-center'>
        <div className="col-lg-5 container-form">
            <div className="jumbotron">
                <h3 className="text-center container-form__name">{displayName}</h3>
                <br/>
                <form onSubmit={handleSubmit} name={name}>
                    <div className="form-group input-group" id="user-field">
                        <span className="input-group-addon">
                            <svg className="cart__icon user-icon">
                              <use xlinkHref="/images/sprite.svg#icon-user"></use>
                            </svg>
                        </span>
                        <input className="form-control form__input"  name="email" type="text" placeholder="Email"/>
                    </div>


                    <div className="form-group input-group">
                        <span className="input-group-addon">
                            <svg className="cart__icon user-icon">
                                <use xlinkHref="/images/sprite.svg#icon-key"></use>
                            </svg>
                        </span>
                        <input className="form-control form__input" name="password" type="password" placeholder="Password"/>
                    </div>

                    <div className="form-btn">
                        <button className="form-btn__auth" type="submit">{displayName}</button>
                    </div>
                    {error && error.response && <div> {error.response.data} </div>}
                </form>
          </div>
        </div>
    </div>
  )
}

const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)


AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}