import { Container, Nav, Navbar, NavbarBrand, NavDropdown, NavLink } from "react-bootstrap"
import { IconApps, IconChartBubble, IconDeviceDesktopAnalytics, IconLogout, IconUserCircle, IconUserOff } from '@tabler/icons'
import { useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useState } from "react"
import Login from "../container/Login"

const Navigationbar = () => {
    const [user] = useAuthState(auth)

    const [modalShow, setModalShow] = useState(false)

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
                    <Nav className='flex-row order-md-last'>
                        <NavDropdown
                            title={user ? <IconUserCircle /> : <IconUserOff />}
                            align='end'
                        >
                            <NavDropdown.Header>Level:</NavDropdown.Header>
                            <NavDropdown.Item>
                                {user ? <IconUserCircle /> : <IconUserOff />}
                                <div className="d-none d-xl-block ps-2">
                                    <div>{user ? (auth.currentUser.displayName) : 'Guest'}</div>
                                </div>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={user ? onLogout : () => setModalShow(true)}>
                                <IconLogout
                                    color='grey'
                                />
                                <div className="d-none d-xl-block ps-2">{user ? 'Logout' : 'Login'}</div>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav className="d-flex flex-column flex-md-row flex-fill align-items-stretch align-items-md-center">
                        <NavLink>
                            <span className="nav-link-icon d-md-none d-lg-inline-block">
                                <IconDeviceDesktopAnalytics />
                            </span>
                            <span className="nav-link-title">Monitoring</span>
                        </NavLink>
                        <NavDropdown title={
                            <>
                                <span className="nav-link-icon d-md-none d-lg-inline-block">
                                    <IconApps />
                                </span>
                                <span className="nav-link-title">Administration</span>
                            </>
                        }>
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>
            <Login
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    )
}

export default Navigationbar