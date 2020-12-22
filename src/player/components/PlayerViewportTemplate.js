export const template =
`
<div>

<scene-viewport id="player-scene" ref="scene" style="background-color: blue"
	v-on:input="onInput( 'input', $event )"
	v-on:click="onInput( 'click', $event )"
	v-if="isSceneable"
	:value="scene"
>
</scene-viewport>

</div>
`;