import {
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged as _onAuthStateChanged,
    NextOrObserver,
    User,
} from "firebase/auth";

import { auth, db } from "@/lib/firebase/clientApp";
import { collection, getDocs, query, where } from "firebase/firestore";
import { toast } from "sonner";

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
 * Signs the user in with Google.
 *
 * This function uses the Firebase `signInWithPopup` method to sign the user in
 * with a Google account. It will first prompt the user to select a Google
 * account to sign in with, and then validate the user's email address against
 * the list of authorized emails in the Firestore users collection. If the
 * email is valid, the user will be signed in; otherwise, the user will be
 * signed out and an error toast will be displayed.
 *
 * @throws Will log an error to the console if the sign-in process fails.
 */
export async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    try {
        const { user } = await signInWithPopup(auth, provider);

        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", user.email))
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            toast.error("Access denied: Unauthorized email", { duration: 5000 });
            await signOut();
        } else {
            toast.success("Successfully signed in", { duration: 5000 });
        }
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