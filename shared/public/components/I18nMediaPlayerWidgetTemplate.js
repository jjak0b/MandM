export const template =
`
<div class="w-100">
	<figure
		v-if="value.tag == 'image'"
		v-bind="$attrs"
	>
		<img
			v-bind:src="value.src"
			v-bind:alt="$t(value.subtitles)"
		/>
		<figcaption>{{ $t(value.subtitles) }}</figcaption>
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
		aria-describedby="lyrics"
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
		id="lyrics"
		aria-label="Lyrics" v-html="subtitleContent">
	</p>
</div>
`;