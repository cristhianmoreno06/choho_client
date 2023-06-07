import { Component, EventEmitter, Input, OnChanges, OnInit, Optional, Output, Self, SimpleChanges } from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { SelectService } from './select.service';

/**
 * Determina si el valor del select será
 * default (default_value) del item del recurso
 */
type formatValue = 'default';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit, OnChanges {

  constructor(private _selectService: SelectService, @Self() @Optional() private control: NgControl
  ) {
    this.list = [];
    this.valueChange = new EventEmitter<any>();
    this.control.valueAccessor = this;
  }

  get formControl(): FormControl {
    return this.control.control as FormControl;
  }

  @Output() valueChange: EventEmitter<any>;

  @Input() label = '';

  @Input() resourceName = '';

  @Input() formatValue: formatValue = 'default';

  @Input() idParent = 0;

  value = '';

  list: any[];

  disable = false;

  onChange = (_: any) => { };

  onTouch = () => { };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.idParent) {
      this.getList();
    }
  }

  async ngOnInit() {
    await this.getList();
  }

  async getList() {
    const data = {
      parentId: this.idParent,
      resourceName: this.resourceName,
    };
    return await this._selectService.getResources(data).subscribe(res => {
      this.list = this.handleValues(res);
    }, error => {

    });
  }

  public handleValues(data: any) {
    if (this.resourceName == 'departments') {
      return data.departments;
    }

    if (this.resourceName == 'cities') {
      return data.cities;
    }

    return data;
  }

  public selectedItem(data: any): void {
    this.valueChange.emit(data);
  }

  writeValue(value: string): void {
    if (value) {
      this.value = value;
    } else {
      this.value = '';
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // throw new Error('Method not implemented.');
  }

  applyFormat(item: any): any {
    switch (this.formatValue) {
      case 'default':
        return item.id;
      default:
        return item.id;
    }
  }

}
