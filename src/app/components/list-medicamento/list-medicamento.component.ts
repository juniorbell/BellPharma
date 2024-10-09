import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Medicamento } from 'src/app/interfaces/medicamento';
import { MedicamentoService } from 'src/app/services/medicamento.service';
import { EditMedicamentoComponent } from '../edit-medicamento/edit-medicamento.component';


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
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private _medicamentoService: MedicamentoService, private _snackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource();
  }



  ngOnInit(): void {
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
    })
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
    this._medicamentoService.deleteMedicamento(id).subscribe(() => {
      this.obterMedicamentos();
      this.msgExito();
    })

  }

  msgExito() {
    this._snackBar.open('Medicamento Excluído com Sucesso', '', {
      duration: 4000
    })
  }

}


