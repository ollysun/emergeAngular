import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { SessionService } from './services/session.service';
import { MessageEvent, Const } from './services/message-event.service';
import { SnackBar } from './services/snack-bar.service';
import { User } from './models/user.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})

export class AppComponent {
  menu = [];
  isSessionLoading: boolean = false;
  currentUser: User = null;
  translations: any = {};
  constructor(translate: TranslateService, private userService: UserService,
    private messageEvent: MessageEvent, private router: Router,
    private sessionService: SessionService,
    private snackBar: SnackBar, private viewContainerRef: ViewContainerRef) {
    const cb = _ => { };
    this.isSessionLoading = true;
    userService.session().subscribe(user => {
      this.isSessionLoading = false
      this.processAuthourization();
      messageEvent.fire(Const.AUTHENTICATION);
    }, cb);
    translate.setDefaultLang('pt');
    translate.use('pt');
    translate.get(['CUSTOMERS', 'PAYPHONES', 'LOGIN',
      'UNAUTHORIZED']).subscribe((result) => {
        this.translations = result;
        this.menu = [{
          name: 'Home',
          link: '/'
        },
          {
            name: result.CUSTOMERS,
            link: 'backoffice/customers'
          }, {
            name: result.PAYPHONES,
            link: 'backoffice/payphone-services'
          }
        ];
      });

    this.registerEvents();
  }

  processAuthourization() {
    if (!this.isSessionLoading) {
      // this.router.navigate(['/login']);
      // this.snackBar.open(this.translations.UNAUTHORIZED ||
      //   'Unaithorized Access', this.viewContainerRef);
    }
  }

  registerEvents() {
    this.router.events.subscribe((a) => {
      if (a.url.indexOf('/backoffice') >= 0) {
        if (this.currentUser && this.currentUser.role === 'bo-admin') {
          return true;
        } else {
          if (!a.url.match(/\\|login/i)) {
            this.userService.setRedirectURL(a.url);
          }

          this.processAuthourization();
          return false;
        }
      }
    });

    this.messageEvent.on()
      .subscribe(message => {
        switch (message) {
          case Const.AUTHENTICATION:
            this.currentUser = this.sessionService.getCurrentUser();
            const url: string = this.userService.getRedirectURL();
            if (url) {
              this.router.navigate([this.userService.getRedirectURL()]);
              this.userService.setRedirectURL(null);
            } else {
              if (this.currentUser && this.currentUser.role === 'bo-admin') {
                this.router.navigate(['/backoffice/customers']);
              }
            }
            break;
        }
      });
  }

  logout() {
    this.userService.logout().subscribe(res => {
      this.router.navigate(['/']);
      this.messageEvent.fire(Const.AUTHENTICATION);
    });
  }

  hasSubmenu(item) {
    return Array.isArray(item);
  }
}
