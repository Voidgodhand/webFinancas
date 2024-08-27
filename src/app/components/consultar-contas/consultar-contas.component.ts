import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-consultar-contas',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './consultar-contas.component.html',
  styleUrl: './consultar-contas.component.css'
})
export class ConsultarContasComponent {


  contas: any[] = [];
  mensagem: string = '';


  constructor(
    private httpClient: HttpClient    
  ){}


  ngOnInit() {
    this.httpClient.get(environment.apiFinancas + '/api/contas')
      .subscribe({
        next: (data) => {
          this.contas = data as any[];
        }
      })
  }


  onDelete(id : number) {
    if(confirm('Deseja realmente excluir a conta selecionada?')) {
      this.httpClient.delete(environment.apiFinancas + '/api/contas/' + id)
      .subscribe({
        next: (data) => {
          this.mensagem = 'Contas excluídas com sucesso!';
          this.ngOnInit();
        }
      })
    }
  }


}