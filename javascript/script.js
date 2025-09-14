document.addEventListener("DOMContentLoaded", function() {
  const draggableElements = document.querySelectorAll(".draggable");

  // Make all draggables listen for mousedown
  draggableElements.forEach((element) => {
    element.addEventListener("mousedown", onMouseDown);
  });

  let offsetX, offsetY;
  let draggedElement = null;

  // --- Dragging ---
  function onMouseDown(e) {
    if (e.target.classList.contains("header")) {
      draggedElement = e.currentTarget;
      const rect = draggedElement.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      bringToFront(draggedElement); // bring to front relative to other draggables
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    }
  }

  function onMouseMove(e) {
    if (!draggedElement) return;

    let newX = e.clientX - offsetX;
    let newY = e.clientY - offsetY;

    // Set position without touching z-index (windows stay below taskbar)
    draggedElement.style.left = `${newX}px`;
    draggedElement.style.top = `${newY}px`;
  }

  function onMouseUp() {
    if (!draggedElement) return;
    draggedElement = null;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }

  // --- Bring a window to front relative to other draggables (max zIndex < taskbar) ---
  function bringToFront(element) {
    const divs = document.querySelectorAll(".draggable");
    let highestZIndex = 2;

    divs.forEach((div) => {
      const zIndex = parseInt(window.getComputedStyle(div).zIndex, 10);
      if (!isNaN(zIndex) && zIndex > highestZIndex && zIndex < 100) {
        highestZIndex = zIndex;
      }
    });

    element.style.zIndex = highestZIndex + 1; // max 99, taskbar is 100
  }

  // --- Drop-up menu toggle ---
  function toggleDropUp() {
    const dropUpContent = document.getElementById("dropUpContent");
    dropUpContent.classList.toggle("show");
  }

  document.addEventListener("click", function(event) {
    const dropUpContent = document.getElementById("dropUpContent");
    const dropUpButton = document.querySelector(".box");

    if (!event.target.closest(".drop-up") && event.target !== dropUpButton) {
      dropUpContent.classList.remove("show");
    }
  });

  // --- Open/close tabs ---
  window.openTab = function(divNumber) {
    const divToOpen = document.getElementById("div" + divNumber);
    if (divToOpen) divToOpen.style.display = "block";

    const tabToOpen = document.getElementById("tab" + divNumber);
    if (tabToOpen) tabToOpen.style.display = "inline-block";
  };

  window.closeTab = function(divNumber) {
    const divToClose = document.getElementById("div" + divNumber);
    if (divToClose) divToClose.style.display = "none";

    const tabToClose = document.getElementById("tab" + divNumber);
    if (tabToClose) tabToClose.style.display = "none";
  };

  // --- Load iframe ---
  window.loadFrame = function(elm) {
    const frame = document.getElementById("frame2");
    if (frame) frame.src = elm.dataset.src;
  };

  // --- Icon buttons that open URLs ---
  const iconButtons = document.querySelectorAll(".opennew");
  iconButtons.forEach(button => {
    button.addEventListener("click", function() {
      const targetURL = button.getAttribute("data-target");
      if (targetURL) window.location.href = targetURL;
    });
  });

  // --- Toggle images ---
  const toggleButton = document.getElementById("toggleButton");
  const images = document.querySelectorAll(".toggle-image");
  let imagesVisible = false;

  if (toggleButton) {
    toggleButton.addEventListener("click", function() {
      images.forEach(image => {
        image.style.display = imagesVisible ? "none" : "block";
      });
      imagesVisible = !imagesVisible;
    });
  }
});
