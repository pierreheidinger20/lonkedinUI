import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { appReducers } from './app.reducer';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IntroComponent } from './profile/intro/intro.component';
import { ProfileComponent } from './profile/profile.component';
import { JsonAppConfigService } from './config/config.service';
import { AppConfig } from './config/app-config';
import { EditProfileComponent } from './profile/intro/edit-profile/edit-profile.component';
import { ErrorIntercept } from './common/error.interceptor';
import { TokenInterceptor } from './auth/token.interceptor';
import { ExperienceComponent } from './profile/experience/experience.component';
import { AddExperienceComponent } from './profile/experience/add-experience/add-experience.component';


export function initializerFn(jsonAppConfigService: JsonAppConfigService) {
  return () => {
    return jsonAppConfigService.load();
  };
}
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { EditExperienceComponent } from './profile/experience/edit-experience/edit-experience.component';
import { EducationComponent } from './profile/education/education.component';
import { AddEducationComponent } from './profile/education/add-education/add-education.component';
import { EditEducationComponent } from './profile/education/edit-education/edit-education.component';
import { AddSkillComponent } from './profile/skill/add-skill/add-skill.component';
import { SkillComponent } from './profile/skill/skill.component';

// export const options: Partial<IConfig> | (() => Partial<IConfig>) = null ;


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    IntroComponent,
    NavbarComponent,
    ProfileComponent,
    EditProfileComponent,
    ExperienceComponent,
    AddExperienceComponent,
    EditExperienceComponent,
    EducationComponent,
    AddEducationComponent,
    EditEducationComponent,
    SkillComponent,
    AddSkillComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(appReducers),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    NgbModule,
    NgxMaskModule.forRoot()
    
  ],
  providers: [
    {
      provide: AppConfig,
      deps: [HttpClient],
      useExisting: JsonAppConfigService
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [JsonAppConfigService],
      useFactory: initializerFn
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorIntercept,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
