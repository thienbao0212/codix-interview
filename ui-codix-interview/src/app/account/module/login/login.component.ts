import { Component, OnInit, AfterViewChecked, OnDestroy } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'lv-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewChecked {

  validateForm!: FormGroup;
  submitted = false;
  messageErr = '';

  constructor(private fb: FormBuilder, public authService: AuthService) {}

  ngOnInit(): void {
    this.buildForm();
    this.getData();
  }

  ngAfterViewChecked() {
  }

  ngAfterViewInit() {

  }
  ngOnDestroy() {
  }

  private buildForm() {
    this.validateForm = this.fb.group({
      nickName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }
  private getData() {
    this.validateForm.patchValue({nickName: sessionStorage.getItem('nickName'), password: sessionStorage.getItem('password')})
  }
  submitForm(): void {
    this.submitted = true;
   

    if (this.getValidationForm(this.validateForm)) {
      if(this.validateForm.value.remember) {
        sessionStorage.setItem('nickName', this.validateForm.value.nickName);
        sessionStorage.setItem('password', this.validateForm.value.password);
      } else {
        sessionStorage.setItem('nickName', "");
        sessionStorage.setItem('password', "");
      }
      this.authService.login(this.validateForm.value.nickName, this.validateForm.value.password).pipe(first())
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
