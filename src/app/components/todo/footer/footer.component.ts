import { Component, OnInit } from '@angular/core';
import { FilterButton, Filter } from 'src/app/models/filtering.model';
import { TodoService } from 'src/app/services/todo.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  filterButtons: FilterButton[] = [
    { type: Filter.All, label: 'All', isActive: true },
    { type: Filter.Active, label: 'Active', isActive: false },
    { type: Filter.Completed, label: 'Completed', isActive: false },
  ];

  length = 0;

  hasComplete$: Observable<boolean>;
  destroy$: Subject<null> = new Subject<null>();

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.hasComplete$ = this.todoService.todos$.pipe(
      map((todos) => todos.some((t) => t.isCompleted)),
      takeUntil(this.destroy$)
    );

    this.todoService.length$
      .pipe(takeUntil(this.destroy$))
      .subscribe((length) => {
        this.length = length;
      });
  }

  filter(type: Filter) {
    this.setActiveFilterBtn(type);
    this.todoService.filterTodos(type);
  }

  private setActiveFilterBtn(type: Filter) {
    this.filterButtons.forEach((btn) => {
      btn.isActive = btn.type === type;
    });
  }
  clearTodoComplete() {
    this.todoService.clearCompleted();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
