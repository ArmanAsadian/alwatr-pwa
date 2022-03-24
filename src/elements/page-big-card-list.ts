import {css, html} from 'lit';
import {CSSResultGroup} from 'lit';
import {repeat} from 'lit/directives/repeat.js';
import {customElement} from 'lit/decorators/custom-element.js';
import {router} from '@alwatr/router';
import {PageArticleList} from './page-article-list';

declare global {
  interface HTMLElementTagNameMap {
    'page-big-card-list': PageBigCardList;
  }
}

/**
 * Alwatr PWA Home Page Element
 *
 * ```html
 * <page-big-card-list></page-big-card-list>
 * ```
 */
@customElement('page-big-card-list')
export class PageBigCardList extends PageArticleList {
  static override styles: CSSResultGroup = [
    PageArticleList.styles,
    css`
      img {
        max-width: 100%;
        border: 0;
      }
    `,
  ];

  protected override _renderList(): unknown {
    const list = this.search?.length > 0 ?
      this.ـlist.filter((item) => (item.title + item.description).indexOf(this.search) !== -1) :
      this.ـlist.concat(this.ـlist); // duplicate list for demo

    return html`
      <ion-list lines="inset">
        ${repeat(list, (item) => item.id, (item) => html`
          <ion-card href=${router.makeUrl({sectionList: ['article-detail', item.id]})}>
            <img src=${item.image} />
            <ion-card-header>
              <ion-card-title>${item.title}</ion-card-title>
            </ion-card-header>
            <ion-card-content>${item.description}</ion-card-content>
          </ion-card>
        `)}
      </ion-list>
    `;
  }
}
