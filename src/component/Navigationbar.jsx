import { Container, Nav, Navbar, NavbarBrand, NavDropdown, NavLink } from "react-bootstrap"
import { IconChartBubble, IconLogout, IconUserCircle, IconUserOff, IconUserPlus } from '@tabler/icons'
import { useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useState } from "react"
import Login from "../container/Login"
import Register from "../container/Register"

const Navigationbar = () => {
    const [user] = useAuthState(auth)

    const [showLogin, setShowLogin] = useState(false)
    const [showRegister, setShowRegister] = useState(false)

    const navigate = useNavigate()

    const onLogout = async () => {
        try {
            await signOut(auth)
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Navbar className="navbar-expand-md navbar-dark sticky-top d-print-none">
                <Container variant='xl'>
                    <NavbarBrand className="navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
                        <NavLink>
                            <span className="nav-link-icon d-md-none d-lg-inline-block">
                                <IconChartBubble />
                            </span>
                            <span className="nav-link-title">Network Monitoring</span>
                        </NavLink>
                    </NavbarBrand>
                    <Nav className='flex-row'>
                        <Nav.Item></Nav.Item>
                    </Nav>
                    <Nav className='flex-row order-md-last'>
                        <NavDropdown
                            title={user ? <IconUserCircle /> : <IconUserOff />}
                            align='end'
                        >
                            <NavDropdown.Header>Welcome</NavDropdown.Header>
                            <NavDropdown.Item>
                                {user ? <IconUserCircle /> : <IconUserOff />}
                                <div className="d-none d-xl-block ps-2">
                                    <div>{user ? (auth.currentUser.displayName) : 'Guest'}</div>
                                </div>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            {
                                user ?
                                <></>
                                :
                                <NavDropdown.Item onClick={() => setShowRegister(true)}>
                                    <IconUserPlus />
                                    <div className="d-none d-xl-block ps-2">Register</div>
                                </NavDropdown.Item>
                            }
                            <NavDropdown.Item onClick={user ? onLogout : () => setShowLogin(true)}>
                                <IconLogout
                                    color='grey'
                                />
                                <div className="d-none d-xl-block ps-2">{user ? 'Logout' : 'Login'}</div>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>
            <Register
                show={showRegister}
                onHide={() => setShowRegister(false)}
            />
            <Login
                show={showLogin}
                onHide={() => setShowLogin(false)}
            />
        </>
    )
}

export default Navigationbar