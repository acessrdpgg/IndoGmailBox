export default async function handler(req, res) {
  const query = req.url.split('?')[1] || '';
  const targetURL = `http://168.231.102.46:6969/?${query}`;

  try {
    const response = await fetch(targetURL);
    const contentType = response.headers.get('content-type') || 'text/plain';
    const body = await response.text();

    res.setHeader('Content-Type', contentType);
    res.status(200).send(body);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).send('Proxy failed: ' + error.message);
  }
}
