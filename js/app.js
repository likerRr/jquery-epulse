$(document).ready(app);

function app() {
  addHighlightLabels();
  enableCodeHiding();

  rippleButtonExample();
  rainExample();
}

function rippleButtonExample() {
  $.fn.ripple = function () {
    $(this).ePulse({bgColor: 'rgba(225, 190, 231, 0.5)', event: 'mousedown'})
  };
  $("#ripple-button")
    .css({
      position: 'relative',
      overflow: 'hidden',
      background: '#009688',
      color: 'white',
      padding: '5px 10px',
      border: 'transparent'
    })
    .ripple();
}

function rainExample() {
  var $rain = $('<div>', {
    width: '400px',
    height: '400px'
  });
  $('#rain-container').append($rain);

  var drop = $.ePulse({
    container: $rain,
    speed: 'fast',
    size: [5, 20],
    bgColor: 'blue',
    reverseOpacity: true,
    autoDelete: false,
    forceContainerStyles: true
  }, null, function afterAnimation() {
    // rain effect
    this.css('opacity', (Math.floor(Math.random() * 9) + 2) / 10);
    this.animate({
      opacity: 0
    }, 8000, function () {
      this.remove();
    });
  });

  function getRandomPos() {
    return Math.random() * $rain.width();
  }

  function startRain() {
    setTimeout(function () {
      drop(getRandomPos(), getRandomPos());
      requestAnimationFrame(startRain)
    }, Math.random() * 100);
  }

  startRain();
}

function addHighlightLabels() {
  $('.highlight').each(function () {
    var $this = $(this);
    var classList = $this.attr('class').split(/\s+/);

    $.each(classList, function (idx, item) {
      var matches = item.match(/^highlight-(\w+)/);
      if (matches && matches[1]) {
        $this.prepend($('<span>', {"class": 'highlight-label'}).text(matches[1]));
      }
    });
  });
}

function enableCodeHiding() {
  $('.expander').on('click', function (e) {
    e.preventDefault();
    var href = $(this).attr('href').substr(1);
    $('#' + href).toggle();
  })
}