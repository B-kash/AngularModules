import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {VideoPlayerComponent} from "./media-player/video-player/video-player.component";
import { TestComponent } from './test/test.component';
import {Api} from "./media-player/api.service";

@NgModule({
  declarations: [
    AppComponent,
    VideoPlayerComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [Api],
  bootstrap: [AppComponent]
})
export class AppModule { }
