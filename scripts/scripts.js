const videosUrl = "videos.json";
const apiURL = "https://api.mongolab.com/api/1/databases/videos/collections/";
const apiKey = "4VIr_NV0xF0Lll0lagTFq0veqFYxTG8m";

  var getAllVideos = function() {
    $.ajax({
      url: apiURL+ "videoinfo?apiKey="+apiKey,
      type: "GET",
      contentType: "application/json"
    }).done(function( data ) {
      $('#gridFresh').html('');
      var counter = 1;
      $.each(data, function(key, value){
          var html = '';
          html += '<div class="grid-item';
          if (counter == 1 || counter == 2) {
          html += ' grid-item--width2'
          };
          html += '"><img src="'+value.poster+'"/>';
          html += '<h3 class="h3--grid">'+value.name+'</h3>'
          html += '</div>';
          if (counter < 5) {
            counter = counter + 1;
          } else {
            counter = 1;
          }
          $('#gridFresh').append(html);
      });

     
    });
  }

  var getVideoInfo = function(id) {
    $.ajax({
      url: apiURL+ "videoinfo?q={'id':"+id+"}&apiKey="+apiKey,
      type: "GET",
      contentType: "application/json"
    }).done(function( data ) {
      console.log(data[0]);
      videojs('videoPlayer', {
        controls: true,
        autoplay: false,
        preload: 'auto',
        poster: data[0].poster,      
      });
      videojs('videoPlayer').src(data[0].src);
    });
  }