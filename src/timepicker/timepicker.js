import {inject} from 'aurelia-dependency-injection';
import {customAttribute, bindable} from 'aurelia-templating';
import {WidgetBase} from '../common/widget-base';
import {generateBindables} from '../common/decorators';
import {constants} from '../common/constants';

@customAttribute(`${constants.attributePrefix}timepicker`)
@generateBindables('kendoTimePicker')
@inject(Element, WidgetBase)
export class TimePicker {
  @bindable kDisableDates;
  @bindable kEnabled;
  @bindable kReadOnly;

  constructor(element, widgetBase) {
    this.element = element;
    this.widgetBase = widgetBase
      .control('kendoTimePicker')
      .useElement(this.element)
      .linkViewModel(this)
      .useValueBinding()
      .bindToKendo('kEnabled', 'enable')
      .bindToKendo('kReadOnly', 'readonly');
  }

  subscribe(event, callback) {
    return this.widgetBase.subscribe(event, callback);
  }

  bind(ctx, overrideCtx) {
    this.widgetBase.useParentCtx(overrideCtx);
  }

  attached() {
    if (!this.kNoInit) {
      this.recreate();
    }
  }

  recreate() {
    this.kWidget = this.widgetBase.recreate();
  }

  propertyChanged(property, newValue, oldValue) {
    this.widgetBase.handlePropertyChanged(this.kWidget, property, newValue, oldValue);
  }

  destroy() {
    this.widgetBase.destroy(this.kWidget);
  }

  detached() {
    this.destroy();
  }
}
