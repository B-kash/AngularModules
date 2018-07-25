
import {VideoControls} from "./VideoControls";

export class VideoInputs{

  //this is for the source of video
  src:string;

  //this is for the playlist of videos i.e Array of sources
  srcList=[];

  //Boolean to show or not show control bar
  controls:boolean=true;

  //This is for the list of controls that will be shown to the users
  videoControls: VideoControls = new VideoControls();

  //This is for looping the same video again and again
  loop:boolean = false;

  //This is for autoplaying video
  autoplay:boolean = false;

}
