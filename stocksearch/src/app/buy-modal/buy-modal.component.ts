import { Component, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CompanyMeta } from '../company-meta';
import { StockStatistics } from '../stock-statistics';

@Component({
  selector: 'app-buy-modal',
  templateUrl: './buy-modal.component.html',
  styleUrls: ['./buy-modal.component.css']
})
export class BuyModalComponent {
  @Input() companyMeta: CompanyMeta;
  @Input() stockStatistics: StockStatistics;
  total: string = "0.00";

  constructor(private modalService: NgbModal) { }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy:'buy-modal-title'});
  }

  updateTotal(quantity: number): void {
    this.total = (this.stockStatistics.last * quantity).toFixed(2);
  }

}
