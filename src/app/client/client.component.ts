import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordValidators } from '../utils/password-validators';
import { ClientModel } from '../models/client.model';
import { DialogComponent } from '../dialog/dialog.component';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RepositoryService } from '../services/repository.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {

  submitted = false;
  repeatPassword = null
  message = '';

  clients$: Observable<ClientModel[]> = new Observable<ClientModel[]>
  client: ClientModel = new ClientModel();

  successMessage = false;
  errorMessage = false;

  isViewAllClients = false;

  clientForm = new FormGroup(
    {
      fullname: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.email, Validators.required]),
      address: new FormControl(null, [Validators.required]),
      password: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          PasswordValidators.patternValidator(new RegExp("(?=.*[0-9])"), {
            requiresDigit: true
          }),
          PasswordValidators.patternValidator(new RegExp("(?=.*[A-Z])"), {
            requiresUppercase: true
          }),
          PasswordValidators.patternValidator(new RegExp("(?=.*[a-z])"), {
            requiresLowercase: true
          }),
          PasswordValidators.patternValidator(new RegExp("(?=.*[$@^!%*?&])"), {
            requiresSpecialChars: true
          })
        ])
      ),
      confirmPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(8)
      ])
    },
    {
      validators: PasswordValidators.MatchValidator
    }
  );

  constructor(
    private modalService: NgbModal,
    private repo: RepositoryService<ClientModel>
  ) { }


  // convenience getter for easy access to form controls
  get f() {
    return this.clientForm.controls;
  }

  get passwordValid() {
    // console.log('passwordValid: ', this.signupForm.controls["password"].errors?.['requiresDigit']);
    return this.requiredValid &&
      this.minLengthValid &&
      this.requiresDigitValid &&
      this.requiresUppercaseValid &&
      this.requiresLowercaseValid &&
      this.requiresSpecialCharsValid;
  }

  get requiredValid() {
    return !this.clientForm.controls["password"].hasError("required");
  }

  get minLengthValid() {
    return !this.clientForm.controls["password"].hasError("minlength");
  }

  get requiresDigitValid() {
    return !this.clientForm.controls["password"].hasError("requiresDigit");
  }

  get requiresUppercaseValid() {
    return !this.clientForm.controls["password"].hasError("requiresUppercase");
  }

  get requiresLowercaseValid() {
    return !this.clientForm.controls["password"].hasError("requiresLowercase");
  }

  get requiresSpecialCharsValid() {
    return !this.clientForm.controls["password"].hasError("requiresSpecialChars");
  }


  create() {
    console.log("executing register method", this.clientForm);
    this.submitted = true;
    
    if (this.client.id === undefined || this.client.id === null)
      this.saveNewCliente()

    // if (this.client.id === undefined || this.client.id != null)
    //   this.updateClient()
    
  }

  private saveNewCliente() {
    this.client.name = this.clientForm.controls.fullname.value;
    this.client.email = this.clientForm.controls.email.value
    this.client.address = this.clientForm.controls.address.value
    this.client.password = this.clientForm.controls.password.value

    this.repo.add(this.client, 'clients').subscribe(
      (res) => {
        this.message = res.message;
        this.successMessage = true

      },
      (error) => {
        this.message = "Something went wrong while registering client. Try again.";
        this.errorMessage = true;
        console.error("error registering cliente: ", error);
      }
    );
  }

  private updateClient() {
    this.client.name = this.clientForm.controls.fullname.value;
    this.client.email = this.clientForm.controls.email.value
    this.client.address = this.clientForm.controls.address.value
    this.client.password = this.clientForm.controls.password.value

    this.repo.update(this.client, 'clients').subscribe(
      (res) => {
        this.message = res.message;
        this.successMessage = true

      },
      (error) => {
        this.message = "Something went wrong while registering client. Try again.";
        this.errorMessage = true;
        console.error("error registering cliente: ", error);
      }
    );
  }

  fetchAll() {
    this.isViewAllClients = true;
    this.clients$ = this.repo.fetchAll('clients');
  }

  newClient() {
    this.isViewAllClients = false;
    this.client = new ClientModel();
  }

  editClient(client: ClientModel) {
    this.isViewAllClients = false;
    this.client = client

    this.clientForm.controls.fullname.setValue(this.client.name);
    this.clientForm.controls.email.setValue(this.client.email);
    this.clientForm.controls.address.setValue(this.client.address);
    this.clientForm.controls.password.setValue(this.client.password);
  }

  showDeleteDialog(client: ClientModel) {
    console.log('client: ', client.name)
    const modalRef = this.modalService.open(DialogComponent);
    modalRef.componentInstance.content = { type: 'client', dataInfo: 'with name: ' + client.name, id: client.id }

  }

}
