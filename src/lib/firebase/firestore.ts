import { collection, getDocs } from "firebase/firestore";
import { db } from "./clientApp";

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Retrieves all issues from the "issues" collection in the Firestore.
 *
 * @throws If there is an error when retrieving the issues from Firestore.
 *
 * @returns An array of all issues in the Firestore.
 */
/******  00cc534f-5b7e-479c-9713-2cbce2538f9e  *******/
export async function getIssues() {
    try {
        console.log(db)
        const issuesSnapshot = await getDocs(collection(db, "issues"));
        const issues = issuesSnapshot.docs.map((doc) => doc.data());

        return issues;
    } catch (error) {
        console.error("There was an error retrieving the issues: ", error);
        throw error;
    }
}