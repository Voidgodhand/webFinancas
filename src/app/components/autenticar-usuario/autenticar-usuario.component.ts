import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-autenticar-usuario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './autenticar-usuario.component.html',
  styleUrl: './autenticar-usuario.component.css'
})
export class AutenticarUsuarioComponent {

  //variáveis do componente
  mensagem: string = '';

  //construtor para injeção de dependência
  constructor(
    private httpClient: HttpClient
  ) {}

  //criando a estrutura do formulário
  form = new FormGroup({
    /* campo 'email' */
    email: new FormControl('', [Validators.required, Validators.email]),
    /* campo 'senha' */
    senha: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  //função para verificar os erros de validação de cada campo
  get f() {
    return this.form.controls;
  }

  //função para capturar o evento de submit do formulário
  onSubmit() {
    
    //fazendo a requisição para a API (autenticação do usuário)
    this.httpClient.post(environment.apiUsuarios + '/api/usuarios/autenticar', this.form.value)
      .subscribe({ //aguardando o retorno da API
        next: (data: any) => { //capturando a resposta de sucesso obtido da API
          
          //gravar os dados obtidos na local storage do navegador
          localStorage.setItem('auth', JSON.stringify(data));

          //redirecionar para a página de consulta de finanças
          location.href = '/pages/consultar-contas';

        },
        error: (e) => { //capturando a resposta de erro obtido da API
          //imprimindo mensagem de acesso negado
          this.mensagem = e.error[0];
        }
      });
  }
}
