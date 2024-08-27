import { Routes } from '@angular/router';
import { AutenticarUsuarioComponent } from './components/autenticar-usuario/autenticar-usuario.component';
import { CriarUsuarioComponent } from './components/criar-usuario/criar-usuario.component';
import { CadastrarContasComponent } from './components/cadastrar-contas/cadastrar-contas.component';
import { ConsultarContasComponent } from './components/consultar-contas/consultar-contas.component';
import { EditarContasComponent } from './components/editar-contas/editar-contas.component';

export const routes: Routes = [
    {
        path: 'pages/autenticar-usuario',
        component: AutenticarUsuarioComponent
    },
    {
        path: 'pages/criar-usuario',
        component: CriarUsuarioComponent
    },
    {
        path: 'pages/cadastrar-contas',
        component: CadastrarContasComponent
    },
    {
        path: 'pages/consultar-contas',
        component: ConsultarContasComponent
    },
    {
        path: 'pages/editar-contas/:id',
        component: EditarContasComponent
    },
    {
        path: '', //rota default do projeto
        pathMatch: 'full',
        redirectTo: '/pages/autenticar-usuario'
    }
];
