import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {countries} from './countries.json';

@Component({
  selector: 'app-root',
  template: `
      <div class="container p-5">
          <h1>Custom DropDown Component</h1>

          <form [formGroup]="formGroup" (ngSubmit)="submitForm()">

              <app-dropdown [options]="countries"
                            formControlName="country"></app-dropdown>

              <button class="btn btn-primary mt-5" type="submit">Submit</button>
          </form>
      </div>
  `,
})
export class AppComponent implements OnInit {
  formGroup: FormGroup;
  countries: string[];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      country: ['']
    });

    this.countries = countries;
  }

  submitForm() {
    console.log(this.formGroup.value);
  }
}
