import { AddIssuePayload, DeleteIssuePayload, EditIssuePayload } from "../types/issues.types";

class IssueService {
    async getIssues() {
        try {

        } catch (error) {

        }
    }

    async getIssuesByYear(year: number) {
        try {

        } catch (error) {

        }
    }

    async createIssue({ title, publisher, publicationYear, volume, issueNumber, category, thumbnailLink, pdfLink }: AddIssuePayload) {
        try {

        } catch (error) {

        }
    }

    async editIssue({ id, title, publisher, publicationYear, volume, issueNumber, category, thumbnailLink, pdfLink }: EditIssuePayload) {
        try {

        } catch (error) {

        }
    }

    async deleteIssue({ id }: DeleteIssuePayload) {
        try {

        } catch (error) {

        }
    }
}

export default IssueService;