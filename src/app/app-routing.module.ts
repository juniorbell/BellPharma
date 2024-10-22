import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListMedicamentoComponent } from './components/list-medicamento/list-medicamento.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'list-medicamentos', component: ListMedicamentoComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
