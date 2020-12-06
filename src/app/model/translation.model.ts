export class TranslationModel {
    lang: string;
    json: any;

    constructor(obj?: { lang: string, json: any }) {
        this.lang = obj ? obj.lang : '';
        this.json = obj ? obj.json : null;
    }
}