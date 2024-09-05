function setMinDate() {
    const today = new Date().toISOString().split("T")[0];
    const eventDate = document.querySelector(".event-date");
    eventDate.setAttribute("min", today);
    eventDate.addEventListener("input", function () {
        if (eventDate.value < today) {
            eventDate.value = today;
        }
    });
}

setMinDate();

function addEvent() {
    const eventName = document.querySelector(".event-name").value;
    const eventDate = document.querySelector(".event-date").value;
    const eventOrganizer = document.querySelector(".organizer").value;
    const eventTimeStamp = new Date(eventDate).getTime();
    if (eventName && eventDate && eventOrganizer) {
        const event = {
            name: eventName,
            date: eventDate,
            organizer: eventOrganizer,
            timeStamp: eventTimeStamp,
        };
        let events = JSON.parse(localStorage.getItem("events")) || [];
        events.push(event);
        localStorage.setItem("events", JSON.stringify(events));
        const inputs = document.querySelectorAll("input");
        inputs.forEach((i) => (i.value = ""));
        displayEvent();
    } else {
        alert("Please Fill All Fields");
    }
}

function displayEvent() {
    const events = JSON.parse(localStorage.getItem("events")) || [];
    const eventsList = document.querySelector(".events");
    eventsList.innerHTML = "";
    events.forEach((event, index) => {
        const now = new Date().getTime();
        const timeLeft = event.timeStamp - now;
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        const cowntDown = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        eventsList.innerHTML += `
        <div class = "event">
            <h2>${event.name}</h2>
            <p><span>By</span> ${event.organizer}</p>
            <p><span>On</span> ${event.date}</p>
            <p><span>Time Left</span> ${cowntDown}</p>
            <button onclick = "deleteEvent(${index})">Delete</button>
        </div>
        `;
    });
}

displayEvent();

function deleteEvent(index) {
    const events = JSON.parse(localStorage.getItem("events"));
    events.splice(index, 1);
    localStorage.setItem("events", JSON.stringify(events));
    displayEvent();
}

setInterval(displayEvent, 1000);
