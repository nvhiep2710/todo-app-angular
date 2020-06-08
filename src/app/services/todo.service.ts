import { Injectable } from '@angular/core';
im

@Injectable({
  providedIn: 'root',
})
export class TodoService {


  private static readonly TodoStorageKey = 'todos';
  private todos: Todo[];
  private filteredTodos: Todo[];
  private lengthSubject: BehaviorSubject<number> = new BehaviorSubject<
    number
  >();
  private displayTodosSubject: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>({});
  private currentFilter: Filter = Filter.All;

  todos$: Observable<Todo[]> = this.displayTodosSubject.asObservable();

  length$: Observable<Todo[]> = this.lengthSubject.asObservable();

  constructor(private storageService: LocalStorageService) {}

  fetchFromLocalStrorage() {
    this.todos = this.storageService.getValue<Todo[]>(TodoService.TodoStorageKey) || [];
    this.filteredTodos = [...this.todos.map(todo => ({...todo})];
    this.updateTodosData();
  }


  updateToLocalStorage() {
    this.storageService.setObject(TodoService.TodoStorageKey, this.todos);
    this.filterTodos(this.currentFilter, false);
    this.updateTodosData();
  }

  filterTodos(filter : Filter, isFiltering: boolean = true){
    this.currentFilter = filter;
    switch(filter){
      case filter.Active:
        this.filteredTodos = this.todos.filter(todo => !todo.isCompleted);
        break;
        case filter.Completed:
        this.filteredTodos = this.todos.filter(todo => todo.isCompleted);
        break;
        case filter.All:
        this.filteredTodos = [...this.todos.filter(todo => ({...todo}))];
        break;
    }
  }

  private updateTodosData(){
    this.displayTodosSubject.next(this.filteredTodos);
    this.lengthSubject.next(this.todos.length);
  }
  
}
