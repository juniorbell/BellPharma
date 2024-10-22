import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutModule } from '@angular/cdk/layout';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { EditMedicamentoComponent } from './components/edit-medicamento/edit-medicamento.component';
import { ListMedicamentoComponent } from './components/list-medicamento/list-medicamento.component';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoginComponent } from './login/login.component';
import { AuthModule } from '@auth0/auth0-angular';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth/auth.service';







@NgModule({
  declarations: [
    AppComponent,
    CadastroComponent,
    ListMedicamentoComponent,
    EditMedicamentoComponent,
    HeaderComponent,
    SplashScreenComponent,
    LoginComponent

  ],
  imports: [
    BrowserModule,
    LayoutModule,
    BrowserAnimationsModule,
    SharedModule,
    NgxPaginationModule,
    AuthModule.forRoot({
      domain: 'dev-m1u3ec0lxneslh1m.us.auth0.com',
      clientId: 'g8KCs3Z5yytXVIvO6SurYiNaASl4bvkn',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
       }),
    AppRoutingModule,
    FormsModule

    
    

  ],
  providers: [AuthService, {
    provide: MAT_DATE_LOCALE, useValue: 'pt'
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

