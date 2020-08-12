import { Component, OnInit, Inject,ViewChild} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LaligaComponent } from '../laliga/laliga.component';

@Component({
  selector: 'app-football-api-dialog',
  templateUrl: './football-api-dialog.component.html',
  styleUrls: ['./football-api-dialog.component.css']
})
export class FootballApiDialogComponent implements OnInit {
  
  constructor(@Inject(MAT_DIALOG_DATA) public data:LaligaComponent) { }

  ngOnInit(): void {
  }

}
