import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { TodoListComponent } from './components/todo/todo-list/todo-list.component';
import { TodoItemComponent } from './components/todo/todo-item/todo-item.component';
import { FooterComponent } from './components/todo/footer/footer.component';
import { TodoInputComponent } from './components/todo/todo-input/todo-input.component';
import { HeaderComponent } from './components/todo/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/authencation/login/login.component';
import { RegisterComponent } from './components/authencation/register/register.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth.guard';
import { NavigationHeaderComponent } from './layouts/navigation-header/navigation-header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    HeaderComponent,
    TodoListComponent,
    TodoItemComponent,
    FooterComponent,
    TodoInputComponent,
    LoginComponent,
    RegisterComponent,
    NavigationHeaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
