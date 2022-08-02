import { IconBrandGoogle, IconUserCircle } from '@tabler/icons'

import { useState } from 'react'

import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth } from "../config/firebase"
import { Modal } from 'react-bootstrap'

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
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <div className='page page-center' style={{ minHeight: '70vh' }}>
                <div className='container-tight py-4'>
                    <div className='text-center mb-4'>
                        <IconUserCircle
                            color="#206bc4"
                            style={{ width: 140, height: 140 }}
                        />
                    </div>
                    <form className="card card-md" onSubmit={handleSubmit}>
                        <div className="card-body">
                            <div className="card-title text-center mb-4">Login to your account</div>
                            <div className="mb-3">
                                <label className="form-label">Username</label>
                                <input name="email" type="text" className="form-control" placeholder="Email" required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input name="passwd" type="password" className="form-control" placeholder="Password" required />
                            </div>
                            <div className='text-center'><span className='bg-red-lt'>{errMessage}</span></div>
                            <div className="form-footer">
                                <button type="submit" className="btn btn-primary w-100">Login</button>
                            </div>
                            <div className="hr-text">or</div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col btn btn-white w-100" onClick={handleGoogle}>
                                        <IconBrandGoogle />
                                        Login with Google
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="text-center text-muted mt-3">
                        Don't have account yet? <a href="/register">Register</a>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default Login