import {css, html} from 'lit';
import {customElement} from 'lit/decorators/custom-element.js';
import {AlwatrElement} from '../alwatr-debt/alwatr-element';
import type {TemplateResult} from 'lit';
import type {ListenerInterface} from '@alwatr/signal';

declare global {
  interface HTMLElementTagNameMap {
    'page-home': PageHome;
  }
}

/**
 * Alwatr PWA Home Page Element
 *
 * ```html
 * <page-home></page-home>
 * ```
 */
@customElement('page-home')
export class PageHome extends AlwatrElement {
  // TODO: import pageStyle
  static override styles = css`
    :host {
      inset: 0;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      display: flex;
      position: absolute;
      flex-direction: column;
      justify-content: space-between;
      contain: layout size style;
      overflow: hidden;
      z-index: 0
    }

    ion-content {
      --padding-start: var(--page-content-padding);
      --padding-end: var(--page-content-padding);
      --padding-top: var(--page-content-padding);
      --padding-bottom: var(--page-content-padding);
    }
  `;

  private _listenerList: Array<unknown> = [];

  override connectedCallback(): void {
    super.connectedCallback();
    // this._listenerList.push(router.signal.addListener(() => this.requestUpdate()));
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._listenerList.forEach((listener) => (listener as ListenerInterface<keyof AlwatrSignals>).remove());
  }

  override render(): TemplateResult {
    return html`
      <ion-header>
        <ion-toolbar>
          <ion-title>Home</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content class="padding">
        Main Content
      </ion-content>
    `;
  }
}
