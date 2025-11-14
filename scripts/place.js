// Footer: current year and last modified date
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Static weather values (match your HTML content)
const temperature = 8;   // °C (example static value)
const windSpeed = 10;    // km/h (example static value)

// Wind chill calculation (Celsius formula)
// Formula source: Environment Canada
function calculateWindChill(temp, speed) {
  return (
    13.12 +
    0.6215 * temp -
    11.37 * Math.pow(speed, 0.16) +
    0.3965 * temp * Math.pow(speed, 0.16)
  ).toFixed(1);
}

// Apply conditions for viable wind chill calculation
let windchillValue = "N/A";
if (temperature <= 10 && windSpeed > 4.8) {
  windchillValue = calculateWindChill(temperature, windSpeed);
}

// Display results in the Weather section
document.getElementById("temp").textContent = temperature;
document.getElementById("wind").textContent = windSpeed;
document.getElementById("windchill").textContent = windchillValue;
