import { Col, Container, Row } from "react-bootstrap"


const Footerbar = () => {
    return(
        <footer className="footer footer-transparent d-print-none">
          <Container variant='xl'>
            <Row className="text-center align-items-center flex-row-reverse">
              <Col lg='auto' className="ms-lg-auto">
                <ul className="list-inline list-inline-dots mb-0">
                  <li className="list-inline-item"><a target="_blank" rel="noreferrer" href="https://github.com/derict/152235865101643-dts-final-project.git" className="link-secondary">Source code</a></li>
                </ul>
              </Col>
              <Col xs={12} lg='auto' className="mt-3 mt-lg-0">
                <ul className="list-inline list-inline-dots mb-0">
                  <li className="list-inline-item">derict © 2022</li>
                </ul>
              </Col>
            </Row>
          </Container>
        </footer>
    )
}

export default Footerbar