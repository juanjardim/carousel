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

        var items = getItems();

        items.forEach((item, index) => {
            previus = coordinates[index - 1] || 0;
            var style = window.getComputedStyle(item);
            current = item.offsetWidth + parseFloat(style.marginLeft) + parseFloat(style.marginRight);
            coordinates.push(previus + current);
        });

        _coordinates = coordinates;
    };

    var getItems = function () {
        return document.querySelectorAll('.carousel-item');
    }

    var getRightVisibleElementPosition = function () {
        var items = getItems();
        var wrapper = document.querySelector('.carousel-wrapper');
        var scrollLeft = wrapper.scrollLeft;
        var containerWidth = wrapper.offsetWidth;
        var currentElement = items.length - 1;
        for (let i = 0; i < items.length; i++) {
            var item = items[i];
            var offsetLeft = item.offsetLeft - scrollLeft;
            var xPosition = offsetLeft + item.offsetWidth;
            if (offsetLeft >= 0 && xPosition > containerWidth) {
                currentElement = i;
                break;
            }
        }

        var currentPosition = _coordinates[currentElement];
        return Math.abs((containerWidth / 2) - currentPosition);
    }

    var getLeftVisibleElementPosition = function () {
        var items = getItems();
        var currentElementPosition = 0;
        var currentElement = 0;
        var wrapper = document.querySelector('.carousel-wrapper');
        var containerWidth = wrapper.offsetWidth;
        var scrollLeft = wrapper.scrollLeft;

        for (let i = 0; i < items.length; i++) {
            var item = items[i];
            var offsetLeft = item.offsetLeft - scrollLeft;
            if (offsetLeft <= 0) {
                currentElement = i;
            } else {
                break;
            }
        }
        if (currentElement == 0)
            return 0;
        var currentPosition = _coordinates[currentElement];
        return Math.abs((containerWidth / 2) - currentPosition);
    }

    var moveLeft = () => {
        var currentPosition = getLeftVisibleElementPosition();
        moveToCoordinate(currentPosition);
    };

    var moveRight = () => {
        var currentPosition = getRightVisibleElementPosition();
        moveToCoordinate(currentPosition);
    };

    var moveToCoordinate = (coordinate, direction) => {
        if (coordinate === null)
            return;
        var containerElement = document.querySelector('.carousel-wrapper');
        //containerElement.scrollLeft = coordinate;
        scrollTo(containerElement, coordinate, 1250);
    }

    var timeout = 0;

    var scrollTo = (element, to, duration) => {
        var start = element.scrollLeft,
            change = to - start,
            currentTime = 0,
            increment = 50;

        clearTimeout(timeout);

        var easeInOutQuad = (t, b, c, d) => {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        var animateScroll = function () {
            currentTime += increment;
            var val = easeInOutQuad(currentTime, start, change, duration);
            element.scrollLeft = val;
            if (currentTime < duration) {
                timeout = setTimeout(animateScroll, increment);
            }
        };
        animateScroll();
    }



    init();
})();