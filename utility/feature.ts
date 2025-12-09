export class Feature {
    private _name: string;
    private _view: string;

    constructor(name: string, view?: string) {
        this._name = name ?? '';
        this._view = view ?? 'home';
    }

    public get name() {
        return this._name;
    }

    public get view() {
        return this._view;
    }
}
