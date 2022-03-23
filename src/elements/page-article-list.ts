import {css, html} from 'lit';
import {customElement} from 'lit/decorators/custom-element.js';
import {AlwatrElement} from '../alwatr-debt/alwatr-element';
import type {TemplateResult} from 'lit';
import type {ListenerInterface} from '@alwatr/signal';

declare global {
  interface HTMLElementTagNameMap {
    'page-article-list': PageArticleList;
  }
}

/**
 * Alwatr PWA Home Page Element
 *
 * ```html
 * <page-article-list></page-article-list>
 * ```
 */
@customElement('page-article-list')
export class PageArticleList extends AlwatrElement {
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
          <ion-title>عنوان برنامه ...</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content>
        <ion-input
          inputmode="search"
          enterkeyhint="search"
          placeholder="جستجو ..."
          debounce="500"
          autocomplete="on"
          clear-input
        ></ion-input>

        <ion-list>
          <ion-item>
            <ion-avatar slot="start">
              <img src="/images/1005.jpeg">
            </ion-avatar>
            <ion-label>
              <h2>عنوان مقاله ...</h2>
              <p>توضیحات مقاله ...</p>
            </ion-label>
          </ion-item>

          <ion-item>
            <ion-avatar slot="start">
              <img src="/images/1010.jpeg">
            </ion-avatar>
            <ion-label>
              <h2>عنوان مقاله ...</h2>
              <p>توضیحات مقاله ...</p>
            </ion-label>
          </ion-item>

          <ion-item>
            <ion-avatar slot="start">
              <img src="/images/1014.jpeg">
            </ion-avatar>
            <ion-label>
              <h2>عنوان مقاله ...</h2>
              <p>توضیحات مقاله ...</p>
            </ion-label>
          </ion-item>

          <ion-item>
            <ion-avatar slot="start">
              <img src="/images/1025.jpeg">
            </ion-avatar>
            <ion-label>
              <h2>عنوان مقاله ...</h2>
              <p>توضیحات مقاله ...</p>
            </ion-label>
          </ion-item>

          <ion-item>
            <ion-avatar slot="start">
              <img src="/images/1059.jpeg">
            </ion-avatar>
            <ion-label>
              <h2>عنوان مقاله ...</h2>
              <p>توضیحات مقاله ...</p>
            </ion-label>
          </ion-item>

          <ion-item>
            <ion-avatar slot="start">
              <img src="/images/1067.jpeg">
            </ion-avatar>
            <ion-label>
              <h2>عنوان مقاله ...</h2>
              <p>توضیحات مقاله ...</p>
            </ion-label>
          </ion-item>

          <ion-item>
            <ion-avatar slot="start">
              <img src="/images/1071.jpeg">
            </ion-avatar>
            <ion-label>
              <h2>عنوان مقاله ...</h2>
              <p>توضیحات مقاله ...</p>
            </ion-label>
          </ion-item>

          <ion-item>
            <ion-avatar slot="start">
              <img src="/images/1078.jpeg">
            </ion-avatar>
            <ion-label>
              <h2>عنوان مقاله ...</h2>
              <p>توضیحات مقاله ...</p>
            </ion-label>
          </ion-item>

          <ion-item>
            <ion-avatar slot="start">
              <img src="/images/1005.jpeg">
            </ion-avatar>
            <ion-label>
              <h2>عنوان مقاله ...</h2>
              <p>توضیحات مقاله ...</p>
            </ion-label>
          </ion-item>

          <ion-item>
            <ion-avatar slot="start">
              <img src="/images/1010.jpeg">
            </ion-avatar>
            <ion-label>
              <h2>عنوان مقاله ...</h2>
              <p>توضیحات مقاله ...</p>
            </ion-label>
          </ion-item>

          <ion-item>
            <ion-avatar slot="start">
              <img src="/images/1014.jpeg">
            </ion-avatar>
            <ion-label>
              <h2>عنوان مقاله ...</h2>
              <p>توضیحات مقاله ...</p>
            </ion-label>
          </ion-item>

          <ion-item>
            <ion-avatar slot="start">
              <img src="/images/1025.jpeg">
            </ion-avatar>
            <ion-label>
              <h2>عنوان مقاله ...</h2>
              <p>توضیحات مقاله ...</p>
            </ion-label>
          </ion-item>

          <ion-item>
            <ion-avatar slot="start">
              <img src="/images/1059.jpeg">
            </ion-avatar>
            <ion-label>
              <h2>عنوان مقاله ...</h2>
              <p>توضیحات مقاله ...</p>
            </ion-label>
          </ion-item>

          <ion-item>
            <ion-avatar slot="start">
              <img src="/images/1067.jpeg">
            </ion-avatar>
            <ion-label>
              <h2>عنوان مقاله ...</h2>
              <p>توضیحات مقاله ...</p>
            </ion-label>
          </ion-item>

          <ion-item>
            <ion-avatar slot="start">
              <img src="/images/1071.jpeg">
            </ion-avatar>
            <ion-label>
              <h2>عنوان مقاله ...</h2>
              <p>توضیحات مقاله ...</p>
            </ion-label>
          </ion-item>

          <ion-item>
            <ion-avatar slot="start">
              <img src="/images/1078.jpeg">
            </ion-avatar>
            <ion-label>
              <h2>عنوان مقاله ...</h2>
              <p>توضیحات مقاله ...</p>
            </ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    `;
  }
}
