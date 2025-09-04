export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const response = await fetch('http://168.231.102.46:6969/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: req.body,
        });

        const data = await response.text(); // use .json() if response is JSON
        res.status(200).send(data);
    } catch (error) {
        res.status(500).json({ error: 'Proxy error', details: error.message });
    }
}
