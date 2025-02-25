import {
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged as _onAuthStateChanged,
    NextOrObserver,
    User,
} from "firebase/auth";

import { auth } from "@/lib/firebase/clientApp";

/**
 * Subscribes to the authentication state changes of the user.
 *
 * @param cb - A callback function that gets called whenever the user's authentication state changes.
 *             It receives a `User` object if the user is signed in, or `null` if the user is signed out.
 * @returns A function that can be called to unsubscribe from the authentication state changes.
 */

export function onAuthStateChanged(cb: NextOrObserver<User>) {
    return _onAuthStateChanged(auth, cb);
}

/**
 * Initiates a Google sign-in process using a popup.
 *
 * This function uses the Firebase `signInWithPopup` method with a `GoogleAuthProvider`
 * to authenticate the user through Google. If the sign-in process is successful, the
 * user will be authenticated and their authentication state will be updated accordingly.
 *
 * @throws Will log an error to the console if the sign-in process fails.
 */

export async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    try {
        await signInWithPopup(auth, provider);
    } catch (error) {
        console.error("Error signing in with Google", error);
    }
}

/**
 * Signs the user out of Firebase authentication.
 *
 * This function uses the Firebase `signOut` method to sign the user out of the
 * authentication system. If the sign-out process is successful, the user's
 * authentication state will be updated accordingly.
 *
 * @throws Will log an error to the console if the sign-out process fails.
 */
export async function signOut() {
    try {
        return auth.signOut();
    } catch (error) {
        console.error("Error signing out with Google", error);
    }
}