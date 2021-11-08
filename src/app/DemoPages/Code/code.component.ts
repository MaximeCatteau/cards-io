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
  cardWin;

  closeResult: string;

  codeForm = new FormGroup({
    codeValue: new FormControl('')
  });

  constructor(public api: ApiService, public route: ActivatedRoute, public router: Router, private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  validCode() {
    console.log(this.codeForm.value.codeValue);
    
  }

  open(content) {
    this.api.codeService.consumeCode(localStorage.user, this.codeForm.value.codeValue).subscribe((card) => {
      console.log(card);
      
      this.cardWin = card[0];

      this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    });
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
