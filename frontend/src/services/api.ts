const API_URL = "https://chat-8mt7.onrender.com/chat"

export async function sendMessage(user_id: string, question: string) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id, question }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}