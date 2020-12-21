export const template =
`
<div>

<scene-viewport id="player-scene" ref="scene"
	v-if="isSceneable"
	:value="scene"
>
</scene-viewport>

</div>
`;