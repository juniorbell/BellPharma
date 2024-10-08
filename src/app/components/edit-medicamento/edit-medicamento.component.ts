import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Medicamento } from 'src/app/interfaces/medicamento';
import { MedicamentoService } from 'src/app/services/medicamento.service';

@Component({
  selector: 'app-edit-medicamento',
  templateUrl: './edit-medicamento.component.html',
  styleUrls: ['./edit-medicamento.component.css']
})
export class EditMedicamentoComponent implements OnInit {
  tipoForma: string[] = ['Gasosa', 'Líquida', 'Sólida', 'Semissólida'];
  form: FormGroup;
  maxDate: Date;
  loading: boolean = false;
  id: number | undefined;
  operacao: string = "Adicionar "

  constructor(public dialogRef: MatDialogRef<EditMedicamentoComponent>, private fb: FormBuilder, private _medicamentoService: MedicamentoService,
    private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.maxDate = new Date();
    this.form = this.fb.group({
      Laboratorio: [null],           
      nome_produto: [null],          
      forma_Farmaceutica: [null],    
      descricao: [null],             
      quantidade: [null],            
      data_val: [null],              
      data_lan: [null] 
    })
    this.id = data.id;
    // this.id=data.id;
  }
  addEditMedicamento() {
    if (this.form.valid) {
      return;
    }
    const medicamento: Medicamento = {
      laboratorio: this.form.value.laboratorio,
      nome_produto: this.form.value.nome_produto,
      forma_farmaceutica: this.form.value.tipoForma,
      descricao: this.form.value.descricao,
      quantidade: this.form.value.quantidade,
      data_lan: this.form.value.data_lan.toISOString().slice(0, 10),
      data_val: this.form.value.data_val.toISOString().slice(0, 10),
    }
    this.loading = true;
    if (this.id == undefined) {
      this._medicamentoService.addMedicamento(medicamento).subscribe(() => {
        this.msgExito('Adicionada com sucesso');
      })
    }
    else {
      this._medicamentoService.updateMedicamento(this.id, medicamento).subscribe(data => {
        this.msgExito('atualizada com sucesso');
      })
    }
    this.loading = false;
    this.dialogRef.close(true);
  }



  ngOnInit(): void {
    this.esEditar(this.id);
  }

  esEditar(id: number | undefined) {
    if (id !== undefined) {
      this.operacao = 'Editar ';
      this.getMedicamento(id);
    }

  }
  getMedicamento(id: number) {
    this._medicamentoService.getMedicamento(id).subscribe(data => {
      this.form.setValue({
        id: data.id,
        laboratorio: data.laboratorio,
        nome_produto: data.nome_produto,
        tipoForma: data.forma_farmaceutica,
        descricao: data.descricao,
        quantidade: data.quantidade,
        data_lan: new Date(data.data_lan),
        data_val: new Date(data.data_val)
      })
    })
  }

  cancelar() {
    this.dialogRef.close(false);
  }

  registrar() {

  }

  addMedicamento() {
    console.log('houve um erro ')
  }

  msgExito(operacao: string) {
    this._snackBar.open(`Medicamento foi ${operacao} com Sucesso`, '', {
      duration: 2000
    })
  }
}
