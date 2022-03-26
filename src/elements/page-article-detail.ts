import {css, html} from 'lit';
import {CSSResultGroup} from 'lit';
import {customElement} from 'lit/decorators/custom-element.js';
import {AlwatrElement} from '../alwatr-debt/alwatr-element';
import type {TemplateResult} from 'lit';
import type {ListenerInterface} from '@alwatr/signal';

declare global {
  interface HTMLElementTagNameMap {
    'page-article-detail': PageArticleDetail;
  }
}

/**
 * Alwatr PWA Home Page Element
 *
 * ```html
 * <page-article-detail></page-article-detail>
 * ```
 */
@customElement('page-article-detail')
export class PageArticleDetail extends AlwatrElement {
  static override styles: CSSResultGroup = css`
    :host {
      display: flex;
      flex-direction: column;
    }

    ion-content {
      --padding-start: 8px;
      --padding-end: 8px;
    }

    img {
      max-width: 100%;
      border: 0;
    }
  `;

  protected _listenerList: Array<unknown> = [];

  override connectedCallback(): void {
    super.connectedCallback();
    // this._listenerList.push(router.signal.addListener(() => this.requestUpdate()));
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._listenerList.forEach((listener) => (listener as ListenerInterface<keyof AlwatrSignals>).remove());
  }

  protected override render(): TemplateResult {
    return html`
      <ion-header translucent dir="rtl">
        <ion-toolbar>
          <ion-title>امامت مهدیین</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content fullscreen dir="rtl">
        <ion-card>
            <img src="/images/1010.jpeg" />
            <ion-card-header>
              <ion-card-title>امامت مهدیین</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              در بحث سلاح و اینکه سلاح یکی از راههای تشخیص حجت می‌باشد، اختلافی وجود ندارد، بلکه اختلاف در معنای...
            </ion-card-content>
          </ion-card>
      </ion-content>
    `;
  }
}
