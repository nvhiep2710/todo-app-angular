import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;

  @Output() changeStatus: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() editTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter<Todo>();

  isHovered = false;
  isEditing = false;
  todoReset;
  constructor() {}

  ngOnInit() {
    this.todoReset = { ...this.todo };
  }

  changeTodoStatus() {
    this.changeStatus.emit({
      ...this.todo,
      isCompleted: !this.todo.isCompleted,
    });
  }
  submitEdit(event: KeyboardEvent) {
    const { keyCode } = event;
    event.preventDefault();
    if (keyCode === 13) {
      this.editTodo.emit(this.todo);
      this.isEditing = false;
    }
  }
  handleDeleteTodo() {
    this.deleteTodo.emit({
      ...this.todo,
    });
  }
  handleCancel() {
    this.isEditing = false;
    this.todo = { ...this.todoReset };
  }
}
