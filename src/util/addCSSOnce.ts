
export function addCSSOnce(uri: string) {
  const ALREADY_EXISTS = document.querySelector(`link[rel="stylesheet"][href="${uri}"]`) !== null;
  if(!ALREADY_EXISTS) {
    const link = document.createElement('link')
    link.rel = 'stylesheet';
    link.href = uri;
    link.setAttribute('data-addcssonce', '1')
    document.head.appendChild(link);
  }
}
