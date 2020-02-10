import { BaseKnockoutModel } from "./util/knockout";
import { User } from "./classes/user";
import { EmailSchedule } from "./classes/emailSchedule";
import { Subscription } from "./classes/subscription";

const {userId} = configValues;

class PreferenceViewModel extends BaseKnockoutModel {
    user!: KnockoutObservable<User>;
    emailSchedules!: EmailSchedule[];
    subscriptions!: Subscription[];
    isDirty: KnockoutObservable<boolean>;
    isSubmitting: boolean;

    constructor() {
        super();
        this.isDirty = ko.observable(false);
        this.isSubmitting = false;
    }

    applyBinding(id: string): void {
        super.apply(this, id);
    }

    async getData(): Promise<void> {

        const promises: [Promise<User>, Promise<EmailSchedule[]>, Promise<Subscription[]>] = [
            User.getUser(userId),
            EmailSchedule.getEmailSchedules(),
            Subscription.getSubscriptions()
        ];

        const [u, es, s] = await Promise.all<User, EmailSchedule[], Subscription[]>(promises);
        this.user = ko.observable(u);
        this.emailSchedules = es;
        this.subscriptions = s;
    }

    async updatePreferences(): Promise<void> {
        await this.user().updatePreferences();
        this.isDirty(false);
    }

    test(): void {
        console.info(this.user);
        console.info(this.isDirty());
    }

    dirty = (): void => {
        this.isDirty(true);
    };

    submit = async (): Promise<void> => {
        if (this.isSubmitting) {
            return;
        }
        this.isSubmitting = true;
        if (!this.validate()) {
            this.isSubmitting = false;
            return;
        }

        try {
            await this.user().updatePreferences();
        } catch (e) {
            console.error(e);
        }
        this.isSubmitting = false;
    };

    private validate = (): boolean => this.user().daysOfWeek >= 0;
}

(async(): Promise<void> => {
    const model = new PreferenceViewModel();
    await model.getData();
    model.applyBinding("ActivitySummaryPreferences");
})();
