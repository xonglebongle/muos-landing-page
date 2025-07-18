function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const isPM = hours >= 12;
    hours = hours % 12 || 12;
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${isPM ? 'PM' : 'AM'}`;
    document.getElementById("time").textContent = formattedTime;
}

setInterval(updateTime, 1000);
updateTime();

function getBatteryIcon(level, charging) {
    if (charging) return 'fa-bolt';
    if (level >= 90) return 'fa-battery-full';
    if (level >= 60) return 'fa-battery-three-quarters';
    if (level >= 30) return 'fa-battery-half';
    if (level >= 10) return 'fa-battery-quarter';
    return 'fa-battery-empty';
}

function updateBatteryStatus(battery) {
    const level = Math.round(battery.level * 100);
    const charging = battery.charging;
    const iconClass = getBatteryIcon(level, charging);
    const batterySpan = document.getElementById("battery");
    batterySpan.innerHTML = `<i class="fas ${iconClass}"></i> ${level}%`;
}

if ('getBattery' in navigator) {
    navigator.getBattery().then(battery => {
        updateBatteryStatus(battery);
        battery.addEventListener('levelchange', () => updateBatteryStatus(battery));
        battery.addEventListener('chargingchange', () => updateBatteryStatus(battery));
    });
} else {
    document.getElementById("battery").innerHTML = `<i class="fas fa-battery-full"></i>`;
}

let lastTapped = null;

document.querySelectorAll('.menu-button').forEach(button => {
    button.addEventListener('click', function (e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();

            if (lastTapped === this) {
                window.location.href = this.getAttribute('href');
            } else {
                document.querySelectorAll('.menu-button').forEach(btn => btn.classList.remove('tapped'));
                this.classList.add('tapped');
                lastTapped = this;
            }
        }
    });
});

document.addEventListener('click', function (e) {
    if (!e.target.closest('.menu-button')) {
        document.querySelectorAll('.menu-button').forEach(btn => btn.classList.remove('tapped'));
        lastTapped = null;
    }
});