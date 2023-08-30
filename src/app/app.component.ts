import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'clientask';

  isClientLogedin: boolean = false;

  isClientActive = false;
  isMeetingActive = false;

  // client: ClientModel;

  ngOnInit() {
    this.isClientLogedin = false;

    this.activateCurrentPage();

    this.isClientActive = true;
  }

  private activateCurrentPage() {
    console.log("url", this.router.url);

    if(this.router.url === "/clients")
      this.activateClient();

  }

  constructor(
    public router: Router,
  ) { }


  navigateToMeeting() {
    this.router.navigate(['meetings']);
    this.isMeetingActive = true;
    this.isClientActive = false;
  }

  navigateToClient() {
    this.router.navigate(['clients'])
    this.activateClient();
  }

  activateClient() {
    this.isClientActive = true;
    this.isMeetingActive = false;
  }
}
