import { IconBrandGoogle } from "@tabler/icons"
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth"
import { useState } from "react"
import { Button, Col, Form, Modal, Row } from "react-bootstrap"
import { auth } from "../config/firebase"


const Register = ({ show, onHide }) => {
    const [errMessage, setErrMessage] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const username = data.get('username')
        const email = data.get('email')
        const password = data.get('passwd')

        try {
            await createUserWithEmailAndPassword(auth, email, password)
            const loginUser = getAuth()
            await updateProfile(loginUser.currentUser, {
                displayName: username
            })
            onHide(true)
        } catch (err) {
            setErrMessage(err.message)
        }
    }

    const handleGoogle = async () => {
        const provider = new GoogleAuthProvider()
        const authGoogle = getAuth()
        try {
            await signInWithPopup(authGoogle, provider)
            onHide(true)
        } catch (err) {
            setErrMessage(err.message.replace('Firebase: ', ''))
        }
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <div className='modal-status bg-success'></div>
            <Modal.Header>
                <Modal.Title>Register</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Form onSubmit={handleSubmit}>
                        <Col lg={12}>
                            <Form.Label>Username</Form.Label>
                            <input name="username" type="text" className="form-control" placeholder="Username" required autoFocus />
                        </Col>
                        <Col lg={12} className='mt-3'>
                            <Form.Label>Email</Form.Label>
                            <input name="email" type="text" className="form-control" placeholder="Email" required />
                        </Col>
                        <Col lg={12} className='mt-3'>
                            <Form.Label>Password</Form.Label>
                            <input name="passwd" type="password" className="form-control" placeholder="Password" required />
                        </Col>
                        <Col lg={12} className='mt-3'>
                            <button type="submit" className="btn btn-primary w-100">Register</button>
                        </Col>
                    </Form>
                    <Col lg={12} className='text-center mt-3 bg-red-lt'>
                        {errMessage}
                    </Col>
                    <Col lg={12}>
                        <div className="hr-text">or</div>
                    </Col>
                    <Col lg={12}>
                        <Button variant='light' className='w-100' onClick={handleGoogle}>
                            <IconBrandGoogle />Login with Google
                        </Button>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    )
}

export default Register