import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  messageErr = "";
  listCountry = [
    {value: 1, label: 'Việt Nam'},
    {value: 2, label: 'France'},
    {value: 3, label: 'USA'}]
  validateForm!: FormGroup;
  submitted = false;
  isSaveSccess = false;

  constructor(private fb: FormBuilder, public authService: AuthService) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.getData()
  }

  ngAfterViewInit() {

  }
  ngOnDestroy() {
  }

 
  private buildForm() {
    this.validateForm = this.fb.group({
      id: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      nickName: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      token: [null, [Validators.required]],
      countryID : [null, [Validators.required]],
    });
  }
  private getData() {
    this.validateForm.patchValue(this.authService.user);
  }
  submitForm(): void {
    this.submitted = true;
    console.log(this.validateForm.value);
    if (this.getValidationForm(this.validateForm)) {
      this.authService.updateUser(this.validateForm.value).pipe(first())
      .subscribe({
          next: res => {
              this.isSaveSccess = true;
              setTimeout(() => {
                this.isSaveSccess = false;
              }, 3000);
          },
          error: res => {
            this.messageErr = res.error.message;
            this.isSaveSccess = false;
          }
      });
    }
  }



  getValidationForm(frm: FormGroup): boolean {
    if (!frm) {
      return false;
    }
    Object.keys(frm.controls).forEach(name => {
      let formcontrol = frm.controls[name];
      if (!formcontrol.valid) {
        formcontrol.markAsDirty();
      }
    })
    return frm.valid;
  }
}

