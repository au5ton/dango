
export interface ImageSize {
  naturalWidth: number;
  naturalHeight: number;
}

export async function getImageSizeFromUrl(url: string): Promise<ImageSize> {
  const img = new Image()
  img.src = url
  return await getImageSize(img)
}

export async function getImageSize(img: HTMLImageElement): Promise<ImageSize> {
  await img.decode();
  return {
    naturalWidth: img.naturalWidth,
    naturalHeight: img.naturalHeight,
  }
}

// export async function getImageSize(element: Element, createThumbnail: boolean = false): Promise<ImageSize | undefined> {
  

//   if (element.tagName === 'A') {
//     const src = element.getAttribute('data-pswp-src') ?? element.getAttribute('href');
//     if (src) {
//       const img = new Image();
//       img.src = src;
//       // If no
//       if (createThumbnail && element.querySelector('img') === null) {
//         element.appendChild(img);
//       }
//       return getImageSize(img);
//     }
//   }
//   else if (element.tagName === 'IMG') {
//     const img = element as HTMLImageElement;
//     const size = await getSize(img)
//     const id = img.getAttribute(CHILD_ID_ATTR);
//     if (createThumbnail && id) {
//       const a = document.createElement('a')
//       a.setAttribute('data-pswp-src', img.src);
//       a.setAttribute(CHILD_ID_ATTR, id);
//     }
//     return size;
//   }
//   else {
//     return undefined
//   }
// }
