import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-cadastrar-contas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './cadastrar-contas.component.html',
  styleUrl: './cadastrar-contas.component.css'
})
export class CadastrarContasComponent {


  mensagem: string = '';
  categorias: any[] = [];
 
  constructor(
    private httpClient: HttpClient
  ) {}


  form = new FormGroup({
    nome : new FormControl('', [Validators.required, Validators.minLength(8)]),
    data : new FormControl('', [Validators.required]),
    preco : new FormControl('', [Validators.required]),
    tipo : new FormControl('', [Validators.required]),
    categoriaId : new FormControl('', [Validators.required])
  });


  get f() {
    return this.form.controls;
  }


  ngOnInit() {
    this.httpClient.get(environment.apiFinancas + "/api/categorias")
      .subscribe({
        next: (data) => {
          this.categorias = data as any[];
        }
      })
  }


  onSubmit() {
    this.httpClient.post(environment.apiFinancas + "/api/contas", this.form.value)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.mensagem = "Conta cadastrada com sucesso!";
          this.form.reset();
        },
        error: (e) => {
          console.log(e.error);
        }
      })
  }
}