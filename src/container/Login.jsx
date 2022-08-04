import { IconBrandGoogle } from '@tabler/icons'

import { useState } from 'react'

import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth } from "../config/firebase"
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'

const Login = ({ show, onHide }) => {
    const [errMessage, setErrMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const email = data.get('email')
        const passwd = data.get('passwd')
        try {
            await signInWithEmailAndPassword(auth, email, passwd)
            onHide(true)
        } catch (err) {
            setErrMessage(err.message.replace('Firebase: ', ''))
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
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Form onSubmit={handleSubmit}>
                        <Col lg={12}>
                            <Form.Label>Username</Form.Label>
                            <input name="email" type="text" className="form-control" placeholder="Email" required autoFocus />
                        </Col>
                        <Col lg={12} className='mt-3'>
                            <Form.Label>Password</Form.Label>
                            <input name="passwd" type="password" className="form-control" placeholder="Password" required />
                        </Col>
                        <Col lg={12} className='mt-3'>
                            <button type="submit" className="btn btn-primary w-100">Login</button>
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

export default Login