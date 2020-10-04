export const template =
    `
    <div>
    <h4>{{value.id}}</h4>
    <figure>
    <img v-bind:src="value.img" width="120px" height="120px">
    <figcaption>{{value.name}}</figcaption> 
</figure> 
    {{value.desc}}. {{$t('shared.label-inventory-type')}}: {{value.operation}}
    </div>
    
    
    
    
    
    
    `;