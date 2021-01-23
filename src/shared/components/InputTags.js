import {template} from "./InputTagsTemplate.js";

export const component = {
	template: template,
	props: {
		label: String,
		description: String,
		options: Array,
		labelTags: String,
		searchLabel: String,
		searchPlaceholder: String,
		searchDescriptionNoItems: String,
		fieldsetLabel: String,
		fieldsetDescription: String,
		labelSelect: String,
		firstSelectOptionLabel: String,
		formTagProps: Object
	},
	data() {
		return {
			search: null,
			guessOption: null,
			value: []
		}
	},
	watch: {
		search(newVal, odlVal) {
			if( newVal )
				this.guessOption = this.availableOptions.length > 0 ? this.availableOptions[ 0 ].options[ 0 ] : null;
			else
				this.guessOption = null;
		}
	},
	computed: {
		criteria() {
			// Compute the search criteria
			return this.search ? this.search.trim().toLowerCase() : '';
		},
		availableOptions() {
			return this.filterGroups( this.options );
		},
		searchDescription() {
			if (this.criteria && this.availableOptions.length === 0) {
				return this.searchDescriptionNoItems;
			}
			return ''
		}
	},
	methods: {
		onAddOption(option) {
			if( option && option.length > 0 ) {
				this.value.push(option);
				this.search = null;
				this.guessOption = null;
			}
		},
		filterGroups( groups ) {
			return groups.map( this.filterGroupFunction )
				.filter( group => group.options.length > 0 );
		},
		filterGroupFunction( group ) {
			return Object.assign(
				{},
				group,
				{
					options: group.options.filter( this.filterFunction )
				}
			);
		},
		filterFunction( option ) {
			return this.value.indexOf( option ) === -1 // Filter out already selected options
				&& option.toLowerCase().includes( this.criteria ); // Show only options that match criteria
		}
	}
}