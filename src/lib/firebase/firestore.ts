import { collection, getDocs } from "firebase/firestore";
import { db } from "./clientApp";

/**
 * Retrieves all issues from the "issues" collection in the Firestore.
 *
 * @throws If there is an error when retrieving the issues from Firestore.
 *
 * @returns An array of all issues in the Firestore.
 */
export async function getIssues() {
    try {
        const issuesSnapshot = await getDocs(collection(db, "issues"));
        const issues = issuesSnapshot.docs.map((doc) => doc.data());

        return issues;
    } catch (error) {
        console.error("There was an error retrieving the issues: ", error);
        throw error;
    }
}