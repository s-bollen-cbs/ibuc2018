import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// google maps core
import { AgmCoreModule } from '@agm/core';
// Blaise imports
import { BlaiseCoreModule, ModelService, ActionService, FontService } from '@blaise/core';
// Environment variables
import { environment } from '../environments/environment';
// Custom services
import { CustomModelService } from './services/custom-model/custom-model.service';
import { CustomActionService } from './services/custom-action/custom-action.service';
import { CustomFontService } from './services/custom-font/custom-font.service';
import { MapService } from './services/map/map.service';
// Custom components
import { AppComponent } from './app.component';
import { HelpTextComponent } from './components/help-text/help-text.component';
import { MapComponent } from './components/map/map.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        CommonModule,
        BlaiseCoreModule,
        AgmCoreModule.forRoot({
            apiKey: environment.googleApiKey
        })
    ],
    entryComponents: [
        AppComponent,
        HelpTextComponent,
        MapComponent
    ],
    declarations: [
        AppComponent,
        HelpTextComponent,
        MapComponent
    ],
    providers: [
        { provide: ModelService, useClass: CustomModelService },
        { provide: ActionService, useClass: CustomActionService },
        // Workaround for security update in browsers
        { provide: FontService, useClass: CustomFontService },
        MapService
    ],
    bootstrap: [
        AppComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
