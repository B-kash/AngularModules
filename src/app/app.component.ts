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
    this.videoInputs.src = "http://localhost:8000/SampleVideo_720x480_10mb.mp4";

  }

  changeSrc(){}
}
