import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Credentials } from '../../models/credentials.model';
import { UserService } from '../../services/user.service';
import { MessageEvent, Const } from '../../services/message-event.service';

@Component({
  selector: 'app-self-care-login',
  templateUrl: './self-care-login.component.html',
  styleUrls: ['./self-care-login.component.css'],
  providers: [UserService]
})


export class SelfCareLoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router,
    private messageEvent: MessageEvent
  ) {
    this.credentials = new Credentials('emerge', 'emerge');
  }

  isLoading: boolean = false;
  credentials: Credentials;
  message: string;

  login() {
    this.isLoading = true;
    this.message = null;
    this.userService.login(this.credentials).subscribe(
      user => {
        this.isLoading = false;
        this.messageEvent.fire(Const.AUTHENTICATION);
      },
      err => {
        this.isLoading = false;
        this.message = err.message || err.error || err;
      }
    )
  }

  ngOnInit() {

  }
}
