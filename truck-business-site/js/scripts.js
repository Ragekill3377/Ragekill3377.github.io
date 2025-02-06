document.addEventListener('DOMContentLoaded', function() {
    const langSelect = document.getElementById('language-select');
    const elements = document.querySelectorAll('[data-lang]');
    const contactForm = document.getElementById('contact-form');
    const emailInput = document.getElementById('email');
    const sendBtn = document.getElementById('send-btn');
    const responseMessage = document.getElementById('response-message');

    let currentLang = 'en';

    function loadLanguage(lang) {
        fetch('lang/lang.json')
            .then(response => response.json())
            .then(data => {
                elements.forEach(element => {
                    const key = element.getAttribute('data-lang');
                    element.textContent = data[lang][key];
                });
            });
    }

    langSelect.addEventListener('change', function() {
        currentLang = this.value;
        loadLanguage(currentLang);
    });

    emailInput.addEventListener('input', function() {
        if (validateEmail(this.value)) {
            sendBtn.disabled = false;
        } else {
            sendBtn.disabled = true;
        }
    });

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = emailInput.value;
        sendMessageToDiscord(email);
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function sendMessageToDiscord(email) {
        const webhookURL = 'https://discord.com/api/webhooks/1337084738695073793/Xxu46uhuLdEUxotPN-56foAEUpN7EsoNvKr3_-yTchL7RM03h9zfY0Gng2jZbXDFJxFI';
        const message = {
            content: `New contact form submission: ${email}`
        };

        fetch(webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        })
        .then(response => {
            if (response.ok) {
                responseMessage.textContent = 'Thank you! We will reach out to you shortly.';
            } else {
                responseMessage.textContent = 'Failed to send message. Please try again.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            responseMessage.textContent = 'Failed to send message. Please try again.';
        });
    }

    loadLanguage(currentLang);
});
