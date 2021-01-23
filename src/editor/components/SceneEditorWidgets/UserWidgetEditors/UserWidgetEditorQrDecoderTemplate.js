export const template =
    `
<div>
    <section>
        <b-form>
            <b-form-group>
                <template v-slot:label
			    >{{ $t('UserWidgets.label-qr-decoder-settings') }}</template>
			    <b-form-row>
				    <i18n-input-widget
			        v-bind:tag="'input'"
			        v-bind:label="$t( 'UserWidgets.label-label-qr' )"
			        name="QrLabel"
			        type="text"
			        v-bind:locale="locale"
			        v-bind:locale-label="component.props.label"
		></i18n-input-widget>		
			    </b-form-row>
            </b-form-group>
        </b-form>
        <h4 v-t="'shared.label-preview'"></h4>
        <user-widget-qr
        v-bind:label="component.props.label"
		v-bind:locale="locale"
		>
        </user-widget-qr>
    </section>
</div>
        `;