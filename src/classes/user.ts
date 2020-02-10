import { Subscription } from "./subscription";
import { formatString, trimEnd, trimStart } from "../util/utilities";

const {
    tenant,
    activitySummaryConfig : {
        apiUri,
        endpoints
    }
} = configValues;

export class User {
    id!: number;
    tenant!: string;
    firstName!: string;
    middleInitial!: string;
    lastName!: string;
    email!: string;
    daysOfWeek!: number;
    subscriptions!: Subscription[];

    async updatePreferences(): Promise<void> {
        const endpoint = formatString(endpoints.updateUserPreferences, { tenant: this.tenant, id: this.id });
        const updatePreferencesUri = `${trimEnd(apiUri, "/")}/${trimStart(endpoint, "/")}`;
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                daysOfWeek: this.daysOfWeek,
                subscriptions: this.subscriptions
            })
        };
        const updatePreferencesResponse = await fetch(updatePreferencesUri, requestOptions);
        if (!updatePreferencesResponse.ok) {
            throw "Nooooo";
        }
    }

    static async getUsers(): Promise<User[]> {
        const endpoint = formatString(endpoints.getUsers, { tenant });
        const getUsersUri = `${trimEnd(apiUri, "/")}/${trimStart(endpoint, "/")}`;
        const getUsersResponse = await fetch(getUsersUri);
        if (!getUsersResponse.ok) {
            throw "Nooooo";
        }
        const users = await getUsersResponse.json();
        return users;
    }

    static async getUser(id: number): Promise<User> {
        const endpoint = formatString(endpoints.getUser, { tenant, id });
        const getUserUri = `${trimEnd(apiUri, "/")}/${trimStart(endpoint, "/")}`;
        const getUserResponse = await fetch(getUserUri);
        if (!getUserResponse.ok) {
            throw "Nooooo";
        }

        const user = await getUserResponse.json();
        return user;
    }
}
