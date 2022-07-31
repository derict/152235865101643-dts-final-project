import { IconBrandGoogle, IconUserPlus } from "@tabler/icons"
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { auth } from "../config/firebase"


const Register = () => {
    const navigate = useNavigate()
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
            navigate('/')
        } catch (err) {
            setErrMessage(err.message)
        }
    }

    const handleGoogle = async () => {
        const provider = new GoogleAuthProvider()
        const authGoogle = getAuth()
        try {
            await signInWithPopup(authGoogle, provider)
            navigate('/')
        } catch (err) {
            setErrMessage(err.message.replace('Firebase: ', ''))
        }
    }

    return (
        <div className='page page-center' style={{ minHeight: '70vh' }}>
            <div className='container-tight py-4'>
                <div className='text-center mb-4'>
                    <IconUserPlus
                        color="#206bc4"
                        style={{ width: 140, height: 140 }}
                    />
                </div>
                <form className="card card-md" onSubmit={handleSubmit}>
                    <div className="card-body">
                        <div className="card-title text-center mb-4">Create New Account</div>
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input name="username" type="text" className="form-control" placeholder="Username" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input name="email" type="text" className="form-control" placeholder="Email" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input name="passwd" type="password" className="form-control" placeholder="Password" required />
                        </div>
                        <div className='text-center'><span className='bg-red-lt'>{errMessage}</span></div>
                        <div className="form-footer">
                            <button type="submit" className="btn btn-primary w-100">Register</button>
                        </div>
                        <div className="hr-text">or</div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col btn btn-white w-100" onClick={handleGoogle}>
                                    <IconBrandGoogle />
                                    Register with Google
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="text-center text-muted mt-3">
                    Already have account? <a href="/login">Login</a>
                </div>
            </div>
        </div>
    )
}

export default Register