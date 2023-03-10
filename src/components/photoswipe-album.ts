import { LitElement, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import PhotoSwipeLightbox from 'photoswipe/lightbox'
import { addCSSOnce } from '../util/addCSSOnce.js'
import { getImageSizeFromUrl, ImageSize } from '../util/image.js';

export interface ImageData {
  id: string;
  src: string;
  size: ImageSize;
}

@customElement('dango-photoswipe-album-item')
export class PhotoAlbumItem extends LitElement {

  @property()
  id: string = '';

  @property()
  src: string = '';

  render() {
    return html``
  }
}

/**
 * An example element.
 *
 * @slot - The primary slot that accepts `<dango-photoswipe-album-item>`s
 * @csspart album - The underlying `<figure>` element that wraps all the `<img>`s
 * @csspart image - All the underlying `<img>`s
 */
@customElement('dango-photoswipe-album')
export class PhotoAlbum extends LitElement {

  @state()
  protected _lightbox?: PhotoSwipeLightbox = undefined;

  @state()
  images: ImageData[] = []

  async processSlottedChild(child: PhotoAlbumItem) {
    const id = child.id;
    const src = child.src;
    const size = await getImageSizeFromUrl(src)
    //console.log(child.id, child.src);
    this.images = [
      ...this.images,
      {
        id,
        src,
        size,
      }
    ]
  }

  handleSlotChange() {
    //console.log('handle slot change')
    // Ensure all children of slot have a unique ID
    const children = Array.from(this.children).filter(e => e.tagName.toLowerCase() === 'dango-photoswipe-album-item') as PhotoAlbumItem[];
    children.forEach(child => {
      child.id = crypto.randomUUID();
    })
    Promise.allSettled(children.map(e => this.processSlottedChild(e)));
    this.createLightbox();
  }

  createLightbox() {
    // We need the styles
    addCSSOnce('https://cdn.jsdelivr.net/npm/photoswipe@5/dist/photoswipe.css')
    // If the lightbox is already created, destroy it so we can recreate it
    if (this._lightbox !== undefined) {
      this._lightbox.destroy();
    }

    // Create a new lightbox
    this._lightbox = new PhotoSwipeLightbox({
      //gallery: this.renderRoot.querySelectorAll('.pswp-gallery'),
      gallery: this.renderRoot.querySelectorAll('figure'),
      children: 'a',
      pswpModule: () => import('photoswipe')
    });
    this._lightbox.init();
  }

  render() {
    return html`
      <slot @slotchange="${this.handleSlotChange}"></slot>
      <figure part="album">
        ${this.images.map(image => (
          html`<a
                data-pswp-src="${image.src}"
                data-pswp-width="${image.size.naturalWidth}"
                data-pswp-height="${image.size.naturalHeight}"
                >
                  <img src="${image.src}" part="image" />
                </a>`
        ))}
      </figure>
    `
  }

  static styles = css`
    :host {
      --album-border-color: #E5E7EB;
      --album-background-color: #fff;
    }

    @media (prefers-color-scheme: dark) {
      :host {
        --album-border-color: #222222;
        --album-background-color: #515151;
      }
    }

    :host {
      display: inline-block;
    }

    :host::part(album) {
      flex-wrap: 'nowrap';
    }

    :host::part(image) {
      max-width: none;
      max-height: 200px;
    }

    figure {
      background-color: var(--album-background-color);
      display: inline-flex;
      gap: 0.5rem;
      padding: 0.5rem;
      border-radius: 15px;
      max-width: 100%;
      margin: 0;
    }


    figure img {
      border-radius: calc(15px - 0.5rem);
      margin: 0;
    }

    img {
      display: block;
      /* max-width: 100%; */
      width: 100%;
      max-width: 500px;
      margin: 0 0 1rem;
      border-radius: 5px;
    }

    @media (prefers-color-scheme: light) {
      image {
        border: 1px solid hsl(0, 0%, 94%);
      }
      figure {
        border: 1px solid var(--album-border-color);
        border-bottom: 3px solid var(--album-border-color);
      }
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'dango-photoswipe-album': PhotoAlbum
    'dango-photoswipe-album-item': PhotoAlbumItem,
  }
}
