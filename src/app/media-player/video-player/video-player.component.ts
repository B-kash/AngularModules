import {Component, OnInit, ViewChild} from '@angular/core';

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

  constructor() {
  }

  ngOnInit() {

  }

  tooglePlayPause() {
    console.log(this.videoPlayer.nativeElement.paused);
    if (this.videoPlayer.nativeElement.paused)
      this.videoPlayer.nativeElement.play();
    else this.videoPlayer.nativeElement.pause();

  }

  toogleMute() {
    this.videoPlayer.nativeElement.muted = !this.videoPlayer.nativeElement.muted;
  }

  toggleFullScreen() {
    if (!this.isFullScreen) {
      if (this.container.requestFullscreen) {
        this.container.requestFullscreen();
        this.isFullScreen = true;
      } else if (this.container.mozRequestFullScreen) {

        this.container.mozRequestFullScreen();
        this.isFullScreen = true;

      }
      else if (this.container.nativeElement.webkitRequestFullscreen) {
        console.log("state 3");
        this.container.nativeElement.webkitRequestFullscreen();
        this.isFullScreen = true;

      }
      else if (this.container.msRequestFullscreen) {
        this.container.nativeElement.msRequestFullscreen();
        this.isFullScreen = true;
      }
    } else {
      if (this.container.nativeElement.cancelFullScreen) {
        this.container.nativeElement.cancelFullScreen();
      } else if (this.container.nativeElement.mozCancelFullScreen) {
        this.container.nativeElement.mozCancelFullScreen();
      } else if (this.container.nativeElement.webkitCancelFullScreen) {
        this.container.nativeElement.webkitCancelFullScreen();
      }
    }

  }
}
