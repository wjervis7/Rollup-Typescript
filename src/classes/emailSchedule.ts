import { trimEnd, trimStart } from "../util/utilities";

const {
    activitySummaryConfig : {
        apiUri,
        endpoints
    }
} = configValues;

export class EmailSchedule {
    id!: number;
    name!: string;
    description!: string;
    daysOfWeek!: number;

    static async getEmailSchedules(): Promise<EmailSchedule[]> {
        const getEmailSchedulesUri = `${trimEnd(apiUri, "/")}/${trimStart(endpoints.getEmailSchedules, "/")}`;
        const getEmailSchedulesResponse = await fetch(getEmailSchedulesUri);
        if (!getEmailSchedulesResponse.ok) {
            throw "Nooooo";
        }
        const emailSchedules = await getEmailSchedulesResponse.json();
        return emailSchedules;
    }
}
