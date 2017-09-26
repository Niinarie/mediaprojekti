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
          html += '<button class="button--favourite" data-favId='+value.id+'><i class="fa fa-2x fa-plus-square" aria-hidden="true"></i></button>';
          html += '<a href="player.php?id='+value.id+'"><div class="description"><p>'+value.description+'</p>';
          html += '<div class="tags"><i class="fa fa-tags" aria-hidden="true"></i>';
          $.each(value.tags, function(key,value) {
            html += '<span class="tag">'+value+'</span>';
          });
          html += '</div></div></a></div>';
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
        preload: 'none',
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
      $('#videoTitle').html('<h2>'+data.name+'</h2>');
      $('#videoDescription').html('<p>'+data.description+'</p>');
      $.each(data.tags, function(key, value) {
        $('#videoTags').append('<span class="player__tags-tag" data-tag='+value+'>'+value+'</span>');
      });

      $('.player__tags-tag').click(function(e){
        window.location.replace("search.php?q="+$(this).data('tag'));
      });

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
        $('#searchTitle').html('<h2>Search: '+tags+'</h2');
        $('#searchGrid').html('');
        $.each(data, function(key, value){
          var html = '';
          html += '<div class="grid-item grid-item-small"><img src="'+value.poster+'"/>';
          html += '<a href="player.php?id='+value.id+'"><h3 class="h3--grid">'+value.name+'</h3></a>';
          html += '<button class="button--favourite" data-favId='+value.id+'><i class="fa fa-2x fa-plus-square" aria-hidden="true"></i></button>'
          html += '<a href="player.php?id='+value.id+'"><div class="description"><p>'+value.description+'</p>';
          html += '<div class="tags"><i class="fa fa-tags" aria-hidden="true"></i>';
          $.each(value.tags, function(key,value) {
            html += '<span class="tag">'+value+'</span>';
          });
          html += '</div></div></a></div>';
          $('#searchGrid').append(html);
      });
      } else {
        $('#searchGrid').html("No results");
      }
    });
  }
