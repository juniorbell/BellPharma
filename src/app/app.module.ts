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






@NgModule({
  declarations: [
    AppComponent,
    CadastroComponent,
    ListMedicamentoComponent,
    EditMedicamentoComponent,
    HeaderComponent,
    SplashScreenComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    BrowserAnimationsModule,
    SharedModule,
    NgxPaginationModule
    
    

  ],
  providers: [{
    provide: MAT_DATE_LOCALE, useValue: 'pt'
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

