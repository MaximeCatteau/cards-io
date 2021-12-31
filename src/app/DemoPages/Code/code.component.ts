import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styles: []
})
export class CodeComponent implements OnInit {

  isLoading = true;
  username = null;
  cardWin: any;

  closeResult: string | undefined;

  codeForm = new FormGroup({
    codeValue: new FormControl('')
  });

  constructor(public api: ApiService, public route: ActivatedRoute, public router: Router, private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  open(content: any) {
    console.log(this.codeForm.value.codeValue);

    if (this.codeForm.value.codeValue == 1311) {
      console.log("YES");
      this.cardWin = {};
      this.cardWin.id = 0;
      this.cardWin.label = "Session MindOut - Lille";
      this.cardWin.imageUrl = "https://lille.citycrunch.fr/wp-content/uploads/sites/6/2020/07/minout_lille-1024x769.jpg";
      this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
    
    /*if (!localStorage['token']) {
      this.router.navigate(['']);
    }

    this.api.codeService.consumeCode(localStorage['token'], this.codeForm.value.codeValue).subscribe((card: any) => {
      this.cardWin = card[0];

      this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    });*/
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
