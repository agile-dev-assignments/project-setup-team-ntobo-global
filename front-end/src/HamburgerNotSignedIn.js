import React from 'react'
import { slide as Menu } from 'react-burger-menu'
import './HamburgerNotSignedIn.css'

// Component for not signed-in hamburger menu
// Does not expect any argument for props
// Example: 
// <HamburgerNotSignedIn pageWrapId={ 'page-wrap' } outerContainerId={ 'outer-container' } />
const HamburgerNotSignedIn = (props) => {
    return (
        <div>
        <Menu>
            <a className='menuItem' href='/sign-in'>Sign In</a>
            <a className='menuItem' href='/create-account'>Create Account</a>
            <a className='menuItem' href='/browse-recipes'>Browse Recipes</a>
            <a className='menuItem' href='/browse-users'>Browse Users</a>
        </Menu>
        </div>
    )
}

export default HamburgerNotSignedIn