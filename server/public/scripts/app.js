var people = [];
var currentlySelectedPersonIndex = 0;

$(document).ready(function(){
    $('#left-scroll-button').on('click', scrollLeft);
    $('#right-scroll-button').on('click', scrollRight);
    $('#index-buttons').on('click', 'button', updateSelectedIndex);
    getData();
});

function getData(){
    // console.log("before ajax");
    $.ajax({
        type: "GET",
        url:"/data",
        success: function(data) {
            // console.log("after request returns successfully");
            // console.log(data);
            people = data.people;

            // create some buttons
            createIndexButtons();

            updateDom();
            // console.log("after request returns", people);
        },
        error: function() {
            console.log('ERROR: Unable to contact the server.');
        }

    });
    // console.log("after ajax", people);
  }

  function updateDom() {
    var currentPerson = people[currentlySelectedPersonIndex];
    console.log(currentPerson);
    $('#person-container .person-name').text(currentPerson.name);
    $('#person-container .person-favorite-song').text(currentPerson.favoriteSong);
    $('#person-container .person-favorite-movie-1').text(currentPerson.favoriteMovie1);
    $('#person-container .person-favorite-movie-2').text(currentPerson.favoriteMovie2);

    clearSelected();
    highlightSelected();
  }

  function scrollLeft() {
    // currentlySelectedPersonIndex = (currentlySelectedPersonIndex + people.length - 1) % people.length;
    var nextIndex = currentlySelectedPersonIndex - 1;
    if (nextIndex === -1) {
      nextIndex = people.length - 1;
    }
    currentlySelectedPersonIndex = nextIndex;

    updateDom();
  }

  function scrollRight() {
    // currentPersonIndex = (currentPersonIndex + 1) % people.length;
    var nextIndex = currentlySelectedPersonIndex + 1;
    if (nextIndex === people.length) {
      nextIndex = 0;
    }
    currentlySelectedPersonIndex = nextIndex;

    updateDom();
  }

  function createIndexButtons() {
    // $.each(function (index, person) {})
    people.forEach(function(person, index) {
      $('#index-buttons').append('<button>' + (index + 1) +'</button>');
      $('#index-buttons').children().last().data('index', index);
    });
  }

  function updateSelectedIndex() {
    currentlySelectedPersonIndex = $(this).data('index');
    updateDom();
  }

  function clearSelected() {
    $('#index-buttons button').removeClass('selected');
  }

  function highlightSelected() {
    $('#index-buttons button').each(function() {
      if ($(this).data('index') === currentlySelectedPersonIndex) {
        $(this).addClass('selected');
      }
    });
  }
