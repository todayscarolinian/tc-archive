import { collection, getDocs, query, where } from "firebase/firestore";
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
        const documentIssues = issuesSnapshot.docs.map((doc) => {
            return {
                ...doc.data(),
                id: doc.id
            }
        });

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

/**
 * Retrieves all issues from the "issues" collection in the Firestore where "year" == year.
 *
 * @param year - The year of issue/s.
 * 
 * @throws If there is an error when retrieving the issues from Firestore.
 * 
 * @returns An array of all issues in the Firestore in that year.
 */
export async function getIssuesByYear(year: number): Promise<EditIssuePayload[]> {
    try {
        const q = query(
            collection(db, "issues"),
            where("publicationYear", "==", year)
        );

        const issuesSnapshot = await getDocs(q);
        const documentIssues = issuesSnapshot.docs.map((doc) => {
            return {
                ...doc.data(),
                id: doc.id
            }
        });

        const issues: EditIssuePayload[] = documentIssues
            .map((issue) => {
                const parsed = EditIssueSchema.safeParse(issue);
                return parsed.success ? parsed.data : null;
            })
            .filter((issue): issue is EditIssuePayload => issue !== null);

        return issues;
    }
    catch (error) {
        console.error("There was an error retrieving the issues: ", error);
        throw error;
    }
}

