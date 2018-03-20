import { Component,
  Input,
  Output,
  forwardRef,
  EventEmitter,
  ElementRef,
  ViewChild,
  Renderer,
  OnInit } from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

const INLINE_EDIT_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InlineEditComponent),
  multi: true
};

@Component({
  selector: 'inline-edit',
  providers: [INLINE_EDIT_CONTROL_VALUE_ACCESSOR],
  styleUrls: ['./inline-edit.component.css'],
  templateUrl: './inline-edit.component.html'
})

export class InlineEditComponent implements ControlValueAccessor, OnInit {
  @ViewChild('inlineEditControl') inlineEditControl;
  @ViewChild('inlineTextAreaControl') inlineTextAreaControl;
  @ViewChild('inlineSelectControl') inlineSelectControl;
  @Output() public onSave: EventEmitter<any> = new EventEmitter();
  @Input() label: string = '';
  @Input() min: number = -9999;
  @Input() max: number = 99999999;
  @Input() minlength: number = 0;
  @Input() maxlength: number = 2555;
  @Input() type: string = 'text';
  @Input() required: boolean = false;
  @Input() items: any[] = [];
  @Input() focus: Function = _ => { };
  @Input() blur: Function = _ => { };
  @Input() pattern: string = null;
  @Input() itemIdKey: string;
  @Input() itemLabelKey: string;
  @Input() optgroupLabel: string;
  @Input() disabled: boolean = false;
  @Input() param: any = {
    $error: false
  };

  private _value: string = '';
  private preValue: string = '';
  private editing: boolean = false;
  private typeIndex: number = 0;

  public onChange: any = Function.prototype;
  public onTouched: any = Function.prototype;

  get value(): any { return this._value; };

  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

  getName(): string {
    let item = this.items.filter((item, idx) => {
      return this.itemIdKey ? item[this.itemIdKey] == this.value :
        this.value == item;
    })[0];

    if (item) {
      return this.itemLabelKey ? item[this.itemLabelKey] : item;
    } else {
      return 'None';
    }
  }

  constructor(element: ElementRef, private _renderer: Renderer) { }

  // Required for ControlValueAccessor interface
  writeValue(value: any) {
    this._value = value;
  }

  hasError() {
    if (this.typeIndex < 2) {
      const exp = new RegExp(this.pattern);
      if (!this.required && !this.value) {
        return false;
      } else if (this.pattern && !exp.test(this.value)) {
        return true;
      } else {
        return false;
      }
    }
  }

  // Required forControlValueAccessor interface
  public registerOnChange(fn: (_: any) => {}): void { this.onChange = fn; }

  // Required forControlValueAccessor interface
  public registerOnTouched(fn: () => {}): void { this.onTouched = fn; };

  onBlur($event: Event) {
    this.param.$error = this.hasError();
    if (this.param.$error) {
      return false;
    }

    this.blur();
    this.editing = false;
  }

  edit(value) {
    if (this.disabled) {
      return;
    }

    this.preValue = value;
    this.editing = true;
    setTimeout(_ => {
      switch (this.typeIndex) {
        case 0:
          this._renderer.invokeElementMethod(this.inlineEditControl,
            'focus', []);
          break;
        case 1:
          this._renderer.invokeElementMethod(this.inlineTextAreaControl,
            'focus', []);
          break;
        case 2:
          this.inlineSelectControl.nativeElement.focus();
          break;
      }
    });
  }

  onSubmit(value) {
    this.onSave.emit(value);
    this.editing = false;
  }

  cancel(value: any) {
    this._value = this.preValue;
    this.editing = false;
  }

  ngOnInit() {
    switch (this.type) {
      case 'textarea':
        this.typeIndex = 1;
        break;
      case 'select':
        this.typeIndex = 2;
        break;
      default:
        this.typeIndex = 0;
        break;
    }
  }
}
