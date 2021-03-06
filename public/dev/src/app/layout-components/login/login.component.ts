import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthenticationService} from '../../services/authentication.service';
import {HttpClientService} from '../../services/httpClient.service';
import {LoggingService} from '../../services/logging.service';
import {ToastrHelperService} from '../../services/helpers/toastr.helper';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    public user: any = {
        username: "",
        password: ""
    };

    /**
     *
     */
    constructor(private authenticationService: AuthenticationService
        , private httpClientService: HttpClientService
        , private router: Router
        , private loggingService: LoggingService
        , private toastrHelperService: ToastrHelperService) {
    }

    ngOnInit() {

    }

    public postAuthentication(): void {
        this.httpClientService.post('authentication', {"user": this.user}).subscribe(
            (success: any) => {
                // /* SAVE TOKEN */
                this.authenticationService.authenticateToken = success['token'];
                this.getAuthorization(this.authenticationService.authenticateToken);
            },
            (error: any) => {
                this.toastrHelperService.showToastr('error', error['error']);
            }
        )
    }

    public getAuthorization(token: string): void {
        this.httpClientService.createHeaderFromToken(token);
        this.httpClientService.get('authorization').subscribe(
            (success: any) => {
                /* SAVE USER */
                this.authenticationService.authenticateUser = success['user'];

                /* SAVE ROLE */
                let array_role = success['roles'];
                this.authenticationService.authenticateRole = [];
                for (let i = 0; i < array_role.length; i++) {
                    this.authenticationService.authenticateRole.push(array_role[i]);
                }

                /* SAVE GROUP ROLE */
                let array_group_role = success['group_roles'];
                this.authenticationService.authenticateGroupRole = [];
                for (let i = 0; i < array_group_role.length; i++) {
                    this.authenticationService.authenticateGroupRole.push(array_group_role[i]);
                }

                this.loggingService.consoleLog("%c LoginComponent", "color: purple");
                this.loggingService.consoleLog("%c Role", "color: purple");
                this.loggingService.consoleTable(this.authenticationService.authenticateRole);
                this.loggingService.consoleLog("%c User", "color: purple");
                this.loggingService.consoleLog(this.authenticationService.authenticateUser);
                this.loggingService.consoleLog("%c --------------", "color: purple");

                /* SAVE AUTH */
                this.authenticationService.createAuthLocalStorage();
                this.authenticationService.notifyAuthenticate(true);
                this.router.navigate(['/dashboards']);
            },
            (error: any) => {
                this.toastrHelperService.showToastr('error', error['error']);
            }
        );
    }
}
