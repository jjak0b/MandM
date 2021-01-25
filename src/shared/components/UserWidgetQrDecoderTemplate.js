export const template =
`
<span v-on:change.stop>
    <label
        v-bind:for="id"
        v-text="getContentOf( label )"
    ></label>
    <qrcode-capture
        v-bind="$attrs"
        v-bind:id="id"
        v-bind:class="classes"
        v-bind:tabindex="tabindex"
        v-bind:multiple="null"
        @detect="onDetect"
    />
</span>
    `;