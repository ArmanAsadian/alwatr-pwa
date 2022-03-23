import {css, html} from 'lit';
import {customElement} from 'lit/decorators/custom-element.js';
import {router} from '@alwatr/router';
import {AlwatrElement} from './alwatr-debt/alwatr-element';
import type {TemplateResult} from 'lit';
import type {ListenerInterface} from '@alwatr/signal';
import type {RoutesConfig} from '@alwatr/router';

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
    // @TODO: rethink about `contain` in all elements https://developers.google.com/web/updates/2016/06/css-containment
    css`
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

      .page {
        position: relative;
        flex-grow: 1;
        flex-shrink: 1;
        flex-basis: 0%;
        contain: size layout style;
      }
    `,
  ];

  constructor() {
    super();
    router.initial();
  }

  private _activePage = 'home';

  private _routes: RoutesConfig = {
    // @TODO: refactor route, we need to get active page!
    // @TODO: ability to redirect!
    map: (route) => this._activePage = route.sectionList[0]?.toString() || 'home',
    list: {
      'home': {
        render: () => html`<page-home>Page Home ...</page-home>`,
      },
      'about': {
        render: () => html`<page-about>Page About ...</page-about>`,
      },
      'article': {
        render: (route) => html`<page-article>Page Article ${route.sectionList[1]} ...</page-article>`,
      },
    },
  };

  private _listenerList: Array<unknown> = [];

  override connectedCallback(): void {
    super.connectedCallback();
    this._listenerList.push(router.signal.addListener(() => this.requestUpdate()));
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._listenerList.forEach((listener) => (listener as ListenerInterface<keyof AlwatrSignals>).remove());
  }

  override render(): TemplateResult {
    return html`
      <div class="page">
        ${router.outlet(this._routes)}
      </div>
      ${this._renderTabBar()}
    `;
  }

  protected _renderTabBar(): TemplateResult {
    // @TODO: dynamic from menuList
    return html`
      <ion-tab-bar>
        <ion-tab-button
          layout="icon-top"
          href=${router.makeUrl({sectionList: ['home']})}
          ?selected=${this._activePage === 'home'}
        >
          <ion-label>Home</ion-label>
          <ion-icon name="home-outline"></ion-icon>
        </ion-tab-button>
        <ion-tab-button
          layout="icon-top"
          href=${router.makeUrl({sectionList: ['about']})}
          ?selected=${this._activePage === 'about'}
        >
          <ion-label>About</ion-label>
          <ion-icon name="planet-outline"></ion-icon>
        </ion-tab-button>
        <ion-tab-button
          layout="icon-top"
          href=${router.makeUrl({sectionList: ['article']})}
          ?selected=${this._activePage === 'article'}
        >
          <ion-label>Article</ion-label>
          <ion-icon name="book-outline"></ion-icon>
        </ion-tab-button>
        <ion-tab-button
          layout="icon-top"
          href=${router.makeUrl({sectionList: ['contact']})}
          ?selected=${this._activePage === 'contact'}
        >
          <ion-label>Contact</ion-label>
          <ion-icon name="call-outline"></ion-icon>
        </ion-tab-button>
        <ion-tab-button
          layout="icon-top"
          href=${router.makeUrl({sectionList: ['setting']})}
          ?selected=${this._activePage === 'setting'}
        >
          <ion-label>Setting</ion-label>
          <ion-icon name="cog-outline"></ion-icon>
        </ion-tab-button>
      </ion-tab-bar>
    `;
  }
}
