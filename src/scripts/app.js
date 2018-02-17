(() => {
    var _coordinates = [];
    var btnRight = "btn-right";
    var btnLeft = "btn-left";
    var container = "carouse-container"

    var init = () => {
        setCoordinates();
        document.getElementById(btnLeft).addEventListener('click', moveLeft);
        document.getElementById(btnRight).addEventListener('click', moveRight);
    }

    var setCoordinates = () => {
        var previus = 0,
            current = 0,
            coordinates = [];

        var items = document.querySelectorAll('.carousel-item');

        items.forEach((item, index) => {
            previus = coordinates[index - 1] || 0;
            var style = window.getComputedStyle(item);
            current = item.offsetWidth + style.marginRight;
            coordinates.push(previus + current * -1);
        });

        _coordinates = coordinates;
    }

    var moveLeft = () => {
        console.log("left");
        moveToCoordinate(300);
    };

    var moveRight = () => {
        console.log("right");
        moveToCoordinate(-300);
    };

    var moveToCoordinate = (coordinate) => {
        var containerElement = document.getElementById(container);
        containerElement.style.marginLeft =`${coordinate}px`;
    }

    init();
})();