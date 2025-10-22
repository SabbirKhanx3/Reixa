$(function () {
    $('.nav-btn').on('hover', function () {
        $(this).toggleClass('open');
    });
});

$(document).ready(function () {
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll > 100) {
            $("#header").addClass('glass-effect');
        } else {
            $("#header").removeClass("glass-effect");
        }
    });

    $(".tab").click(function () {
        let tabs = $(this).closest('.tabs');
        let tabContent = tabs.siblings('.tab-content');
        let backgroundContainer = tabs.siblings('.background-container');

        // Hapus kelas "active" dari semua tab dan tambahkan ke tab yang dihover
        tabs.find('.tab').removeClass('active');
        $(this).addClass("active");

        // Sembunyikan semua konten dan tampilkan yang sesuai dengan tab yang dihover
        let selectedTab = $(this).data("tab");
        tabContent.find(".content").removeClass("active");
        tabContent.find("#" + selectedTab).addClass("active");
    });


    // Ambil semua elemen h3.text
    $(".text").each(function () {
        var $this = $(this);
        var textContent = $this.text().trim(); // Ambil teks murni

        // Hapus isi h3, lalu isi ulang dengan karakter yang dibungkus <span>
        $this.empty();
        $.each(textContent.split(""), function (i, char) {
            $this.append($("<span>").text(char));
        });
    });

    // Scroll detection
    $(window).on("scroll", function () {
        $(".text").each(function () {
            var $textElement = $(this);
            var $spans = $textElement.find("span");

            var windowBottom = $(window).scrollTop() + $(window).height();
            var elementTop = $textElement.offset().top;
            var elementHeight = $textElement.outerHeight();

            // Kalau elemen masuk viewport
            if (windowBottom >= elementTop) {
                var visiblePart = Math.min(windowBottom - elementTop, elementHeight);
                var progress = visiblePart / elementHeight;
                var totalChars = $spans.length;
                var activeChars = Math.floor(progress * totalChars);

                $spans.each(function (index) {
                    if (index < activeChars) {
                        $(this).addClass("active").removeClass("active_");
                    } else {
                        $(this).removeClass("active").addClass("active_");
                    }
                });
            }
        });
    });

    // Icon box click activation
    $(document).on('click', '.icon-box', function () {
        $('.icon-box').removeClass('active');
        $(this).addClass('active');
    });
})

function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function animateNumber(element, targetNumber, duration) {
    const startTime = performance.now();
    const startNumber = 0;

    function updateNumber(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const currentNumber = Math.floor(startNumber + progress * (targetNumber - startNumber));

        element.innerText = formatNumber(currentNumber);

        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }

    requestAnimationFrame(updateNumber);
}

function checkScroll() {
    const numberElements = document.querySelectorAll('.number');
    numberElements.forEach(element => {
        // Periksa jika elemen sudah dianimasikan
        if (!element.classList.contains('animated')) {
            const targetValue = parseInt(element.getAttribute("data-target"), 10);
            const durationValue = parseInt(element.getAttribute("data-duration"), 10);

            // Memeriksa apakah elemen muncul di viewport
            const rect = element.getBoundingClientRect();
            if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                animateNumber(element, targetValue, durationValue);
                element.classList.add('animated'); // Tandai elemen sudah dianimasikan
            }
        }
    });
}

// Menambah event listener untuk scroll
window.addEventListener('scroll', checkScroll);

$(document).ready(function () {
    $('.marquee-container').each(function () {
        const cont = $(this); // Mengambil marquee-container saat ini
        const content = cont.find('.marquee-content');
        const clone = content.clone();
        const clone2 = clone.clone();
        cont.append(clone);
        cont.append(clone2); // Clone hanya untuk container ini

        cont.find('.marquee-content').addClass('marquee'); // Tambahkan class marquee pada konten yang di-clone
    });
});

