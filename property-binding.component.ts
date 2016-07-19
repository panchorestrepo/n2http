/**
 * Created by pancho on 5/30/2016.
 */
import {Component,EventEmitter} from 'angular2/core';
import {Input} from 'angular2/core';

@Component ({
   selector: 'property-binding',
    template: `
        <h2>This is my child component</h2>
        <p>Hey! {{name}} and I am {{age}} years old</p>
        <h4>My hobbies are:</h4>
        <input type="text" (keyup)="onHobbiesChanged(hobbies.value)" #hobbies>
    `,
    inputs : ['name:myName'],
    outputs: ['hobbiesChanged']
})

export class PropertyBindingComponent {
    name : string = '';
    @Input ('myAge') age : string;
    hobbiesChanged = new EventEmitter<string>();
    onHobbiesChanged(hobbies : string) {
        this.hobbiesChanged.emit(hobbies);
    }
}
