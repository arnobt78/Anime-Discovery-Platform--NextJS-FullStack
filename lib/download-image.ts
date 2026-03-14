/**
 * Trigger image download. Uses our API proxy so the response is same-origin
 * and the browser downloads the file instead of opening in a new tab.
 */
export function downloadImage(url: string, filename: string): void {
  const proxyUrl = `/api/download-image?url=${encodeURIComponent(url)}&filename=${encodeURIComponent(filename)}`;
  const a = document.createElement("a");
  a.href = proxyUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
