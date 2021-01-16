export const template =
    `
    <div>
        <h5>{{ valueType.description }}</h5>
        <input type="file" id="op-todo"  @change="onFileChange" v-bind:capture="valueType.cap" v-bind:accept="valueType.type">
        
            <div v-if="mediaSelected">
            <img v-if="valueType.type=='image/*'"   v-bind:src="mediaSelected" />
            <audio controls v-else-if="valueType.type=='audio/*'">
            <source v-bind:src="mediaSelected" v-bind:type="mediaType">
            </audio>
            <video v-else-if="valueType.type=='video/*'" width="320" height="240" controls>
            <source v-bind:src="mediaSelected" v-bind:type="mediaType">
            </video>
        </div>
        <b-button
        type="button"
			variant="success"
			v-t="'shared.label-save'"
			v-on:click="send"
		></b-button>
    </div>
    
    `;