import { Component } from '@angular/core';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'todo-app';

  hasTodo$: Observable<boolean>;

  constructor(private todoService: TodoService) {}
  ngOnInit() {
    this.todoService.fetchFromLocalStrorage();
    this.hasTodo$ = this.todoService.length$.pipe(map((length) => length > 0));
  }
}
