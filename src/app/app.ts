import { Component } from '@angular/core';
import { TodoComponent } from '../shared/Componts/todo/Todo';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TodoComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {}