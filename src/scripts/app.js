$(function() {
  // Handlebars templates for weather results
  var weatherTemplateSource = $('#weather-results-template').html();
  var weatherTemplate = Handlebars.compile(weatherTemplateSource);

  // Handlebars templates for giphy results
  var giphyTemplateSource = $('#giphy-results-template').html();
  var giphyTemplate = Handlebars.compile(giphyTemplateSource);

  // Converting Kelvin to Farenheit
  function farenheit(kelvin) {
    return ((kelvin * (9 / 5)) - 459.67).toFixed(1);
  }

  function getWeather(location) {
    $.ajax({
      method: 'GET',
      url: 'http://api.openweathermap.org/data/2.5/weather',
      data: {
        APPID: '4218d2cf29c1309ea894fb7296affb5e',
        q: location
      },
      success: function(response) {
        console.log(response.main.temp + 'K');

        var viewModel = {
          location: response.name
        }

        viewModel["temperature"] = farenheit(response.main.temp);

        $('#weather-results').empty().html(weatherTemplate(viewModel));

        getGiphy(response.weather[0].main);
      }
    });
  }

  function getGiphy(tag) {
    $.ajax({
      method: 'GET',
      url: 'http://api.giphy.com/v1/gifs/random',
      data: {
        api_key: 'dc6zaTOxFJmzC',
        tag: tag
      },
      success: function(response) {
        var viewModel = {
          url: response.data.image_url
        }

        $('#giphy-results').empty().html(giphyTemplate(viewModel));
      }
    });
  }

  // On form submit, get the weather
  $('#weather-form').submit(function(e) {
    // prevent page from refreshing
    e.preventDefault();

    var enteredLocation = $('#location').val();

    getWeather(enteredLocation);

    // Clearing input text after location submit
    $('#location').val('');
  });

  // By default get Austin's weather
  getWeather('Austin,TX');
});
