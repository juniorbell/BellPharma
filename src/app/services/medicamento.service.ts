import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Medicamento } from '../interfaces/medicamento';
@Injectable({
  providedIn: 'root'
})

export class MedicamentoService {
  private myAppUrl: string;
  private myApiUrl: string;


  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/medicamentos/'

  }


  getMedicamentos(): Observable<Medicamento[]> {
    return this.http.get<Medicamento[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }


  deleteMedicamento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  addMedicamento(medicamento: Medicamento): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, medicamento);
  }

  updateMedicamento(id: number, medicamento: Medicamento): Observable<Medicamento> {
    return this.http.put<Medicamento>(`${this.myAppUrl}${this.myApiUrl}${id}`, medicamento);
  }

  getMedicamento(id: number): Observable<Medicamento> {
    return this.http.get<Medicamento>(`${this.myAppUrl}${this.myApiUrl}${id}`)

  }

}
