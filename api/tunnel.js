export default async function handler(req, res) {
  const query = req.url.split('?')[1] || '';
  const targetURL = `http://168.231.102.46:6969/?${query}`;

  try {
    const response = await fetch(targetURL);
    const html = await response.text();

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (err) {
    res.status(500).send(`<h1>Proxy Error</h1><p>${err.message}</p>`);
  }
}
