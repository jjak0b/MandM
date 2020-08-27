export const template =
`
<div class="w-100">
	<figure
		v-if="value.tag == 'image'"
		class="figure"
	>
		<img
			ref="img"
			v-bind="$attrs"
			v-bind:src="value.src"
			v-bind:alt="$t(value.subtitles)"
			v-bind:usemap="'#' + $attrs.id + '-map'"
			class="w-100 figure-img img-fluid rounded" 
		/>
		<map
			v-if="value.areas"
			ref="map"
			v-bind:name="$attrs.id + '-map'"
		>
			<area
				v-for="(area, i) in value.areas"
				ref="area"
				v-bind:shape="area.shape"
				v-bind:coords="getStringAreaCoords( i )"
				v-bind:alt="$t( area.alt )"
				v-bind:href="area.href"
			/>
		</map>
		<figcaption
			class="figure-caption text-right"
		>{{ $t(value.subtitles) }}</figcaption>
	</figure>
	<video
		v-if="value.tag == 'video'"
		controls="controls"
		v-bind="$attrs"
		v-bind:src="value.src"
		class="w-100"
	>
		<track v-for="(source, lang) in value.subtitles"
			kind="subtitles"
			v-bind:src="source"
			v-bind:srclang="lang"
			v-bind:label="lang"
		/>
		<!-- Visile only if it's unsupported by browser-->
		{{ $t( "shared.errors.video_tag_unsupported" ) }}
	</video>
	<audio 
		v-if="value.tag == 'audio'"
		controls="controls"
		v-bind="$attrs"
		v-bind:src="value.src"
		v-bind:aria-describedby="$attrs[id] + 'lyrics'"
		class="w-100"
	>
		<track v-for="(source, lang) in value.subtitles"
			kind="subtitles"
			v-bind:src="source"
			v-bind:srclang="lang"
			v-bind:label="lang"
			v-on:cuechange="onCueChange"
		/>
		<!-- Visile only if it's unsupported by browser-->
		{{ $t( "shared.errors.audio_tag_unsupported" ) }}
	</audio>
	<p
		v-if="value.tag == 'audio'"
		v-bind:id="$attrs[id] + 'lyrics'"
		aria-label="Lyrics" v-html="subtitleContent">
	</p>
</div>
`;