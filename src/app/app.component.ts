import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ReactiveForms';
  // initalise a variable of type FormGroup.
  reactiveForm: FormGroup;

  ngOnInit() {
    // instantiate the reactiveForm to a new Form Group object
    this.reactiveForm = new FormGroup({
      // we input every instance of our Form Control() of the Input property
      personalDetails: new FormGroup({
        firstname: new FormControl(null, [Validators.required,this.noSpaceAllowed]),
        lastname: new FormControl(null, [Validators.required, this.noSpaceAllowed]),
        email: new FormControl(null, [Validators.required, Validators.email], this.emailNotAllowed)
      }),
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null,Validators.required )
    });
  }

  onSubmit() {
    console.log(this.reactiveForm);
  }

  // building a custom validator
  noSpaceAllowed(control: FormControl) {
    if(control.value != null && control.value.indexOf('') != -1) {
      return {noSpaceAllowed: true}
    }
    return null;
  }

  // building an async validator
  emailNotAllowed(control: FormControl): Promise<any> | Observable<any> {
    const response = new Promise((resolve, reject) => {
      setTimeout(() => {
        if(control.value === 'danieltundeabati@gmail.com') {
          resolve({emailNotAllowed: true})
        } else {
          resolve(null)
        }
      }, 5000)
    });
    return response;
  }
}
