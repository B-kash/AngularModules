import {Component, OnInit} from '@angular/core';
import {VideoInputs} from "./media-player/video-player/VideoInputs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app works!';

  videoInputs:VideoInputs = new VideoInputs();

  ngOnInit(){
    this.videoInputs.src = "http://127.0.0.1:8000/Sintel - Third Open Movie by Blender Foundation.mp4";
    this.videoInputs.subtitleSrc = "http://127.0.0.1:8000/sub.vtt";

  }

  changeSrc(){}
}
