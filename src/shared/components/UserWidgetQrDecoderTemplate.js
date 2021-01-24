export const template =
`
<div v-on:change.stop>
    <label
        v-bind:for="id"
        v-text="getContentOf( label )"
    ></label>
    <qrcode-capture
        v-bind:id="id"
        @detect="onDetect"
    />
</div>
    `;