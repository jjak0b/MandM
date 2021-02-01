export const template =
`
<span>
    <template
        v-if="useStream"
    >
    <label
        class="mx-auto"
        v-bind:id="id + '-qr-preview-label'"
        v-text="getContentOf( label )"
    ></label>
    <div>
        <qrcode-stream
            @init="onInit"
            @detect="onDetect"
            
            role="region"
            v-bind="$attrs"
            v-bind:id="id"
            v-bind:class="classes"
            v-bind:tabindex="tabindex"
            v-bind:aria-describedby="id + '-qr-preview-label'"
            v-bind:aria-label="$t('UserWidgets.QrDecoder.label-camera-live-preview')"
            v-on:change.stop
        >
            <div
                class="d-flex"
            >
                <div
                    v-if="isLoading"
                    class="m-auto"
                >
                    <div>
                        <b-spinner>
                            {{ $t('shared.label-loading') }}
                            <p
                            >{{ $t('UserWidgets.QrDecoder.label-consent-camera-usage-message') }}</p>
                        </b-spinner>
                        
                        <span>{{ $t('shared.label-loading') }}</span>
                    </div>
                    <p>{{ $t('UserWidgets.QrDecoder.label-consent-camera-usage-message') }}</p>
                </div>
            </div>
        </qrcode-stream>
    </div>
    </template>
    <template v-else>
    <label
        class="mx-auto"
        v-bind:for="id"
        v-bind:id="id + '-label'"
        v-text="getContentOf( label )"
    ></label>
    <qrcode-capture  
        v-bind="$attrs"
        v-bind:id="id"
        v-bind:class="classes"
        v-bind:tabindex="tabindex"
        v-bind:multiple="null"
        v-on:change.stop
        
        @detect="onDetect"
    />
    </template>
</span>
    `;