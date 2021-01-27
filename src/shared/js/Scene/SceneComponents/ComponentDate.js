import InputSceneComponent from "../InputSceneComponent.js";
import {TypedValue} from "../../Types/TypedValue.js";

export default class ComponentDate extends InputSceneComponent {
	constructor(unparsed) {
		super(unparsed);

		this.value = new TypedValue( unparsed.value || {} );
		this.props.data = 'data' in unparsed.props ? unparsed.props.data : {};
		this.props.data.min = 'data' in unparsed.props && 'min' in unparsed.props.data ? unparsed.props.data.min : null;
		this.props.data.max = 'data' in unparsed.props && 'max' in unparsed.props.data ? unparsed.props.data.max : null;
		this.props.data.readonly = 'data' in unparsed.props && 'readonly' in unparsed.props.data ? unparsed.props.data.readonly : null;
		this.props.data.startWeekday = 'data' in unparsed.props && 'startWeekday' in unparsed.props.data ? unparsed.props.data.startWeekday : null;
		this.props.data.selectedVariant = 'data' in unparsed.props && 'selectedVariant' in unparsed.props.data ? unparsed.props.data.selectedVariant : null;
		this.props.data.todayVariant = 'data' in unparsed.props && 'todayVariant' in unparsed.props.data ? unparsed.props.data.todayVariant : null;

	}

}