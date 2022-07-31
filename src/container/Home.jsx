import { Container } from "react-bootstrap"

const Home = () => {
    return (
        <div className="page-body">
            <Container variant='xl' className="d-flex flex-column justify-content-center">
                <div>
                    <p className="empty-title">No Result Found</p>
                </div>
            </Container>
        </div>
    )
}

export default Home