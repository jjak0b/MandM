import SceneComponent from "../SceneComponent.js";

export default class ComponentPhoto extends SceneComponent {
    constructor(unparsed) {
        super(unparsed);
        this.props.type = unparsed.props && unparsed.props.type ? unparsed.props.type : 'image/*';
        this.props.cap = unparsed.props.type && unparsed.props.cap ? unparsed.props.cap : "enviroment";
    }


}