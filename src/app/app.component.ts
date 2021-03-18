import { ThemeService } from './services/theme.service';
import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'rocket-ball-stats'

    constructor(private themeService: ThemeService) {
        // Load Color Scheme
        this.themeService.load()
    }
}
