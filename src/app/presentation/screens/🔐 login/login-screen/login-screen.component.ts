import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrl: './login-screen.component.scss'
})
export class LoginScreenComponent implements OnInit{

  username = ""
  password = ""

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void { // logica per capire se è gia stato effettuato login
    if (localStorage.getItem('jwt') != null) {
      // Reindirizza manualmente
      this.router.navigateByUrl('/alerts');
    }
  }


  async onSubmit() {
    try {
      const response = await this.authenticationService.login(this.username, this.password)
      console.log('Login effettuato con successo:', response)


      localStorage.setItem("jwt", (response as any).jwt)
      this.router.navigate(['/alerts'])

    } catch (error) {
      console.error('Errore durante il login:', error);
      window.alert("Login Failed.");

    }

  }


}
