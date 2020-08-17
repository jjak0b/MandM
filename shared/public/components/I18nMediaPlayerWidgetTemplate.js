export const template =
`
<span>
	<figure
		v-if="tag == 'image'"
	>
		<img
			v-bind:src="value.src"
			v-bind:alt="$t(value.subtitles)"
		/>
		<figcaption>{{ $t(value.subtitles) }}</figcaption>
	</figure>
	<video
		v-if="tag == 'video'"
		controls="controls"
		v-bind:src="value.src"
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
		v-if="tag == 'audio'"
		controls="controls"
		v-bind:src="value.src"
		aria-describedby="lyrics"
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
		v-if="tag == 'audio'"
		id="lyrics"
		aria-label="Lyrics" v-html="subtitleContent">
	</p>
</span>
`;