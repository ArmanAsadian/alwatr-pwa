import {css, html, LitElement} from 'lit';
import {customElement} from 'lit/decorators/custom-element.js';
import type {TemplateResult} from 'lit';

@customElement('alwatr-pwa')
export class AlwatrPwa extends LitElement {
  static override styles = css`
    :host {
      display: block;
    }
  `;

  override render(): TemplateResult {
    return html`
      <h2>Hello world</h2>
    `;
  }
}
