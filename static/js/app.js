document.addEventListener('DOMContentLoaded', function() {
    alert('DOM fully loaded and parsed'); // Alert to test DOMContentLoaded

    function fetchReading() {
        fetch('/reading/')
            .then(response => response.json())
            .then(data => {
                document.getElementById('reading').innerText = 
                    `Temperature: ${data.temperature}°C, Humidity: ${data.humidity}%, Timestamp: ${data.timestamp}`;
                
                if (data.debug) {
                    document.getElementById('debug').innerText = data.debug;
                } else {
                    document.getElementById('debug').innerText = 'No debug info available';
                }
            })
            .catch(error => console.error('Error:', error));
    }

    setInterval(fetchReading, 10000); // Fetch reading every 10 seconds
    fetchReading(); // Fetch reading immediately on page load
});
