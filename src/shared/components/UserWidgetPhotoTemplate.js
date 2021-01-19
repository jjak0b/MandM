export const template =
    `
    <div>
        <input type="file" id="op-todo"  @change="onFileChange" v-bind:capture="component.cap" v-bind:accept="component.type">
        
            <div v-if="mediaSelected">
            <img v-if="component.props.type=='image/*'"   v-bind:src="mediaSelected" />
            <audio controls v-else-if="component.type=='audio/*'">
            <source v-bind:src="mediaSelected" v-bind:type="mediaType">
            </audio>
            <video v-else-if="component.type=='video/*'" width="320" height="240" controls>
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