import { Component, OnInit, Input } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos$: Observable<Todo[]>;
  hasTodo$: Observable<boolean>;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todoService.fetchFromLocalStorage();
    this.hasTodo$ = this.todoService.length$.pipe(map((length) => length > 0));
    this.todos$ = this.todoService.todos$;
  }
  onChangeStatusTodo(todo: Todo) {
    this.todoService.changeStatus(todo.id, todo.isCompleted);
  }
  onEditTodo(todo: Todo) {
    this.todoService.editTodo(todo.id, todo.content);
  }
  onDeleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo.id);
  }
}
