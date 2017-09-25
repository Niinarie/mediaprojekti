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
          html += '<a href="player.php?id='+value.id+'"><h3 class="h3--grid">'+value.name+'</h3></a>';
          html += '<a href="player.php?id='+value.id+'"><div class="description"><p>'+value.description+'</p></div></a>';
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
      if (data.subs) {
        $.each(data.subs, function(key, value){
         videojs('videoPlayer').addRemoteTextTrack({
           src: 'subs/'+value.src,
           kind: value.kind,
           srclang: value.srclang,
           label: value.label,
           default: 'default'
          })
        });
      }
      videojs('videoPlayer').src(data.src);
    });
  }

  var videoSearch = function(tags) {
    console.log(tags);
    $.ajax({
      url: apiURL+ "videos/search/"+tags,
      type: "GET",
      contentType: "application/json"
    }).done(function( data ) {
      if (data.length> 0) {
        $('#searchGrid').html('');
        $.each(data, function(key, value){
          var html = '';
          html += '<div class="grid-item grid-item-small"><img src="'+value.poster+'"/>';
          html += '<a href="player.php?id='+value.id+'"><h3 class="h3--grid">'+value.name+'</h3></a>';
          html += '<a href="player.php?id='+value.id+'"><div class="description"><p>'+value.description+'</p></div></a>';
          html += '</div>';
          $('#searchGrid').append(html);
      });
      } else {
        $('#searchGrid').html("No results");
      }
    });
  }
