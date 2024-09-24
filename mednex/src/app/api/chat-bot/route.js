
export async function POST(request) {
    try {
        const { question } = await request.json();

        const response = await fetch('http://localhost:5000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ error: 'Something went wrong.' }), { status: 500 });
    }
}
