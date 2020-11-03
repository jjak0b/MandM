/**
 * Class used to get form's data from an event triggered by submitter element that is not a FORM
 */
export class FormUtils {
	/**
	 * Return a serialized array of form data as JQuery.serializeArray() does with the submitter key-value added
	 * @param event event triggered by a submitter, not a form element
	 * @param shouldAddSubmitter
	 * @returns {null|[]}
	 */
	static serializeArray( event, shouldAddSubmitter = true ) {
		let submitter = event.submitter || event.target;
		if( !submitter ) return null;

		let formElement = $(submitter).closest("form")[0];
		let serializedData = null;
		if( formElement ){
			serializedData = $( formElement ).serializeArray();
			if( serializedData && shouldAddSubmitter && submitter.name ) {
				serializedData.push( { name: submitter.name, value: submitter.value } );
			}
		}

		return serializedData;
	}

	/**
	 * Return a formData object with the submitter key-value added
	 * @param event event triggered by a submitter, not a form element
	 * @param shouldAddSubmitter
	 * @returns {null|FormData}
	 */
	static getFormData( event, shouldAddSubmitter = true ){
		let submitter = event.submitter || event.target
		if( !submitter ) return null;

		let formElement = $(submitter).closest("form");
		let formData = null;
		if( formElement ){
			formData = new FormData( formElement[0] );
			if( shouldAddSubmitter && submitter.name )
				formData.append( submitter.name, submitter.value );
		}

		return formData;
	}

	static getAssociativeArray( /*Array*/ serializedArray ) {
		return serializedArray.reduce(
			( obj, item) => { obj[item.name] = item.value; return obj},
			{}
		);
	}
}