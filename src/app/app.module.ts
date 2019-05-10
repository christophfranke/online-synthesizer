import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms'

import { AppComponent } from './app.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { KeyComponent } from './key/key.component';
import { AdsrComponent } from './adsr/adsr.component';
import { MasterComponent } from './master/master.component';
import { FaderComponent } from './fader/fader.component';
import { SwitchComponent } from './switch/switch.component';
import { OscillatorComponent } from './oscillator/oscillator.component';
import { FilterComponent } from './filter/filter.component';
import { DelayComponent } from './delay/delay.component';

@NgModule({
  declarations: [
    AppComponent,
    KeyboardComponent,
    KeyComponent,
    AdsrComponent,
    MasterComponent,
    FaderComponent,
    SwitchComponent,
    OscillatorComponent,
    FilterComponent,
    DelayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
