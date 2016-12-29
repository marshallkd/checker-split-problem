import { Component, Input, Output, OnInit, EventEmitter, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'my-grid-box',
  template: `
		<div #box class="box">
			<div *ngIf="_data.fill" class="circle"
			(click)="emitData()"></div>
		</div>
	`,
	styles: [`
		.box {
    		box-sizing: border-box;
			color: #fff;
			padding: 1em;
			width: 100%;
			height: 50px;
			background-color: #white;
		}

		.circle:hover {
			opacity: .4;
		}

		.circle {
			width: 100%;
			height: 100%;
			border-radius: 50%;
			background: black;
		}
	`],
})

export class GridBoxComponent implements OnInit{

	@Input('data') _data: any = null;
	@Output() myData: EventEmitter<any> = new EventEmitter;
	@ViewChild('box') boxel: ElementRef;


	ngOnInit(){
		for (let key in this._data.style) {
			if (this._data.style.hasOwnProperty(key)) {
				this.boxel.nativeElement.setAttribute('style', key+':'+this._data.style[key]);
			}
		}
	}

	emitData(){
		this.myData.emit(this._data);
	}
}
