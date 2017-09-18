const apiURL = "http://localhost:3000/";

  var getAllVideos = function() {
    $.ajax({
      url: apiURL+ "videos",
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
          html += '<a href="player.php?id='+value.id+'"><h3 class="h3--grid">'+value.name+'</h3></a>'
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
      url: apiURL+ "videos/"+id,
      type: "GET",
      contentType: "application/json"
    }).done(function( data ) {
      console.log(data);
      videojs('videoPlayer', {
        controls: true,
        autoplay: false,
        preload: 'auto',
        poster: data.poster,      
      });
      videojs('videoPlayer').src(data.src);
    });
  }

  var tagSearch = function() {
    var tags = "cats";
    $.ajax({
      url: apiURL+ "videoinfo?q={'tags':"+tags+"}&apiKey="+apiKey,
      type: "GET",
      contentType: "application/json"
    }).done(function( data ) {
      console.log(data);
    });
  }