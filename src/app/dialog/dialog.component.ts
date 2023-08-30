import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MeetingModel } from '../models/meeting.model';
import { RepositoryService } from '../services/repository.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  @Input() content: { type: string, dataInfo: string, id: number } | undefined;
  dataInfo: string = '';

  errorMessage = false;
  successMessage = false;
  endpoint = '';

  message = '';
  
  constructor(
    public router: Router,
    public activeModal: NgbActiveModal,
    private repo: RepositoryService<MeetingModel>
  ) { }

  delete() {
    this.endpoint = this.content?.type + 's';
    let id = this.content?.id;

    this.del(id != undefined ? id : -1, this.endpoint);
  }

  private del(id: number, endpoint: string) {
    this.repo.delete(id, endpoint).subscribe(
      (resp) => {
        this.successMessage = true;
        this.message = resp.message
      },
      (error) => {
        this.errorMessage = true;
        this.message = `Something went wrong while deleting a ${this.content?.type}: ${this.content?.dataInfo}. Try again.`;
        console.error(`error deleting ${this.content?.type}: `, error);
      }
    );
  }

  close() {
    console.log('this.endpoint: ', this.endpoint)
    if (this.endpoint != '')
      this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
        this.router.navigate(['' + this.endpoint]);
      });

    this.activeModal.close('Close click');
  }
}
