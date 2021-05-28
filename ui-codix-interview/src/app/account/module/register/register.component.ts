import { OnDestroy } from '@angular/core';
import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'lv-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  messageErr = "";
  listCountry = [
    {value: 1, label: 'Việt Nam'},
    {value: 2, label: 'France'},
    {value: 3, label: 'USA'}]
  validateForm!: FormGroup;
  submitted = false;
  

  constructor(private fb: FormBuilder, public authService: AuthService) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  ngAfterViewInit() {

  }
  ngOnDestroy() {
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  private buildForm() {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required, this.confirmationValidator]],
      nickName: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      countryID : [null, [Validators.required]],
    });
  }
  submitForm(): void {
    this.submitted = true;
    console.log(this.validateForm.value);
    this.updateConfirmValidator();
    if (this.getValidationForm(this.validateForm)) {
      this.authService.register(this.validateForm.value).pipe(first())
      .subscribe({
          next: () => {
            // todo something
          },
          error: res => {
            this.messageErr = res;
          }
      });
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.confirmPassword.updateValueAndValidity());
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