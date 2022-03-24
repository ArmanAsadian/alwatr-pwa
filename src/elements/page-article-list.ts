import {css, html} from 'lit';
import {live} from 'lit/directives/live.js';
import {repeat} from 'lit/directives/repeat.js';
import {customElement} from 'lit/decorators/custom-element.js';
import {AlwatrElement} from '../alwatr-debt/alwatr-element';
import type {TemplateResult} from 'lit';
import type {ListenerInterface} from '@alwatr/signal';
import {state} from 'lit/decorators/state.js';
import {router} from '@alwatr/router';

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

    input[type=search]::-webkit-search-cancel-button,
    input[type=search]::-webkit-search-decoration {
      -webkit-appearance: none
    }
  `;

  @state()
  protected search = '';

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
      <ion-header mode="ios" translucent dir="rtl">
        <ion-toolbar>
          <ion-title>لیست مقالات</ion-title>
        </ion-toolbar>
        <ion-toolbar>
          <ion-searchbar
            autocomplete="on"
            placeholder="جستجو ..."
            .value=${live(this.search)}
            @ionChange=${this._onSearch}
          ></ion-content>
        </ion-toolbar>
      </ion-header>

      <ion-content fullscreen dir="rtl">
          ${this._renderList()}
        </ion-list>
      </ion-content>
    `;
  }

  _onSearch(event: CustomEvent<SearchbarChangeEventDetail>): void {
    const value = event.detail.value;
    this._logger.logMethodArgs('_onSearch', {value});
    this.search = value ?? '';
  }

  @state()
  protected ـlist = [
      {
        id: 1,
        title: 'چگونگی پیدایش فرقه یمانی',
        description: 'به دلیل تبلیغات آنان و به دلیل وظیفه ما در دفاع و حمایت از اعتقادات صحیح مهدوی و پاسخ به شبهات رایج در جامعه همه ما به عنوان مدرسینی که در این جامعه با نسل جوان',
        image: 'images/1005.jpeg',
      },
      {
        id: 2,
        title: 'حدیث ما اشکل',
        description: 'امید که برایتان مفید باشد و نظر عنایت حضرتش شامل حالمان شود. -پیروان احمد بصری میگویند راه شناخت وقانون معرفت حجج الهی سه چیز است : ( وصیت و سلاح و پرچم ). یکی',
        image: 'images/1010.jpeg',
      },
      {
        id: 3,
        title: 'رجعت',
        description: 'یکی از این باورها، اعتقاد به رَجعت و زنده شدن مردگان و بازگشت آن‌ها در همین دنیا قبل از وقوع قیامت کبری است. اگر چه این باور اصیل در آیات بسیار زیادی مورد تاکید',
        image: 'images/1014.jpeg',
      },
      {
        id: 4,
        title: 'حدیث اولهم من البصره',
        description: 'بررسی حدیث اولهم من البصره. بخش اول. یمانیون با تمسک به روایاتی قصد دارند تا احمدالحسن را به عنوان یار امام عصر (علیه السلام) از بصره جلوه داده و به این',
        image: 'images/1025.jpeg',
      },
      {
        id: 5,
        title: 'وجود نام (محمد) در انجیل',
        description: 'رزاق انصاری با تمسک به حدیثی از امام رضا علیه السلام در مقام اثبات این سخن که (وصیت را کسی جز صاحبش نمی‌تواند ادعا ‌کند) برآمده است. وی می‌گوید: (پس از آنکه',
        image: 'images/1059.jpeg',
      },
      {
        id: 6,
        title: 'آیا سِلاح همان علم است؟',
        description: 'در بحث سلاح و اینکه سلاح یکی از راههای تشخیص حجت می‌باشد، اختلافی وجود ندارد، بلکه اختلاف در معنای سلاح می‌باشد. برای رفع این اختلاف هم باید به روایات',
        image: 'images/1067.jpeg',
      },
      {
        id: 7,
        title: 'رد شبهات فتحیه',
        description: 'برای مشاهده مجله فصلنامه‌ی فاطمیه سال 1443 روی این متن کلیک نمایید. جهت شرکت در مسابقه فصلنامه مهدویت و پاسخدهی',
        image: 'images/1071.jpeg',
      },
      {
        id: 8,
        title: 'امامت مهدیین',
        description: 'ناظم العقیلی (از رهبران فرقه یمانی) در مقدّمه کتابش این چنین می‌گوید: 1️⃣- ﺑﻴﺎﻥ ﻭ ﺗﻮﺿﻴﺢ ﺍﻳﻦ ﻣﻮﺿﻮﻉ از آن ﺟﻬﺖ ﻋﻈﻤﺖ ﻭﻳﮋﻩﺍﯼ ﭘﻴﺪﺍ ﻣﯽ‌ﮐﻨﺪ ﮐﻪ ﻋﻠﻤﺎﯼ ﺁﺧﺮﺍﻟﺰﻣﺎﻥ ﻭ',
        image: 'images/1078.jpeg',
      },
      {
        id: 9,
        title: 'حدیث من ظهری',
        description: 'اصبغ بن نباته رحمه الله می گوید{اصول کافى جلد 2 صفحه 136 روایت 7} خدمت امیرالمؤ منین صلوات الله علیه رسیدم و دیدم آن حضرت متفکر است و زمین را خط می کشد، عرض',
        image: 'images/1025.jpeg',
      },
    ];

  _renderList(): unknown {
    const list = this.search?.length > 0 ?
      this.ـlist.filter((item) => (item.title + item.description).indexOf(this.search) !== -1) :
      this.ـlist.concat(this.ـlist); // duplicate list for demo

    return html`
      <ion-list lines="inset">
        ${repeat(list, (item) => item.id, (item) => html`
          <ion-item detail href=${router.makeUrl({sectionList: ['article-detail', item.id]})}>
            <ion-avatar slot="start">
              <img src="${item.image}">
            </ion-avatar>
            <ion-label>
              <h2>${item.title}</h2>
              <p>${item.description}</p>
            </ion-label>
          </ion-item>
        `)}
      </ion-list>
    `;
  }
}
