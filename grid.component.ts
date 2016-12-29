import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GridBoxComponent } from './grid-box.component';


@Component({
  selector: 'my-grid',
  template: `
  	<div #grid class="grid-layout">
  		<ng-container *ngFor="let row of grid_array">
  			<my-grid-box [data]="entry" *ngFor="let entry of row"
  			(myData)="toSplit($event)"></my-grid-box>
  		</ng-container>
  	</div>
	`,
	styles: [`
		.grid-layout {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr 1fr;
		}
	`],
})

export class GridComponent implements OnInit {

	@Input('cols') _cols: number = 10;
	@Input('rows') _rows: number = 10;

	col_st: string = '';
	grid_array: any[] = [];

	@ViewChild('grid') gridel: ElementRef;

	ngAfterViewInit(){
		this.gridel.nativeElement.setAttribute('style', 'grid-template-columns: ' + this.col_st);
	}

	ngOnInit(){
		for (let col=0; col<this._cols; col++){
			this.col_st = this.col_st + "1fr ";
		}

		for (let row=0; row<this._rows; row++){
			var row_data: any[] = [];

			for (let col=0; col<this._cols; col++){
				row_data.push(
					{ 
						row: row, 
						col: col,
						fill: false, 
						style: 
							{
								border: 'solid gray 1px;'
							}

					} 
				)
			}

			this.grid_array.push(row_data);
		}

		//form red region
		for (let x=this._rows-4; x < this._rows; x++){
			for (let y=0; y<this._rows-x; y++){
				this.grid_array[x+y][y].style['background-color'] = '#ff6666;';
				this.grid_array[x+y][y].fill = true;
			}
		}
	}

	toSplit(data: any){

		if (this.grid_array[data.row-1][data.col].fill==true || this.grid_array[data.row][data.col+1].fill==true){
			console.log('can not split');
		} else {
			this.grid_array[data.row][data.col].fill=false;
			this.grid_array[data.row-1][data.col].fill=true;
			this.grid_array[data.row][data.col+1].fill=true;
		}
		
	}
}
