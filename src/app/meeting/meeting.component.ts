import { Component,  OnInit } from '@angular/core';
import { MeetingModel } from '../models/meeting.model';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogComponent } from '../dialog/dialog.component';
import { RepositoryService } from '../services/repository.service';

declare var window: any;

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {

  datetime: string = 'datetime-local';
  changeStartDateText = 'Change start date';
  isChangeStartlicked = false;
  numClicked = 0;

  myDilalog: any;

  meeting: MeetingModel = new MeetingModel();

  isViewAllMeeting = false;

  meetings$: Observable<MeetingModel[]> = new Observable<MeetingModel[]>();

  message = '';

  successMessage = false;
  errorMessage = false;

  constructor(
    private modalService: NgbModal,
    private repo: RepositoryService<MeetingModel>
  ) {
  }

  ngOnInit() {
  }

  schedualMeeting() {
    console.log("executing schedualMeeting method", this.meeting);

    if (this.meeting.id === undefined || this.meeting.id === null)
      this.saveNewMeeting(this.meeting);

    if (this.meeting.id != null)
      this.saveUpdateMeeting(this.meeting);

    this.newMeeting();
  }

  fetchMeetings() {
    this.isViewAllMeeting = true;
    this.meetings$ = this.repo.fetchAll('meetings');
  }

  newMeeting() {
    this.isViewAllMeeting = false;
    this.meeting = new MeetingModel();
  }

  editMeeting(meeting: MeetingModel) {
    this.datetime = 'datetime'
    this.isViewAllMeeting = false;
    this.meeting = meeting
  }

  showDeleteDialog(meeting: MeetingModel) {
    console.log('meeting: ', meeting.topic)
    const modalRef = this.modalService.open(DialogComponent);
    modalRef.componentInstance.content = {type: 'meeting', dataInfo: 'with topic: ' + meeting.topic, id: meeting.id}
  
  }

  changeInputDateType() {
    console.log("numClick: ", this.isChangeStartlicked)

    if (this.isChangeStartlicked === false) {
      console.log("isChangeStartlicked: ")
      this.changeStartDateText = 'Show current start date';
      this.datetime = 'datetime-local'
    }

    if (this.isChangeStartlicked === true) {
      this.changeStartDateText = 'Change start date';
      this.datetime = 'datetime'
      this.meeting.start_date = new DatePipe('en-US').transform(this.meeting.start_date, 'yyyy-MM-dd HH:mm:ss')
      this.numClicked++;
    }

    this.isChangeStartlicked = true;

    if (this.numClicked > 1) {
      this.isChangeStartlicked = false;
      this.numClicked = 0
    }

    this.numClicked++;

  }

  private saveNewMeeting(meeting: MeetingModel) {
    console.log("executing saveNewMeeting method", this.meeting);
    this.repo.add(meeting, 'meetings')
      .subscribe(
        (response) => {

          this.message = response.message
          this.successMessage = true;

        },
        (error) => {
          this.message = "Something went wrong while schedule a meeting. Try again.";
          this.errorMessage = true;
          console.error("error schedule meeting: ", error);
        }
      );
  }

  private saveUpdateMeeting(meeting: MeetingModel) {
    meeting.start_date = new DatePipe('en-US').transform(meeting.start_date, 'yyyy-MM-dd HH:mm:ss')

    this.repo.update(meeting, 'meetings')
      .subscribe(
        (response) => {

          this.message = response.message
          this.successMessage =  true;

        },
        (error) => {
          this.message = "Something went wrong while updating a meeting. Try again.";
          this.errorMessage = true;
          console.error("error updating meeting: ", error);
        }
      );
  }
}

