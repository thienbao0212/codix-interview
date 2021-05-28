import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CodixInterview';
  showProfile = false;

  goProfile(event) {
    if (event) this.showProfile = true;
  }

  outProfile(event){
    if (event) this.showProfile = false;
  }
}
