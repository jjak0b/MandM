import InputSceneComponent from "../InputSceneComponent.js";

export default class ComponentPhoto extends InputSceneComponent {
    constructor(unparsed) {
        super(unparsed);
        this.props.accept = unparsed.props && unparsed.props.accept ? unparsed.props.accept : "image/*";
        this.props.capture = unparsed.props && unparsed.props.capture ? unparsed.props.capture : "enviroment";
    }

    duplicate(locales, activityCategory) {
        let duplicate = super.duplicate(locales, activityCategory);
        duplicate.props.accept = this.props.accept || "image/*" ;
        duplicate.props.capture = this.props.capture || "enviroment";
        return Object.setPrototypeOf( duplicate, ComponentPhoto.prototype );
    }
}