export const template =
`
<div class="w-100" v-if="context.asset">
	<!-- Force image to re-render and delete maphilight extra tags using :key as image url when changed in editor -->
	<figure
		v-if="context.asset.category == 'images'"
		class="figure"
		v-bind:key="context.asset.getURL()"
	>
		<img	
			v-if="context.asset"
			ref="img"
			v-bind="$attrs"
			v-bind:src="context.asset.getURL()"
			v-bind:alt="getImgAlt()"
			v-bind:usemap="context.areas ? '#' + $attrs.id + '-map' : ''"
			class="figure-img img-fluid rounded" 
		/>
		<map
			:key="updateFlagToggle"
			v-if="context.areas"
			ref="map"
			v-bind:name="$attrs.id + '-map'"
		>
			<area
				v-for="(area, i) in context.areas"
				ref="area"
				v-bind:shape="area.shape"
				v-bind:coords="getStringAreaCoords( i )"
				v-bind:alt="getAreaAlt( area )"
				v-bind:href="area.href"
				v-bind:target="area.target"
				v-on:click="areaOnClick( i, $event )"
			/>
		</map>
		<figcaption
			class="figure-caption text-right"
		>{{ getImgAlt() }}</figcaption>
	</figure>
	<video
		v-if="context.asset.category == 'videos'"
		controls="controls"
		v-bind="$attrs"
		v-bind:src="context.asset.getURL()"
		class="w-100"
	>
		<track v-for="(source, lang) in context.captions"
			kind="captions"
			v-bind:src="source.getURL()"
			v-bind:srclang="lang"
			v-bind:label="I18nUtils.i18nCodes[lang] ? I18nUtils.i18nCodes[lang].englishName : lang"
		/>
		<!-- Visile only if it's unsupported by browser-->
		{{ $t( "shared.errors.video_tag-unsupported" ) }}
	</video>
	<audio 
		v-if="context.asset.category == 'audios'"
		controls="controls"
		v-bind="$attrs"
		v-bind:src="context.asset.getURL()"
		v-bind:aria-describedby="$attrs.id + '-lyrics'"
		class="w-100"
	>
		<track v-for="(source, lang) in context.captions"
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
		v-if="context.asset.category == 'audios'"
		v-bind:id="$attrs.id + '-lyrics'"
		v-html="captionContent"
		aria-live="polite"
	></pre>
</div>
`;