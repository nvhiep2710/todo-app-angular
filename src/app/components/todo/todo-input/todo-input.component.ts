import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css'],
})
export class TodoInputComponent implements OnInit {
  todoContent = '';

  constructor(private TodoService: TodoService) {}

  ngOnInit() {}

  onSubmit(value: string) {
    if (this.todoContent.trim() === '') {
      return false;
    }
    this.TodoService.addTodo(this.todoContent);
    this.todoContent = '';
  }
}
