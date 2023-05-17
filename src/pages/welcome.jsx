import { Link } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

export default function Welcome() {

    const [user] = useAuthState(auth);

    return (
        <>
            <main className="bg-slate-600 h-screen flex justify-center items-center flex-col">
                <h1 className="text-slate-50">Welcome {user?.email}</h1>
                <Link to='/' className="text-amber-400" onClick={() => signOut(auth)} >Logout</Link>
            </main>
        </>
    )
}