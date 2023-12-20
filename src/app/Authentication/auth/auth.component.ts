import { Component, OnInit } from '@angular/core';
import { AuthService, AuthResponseData } from '../shared/auth.service';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ACrudService } from '../shared/acrud.service';

/**
 * Component responsible for handling authentication.
 */
@Component({
  selector: 'app-auth-component',
  templateUrl: './auth-component.component.html',
  styleUrls: ['./auth-component.component.css']
})
export class AuthComponentComponent implements OnInit {
  // Flag indicating the current mode (login or signup)
  isLoginMode = true;

  // Flag indicating whether the authentication process is in progress
  isLoading = false;

  // Holds the error message, if any
  error: string = null;

  // Flag indicating if the user profile is set
  isProfileSet: boolean = false;

  /**
   * Initializes an instance of AuthComponentComponent.
   * @param authService The authentication service.
   * @param acrud The ACrud service.
   * @param router The router service.
   */
  constructor(
    private authService: AuthService,
    private acrud: ACrudService,
    private router: Router
  ) {}

  /**
   * Angular lifecycle hook called after component initialization.
   */
  ngOnInit(): void {}

  /**
   * Toggles between the login and signup modes.
   */
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  /**
   * Submits the authentication form.
   * @param form The NgForm object representing the form.
   */
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;

    if (this.isLoginMode) {
      // Perform login
      this.authService
        .SignIn(email, password)
        .then((authData) => {
          this.isLoading = false;

          // Subscribe to the LoginData observable to get user information
          this.authService.LoginData.subscribe((loginData) => {
            if (loginData.user.emailVerified) {
              this.getProfileByUid(loginData.user.uid);
            }
          });
        })
        .catch((error) => {
          this.isLoading = false;
          this.error = error.message;
        });
    } else {
      // Perform signup
      this.authService
        .SignUp(email, password)
        .then((signupData) => {
          this.isLoading = false;
          this.authService.logout();
        })
        .catch((error) => {
          this.authService.logout();
          this.isLoading = false;
          this.error = error;
        });
    }

    form.reset();
  }

  /**
   * Initiates the Google login process.
   */
  tryGoogleLogin() {
    this.isLoading = true;
    this.authService
      .doGoogleLogin()
      .then((googleLoginData) => {
        this.isLoading = false;
        this.getProfileByUid(googleLoginData.uid);
      });
  }

  /**
   * Retrieves the user profile based on the UID.
   * @param uid The UID of the user.
   */
  getProfileByUid(uid: string) {
    this.acrud.getProfileFromUid(uid).subscribe((profileData) => {
      let profileInfo = this.acrud.separate(profileData);
      this.isProfileSet = profileInfo[0];
      this.isLoading = false;

      if (this.isProfileSet) {
        // User profile is set, navigate to the home page
        this.router.navigate(['']);
      } else {
        // User profile is not set, navigate to the profile page
        this.router.navigate(['myprofile']);
      }
    });
  }
}