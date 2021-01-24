import SceneComponent from "../SceneComponent.js";

export default class ComponentQRDecoder extends SceneComponent {
    constructor(unparsed) {
        super(unparsed);
        this.props.label = unparsed && unparsed.props.label ? unparsed.props.label : this.i18nCategory + ".label";
        this.props.errorMessage = unparsed && unparsed.props.errorMessage ? unparsed.props.errorMessage : {
            id: null,
            title: this.i18nCategory + ".error.title",
            body: this.i18nCategory + ".error.body"
        }
    }

    duplicate(localeLabels, i18nCategoryPrefix) {
        let duplicate = super.duplicate(i18nCategoryPrefix);
        duplicate.props.label = duplicate.i18nCategory + ".label";
        duplicate.props.errorMessage = {
            id: this.props.errorMessage.id,
            title: duplicate.i18nCategory + ".error.title",
            body: duplicate.i18nCategory + ".error.body"
        };
        localeLabels.push(
            [
                this.props.label,
                duplicate.props.label
            ],
            [
                this.props.errorMessage.title,
                duplicate.props.errorMessage.title
            ],
            [
                this.props.errorMessage.body,
                duplicate.props.errorMessage.body
            ]
        );

        return Object.setPrototypeOf( duplicate, ComponentQRDecoder.prototype );
    }

}