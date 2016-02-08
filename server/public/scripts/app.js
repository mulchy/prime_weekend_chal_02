var people = []
var currentPersonIndex = 0;

$(document).ready(function(){
  $('#left-scroll-button').on('click', scrollLeft);
  $('#right-scroll-button').on('click', scrollRight);
  $('#index-buttons').on('click', 'button', updateSelectedIndex);
  getData();
});

function getData(){
    $.ajax({
        type: "GET",
        url:"/data",
        success: function(data) {
          console.log(data);
          updateModel(data);
          createIndexButtons();
          updateDom();
        },
        error: function() {
            console.log('ERROR: Unable to contact the server.');
        }
    });
}

/**
 * Takes a data object containing an array of people and updates the global model.
 *
 * @param {Object} data - The data from the server.
 */
function updateModel(data) {
  people = data.people;
}

function updateDom() {
  var currentPerson = people[currentPersonIndex];
  $('#person-container .person-name').text(currentPerson.name);
  $('#person-container .person-favorite-movie-1').text(currentPerson.favoriteMovie1);
  $('#person-container .person-favorite-movie-2').text(currentPerson.favoriteMovie2);
  $('#person-container .person-favorite-song').text(currentPerson.favoriteSong);
  $('#person-container .person-github').attr('src', 'https://www.placecage.com/200/' + getRandomIntInclusive(200, 300));

  clearSelected();
  highlightSelected();
}

function clearSelected() {
  $('#index-buttons button').removeClass('selected');
}

function highlightSelected() {
  $('#index-buttons button').each(function() {
    $index = $(this);
    if ($index.data('index') === currentPersonIndex) {
      $index.addClass('selected');
    }
  });
}

function scrollLeft() {
  currentPersonIndex = decrementAndWrap(currentPersonIndex);
  updateDom();
}

function scrollRight() {
  currentPersonIndex = incrementAndWrap(currentPersonIndex);
  updateDom();
}

function decrementAndWrap(index) {
  return ((currentPersonIndex - 1) + people.length) % people.length;
}

function incrementAndWrap(index) {
  return (currentPersonIndex + 1) % people.length;
}

function updateSelectedIndex() {
  // console.log('index = ', $(this).data('index'))
  currentPersonIndex = $(this).data('index');
  updateDom();
}

function createIndexButtons() {
  people.forEach(function(person, index){
    $('#index-buttons').append('<button class="btn-md btn-info">'+ (index + 1) +'</button>');
    $button = $('#index-buttons').children().last();
    $button.data('index', index);
  });
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
