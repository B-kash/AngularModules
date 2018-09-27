import {AfterViewInit, Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import 'rxjs/add/observable/fromEvent';
import {VideoInputs} from "./VideoInputs";
import {Api} from "../api.service";

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit,AfterViewInit,OnChanges,DoCheck {


  //Element References
  @ViewChild('videoControls') controls;
  @ViewChild('videoContainer') container;
  @ViewChild('videoPlayer') videoPlayer;

  //Useful Variables
  isFullScreen: boolean = false;
  played: boolean = false;
  currentTime="0:00";
  duration="0:00";
  src="";
  subtitles:any;
  webttSplits:any = [];
  cues: any = [];
  //Inputs
  @Input('videoInputs') videoInputs:VideoInputs;

  constructor(private api:Api) {
  }

  ngDoCheck(){
    if(this.src!=this.videoInputs.src){
      this.resetSettings();
      this.src = this.videoInputs.src;
      this.videoPlayer.nativeElement.src = this.src;
    }
  }

  ngOnInit() {
    this.src = this.videoInputs.src;
    this.getSubtitle();
  }

  ngAfterViewInit(){}

  ngOnChanges(changes:SimpleChanges){}

  tooglePlayPause() {
    if (this.videoPlayer.nativeElement.paused){
      this.played = true;
      this.videoPlayer.nativeElement.play();
    }
    else {
      this.played = false;
      this.videoPlayer.nativeElement.pause();
    }

  }

  toogleMute() {
    this.videoPlayer.nativeElement.muted = !this.videoPlayer.nativeElement.muted;
  }

  toggleFullScreen() {
    if (!this.isFullScreen) {
      if (this.container.requestFullscreen) {
        this.container.requestFullscreen();
      } else if (this.container.mozRequestFullScreen) {

        this.container.mozRequestFullScreen();

      }
      else if (this.container.nativeElement.webkitRequestFullscreen) {
        this.container.nativeElement.webkitRequestFullscreen();

      }
      else if (this.container.msRequestFullscreen) {
        this.container.nativeElement.msRequestFullscreen();
      }
    } else {
      if (this.container.nativeElement.exitFullscreen) {
        this.container.nativeElement.exitFullscreen();
      } else if (this.container.nativeElement.mozCancelFullScreen) {
        this.container.nativeElement.mozCancelFullScreen();
      } else if (this.container.nativeElement.webkitExitFullscreen) {
        this.container.nativeElement.webkitExitFullscreen();
      } else if (this.container.nativeElement.msExitFullscreen) {
        this.container.nativeElement.msExitFullscreen();
      }else if(this.container.nativeElement.webkitCancelFullScreen){
        this.container.nativeElement.webkitCancelFullScreen();
      }
      else{
        document.webkitCancelFullScreen();
        //  TODO create your own event to trigger escape key press
      }
    }

  }

  onSeek(e){
    this.videoPlayer.nativeElement.currentTime = (this.videoPlayer.nativeElement.duration*e.target.value)/100;
  }

  updateSeek(e){
    this.controls.nativeElement.children['seek-bar'].value = (e.target.currentTime*100)/this.videoPlayer.nativeElement.duration;
    this.calculateTime();
    this.updateSubtitle();
  }

  onVolumeChange(e){
    this.videoPlayer.nativeElement.volume= e.target.value;
    this.videoPlayer.nativeElement.volume= e.target.value;
  }

  getPlayButton(){
    if(this.played){
      return "fa fa-pause"
    }else return "fa fa-play"
  }

  getMuteButton(){

    if(this.videoPlayer.nativeElement.muted || this.videoPlayer.nativeElement.volume==0)
      return "fa fa-volume-off";
    else return "fa fa-volume-up";

  }

  fullScreenChange(e){
    this.isFullScreen = !this.isFullScreen;
  }

  calculateTime() {
    if(this.duration=="0:00" || this.duration=="NaN:NaN"){
      this.calculateDuration();
    }
    this.calculateCurrentTime();

  }

  calculateDuration(){
    let hour,min,sec,wholeTime;
    wholeTime = this.videoPlayer.nativeElement.duration;
    if(wholeTime<60){
      sec = Math.floor(wholeTime);
    }else{
      min = Math.floor(wholeTime/60);
      sec = Math.floor(wholeTime%60);
      if(min>=60){
        hour=Math.floor(min/60);
        min = Math.floor(min%60);
      }
    }

    if(hour>=1){
      this.duration = hour+":"+min;
    }else{
      this.duration = min+":"+sec;
    }
  }

  calculateCurrentTime() {
    let hour=0,min=0,sec=0,currentTime;
    currentTime = this.videoPlayer.nativeElement.currentTime;
    if(currentTime<60){
      sec = Math.floor(currentTime);
    }else{
      min = Math.floor(currentTime/60);
      sec = Math.floor(currentTime%60);
      if(min>=60){
        hour=Math.floor(min/60);
        min = Math.floor(min%60);
      }
    }
    if(hour>=1){
      this.currentTime = hour+":"+min;
    }else{
      this.currentTime = min+":"+sec;
    }
  }

  resetSettings() {
    this.isFullScreen = false;
    this.played = false;
    this.currentTime="0:00";
    this.duration="0:00";
    this.src="";
  }

  getSubtitle() {
    //to get subtitles
    this.api.getSubtitle(this.videoInputs.subtitleSrc).subscribe(
      (res)=>{
        this.subtitles = res['_body'];
        this.parseSubtitle();
      },(err)=>{
        console.log(err);


      }
    )
  }

  createCues() {
    if(this.webttSplits[0].length<6){
      return;
    }else if(this.webttSplits[0].length==6 && this.webttSplits[0]!="WEBVTT"){
      return;
    }else if(this.webttSplits[0].length>6 && (this.webttSplits[0][6]!="\n" || this.webttSplits[0][6]!=" " || this.webttSplits[0][6]!="\t")){
      return;
    } else{
      this.webttSplits.forEach(split=>{
        if(split.substring(0,5)=="STYLE"){
        //  TODO add it to style block
        }
        else if(split.substring(0,6)=="REGION"){
        //  TODO add it to Region block
        }else if(split.substring(0,7)=="WEBVTT"){
        //  We ignore the first line
        }
        else{
          this.cues.push(split);

        }
      })
    }
  }

  parseSubtitle() {

    //Firstly we remove the null character ""
    this.subtitles =  this.subtitles.replace( /\0/g , "");
    // this.subtitles = this.subtitles.replace( /r /g , "\n");
    console.log(this.subtitles.split("\r\n"));
    //now we replace carriage return followed by new line by just a new line character
    this.subtitles = this.subtitles.replace(/\r\n/g,"\n");
    //Now we replace all remaining carriage return with a new line characrer
    this.subtitles = this.subtitles.replace(/\r/g,"\n");
    //We know each block is seperated by 2 consecutive new lines so splitting the string to seprate each block
    this.webttSplits = this.subtitles.split("\n\n");
    console.log("Cues are ",this.webttSplits);

    this.createCues();
  }

  updateSubtitle() {
    this.cues.forEach(cue=>{

    })
  }
}
