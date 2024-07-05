// info.js

const apiKey = 'AIzaSyAZNiLH-wqNPkl1OtPRkD0BqMPeCAM1gjE';
const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

async function fetchData() {
    const requestBody = {
        contents: [
            {
                parts: [
                    {
                        text: 'explain about the galaxies in the universe'
                    }
                ]
            }
        ]
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Response Data:', JSON.stringify(data, null, 2)); // Log the response for debugging
        return data;

    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

function displayData(data) {
    if (data.candidates && data.candidates.length > 0 && 
        data.candidates[0].content && 
        data.candidates[0].content.parts && 
        data.candidates[0].content.parts.length > 0) {
        
        const generatedText = data.candidates[0].content.parts[0].text;
        document.getElementById('api-data').innerHTML = `
            <h2>Space Discoveries</h2>
            <p>${generatedText}</p>
        `;
    } else {
        document.getElementById('api-data').innerHTML = '<p>Unexpected response structure.</p>';
    }
}

async function init() {
    try {
        const data = await fetchData();
        displayData(data);
    } catch (error) {
        document.getElementById('api-data').innerHTML = '<p>Failed to load data.</p>';
    }
}

// Initialize fetching data when the page loads
window.onload = init;
