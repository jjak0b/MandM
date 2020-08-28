export const template =
`
<div>
	<div class="row">
		<section class="col">
			<fieldset>
				<legend>Element sizing</legend>
				<h3>{{ $t( "SceneEditor.label_width" ) }}</h3>
				<input-range-number-widget
					name="width"
					v-model="value.size.x"
					min="0"
					max="100"
					step="0.5"
					labelNumber="SceneEditor.label_width_percent_number"
					labelRange="SceneEditor.label_width_percent_range"
				></input-range-number-widget>
				<h3>{{ $t( "SceneEditor.label_height" ) }}</h3>
				<input-range-number-widget
					name="height"
					v-model="value.size.y"
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
				<div class="row">
					<div class="col">
						<input-range-number-widget
							name="angleX"
							v-model="value.angles.x"
							min="0"
							max="360"
							step="0.5"
							labelNumber="SceneEditor.label_angle_number_X"
							labelRange="SceneEditor.label_angle_range_X"
						></input-range-number-widget>
					</div>
					<div class="col">
						<input-range-number-widget
							name="angleY"
							v-model="value.angles.y"
							min="0"
							max="360"
							step="0.5"
							labelNumber="SceneEditor.label_angle_number_Y"
							labelRange="SceneEditor.label_angle_range_Y"
						></input-range-number-widget>
					</div>
					<div class="col">
						<input-range-number-widget
							name="angleZ"
							v-model="value.angles.z"
							min="0"
							max="360"
							step="0.5"
							labelNumber="SceneEditor.label_angle_number_Z"
							labelRange="SceneEditor.label_angle_range_Z"
						></input-range-number-widget>
					</div>
				</div>
			</fieldset>
		</section>
		<hr>
		<section class="col">
			<fieldset>
				<legend>Element positioning</legend>
				<h3>{{ $t( "SceneEditor.label_position" ) }}</h3>
				<div class="row">
					<div class="col">
						<input-range-number-widget
							name="positionLeft"
							v-model="value.position.left"
							min="0"
							max="100"
							step="0.5"
							labelNumber="SceneEditor.label_position_number_left"
							labelRange="SceneEditor.label_position_range_left"
						></input-range-number-widget>
					</div>
					<div class="col">
						<input-range-number-widget
							name="positionRight"
							v-model="value.position.right"
							min="0"
							max="100"
							step="0.5"
							labelNumber="SceneEditor.label_position_number_right"
							labelRange="SceneEditor.label_position_range_right"
						></input-range-number-widget>
					</div>
				</div>
				<div class="row">
					<div class="col">
						<input-range-number-widget
							name="positionBottom"
							v-model="value.position.bottom"
							min="0"
							max="100"
							step="0.5"
							labelNumber="SceneEditor.label_position_number_bottom"
							labelRange="SceneEditor.label_position_range_bottom"
						></input-range-number-widget>
					</div>
					<div class="col">
						<input-range-number-widget
							name="positionTop"
							v-model="value.position.top"
							min="0"
							max="100"
							step="0.5"
							labelNumber="SceneEditor.label_position_number_top"
							labelRange="SceneEditor.label_position_range_top"
						></input-range-number-widget>
					</div>
				</div>
			</fieldset>
		</section>
		<hr>
	</div>
</div>
`;