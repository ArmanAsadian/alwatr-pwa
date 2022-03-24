import {css, html} from 'lit';
import {CSSResultGroup} from 'lit';
import {repeat} from 'lit/directives/repeat.js';
import {customElement} from 'lit/decorators/custom-element.js';
import {router} from '@alwatr/router';
import {PageArticleList} from './page-article-list';

declare global {
  interface HTMLElementTagNameMap {
    'page-card-list': PageCardList;
  }
}

/**
 * Alwatr PWA Home Page Element
 *
 * ```html
 * <page-card-list></page-card-list>
 * ```
 */
@customElement('page-card-list')
export class PageCardList extends PageArticleList {
  static override styles: CSSResultGroup = [
    PageArticleList.styles,
    css`
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
            <ion-item detail>
              <ion-avatar slot="start">
                <img src="${item.image}">
              </ion-avatar>
              <ion-label>${item.title}</ion-label>
            </ion-item>
            <ion-card-content>${item.description}</ion-card-content>
          </ion-card>
        `)}
      </ion-list>
    `;
  }
}
