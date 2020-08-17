export const template =
`
<div>
<section>
	<div class="row">
		<section class="col">
			<fieldset>
				<legend>Element sizing</legend>
				<h3>{{ $t( "SceneEditor.label_width" ) }}</h3>
				<input-range-number-widget
					name="width"
					v-model="size.x"
					min="0"
					max="100"
					step="0.5"
					labelNumber="SceneEditor.label_width_percent_number"
					labelRange="SceneEditor.label_width_percent_range"
				></input-range-number-widget>
				<h3>{{ $t( "SceneEditor.label_height" ) }}</h3>
				<input-range-number-widget
					name="height"
					v-model="size.y"
					min="0"
					max="100"
					step="0.5"
					labelNumber="SceneEditor.label_height_percent_number"
					labelRange="SceneEditor.label_height_percent_range"
				></input-range-number-widget>
			</fieldset>
		</section>
		<hr>
		<section class="col">
			<fieldset>
				<legend>Element orienting</legend>
				<h3>{{ $t( "SceneEditor.label_angle" ) }}</h3>
					<input-range-number-widget
						name="angleX"
						v-model="angles.x"
						min="0"
						max="360"
						step="0.5"
						labelNumber="SceneEditor.label_angle_number_X"
						labelRange="SceneEditor.label_angle_range_X"
					></input-range-number-widget>
					<input-range-number-widget
						name="angleY"
						v-model="angles.y"
						min="0"
						max="360"
						step="0.5"
						labelNumber="SceneEditor.label_angle_number_Y"
						labelRange="SceneEditor.label_angle_range_Y"
					></input-range-number-widget>
					<input-range-number-widget
						name="angleZ"
						v-model="angles.z"
						min="0"
						max="360"
						step="0.5"
						labelNumber="SceneEditor.label_angle_number_Z"
						labelRange="SceneEditor.label_angle_range_Z"
					></input-range-number-widget>
			</fieldset>
		</section>
		<hr>
		<section class="col">
			<fieldset>
				<legend>Element positioning</legend>
				<h3>{{ $t( "SceneEditor.label_position" ) }}</h3>
				<input-range-number-widget
					name="angleZ"
					v-model="angles.z"
					min="0"
					max="360"
					step="0.5"
					labelNumber="SceneEditor.label_angle_number_Z"
					labelRange="SceneEditor.label_angle_range_Z"
				></input-range-number-widget>
				<input-range-number-widget
					name="angleZ"
					v-model="angles.z"
					min="0"
					max="360"
					step="0.5"
					labelNumber="SceneEditor.label_angle_number_Z"
					labelRange="SceneEditor.label_angle_range_Z"
				></input-range-number-widget>
			</fieldset>
		</section>
		<hr>
	</div>
	<div class="row">
		<div class="col">
			<media-form-widget
				v-bind:assetId="nextAssetId"
				v-bind:locale="locale"
			></media-form-widget>
		</div>
	</div>
</section>
<section>
	<div class="row">
	
	</div>
</section>
</div>
`;