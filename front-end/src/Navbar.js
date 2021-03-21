import './Navbar.css'
import HamburgerSignedIn from './HamburgerSignedIn'
import HamburgerNotSignedIn from './HamburgerNotSignedIn'
// Bootstrap Imports

// props.signedIn -- Whether or user is signed in or not in ordet to display the proper hamburger menu and signin/signout options
const Navbar = (props) => {

    // Determine what shows up for navbar sign in/create account buttons
    let hamburgerMenu = <HamburgerNotSignedIn />
    if(props.signedIn === "true") {
        hamburgerMenu = <HamburgerSignedIn />
    }
    
    return (
        <nav className="navbar-expand-lg rbxNavStyles">
            <div className="container-fluid">
                {/* Navbar header of logo and hamburger menu*/}
                {hamburgerMenu}
            </div>

        </nav>
    )
}

export default Navbar