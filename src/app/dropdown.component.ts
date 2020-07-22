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
