interface UserProfileConfig {
    tenant: string;
    userId: number;
    activitySummaryConfig: ActivitySummaryConfig;
}

interface ActivitySummaryConfig {
    apiUri: string;
    endpoints: ActivitySummaryEndpoints;
}

interface ActivitySummaryEndpoints {
    getEmailSchedules: string;
    getSubscriptions: string;
    getUsers: string;
    getUser: string;
    updateUserPreferences: string;
}

declare let configValues: UserProfileConfig;