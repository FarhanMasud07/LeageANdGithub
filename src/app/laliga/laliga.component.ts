import { Component, OnInit, ViewChild } from '@angular/core';
import { DataApiService } from '../data-api.service';
import {MatDialog} from '@angular/material/dialog';
import { FootballApiDialogComponent } from '../football-api-dialog/football-api-dialog.component';
import {TeamApis} from './laliga.component.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-laliga',
  templateUrl: './laliga.component.html',
  styleUrls: ['./laliga.component.css']
})
export class LaligaComponent implements OnInit {
  [x: string]: any;

  public footballApiData = {
    name: ' ',
    totalPlayed: null,
    totalWin: null,
    totalLoss: null,
    totalDraw: null,
    TeamName: null
  }
  public TeamInterFace: TeamApis[ ];
  public displayedColumns: string[] = ['date', 'teams', 'score'];
  public result = new MatTableDataSource<TeamApis>(this.TeamInterFace);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  public error: string;

  constructor(private _dataOfAllApiService: DataApiService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.result.paginator = this.paginator;

    /// Calling the leageApi/footballapi function
    this.footballApis();
  }


  // //// This is Leauge Api function where all the api staffs done
  footballApis(){
    this._dataOfAllApiService.getFootBallApiData().subscribe(data=>{
      this.footballApiData.name = data.name
      data.rounds.map((eachRound:any)=>{
        //LoadAsh needs..
        for(var i = 0; i < eachRound.matches.length; i++)
        {
            this.result.data = this.result.data.concat(eachRound.matches[i]);
        }
      })
    },(error)=>{
      this.error = error
    })
  }

  /// This is left team function
  LeftTeamClick(leftTeamName:any){
    this.individualTeaminfo(leftTeamName)
    this.openDialog(leftTeamName)
  }


    /// This is Right team function
  RightTeamClick(rightTeamName:any){
    this.individualTeaminfo(rightTeamName)
    this.openDialog(rightTeamName)
  }


  //   /// This is Code refactore team function
  individualTeaminfo(teamName:any){
    let count = 0
    let lossScoreCount = 0
    let winScoreCount = 0
    let drawScoreCount = 0

      this.result.data.map((eachMatch:any)=>{
        if((eachMatch.team1===teamName)||(eachMatch.team2===teamName)){
          count++
        }
        if(eachMatch.score.ft[0]===eachMatch.score.ft[1] && (eachMatch.team1 === teamName || eachMatch.team2 === teamName)){
          lossScoreCount++
        }
        if((eachMatch.score.ft[0]>eachMatch.score.ft[1] && eachMatch.team1 === teamName) || (eachMatch.score.ft[1]>eachMatch.score.ft[0] && eachMatch.team2 === teamName)){
          winScoreCount++
        }
        if(eachMatch.score.ft[0]===eachMatch.score.ft[1] && (eachMatch.team1 === teamName || eachMatch.team2 === teamName)){
          drawScoreCount++
        }

        this.footballApiData.totalPlayed = count
        this.footballApiData.totalWin = winScoreCount
        this.footballApiData.totalLoss = lossScoreCount
        this.footballApiData.totalDraw = drawScoreCount

        
      })
  }



  ///This is Dialog
  openDialog(TeamName:any){
    this.dialog.open(FootballApiDialogComponent,{
      data: {
        TeamName:TeamName,
        Played:this.footballApiData.totalPlayed,
        Win:this.footballApiData.totalWin,
        Loss:this.footballApiData.totalLoss,
        Draw:this.footballApiData.totalDraw,
        name:this.footballApiData.name
        
      }
    })
  }

}


