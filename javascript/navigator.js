/*
 *  Websites list in order
 */
var websites = [
    "https://lehigh-university-design.github.io/project-1-awb324/",
    "https://lehigh-university-design.github.io/project-1-sit225/",
    "https://lehigh-university-design.github.io/project-1-lar326/",
    "https://lehigh-university-design.github.io/project-1-adrawoot/",
    "https://lehigh-university-design.github.io/project-1-mmurata22/",
    "https://lehigh-university-design.github.io/project-1-SSShee77y/",
    "https://lehigh-university-design.github.io/project-1-eyt225/",
    "https://lehigh-university-design.github.io/project-1-shirls326/",
    "https://lehigh-university-design.github.io/project-1-Colin941/",
    "https://lehigh-university-design.github.io/project-1-ellafall/",
    "https://lehigh-university-design.github.io/project-1-laurj46/",
    "https://lehigh-university-design.github.io/project-1-kaydolan/",
    "https://lehigh-university-design.github.io/project-1-dsw225/",
    "https://lehigh-university-design.github.io/project-1-timaldroubi/"
];

/*
 *  Website index variable
 */
var currentIndex = 0;

window.onload = function getCurrentIndex() {
    var path = window.location.href.split("#")[0];
    currentIndex = websites.indexOf(path);
    if (currentIndex == -1) {
        currentIndex = websites.indexOf(path.split("/").pop());
    }
}

/*
 *  Goes to the previous page from the index of current page in list
 */
function goToPrevious() {
    currentIndex = (currentIndex - 1 + websites.length) % websites.length;
    location.href = websites[currentIndex];
}

/*
 *  Goes to the next page from the index of current page in list
 */
function goToNext() {
    currentIndex = (currentIndex + 1) % websites.length;
    location.href = websites[currentIndex];
}

/*
 *  Goes to random page that is not the current page
 */
function goToRandom() {
    var randomIndex = currentIndex;
    while (randomIndex == currentIndex) {
        randomIndex = Math.floor(Math.random() * websites.length);
    }
    currentIndex = randomIndex;
    location.href = websites[currentIndex];
}