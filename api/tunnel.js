export default async function handler(req, res) {
  const query = req.url.split('?')[1] || '';
  const targetURL = `http://168.231.102.46:6969/?${query}`;

  try {
    const response = await fetch(targetURL);
    let html = await response.text();

    // Script to reroute internal fetch/XHR calls to the target server
    const hookScript = `
      <script>
      (function() {
        const BASE = 'http://168.231.102.46:6969';

        // Hook fetch
        const originalFetch = window.fetch;
        window.fetch = function(input, init) {
          if (typeof input === 'string' && input.startsWith('/')) {
            input = BASE + input;
          } else if (input instanceof Request && input.url.startsWith('/')) {
            input = new Request(BASE + input.url, input);
          }
          return originalFetch(input, init);
        };

        // Hook XMLHttpRequest
        const originalOpen = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function(method, url, ...rest) {
          if (url.startsWith('/')) {
            url = BASE + url;
          }
          return originalOpen.call(this, method, url, ...rest);
        };
      })();
      </script>
    `;

    // Inject the hook script into the <head>
    html = html.replace('<head>', `<head>${hookScript}`);

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (err) {
    res.status(500).send(`<h1>Proxy Error</h1><p>${err.message}</p>`);
  }
}
