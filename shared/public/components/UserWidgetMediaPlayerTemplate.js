export const template =
`
<div class="w-100" v-if="value.asset">
	<!-- Force image to re-render and delete maphilight extra tags using :key as image url when changed in editor -->
	<figure
		v-if="value.asset.category == 'images'"
		class="figure"
		v-bind:key="value.asset.getURL()"
	>
		<img	
			v-if="value.asset"
			ref="img"
			v-bind="$attrs"
			v-bind:src="value.asset.getURL()"
			v-bind:alt="value.captions && $te(value.captions[0]) ? $t(value.captions[0]) : ''"
			v-bind:usemap="value.areas ? '#' + $attrs.id + '-map' : ''"
			class="figure-img img-fluid rounded" 
		/>
		<map
			:key="updateFlagToggle"
			v-if="value.areas"
			ref="map"
			v-bind:name="$attrs.id + '-map'"
		>
			<area
				v-for="(area, i) in value.areas"
				ref="area"
				v-bind:shape="area.shape"
				v-bind:coords="getStringAreaCoords( i )"
				v-bind:alt="area.alt && $te(area.alt) ? $t(area.alt) : ''"
				v-bind:href="area.href"
				v-bind:target="area.target"
				v-on:click="areaOnClick( i, $event )"
			/>
		</map>
		<figcaption
			class="figure-caption text-right"
		>{{ value.captions && value.captions[0] && $te( value.captions[0], locale ) ? $t(value.captions[0], locale) : '' }}</figcaption>
	</figure>
	<video
		v-if="value.asset.category == 'videos'"
		controls="controls"
		v-bind="$attrs"
		v-bind:src="value.asset.getURL()"
		class="w-100"
	>
		<track v-for="(source, lang) in value.captions"
			kind="captions"
			v-bind:src="source.getURL()"
			v-bind:srclang="lang"
			v-bind:label="I18nUtils.i18nCodes[lang] ? I18nUtils.i18nCodes[lang].englishName : lang"
		/>
		<!-- Visile only if it's unsupported by browser-->
		{{ $t( "shared.errors.video_tag-unsupported" ) }}
	</video>
	<audio 
		v-if="value.asset.category == 'audios'"
		controls="controls"
		v-bind="$attrs"
		v-bind:src="value.asset.getURL()"
		v-bind:aria-describedby="$attrs.id + '-lyrics'"
		class="w-100"
	>
		<track v-for="(source, lang) in value.captions"
			kind="captions"
			v-bind:src="source.getURL()"
			v-bind:srclang="lang"
			v-bind:label="I18nUtils.i18nCodes[lang] ? I18nUtils.i18nCodes[lang].englishName : lang"
			v-on:cuechange="onCueChange"
		/>
		<!-- Visile only if it's unsupported by browser-->
		{{ $t( "shared.errors.audio_tag-unsupported" ) }}
	</audio>
	<pre
		v-if="value.asset.category == 'audios'"
		v-bind:id="$attrs.id + '-lyrics'"
		v-html="captionContent"
		aria-live="polite"
	></pre>
</div>
`;