export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Manually reconstruct the URL-encoded body string
        const bodyStr = new URLSearchParams(req.body).toString();

        const response = await fetch('http://168.231.102.46:6969/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: bodyStr,
        });

        const data = await response.text(); // or use .json() if it's JSON
        res.status(200).send(data);
    } catch (error) {
        res.status(500).json({ error: 'Proxy error', details: error.message });
    }
}
