export const template =
    `
    <div>
    <div v-for="(element,index) in value" style="display:inline;">
    <b-img v-bind:src="element.image" v-b-popover.hover.top="{{element.desc}}" title="{{element.name}}">
</div>
</div> 
    </div>
    
    
    
    
    
    
    `;