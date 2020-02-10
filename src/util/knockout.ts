export abstract class BaseKnockoutModel {
    protected apply(object: object, id: string): void {
        ko.applyBindings(object, document.getElementById(id));
    }
}
