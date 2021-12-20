import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from '@firebase/auth';
import React, { useState } from 'react'
import { auth } from '../firebase-config';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function Register({user, setUser}) {

    const [toggleRegister, setToggleSetRegister] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const provider = new GoogleAuthProvider();

    
     

    const signInWithGoogle = () => {
       signInWithPopup(auth, provider);
    }


    onAuthStateChanged(auth, (currentUser)=>{
        setUser(currentUser);
    })

    const register = async(e) => {
        e.preventDefault();
        try{
            const user = await createUserWithEmailAndPassword(auth, email, password);
            setEmail("");
            setPassword("");
        }catch(error){
           // alert(error.message);
           const notify = () => toast.error("This email is already used !",{
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,});
            notify();
             
        }
        
    }

    const login = async(e) => {
        e.preventDefault();
        try{
            const user = await signInWithEmailAndPassword(auth, email, password);
            setEmail("");
            setPassword("");
        }catch(error){
            const notify = () => toast.error("Wrong email or password !",{
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,});
                notify();
        }
    }

    const logout = async(e) => {
        e.preventDefault();
        await signOut(auth);
    }

    if(user){
        return null;
    }

    else{
        return (
            <div className="register-container">
                {toggleRegister?<h2 className="sign-up-h2">Login</h2>:<h2 className="sign-up-h2">Register</h2>}
    
                <div className="google-button" onClick={signInWithGoogle}>
                <ToastContainer />
                    <div className="logo-container">
                        <img src="/images/google-logo.png" alt="google" className="google-logo"/>
                    </div>
                    <p>Sign up with Google</p>
                </div>
    
                <div className="email-signup-container">
                    <div className="line"></div>
                    <p>OR SIGN UP WITH EMAIL</p>
                    <div className="line"></div>
                </div>
    
                <form className="register-form">
                    <label for="registerEmail">Email Address</label>
                    <input type="email" placeholder="Enter your email..." id="registerEmail"  onChange={(e)=>setEmail(e.target.value)} />
                    <label for="registerPassword">Password</label>
                    <input type="password" placeholder="Enter password..." id="registerPassword" onChange={(e)=>setPassword(e.target.value)}/>
                    {toggleRegister?<button className="register-submit" onClick={login}>Login</button>:<button className="register-submit" onClick={register}>Register</button>}
                </form>
    
                <p className="toggle-text" onClick={()=>setToggleSetRegister(!toggleRegister)}>{toggleRegister?"You do not have an account yet? Register here":"You already have an account? Login here..."}</p>
    
            </div>
        )
    }


   
}


export default Register
