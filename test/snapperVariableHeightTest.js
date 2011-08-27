SnapperVariableHeightTest = AsyncTestCase('SnapperVariableHeightTest');

SnapperVariableHeightTest.prototype.randomNumber = function(from, to)
{
   return Math.floor(Math.random() * (to - from + 1) + from);
};

SnapperVariableHeightTest.prototype.setUp = function()
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
    
    var t = this;
    $('div.slide').each(function() {
        $(this).height(t.randomNumber(40, 300));
    });

    Snapper('.slide', {reset: true});
};

SnapperVariableHeightTest.prototype.testSnapToSlideOne = function(queue)
{
    $(window).scrollTop(10);

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

SnapperVariableHeightTest.prototype.testSnapToSlideTwo = function(queue)
{
    var slideHeight = $('div.slide').eq(0).height();
    $(window).scrollTop(slideHeight * 1.1);

    var scrolltopArgument;

    queue.call('Custom event fires.', function(callbacks) {
        $(document).one('snapperSnappedTo', callbacks.add(function(event, scrolltop) {
            scrolltopArgument = scrolltop;
        }));
    });

    queue.call('Check scrolltop.', function(callbacks) {
        assertEquals('Custom event argument is set.', slideHeight, scrolltopArgument);
        assertEquals('Window scrolltop is equal to slide height.', slideHeight, $(window).scrollTop());
    });
};
