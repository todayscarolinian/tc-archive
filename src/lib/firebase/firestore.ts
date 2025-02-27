import { collection, getDocs } from "firebase/firestore";
import { db } from "./clientApp";
import { EditIssuePayload, EditIssueSchema } from "../types/issues.types";


/**
 * Retrieves all issues from the Firestore database.
 *
 * @returns A promise that resolves to an array of {@link EditIssuePayload} objects, or rejects with an error if there was a problem fetching the issues.
 */
export async function getIssues(): Promise<EditIssuePayload[]> {
    try {
        const issuesSnapshot = await getDocs(collection(db, "issues"));
        const documentIssues = issuesSnapshot.docs.map((doc) => doc.data());

        // Convert DocumentData[] to EditIssuePayload[]
        const issues: EditIssuePayload[] = documentIssues
            .map((issue) => {
                const parsed = EditIssueSchema.safeParse(issue);
                return parsed.success ? parsed.data : null;
            })
            .filter((issue): issue is EditIssuePayload => issue !== null);

        return issues;
    } catch (error) {
        console.error("There was an error retrieving the issues: ", error);
        throw error;
    }
}