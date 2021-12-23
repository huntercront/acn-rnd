WebFontConfig = {
    custom: {
        families: ['Graphik:n4,n5,n7'],
        urls: ['../css/font.css']
    }
};

(function(d) {
    var wf = d.createElement('script'),
        s = d.scripts[0];
    wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
    wf.async = true;
    s.parentNode.insertBefore(wf, s);
})(document);

//loader function
var Loader = function() {}
Loader.prototype = {
    require: function(scripts, callback) {
        this.loadCount = 0;
        this.totalRequired = scripts.length;
        this.callback = callback;

        for (var i = 0; i < scripts.length; i++) {
            this.writeScript(scripts[i]);
        }
    },
    loaded: function(evt) {
        this.loadCount++;

        if (this.loadCount == this.totalRequired && typeof this.callback == 'function') this.callback.call();
    },
    writeScript: function(src) {
        var self = this;
        var s = document.createElement('script');
        s.type = "text/javascript";
        s.defer = true;
        s.src = src;
        s.addEventListener('load', function(e) { self.loaded(e); }, false);
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(s);
    }
}


var l = new Loader();
l.require([
        '../js/lazy-load.js'
    ],
    function() {

    });



document.addEventListener("DOMContentLoaded", function(event) {
    function slideToggle(t, e, o) { 0 === t.clientHeight ? j(t, e, o, !0) : j(t, e, o) }

    function slideUp(t, e, o) { j(t, e, o) }

    function slideDown(t, e, o) { j(t, e, o, !0) }

    function j(t, e, o, i) {
        void 0 === e && (e = 400), void 0 === i && (i = !1), t.style.overflow = "hidden", i && (t.style.display = "block");
        var p, l = window.getComputedStyle(t),
            n = parseFloat(l.getPropertyValue("height")),
            a = parseFloat(l.getPropertyValue("padding-top")),
            s = parseFloat(l.getPropertyValue("padding-bottom")),
            r = parseFloat(l.getPropertyValue("margin-top")),
            d = parseFloat(l.getPropertyValue("margin-bottom")),
            g = n / e,
            y = a / e,
            m = s / e,
            u = r / e,
            h = d / e;
        window.requestAnimationFrame(function l(x) {
            void 0 === p && (p = x);
            var f = x - p;
            i ? (t.style.height = g * f + "px", t.style.paddingTop = y * f + "px", t.style.paddingBottom = m * f + "px", t.style.marginTop = u * f + "px", t.style.marginBottom = h * f + "px") : (t.style.height = n - g * f + "px", t.style.paddingTop = a - y * f + "px", t.style.paddingBottom = s - m * f + "px", t.style.marginTop = r - u * f + "px", t.style.marginBottom = d - h * f + "px"), f >= e ? (t.style.height = "", t.style.paddingTop = "", t.style.paddingBottom = "", t.style.marginTop = "", t.style.marginBottom = "", t.style.overflow = "", i || (t.style.display = "none"), "function" == typeof o && o()) : window.requestAnimationFrame(l)
        })
    }


    let accordeons = document.querySelectorAll('.route-block')
    if (accordeons.length > 0) {
        accordeons.forEach(function(accordeon) {
            accordeon.querySelector('summary').addEventListener('click', function(e) {
                e.preventDefault();
                let panel = accordeon.querySelector('.content');

                if (accordeon.open == false) {
                    accordeon.open = open;
                    slideToggle(panel, 250);
                    accordeon.classList.toggle('open');
                } else {
                    slideToggle(panel, 250);
                    accordeon.classList.toggle('open');

                    setTimeout(() => {
                        accordeon.removeAttribute("open");

                    }, 250);
                }
            });
        });
    }

    function getScrollbarWidth() {
        const outer = document.createElement('div');
        outer.style.visibility = 'hidden';
        outer.style.overflow = 'scroll';
        outer.style.msOverflowStyle = 'scrollbar';
        document.body.appendChild(outer);
        const inner = document.createElement('div');
        outer.appendChild(inner);
        const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
        outer.parentNode.removeChild(outer);
        return scrollbarWidth;
    }


    let modal = document.querySelector('.info-modal')
    let stacks = document.querySelectorAll('.stack-el');
    let stackContainer = document.querySelector('.modal-main');
    let header = document.querySelector('.header');
    let scrollWidth = getScrollbarWidth() + 'px';
    let closeButton = document.querySelector('.close-icon')


    let stackTittle = document.querySelector('.modal-header .text strong')
    stacks.forEach(function(stack) {
        stack.addEventListener('click', function(e) {
            e.preventDefault();
            let stackText = stack.getAttribute('data-text');
            stackTittle.textContent = stack.querySelector('.text strong').textContent
            stackContainer.textContent = stackText;
            openModal();
        });
    });

    function openModal() {
        modal.classList.add('modal-open');
        document.body.classList.add('body-lock');
        header.style.paddingRight = scrollWidth;
        document.body.style.paddingRight = scrollWidth;
    }

    closeButton.addEventListener('click', function(e) {
        closeModal();
    });
    modal.addEventListener('click', function(e) {
        closeModal();
    });

    function closeModal() {
        modal.classList.add('will-close');

        setTimeout(() => {


            if (modal.classList.contains('will-close', 'modal-open')) {
                modal.classList.remove('modal-open', 'will-close');
                document.body.classList.remove('body-lock');
                header.style.paddingRight = '0px';
                document.body.style.paddingRight = '0px';
            }

        }, 350);
    }


    let last_known_scroll_position = 0;
    let ticking = false;
    let video = document.querySelector('video.lazy')

    function doSomething(scroll_pos) {
        // animOnScroll()
    }

    window.addEventListener('scroll', function(e) {
        last_known_scroll_position = window.scrollY;

        if (!ticking) {
            window.requestAnimationFrame(function() {
                doSomething(last_known_scroll_position);
                ticking = false;
            });

            ticking = true;
        }
    });
    const aminItems = document.querySelectorAll('.animate')

    function animOnScroll() {
        aminItems.forEach(function(aminItem) {
            let animItemHeight = aminItem.offsetHeight;
            let animItemOffset = offset(aminItem).top;
            let animStart = 8;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }
            if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                aminItem.classList.add('active');
                if (aminItem.classList.contains('video')) {
                    video.play();
                    video.volume = 0.1;
                    video.removeAttribute('muted')
                }

            } else {
                if (aminItem.classList.contains('video')) {
                    video.pause();
                }
            }
        })
    }

    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }
    setTimeout(() => {
        // animOnScroll();
    }, 300);

})