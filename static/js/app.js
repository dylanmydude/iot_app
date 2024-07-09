document.addEventListener('DOMContentLoaded', function() {
    function fetchReading() {
        fetch('/reading/')
            .then(response => response.json())
            .then(data => {
                document.getElementById('reading').innerText = 
                    `Temperature: ${data.temperature}°C, Humidity: ${data.humidity}%, Timestamp: ${data.timestamp}`;
            })
            .catch(error => console.error('Error:', error));
    }

    setInterval(fetchReading, 1000); // Fetch reading every second
});
