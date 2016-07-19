///<reference path="../node_modules/rxjs/add/operator/map.d.ts"/>
import {Component} from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/Rx';
import { Injectable }     from 'angular2/core'
import { HTTP_PROVIDERS } from 'angular2/http';
import {PropertyBindingComponent} from './property-binding.component';
@Component({
    selector: 'my-app',
    template: `<h1>My First Angular 2 App PacoRoco</h1>
			   <h2>{{title}}</h2>
			   <br>
			   <input type="text" (keyup)="onKeyUp(method.value)" name="method" [value]="title" [ngClass]="'red'" #method/>
			   <br>
			   <p>{{values}}</p>
			   <br><br>
			   <input type="text" [(ngModel)]="title">
			   <p>Your title: {{title}}</p>
			   <br>
			   <button (click)="getRandomQuote(method)">Get Random Quote!</button>
			   <h3>{{randomQuote}}</h3>>
			   <br>
			   <section class="child">
			    <property-binding (hobbiesChanged)="onHobbiesChanged($event)" [myName]="title" [myAge]="56"></property-binding>			   
               </section>
               <h3>My hobbies: {{hobbies}}</h3>
               <input type="text" #imageSource (keyup)="0">
               <img [src]="imageSource.value"/>
               
			   `,
    providers: [HTTP_PROVIDERS],
    directives: [PropertyBindingComponent],
    inputs : ['hobbiesChanged']

})
@Injectable()
export class AppComponent {
    hobbies : string = '';
	title : string = "This is a real title!";
    randomQuote : string;
    values : string = '';
    constructor (private http: Http) {}
    getRandomQuote(method ) {
        console.debug('Aqui method:'+method.value);
        this.http.get('http://localhost:8081/Quickws/dispathResquest?c=reqServ&m='+method.value)
            .map(res => res.text())
            .subscribe(
                data => { this.randomQuote = data; this.title='New title to test data binding'},
                err => this.logError(err),
                () => console.log('Random Quote Complete:')
            );
    }

    logError(err) {
        console.error('There was an error: ' + err);
    }
    onKeyUp(value : string) {
        this.values += value + ' | ';

    }
    onHobbiesChanged(hobbies : string) {
        this.hobbies = hobbies;
    }
}