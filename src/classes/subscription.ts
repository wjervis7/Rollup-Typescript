import { trimEnd, trimStart } from "../util/utilities";

const {
    activitySummaryConfig : {
        apiUri,
        endpoints
    }
} = configValues;

export class Subscription {
    id!: number;
    name!: string;
    description!: string;

    static async getSubscriptions(): Promise<Subscription[]> {
        const getSubscriptionsUri = `${trimEnd(apiUri, "/")}/${trimStart(endpoints.getSubscriptions, "/")}`;
        const getSubscriptionsResponse = await fetch(getSubscriptionsUri);
        if (!getSubscriptionsResponse.ok) {
            throw "Nooooo";
        }
        const subscriptions = await getSubscriptionsResponse.json();
        return subscriptions;
    }
}
