import {LitElement} from 'lit';
import {createLogger} from '@alwatr/logger';
import type {PropertyValues} from 'lit';

// TODO: refactor to separate mixins
export class AlwatrElement extends LitElement {
  protected _logger = createLogger(`<${this.tagName.toLowerCase()}>`);

  constructor() {
    super();
    this._logger.logMethod('constructor');
  }

  override connectedCallback(): void {
    this._logger.logMethod('connectedCallback');
    super.connectedCallback();
  }

  override disconnectedCallback(): void {
    this._logger.logMethod('disconnectedCallback');
    super.disconnectedCallback();
  }

  protected override update(_changedProperties: PropertyValues): void {
    this._logger.logMethod('update');
    super.update(_changedProperties);
  }

  protected override firstUpdated(_changedProperties: PropertyValues): void {
    this._logger.logMethod('firstUpdated');
    super.firstUpdated(_changedProperties);
  }

  override dispatchEvent(event: CustomEvent | Event): boolean {
    this._logger.logMethodArgs('dispatchEvent', {type: event.type});
    return super.dispatchEvent(event);
  }
}
