import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Medicamento } from 'src/app/interfaces/medicamento';
import { MedicamentoService } from 'src/app/services/medicamento.service';
import { EditMedicamentoComponent } from '../edit-medicamento/edit-medicamento.component';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas';
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-list-medicamento',
  templateUrl: './list-medicamento.component.html',
  styleUrls: ['./list-medicamento.component.css']
})
export class ListMedicamentoComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nome', 'forma_farmaceutica', 'descricao', 'laboratorio', 'quantidade', 'data_lan', 'data_val', 'acoes'];
  dataSource: MatTableDataSource<Medicamento>;
  loading: boolean = false;
  showSplash = true;
  currentDate: Date;
  currentTime: Date;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private _medicamentoService: MedicamentoService, private _snackBar: MatSnackBar, private http: HttpClient, private auth: AuthService, private cdr: ChangeDetectorRef) {
    this.dataSource = new MatTableDataSource();
    this.currentDate = new Date()
    this.currentTime = new Date()
  }

  isAdmin: boolean = false;


  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      this.isAdmin = user ? user['role'] === 'admin' : false;
      console.log('User role:', user ? user['role'] : 'No user');
      this.cdr.detectChanges();
    });
    this.obterMedicamentos();
    setTimeout(() => {
      this.showSplash = false;
    }, 1500);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  
}
  obterMedicamentos(): void {
    this._medicamentoService.getMedicamentos().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();   
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addEditMedicamento(id?: number) {
    const dialogRef = this.dialog.open(EditMedicamentoComponent, {
      width: '550px',
      disableClose: true,
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.obterMedicamentos();
      }
    });
  }

  deleteMedicamento(id: number) {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Você não poderá reverter essa situação',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Excluir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._medicamentoService.deleteMedicamento(id).subscribe(() => {
          this.obterMedicamentos();
          this.msgExito();
          Swal.fire({
            title: 'Excluído!',
            text: 'O medicamento foi excluído com sucesso.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        });
      } else if (result.isDismissed) {
        Swal.fire({
          title: 'Cancelado',
          text: 'Cancelada com sucesso.',
          icon: 'info',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  msgExito() {
    this._snackBar.open('Medicamento Excluído com Sucesso', '', {
      duration: 4000
    });
  }

  gerarPDF() {
    const data = document.getElementById('tabela-medicamentos');
    if (data) {
      data.classList.remove('hidden'); // Remove a classe oculta
      html2canvas(data).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
  
        const imgWidth = 190; 
        const pageHeight = pdf.internal.pageSize.height;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
  
        let position = 0;
  
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        this.currentDate = new Date();
        this.currentTime = new Date();

  
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
  
        pdf.save('tabela de medicamentos.pdf');
        data.classList.add('hidden'); 
      }).catch(error => {
        console.error('Erro ao gerar PDF:', error);
      });
    } else {
      console.error('Tabela não encontrada!');
    }
  }


  logout() {
    this.auth.logout().subscribe(() => {
      window.location.href = window.location.origin;
    })
  }
  
}
