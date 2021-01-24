export const template =
    `
    <div>
   
        <input type="file" id="op-todo"  @change="onFileChange" v-bind:capture="cap" v-bind:accept="type">
        
            <div v-if="mediaSelected">
            <img v-if="type=='image/*'"   v-bind:src="mediaSelected" />
            <audio controls v-else-if="type=='audio/*'">
            <source v-bind:src="mediaSelected" v-bind:type="mediaType">
            </audio>
            <video v-else-if="type=='video/*'" width="320" height="240" controls>
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