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
    private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.maxDate = new Date();
    this.form = this.fb.group({
      laboratorio: [null, Validators.required],           
      nome_produto: [null, Validators.required],          
      forma_farmaceutica: [null],    
      descricao: [null],             
      quantidade: [null],            
      data_val: [null],              
      data_lan: [null] 
    });
    this.id = data.id;
  }
  addEditMedicamento() {
    if (!this.form.valid) {
      return;
    }
    const medicamento: Medicamento = {
      laboratorio: this.form.value.laboratorio,
      nome_produto: this.form.value.nome_produto,
      forma_farmaceutica: this.form.value.forma_farmaceutica,
      descricao: this.form.value.descricao,
      quantidade: this.form.value.quantidade,
      data_lan: this.form.value.data_lan.toISOString().slice(0, 10),
      data_val: this.form.value.data_val.toISOString().slice(0, 10),
    };
    this.loading = true;
    if (this.id === undefined) {
      this._medicamentoService.addMedicamento(medicamento).subscribe(() => {
        this.msgExito('Adicionada com sucesso');
        this.dialogRef.close(true); // Fechar o diálogo após a adição
      }, error => {
        console.error('Erro ao adicionar medicamento:', error);
        this.loading = false;
        this.addMedicamento(); // Mensagem de erro
      });
    } else {
      this._medicamentoService.updateMedicamento(this.id, medicamento).subscribe(() => {
        this.msgExito('atualizada com sucesso');
        this.dialogRef.close(true); // Fechar o diálogo após a atualização
      }, error => {
        console.error('Erro ao atualizar medicamento:', error);
        this.loading = false;
        this.addMedicamento(); // Mensagem de erro
      });
    }
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
        laboratorio: data.laboratorio || '', // Defina um valor padrão
        nome_produto: data.nome_produto || '', // Certifique-se de que este campo não está vazio
        forma_farmaceutica: data.forma_farmaceutica || '',
        descricao: data.descricao || '',
        quantidade: data.quantidade || null,
        data_lan: data.data_lan ? new Date(data.data_lan) : null,
        data_val: data.data_val ? new Date(data.data_val) : null,
      });
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
