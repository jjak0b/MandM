import SceneComponent from "../SceneComponent.js";
import ContextMediaPlayer from "./MediaPlayer/ContextMediaPlayer.js";

export default class ComponentMediaPlayer extends SceneComponent {
	constructor(unparsed) {
		super(unparsed);
		this.props.context = "context" in unparsed.props ? new ContextMediaPlayer( unparsed.props.context ) : new ContextMediaPlayer({});
	}

	dispose(params) {
		this.props.context.dispose( params );
		super.dispose(params);
	}
}