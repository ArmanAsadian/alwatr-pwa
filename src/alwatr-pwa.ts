import {css, html} from 'lit';
import {customElement} from 'lit/decorators/custom-element.js';
import {router} from '@alwatr/router';
import {AlwatrElement} from './alwatr-debt/alwatr-element';
import type {ListenerInterface} from '@alwatr/signal';
import type {RoutesConfig} from '@alwatr/router';
import type {TemplateResult} from 'lit';

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

  private _routes: RoutesConfig = {
    map: (route) => route.sectionList[0]?.toString(),
    list: {
      'home': {
        render: () => html`<page-home>Page Home ...</page-home>`,
      },
      'about': {
        render: () => html`<page-about>Page About ...</page-about>`,
      },
      'article': {
        render: (route) =>
          route.sectionList[1] != null ?
            html`<page-article>Page Article ${route.sectionList[1]} ...</page-article>` :
            this._routes.list['404'],
      },
    },
  };


  constructor() {
    super();
    router.initial();
  }

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
      <h2>Hello World!</h2>

      <menu>
        <li><a href=${router.makeUrl({sectionList: ['home']})}>Home</a></li>
        <li><a href=${router.makeUrl({sectionList: ['about']})}>About</a></li>
        <li><a href=${router.makeUrl({sectionList: ['article', 100]})}>Article 100</a></li>
        <li><a href=${router.makeUrl({sectionList: ['contact']})}>Contact</a></li>
      </menu>

      <div class="page-container">
        ${router.outlet(this._routes)}
      </div>
    `;
  }
}
