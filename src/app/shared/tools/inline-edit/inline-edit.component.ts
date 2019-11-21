import { Component, Input, Optional, Host } from '@angular/core';
import { SatPopover } from '@ncstate/sat-popover';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'inline-edit',
  styleUrls: ['inline-edit.component.scss'],
  templateUrl: 'inline-edit.component.html'
})
export class InlineEditComponent {

  /** Overrides the dataVal and provides a reset value when changes are cancelled. */
  @Input()
  get value(): string { return this._value; }
  set value(x: string) {
    this.dataVal = this._value = x;
  }
  private _value = '';

  /** Form model for the input. */
  dataVal = '';

  constructor(@Optional() @Host() public popover: SatPopover) { }

  ngOnInit() {
    // subscribe to cancellations and reset form value
    if (this.popover) {
      this.popover.closed.pipe(filter(val => val == null))
        .subscribe(() => this.dataVal = this.value || '');
    }
  }

  onSubmit() {
    if (this.popover) {
      //console.log('Submit: ', this.dataVal);
      this.popover.close(this.dataVal);
    }
  }

  onCancel() {
    if (this.popover) {
      this.popover.close();
    }
  }
}