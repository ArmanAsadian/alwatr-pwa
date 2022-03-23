
import {css, html, nothing} from 'lit';
import {customElement} from 'lit/decorators/custom-element.js';
import {state} from 'lit/decorators/state.js';
import {router} from '@alwatr/router';
import {AlwatrElement} from './alwatr-debt/alwatr-element';
import './elements/page-home';
import type {TemplateResult} from 'lit';
import type {ListenerInterface} from '@alwatr/signal';
import type {RoutesConfig} from '@alwatr/router';

declare global {
  interface HTMLElementTagNameMap {
    'alwatr-pwa': AlwatrPwa;
  }
}

/**
 * Alwatr PWA Root Element
 *
 * ```html
 * <alwatr-pwa></alwatr-pwa>
 * ```
 */
@customElement('alwatr-pwa')
export class AlwatrPwa extends AlwatrElement {
  // TODO: import pageStyle
  // TODO: rethink about `contain` in all elements https://developers.google.com/web/updates/2016/06/css-containment
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

    .page-container {
      position: relative;
      flex-grow: 1;
      flex-shrink: 1;
      flex-basis: 0%;
      contain: size layout style;
    }
  `;

  @state()
  protected _hideTabBar = false;

  constructor() {
    super();
    router.initial();
  }

  private _activePage = 'home';

  private _routes: RoutesConfig = {
    // TODO: refactor route, we need to get active page!
    // TODO: ability to redirect!
    map: (route) => this._activePage = route.sectionList[0]?.toString().trim() || 'home',
    list: {
      'home': {
        render: () => html`<page-home></page-home>`,
      },
    },
  };

  private _listenerList: Array<unknown> = [];

  override connectedCallback(): void {
    super.connectedCallback();
    this._listenerList.push(router.signal.addListener(() => this.requestUpdate()));
    // TODO: make `hide-tab-bar` signal and bind to this._hideTabBar
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._listenerList.forEach((listener) => (listener as ListenerInterface<keyof AlwatrSignals>).remove());
  }

  override render(): TemplateResult {
    return html`
      <div class="page-container">
        ${router.outlet(this._routes)}
      </div>
      ${this._renderTabBar()}
    `;
  }

  protected _renderTabBar(): TemplateResult | typeof nothing {
    if (this._hideTabBar) return nothing;
    // TODO: dynamic from menuList
    return html`
      <ion-tab-bar>
        <ion-tab-button
          layout="icon-top"
          href=${router.makeUrl({sectionList: ['home']})}
          ?selected=${this._activePage === 'home'}
        >
          <ion-label>خانه</ion-label>
          <ion-icon name="home-outline"></ion-icon>
        </ion-tab-button>
        <ion-tab-button
          layout="icon-top"
          href=${router.makeUrl({sectionList: ['about']})}
          ?selected=${this._activePage === 'about'}
        >
          <ion-label>احمد کیست</ion-label>
          <ion-icon name="person-outline"></ion-icon>
        </ion-tab-button>
        <ion-tab-button
          layout="icon-top"
          href=${router.makeUrl({sectionList: ['article']})}
          ?selected=${this._activePage === 'article'}
        >
          <ion-label>اعتقادات</ion-label>
          <ion-icon name="layers-outline"></ion-icon>
        </ion-tab-button>
        <ion-tab-button
          layout="icon-top"
          href=${router.makeUrl({sectionList: ['contact']})}
          ?selected=${this._activePage === 'contact'}
        >
          <ion-label>مقالات</ion-label>
          <ion-icon name="newspaper-outline"></ion-icon>
        </ion-tab-button>
        <ion-tab-button
          layout="icon-top"
          href=${router.makeUrl({sectionList: ['setting']})}
          ?selected=${this._activePage === 'setting'}
        >
          <ion-label>تنظیمات</ion-label>
          <ion-icon name="cog-outline"></ion-icon>
        </ion-tab-button>
      </ion-tab-bar>
    `;
  }
}
