document.addEventListener("DOMContentLoaded", function () {
    var cursor = document.querySelector('.cursor');

    function updateCursorPosition(x, y) {
        cursor.style.left = x + "px";
        cursor.style.top = y + "px";
    }

    document.addEventListener("mousemove", function (e) {
        updateCursorPosition(e.clientX, e.clientY);
    });

    document.addEventListener("touchmove", function (e) {
        var touch = e.touches[0];
        updateCursorPosition(touch.clientX, touch.clientY);
    });
});