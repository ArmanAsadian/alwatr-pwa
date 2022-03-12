import {css, html} from 'lit';
import {customElement} from 'lit/decorators/custom-element.js';
import {initialRouter} from '@alwatr/router';
import {AlwatrElement} from './alwatr-debt/alwatr-element';
import type {TemplateResult, PropertyValues} from 'lit';

/**
 * Alwatr PWA Root Element
 *
 * ```html
 * <alwatr-pwa></alwatr-pwa>
 * ```
 */
@customElement('alwatr-pwa')
export class AlwatrPwa extends AlwatrElement {
  static override styles = [
    AlwatrElement.styles,
    css`
    `,
  ];

  override render(): TemplateResult {
    return html`
      <h2>Hello world</h2>
      <a href="/home">home</a>
      <a href="/about">about</a>
      <a href="/articles">articles</a>
      <a href="/contact">contact</a>
    `;
  }

  protected override firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
    initialRouter();
  }
}
