import SceneComponent from "../SceneComponent.js";

export default class ComponentQRDecoder extends SceneComponent {
    constructor(unparsed) {
        super(unparsed);
        this.props.label = unparsed.props.self ? unparsed.props.self : "Insert text";
    }


}