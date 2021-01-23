import SceneComponent from "../SceneComponent.js";

export default class ComponentQRDecoder extends SceneComponent {
    constructor(unparsed) {
        super(unparsed);
        this.props.label = this.i18nCategory + ".label";

    }


}