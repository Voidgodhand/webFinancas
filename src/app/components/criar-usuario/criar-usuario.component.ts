import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-criar-usuario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './criar-usuario.component.html',
  styleUrl: './criar-usuario.component.css'
})
export class CriarUsuarioComponent {

  //atributos
  mensagemSucesso: string = '';
  mensagemErro: string = '';

  //método construtor para injeção de dependência
  constructor(
    private httpClient: HttpClient
  ) { }

  //criando o formulário para cadastro do usuário
  form = new FormGroup({
    nome : new FormControl('', [
      Validators.required, 
      Validators.minLength(8)
    ]),
    email : new FormControl('', [
      Validators.required, 
      Validators.email
    ]),
    senha : new FormControl('', [
      Validators.required, 
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    ])
  });

  //função para retornar o estado de cada campo
  //e então exbir uma mensagem de erro de validação
  get f() {
    return this.form.controls;
  }

  //função para submeter o formulário
  onSubmit() {

    //limpar as mensagens
    this.mensagemSucesso = '';
    this.mensagemErro = '';
    
    //fazendo a requisição para a API
    this.httpClient.post(environment.apiUsuarios + "/api/usuarios/criar", this.form.value)
      .subscribe({ //capturando o retorno da requisição
        next: (data: any) => { //recebendo o retorno de sucesso
          this.mensagemSucesso = `Parabéns, ${data.nome}, seu cadastro foi realizado com sucesso!`;
          this.form.reset(); //limpar o formulário
        },
        error: (e) => { //recebendo o retorno de erro
          this.mensagemErro = e.error[0];
        }
      });
  }

}
