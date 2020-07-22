import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  template: `
    <input class="form-control" [value]="selectedOption" (focus)="showDropdown = true" #input (input)="filterOptions(input.value)">
    <div class="card" *ngIf="showDropdown">
        <span *ngFor="let option of filteredOptions"
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

  filteredOptions: string[]
  selectedOption: string;
  showDropdown: boolean;

  private _onChangeFn = _ => _;
  private _onTouchedFn = _ => _;

  ngOnInit(): void {
    this.showDropdown = false;
    this.filteredOptions = [...this.options];
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

  filterOptions(value: string) {
    this.filteredOptions = this.options.filter( option => option.includes(value));
  }
}
