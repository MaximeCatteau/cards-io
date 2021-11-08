import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from 'src/app/models/player';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
})
export class ConnexionComponent implements OnInit {

  heading = 'Connexion';
  subheading = 'This is an example dashboard created using build-in elements and components.';
  icon = 'pe-7s-plane icon-gradient bg-tempting-azure';

  signInForm = new FormGroup({
    pseudoConnexion: new FormControl(''),
    passwordConnexion: new FormControl(''),
  });

  signUpForm = new FormGroup({
    pseudoInscription: new FormControl(''),
    passwordInscription: new FormControl(''),
  });

  constructor(public api: ApiService, public router: Router) {

  }

  ngOnInit() {
  }

  public connect() {
    this.api.userService.signIn(this.signInForm.value.pseudoConnexion, this.signInForm.value.passwordConnexion).subscribe((user: Player) => {
      localStorage.setItem('user', user.username);
      localStorage.setItem('userCash', user.cashCard);
      
      window.location.reload();
      this.router.navigate(['cards']);
    });
  }

  public signUp() {
    this.api.userService.signUp(this.signUpForm.value.pseudoInscription, this.signUpForm.value.passwordInscription).subscribe((user: Player) => {
      localStorage.setItem('user', user.username);
      localStorage.setItem('userCash', user.cashCard);

      window.location.reload();
      this.router.navigate(['cards']);
    });
  }

}
