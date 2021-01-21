export const template =
    `
<div>
    <section>
        <b-form>
            <b-form-group>
            <template v-slot:label
			>{{ $t('UserWidgets.label-qr-decoder-settings') }}</template>
			<input type="text" v-model="component.props.label">

    <h4 v-t="'shared.label-preview'"></h4>
    <user-widget-qr
    v-bind:label="label">

    </user-widget-qr>
</div>
        `;