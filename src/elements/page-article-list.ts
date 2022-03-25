import {css, html} from 'lit';
import {CSSResultGroup} from 'lit';
import {live} from 'lit/directives/live.js';
import {repeat} from 'lit/directives/repeat.js';
import {customElement} from 'lit/decorators/custom-element.js';
import {property} from 'lit/decorators/property.js';
import {AlwatrElement} from '../alwatr-debt/alwatr-element';
import type {TemplateResult} from 'lit';
import type {ListenerInterface} from '@alwatr/signal';
import {state} from 'lit/decorators/state.js';
import {router} from '@alwatr/router';
import {sampleDataList} from '../config';

declare global {
  interface HTMLElementTagNameMap {
    'page-article-list': PageArticleList;
  }
}

interface SearchbarChangeEventDetail {
  value?: string;
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
  static override styles: CSSResultGroup = css`
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
    }

    input[type=search]::-webkit-search-cancel-button,
    input[type=search]::-webkit-search-decoration {
      -webkit-appearance: none
    }

    ion-card.md {
      margin-top: 16px;
      margin-bottom: 16px;
    }

    ion-card img {
      max-width: 100%;
      border: 0;
    }
  `;

  @property({type: String})
    type: 'minimal' | 'card' | 'mini-card' = 'card';

  @state()
  protected _search = '';

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
      <ion-header mode="ios" translucent dir="rtl">
        <ion-toolbar>
          <ion-title>لیست مقالات</ion-title>
        </ion-toolbar>
        <ion-toolbar>
          <ion-searchbar
            autocomplete="on"
            placeholder="جستجو ..."
            .value=${live(this._search)}
            @ionChange=${this._onSearch}
          ></ion-content>
        </ion-toolbar>
      </ion-header>

      <ion-content fullscreen dir="rtl">
        ${this._renderList()}
      </ion-content>
    `;
  }

  protected _onSearch(event: CustomEvent<SearchbarChangeEventDetail>): void {
    const value = event.detail.value;
    this._logger.logMethodArgs('_onSearch', {value});
    this._search = value ?? '';
  }

  protected _renderList(): unknown {
    const list = this._search?.length > 0 ?
      sampleDataList.filter((item) => (item.title + item.description).indexOf(this._search) !== -1) :
      sampleDataList.concat(sampleDataList); // duplicate list for demo

    switch (this.type) {
      case 'minimal':
        return html`
          <ion-list lines="inset">
            ${repeat(list, (item) => item.id, (item) => html`
              <ion-item detail href=${router.makeUrl({sectionList: ['article', item.id]})}>
                <ion-avatar slot="start">
                  <img src="${item.image}"/>
                </ion-avatar>
                <ion-label>
                  <h2>${item.title}</h2>
                  <p>${item.description}...</p>
                </ion-label>
              </ion-item>
            `)}
          </ion-list>
        `;

      case 'card':
        return repeat(list, (item) => item.id, (item) => html`
          <ion-card href=${router.makeUrl({sectionList: ['article', item.id]})}>
            <img src=${item.image} />
            <ion-card-header>
              <ion-card-title>${item.title}</ion-card-title>
            </ion-card-header>
            <ion-card-content>${item.description}...</ion-card-content>
          </ion-card>
        `);

      case 'mini-card':
        return repeat(list, (item) => item.id, (item) => html`
          <ion-card href=${router.makeUrl({sectionList: ['article', item.id]})}>
            <ion-item detail>
              <ion-avatar slot="start">
                <img src="${item.image}">
              </ion-avatar>
              <ion-label>${item.title}</ion-label>
            </ion-item>
            <ion-card-content>${item.description}...</ion-card-content>
          </ion-card>
        `);

      default:
        this._logger.accident('_renderList', 'unknown_list_type', 'This list type unsupported!', {type: this.type});
        return html`<b>Unsupported!</b>`;
    }
  }
}
