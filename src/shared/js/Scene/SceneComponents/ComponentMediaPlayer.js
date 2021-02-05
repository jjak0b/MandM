import InputSceneComponent from "../InputSceneComponent.js";
import ContextMediaPlayer from "./MediaPlayer/ContextMediaPlayer.js";

export default class ComponentMediaPlayer extends InputSceneComponent {
	constructor(unparsed) {
		super(unparsed);
		this.props.context = "context" in unparsed.props ? new ContextMediaPlayer( unparsed.props.context, this.i18nCategory ) : new ContextMediaPlayer({}, this.i18nCategory );
	}

	dispose(params) {
		this.props.context.dispose( params );
		super.dispose(params);
	}

	duplicate( locales, activityCategory ) {
		let duplicate = super.duplicate( activityCategory );
		duplicate.props.context = this.props.context.duplicate( locales, duplicate.i18nCategory );

		return Object.setPrototypeOf( duplicate, ComponentMediaPlayer.prototype );
	}
}