import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-editar-contas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './editar-contas.component.html',
  styleUrl: './editar-contas.component.css'
})
export class EditarContasComponent {
 
  mensagem: string = '';
  categorias: any[] = [];
  id: number = 0;
 
  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute
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


    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id') as string);


    this.httpClient.get(environment.apiFinancas + "/api/contas/" + this.id)
      .subscribe({
        next: (data : any) => {
          this.form.patchValue(data);


          this.form.controls.data.setValue(new Date(data.data).toISOString().substring(0, 10));
          this.form.controls.categoriaId.setValue(data.categoria.id);
        }
      });
  }


  onSubmit() {
    this.httpClient.put(environment.apiFinancas + "/api/contas/" + this.id, this.form.value)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.mensagem = "Conta atualizada com sucesso!";
        },
        error: (e) => {
          console.log(e.error);
        }
      })
  }
}