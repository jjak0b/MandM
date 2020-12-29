export const template =
    `
    <div>
        <h5>{{ valueType.description }}</h5>
        <input type="file" id="op-todo" v-bind:capture="valueType.cap" v-bind:accept="valueType.type">
<!--        <img-->
<!--        v-if="mediaSelected!=null" -->
<!--        v-bind:src="mediaSelected.prototype" alt="immagine">-->
        </div>
    
    `;