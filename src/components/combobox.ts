import { LitElement, css, html } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import { Ref, createRef, ref } from 'lit/directives/ref.js'
import { SP500, Stock } from '../test_data/sp500.js'
import { Customer, SearchCustomers } from '../test_data/northwind_customers.js'
import { groupBy } from '../util/groupBy.js'

const SP500_GROUPED = Object.entries<Stock[]>(groupBy(SP500, 'gics_sector'))

/**
 * Attempts to make <datalist> easier to use in a more consistent and cross-platform way.
 * 
 * Resources:
 * - https://chriswarrick.com/blog/2020/02/09/when-html-is-not-enough-a-tale-of-the-datalist-element/
 * - https://adrianroselli.com/2023/06/under-engineered-comboboxen.html
 */
@customElement('dango-combobox')
export class Combobox extends LitElement {

  inputRef: Ref<HTMLInputElement> = createRef()
  datalistRef: Ref<HTMLDataListElement> = createRef();

  get showPickerCapable(): boolean {
    return ('showPicker' in HTMLInputElement.prototype)
  }

  get isFirefox(): boolean {
    return navigator.userAgent.match(/(firefox)\/([\w\.]+)/i) !== null;
  }

  private tryShowPicker() {
    if (this.inputRef.value !== undefined) {
      try {
        if (this.showPickerCapable) {
          this.inputRef.value.showPicker();
        }
        else if (this.isFirefox) {
          //fakeUpKeyboardEvent(this.inputRef.value);
        }
        
      }
      catch {}
    }
  }
  

  render() {
    //return this.renderSP500();
    return this.renderCustomers();
  }

  renderSP500() {
    return html`
      <label>
        Choose a company from this list:
        <input type="text" list="data" ${ref(this.inputRef)} @focus=${this.tryShowPicker} />
        <datalist id="data" ${ref(this.datalistRef)} >
          <!-- ${SP500_GROUPED.map(([ groupName, stocks ]) => html`
            <optgroup label="${groupName}">
            ${stocks.map(stock => html`
              <option value="${stock.security}" label="${stock.symbol}"></option>
            `)}
            </optgroup>
          `)} -->
          ${SP500.map(stock => html`
            <option value="${stock.security}" label="${stock.symbol}"></option>
          `)}
        </datalist>
      </label>
    `
  }

  @state()
  customers: Customer[] = [];

  private async handleInput(event: InputEvent) {
    const query = event.target instanceof HTMLInputElement ? event.target.value : '';
    this.customers = await SearchCustomers(query);
  }

  renderCustomers() {
    return html`
      <label>
        Search a Customer:
        <input type="text" list="data" ${ref(this.inputRef)} @input=${this.handleInput} />
        <datalist id="data" ${ref(this.datalistRef)} >
          c
          <!-- ${SP500_GROUPED.map(([ groupName, stocks ]) => html`
            <optgroup label="${groupName}">
            ${stocks.map(stock => html`
              <option value="${stock.security}" label="${stock.symbol}"></option>
            `)}
            </optgroup>
          `)} -->
          ${this.customers.map(cust => html`
            <option value="${cust.ContactName}" label="${cust.ContactName}"></option>
          `)}
        </datalist>
      </label>
    `
  }

  static styles = css`
    :host {
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'dango-combobox': Combobox
  }
}
