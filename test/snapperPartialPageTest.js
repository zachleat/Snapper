SnapperPartialPageTest = AsyncTestCase('SnapperPartialPageTest');
SnapperPartialPageTest.prototype.slideHeight = 200;

SnapperPartialPageTest.prototype.setUp = function()
{
    $('html, body').css({
        padding: 0,
        margin: 0
    });
    var slideHtml = '<div class="slide"></div>',
        slides = [];

    for(var j=0, k=10; j<k; j++) {
        slides.push(slideHtml);
    }

    $(document.body).html(slides.join(''));
    $('div.slide').height(this.slideHeight);

    Snapper('.slide', {reset: true});
};

SnapperPartialPageTest.prototype.testSnapToSlideOne = function(queue)
{
    $(window).scrollTop(this.slideHeight * .1);

    var scrolltopArgument;

    queue.call('Custom event fires.', function(callbacks) {
        $(document).one('snapperSnappedTo', callbacks.add(function(event, scrolltop) {
            scrolltopArgument = scrolltop;
        }));
    });

    queue.call('Check scrolltop.', function(callbacks) {
        assertEquals('Custom event argument is set.', 0, scrolltopArgument);
        assertEquals('Window scrolltop is still zero.', 0, $(window).scrollTop());
    });
};

SnapperPartialPageTest.prototype.testSnapToSlideTwo = function(queue)
{
    $(window).scrollTop(this.slideHeight * 1.1);

    var scrolltopArgument;

    queue.call('Custom event fires.', function(callbacks) {
        $(document).one('snapperSnappedTo', callbacks.add(function(event, scrolltop) {
            scrolltopArgument = scrolltop;
        }));
    });

    queue.call('Check scrolltop.', function(callbacks) {
        assertEquals('Custom event argument is set.', this.slideHeight, scrolltopArgument);
        assertEquals('Window scrolltop is equal to slide height.', this.slideHeight, $(window).scrollTop());
    });
};
