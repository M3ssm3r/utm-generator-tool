// Простой скрипт для генерации UTM-меток. Никаких фреймворков, только ванильный JS.

const inputs = document.querySelectorAll('input');
const resultUrlTextarea = document.getElementById('resultUrl');
const copyButton = document.getElementById('copyButton');

function generateUrl() {
    const baseUrl = document.getElementById('baseUrl').value.trim();
    if (!baseUrl) {
        resultUrlTextarea.value = '';
        return;
    }

    const params = new URLSearchParams();
    
    // Собираем все utm-поля
    ['utmSource', 'utmMedium', 'utmCampaign', 'utmTerm', 'utmContent'].forEach(id => {
        const value = document.getElementById(id).value.trim();
        if (value) {
            // Режем 'utm' из id, чтобы получить чистый ключ
            const key = id.replace('utm', '').toLowerCase(); 
            params.set('utm_' + key, value);
        }
    });

    resultUrlTextarea.value = `${baseUrl}?${params.toString()}`;
}

inputs.forEach(input => input.addEventListener('input', generateUrl));

copyButton.addEventListener('click', () => {
    resultUrlTextarea.select();
    document.execCommand('copy');
    copyButton.textContent = 'Скопировано!';
    setTimeout(() => {
        copyButton.textContent = 'Копировать';
    }, 1500);
});

// Initial call to generate on load if there's any pre-filled data
generateUrl();
