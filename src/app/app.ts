import { Component } from '@angular/core';
import { LoadingService } from './core/services/loading';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss',
})
export class App {
  constructor(public loadingService: LoadingService) {}
}
