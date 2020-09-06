export const template =
`
<div>
	<div class="row">
		<section class="col">
			<fieldset>
				<legend>Element sizing</legend>
				<h3>{{ $t( "SceneEditorWidget.StyleWidget.label-width" ) }}</h3>
				<input-range-number-widget
					name="width"
					v-model="value.size.x"
					min="0"
					max="100"
					step="0.5"
					labelNumber="SceneEditorWidget.StyleWidget.label-width-percent-number"
					labelRange="SceneEditorWidget.StyleWidget.label-width-percent-range"
				></input-range-number-widget>
				<h3>{{ $t( "SceneEditorWidget.StyleWidget.label-height" ) }}</h3>
				<input-range-number-widget
					name="height"
					v-model="value.size.y"
					min="0"
					max="100"
					step="0.5"
					labelNumber="SceneEditorWidget.StyleWidget.label-height-percent-number"
					labelRange="SceneEditorWidget.StyleWidget.label-height-percent-range"
				></input-range-number-widget>
			</fieldset>
		</section>
		<hr>
		<section class="col">
			<fieldset>
				<legend>Element orienting</legend>
				<h3>{{ $t( "SceneEditorWidget.StyleWidget.label-angle" ) }}</h3>
				<div class="row">
					<div class="col">
						<input-range-number-widget
							name="angleX"
							v-model="value.angles.x"
							min="0"
							max="360"
							step="0.5"
							labelNumber="SceneEditorWidget.StyleWidget.label-angle-number-X"
							labelRange="SceneEditorWidget.StyleWidget.label-angle-range-X"
						></input-range-number-widget>
					</div>
					<div class="col">
						<input-range-number-widget
							name="angleY"
							v-model="value.angles.y"
							min="0"
							max="360"
							step="0.5"
							labelNumber="SceneEditorWidget.StyleWidget.label-angle-number-Y"
							labelRange="SceneEditorWidget.StyleWidget.label-angle-range-Y"
						></input-range-number-widget>
					</div>
					<div class="col">
						<input-range-number-widget
							name="angleZ"
							v-model="value.angles.z"
							min="0"
							max="360"
							step="0.5"
							labelNumber="SceneEditorWidget.StyleWidget.label-angle-number-Z"
							labelRange="SceneEditorWidget.StyleWidget.label-angle-range-Z"
						></input-range-number-widget>
					</div>
				</div>
			</fieldset>
		</section>
		<hr>
		<section class="col">
			<fieldset>
				<legend>Element positioning</legend>
				<h3>{{ $t( "SceneEditorWidget.StyleWidget.label-position" ) }}</h3>
				<div class="row">
					<div class="col">
						<input-range-number-widget
							name="positionLeft"
							v-model="value.position.left"
							min="0"
							max="100"
							step="0.5"
							labelNumber="SceneEditorWidget.StyleWidget.label-position-number-left"
							labelRange="SceneEditorWidget.StyleWidget.label-position-range-left"
						></input-range-number-widget>
					</div>
					<div class="col">
						<input-range-number-widget
							name="positionRight"
							v-model="value.position.right"
							min="0"
							max="100"
							step="0.5"
							labelNumber="SceneEditorWidget.StyleWidget.label-position-number-right"
							labelRange="SceneEditorWidget.StyleWidget.label-position-range-right"
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
							labelNumber="SceneEditorWidget.StyleWidget.label-position-number-bottom"
							labelRange="SceneEditorWidget.StyleWidget.label-position-range-bottom"
						></input-range-number-widget>
					</div>
					<div class="col">
						<input-range-number-widget
							name="positionTop"
							v-model="value.position.top"
							min="0"
							max="100"
							step="0.5"
							labelNumber="SceneEditorWidget.StyleWidget.label-position-number-top"
							labelRange="SceneEditorWidget.StyleWidget.label-position-range-top"
						></input-range-number-widget>
					</div>
				</div>
			</fieldset>
		</section>
		<hr>
	</div>
</div>
`;