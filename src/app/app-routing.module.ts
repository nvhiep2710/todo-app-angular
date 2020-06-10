import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './components/todo/todo-list/todo-list.component';
import { LoginComponent } from './components/authencation/login/login.component';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './components/authencation/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'todo', canActivate: [AuthGuard], component: TodoListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
