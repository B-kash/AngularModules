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
}
