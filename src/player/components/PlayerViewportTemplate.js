export const template =
`
<div
	aria-label="Player"
	aria-live='polite'
	ref="player-viewport"
	tabindex="0"
>

<scene-viewport
	v-bind:key="activity.id"
	aria-label="Scene"
	id="player-scene"
	ref="scene"
	v-on:input="onInput( 'input', $event )"
	v-if="isSceneable"
	:value="scene"
>
</scene-viewport>
<b-container
	v-if="shouldClickToContinue"
	aria-disabled="!shouldClickToContinue"
	aria-controls="player-scene"
	aria-live="polite"
>
	<b-row>
		<b-col>
			<b-btn-group
				
				class="d-flex"
			>
				<b-btn
					class="m-auto"
					v-on:click="onInput( 'click', $event )"
					type="primary"
					v-t="'shared.label-continue'"
				>
				</b-btn>
			</b-btn-group>
		</b-col>
	</b-row>
</b-container>
</div>
`;