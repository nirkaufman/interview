# Angular Interview

Build a customizable dropdown component as a 
custom form control.

# STEP 1: Most basic implementation (core Angular skills)

in `AppComponent`:
- build a simple form with reactive forms module
- consume JSON as module (`TSConfig`)

in `DropDown` component:
- data binding in template (events, properties: `[value]`, `(focus)`, `(click)`)
- built-in directives (`*ngIf`, `*ngFor`)
- component scope styles
- custom control: the use of `NG_VALUE_ACCESSOR` in `providers`
- component class basics: `@Input`, `onInit`, private members, interfaces

__basics__
```typescript
import {Component, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  template: `
    <input class="form-control" [value]="selectedOption" (focus)="showDropdown = true">
    <div class="card" *ngIf="showDropdown">
        <span *ngFor="let option of options"
              (click)="selectOption(option)"
              class="dropdown-item">{{option}}</span>
    </div>
  `,
  styles: [`.dropdown-item {cursor: pointer}`],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: DropdownComponent,
    multi: true
  }]
})
export class DropdownComponent implements OnInit, ControlValueAccessor {
  @Input() options: string[];

  selectedOption: string;
  showDropdown: boolean;

  private _onChangeFn = _ => _;
  private _onTouchedFn = _ => _;

  ngOnInit(): void {
    this.showDropdown = false;
  }

  registerOnChange(fn: any): void {
    this._onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouchedFn = fn;
  }

  writeValue(obj: any): void {
    this.selectedOption = obj;
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this._onChangeFn(this.selectedOption);
    this.showDropdown = false;
  }
}
```
