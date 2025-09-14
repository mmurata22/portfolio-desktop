document.addEventListener("DOMContentLoaded", () => {
    const draggables = document.querySelectorAll(".draggable");
    let dragged = null;
    let offsetX, offsetY;

    draggables.forEach(el => {
        const header = el.querySelector(".header");
        header.addEventListener("mousedown", e => {
            dragged = el;
            const rect = el.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
            bringToFront(el);
            document.addEventListener("mousemove", onMove);
            document.addEventListener("mouseup", onUp);
        });
    });

    function onMove(e) {
        if (!dragged) return;
        dragged.style.left = `${e.clientX - offsetX}px`;
        dragged.style.top = `${e.clientY - offsetY}px`;
    }

    function onUp() {
        if (!dragged) return;
        dragged = null;
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
    }

    function bringToFront(el) {
        const divs = document.querySelectorAll(".draggable");
        let highest = 2;
        divs.forEach(d => {
            const z = parseInt(window.getComputedStyle(d).zIndex) || 2;
            if (z > highest && z < 1000) highest = z;
        });
        el.style.zIndex = highest + 1;
    }

    // Open a popup (independent)
    window.openTab = divNumber => {
        const popup = document.getElementById("div" + divNumber);
        if (!popup) return;
        popup.style.display = "block";
        bringToFront(popup);
    };

    // Close a popup
    window.closeTab = divNumber => {
        const popup = document.getElementById("div" + divNumber);
        if (!popup) return;
        popup.style.display = "none";
    };

    // Time widget functionality - MOVED INSIDE DOMContentLoaded
    function updateTime() {
        // Check if elements exist before trying to update them
        const timeElement = document.getElementById('time');
        const dateElement = document.getElementById('date');
        
        if (!timeElement || !dateElement) {
            console.log("Time widget elements not found");
            return;
        }
        
        const now = new Date();
        
        // Format time
        const time = now.toLocaleTimeString('en-US', { 
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        // Format date
        const date = now.toLocaleDateString('en-US', { 
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
        
        // Update elements
        timeElement.textContent = time;
        dateElement.textContent = date;
    }

    // Initialize time widget only if elements exist
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');
    
    if (timeElement && dateElement) {
        updateTime();
        setInterval(updateTime, 1000);
        console.log("Time widget initialized");
    } else {
        console.log("Time widget elements not found in DOM");
    }
});