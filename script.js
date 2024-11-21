    document.getElementById('search').addEventListener('click', function () {
        const city = document.getElementById('city').value.trim();
        const apiKey = 'CHAVE-API';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${apiKey}`;
    
        const weatherInfo = document.getElementById('weather-info');
        weatherInfo.innerHTML = '';
    
        if (!city) {
            alert('Por favor, digite o nome de uma cidade.');
            return;
        }
    
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error('Cidade não encontrada. Verifique o nome e tente novamente.');
                    } else if (response.status === 401) {
                        throw new Error('Erro de autenticação. Verifique sua chave de API.');
                    } else if (response.status === 500) {
                        throw new Error('Erro no servidor. Tente novamente mais tarde.');
                    } else {
                        throw new Error('Erro desconhecido. Tente novamente.');
                    }
                }
                return response.json();
            })
            .then(data => {
                const { temp, feels_like, humidity } = data.main;
                const { description, icon } = data.weather[0];
                const { name, country } = data;
    
                weatherInfo.innerHTML = `
                    <div class="card">
                        <h2>${name}, ${country}</h2>
                        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
                        <p><strong>Temperatura:</strong> ${temp}°C</p>
                        <p><strong>Sensação Térmica:</strong> ${feels_like}°C</p>
                        <p><strong>Clima:</strong> ${description}</p>
                        <p><strong>Umidade:</strong> ${humidity}%</p>
                    </div>
                `;
            })
            .catch(error => {
                weatherInfo.innerHTML = `
                    <div class="card">
                        <p style="color: red;">${error.message}</p>
                    </div>
                `;
            });
    });
    