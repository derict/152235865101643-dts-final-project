import { IconArrowLeft } from "@tabler/icons"
import { Button, Container, Image } from "react-bootstrap"
import { Link } from "react-router-dom"
import boxlogo from '../img/box.gif'

const PageSos = () => {
    return (
        <>
            <div className="page-center page">
                <Container variant='xl' className="py4">
                    <div className="empty">
                        <div className="empty-header">
                            <Image src={boxlogo} roundedCircle/>
                        </div>
                        <div className="empty-title">Oops... You just found an error page</div>
                        <div className="empty-subtitle text-muted">We are Sorry but the page you are looking for was not found</div>
                        <div className="empty-action">
                            <Link to='/'>
                                <Button>
                                    <IconArrowLeft />Take Me Home
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default PageSos