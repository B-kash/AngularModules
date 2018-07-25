import {Component, OnInit, ViewChild} from '@angular/core';
import 'rxjs/add/observable/fromEvent';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {

  @ViewChild('videoControls') controls;
  @ViewChild('videoContainer') container;
  @ViewChild('videoPlayer') videoPlayer;
  isFullScreen: boolean = false;
  played: boolean = false;
  currentTime="0:00";
  duration="0:00";
  constructor() {
  }

  ngOnInit() {}

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
    if(this.duration=="0:00"){
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
}
