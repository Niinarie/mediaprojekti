const apiURL = "http://localhost:3000/";

var addToFav = function(id) {
  let favs;
  if (localStorage.getItem('favs') === null) {
    favs = [];
  } else {
    favs = JSON.parse(localStorage.getItem('favs'));
  }

  if (!this.checkIfFavExists(id, favs)) {
    favs.push(id);
    localStorage.setItem('favs', JSON.stringify(favs));
    console.log(id+' Added to favs');
    getFavs();
  }
}
  
  var removeFav = function(id) {
    // remove favourite from localStorage list
    let favs = JSON.parse(localStorage.getItem('favs'));
    favs = this.removeById(favs, id);
    localStorage.setItem('favs', JSON.stringify(favs));
    }

  var removeById = function(list, id) {
    // this has been copied straight from stackoverflow
    // go through given array, check if id matches
    // if yes, splice the array on corresponsing index ,removing the array item
    let i = list.length;
    while (i--) {
       if ( list[i] && list[i] == id ) {
         console.log('removed '+id);
           list.splice(i, 1);
           return list;
       }
    }
    return list;
  }

  var checkIfFavExists = function(id, list) {
  // go through given list/array and check if given object's(obj) id matches any existing array object
    let i;
      for (i = 0; i < list.length; i++) {
        if (list[i] == id) {
          return true;
        }
      }
     return false;
  }

  var checkAllFavs = function(videos) {    
        if (!videos.length) {
        } else {
            // check if a recipe already exists in localStorage, using recipeExists() function
            let favs = JSON.parse(localStorage.getItem('favs'));
            if (favs) {
                for (let video of videos) {
                  if (this.checkIfFavExists(video['id'], favs)) {
                    video['isliked'] = true;
                  } else {
                    video['isliked'] = false;
                  }
                }
            }
        }
        return videos;
      }

  var getFavs = function() {
    let favs;
    favs = JSON.parse(localStorage.getItem('favs'));
    return favs;
  }

  var getAllVideos = function() {
    if($('#videoPlayer').length) {
      videojs('videoPlayer').dispose();
    }
    $('#playlist').html('');
    $('#video').css({display: 'none'});
    $.ajax({
      url: apiURL+ "videos",
      type: "GET",
      contentType: "application/json"
    }).done(function( data ) {
      data = checkAllFavs(data);
      console.log(data);
      $('#main').html('');
      var counter = 1;
      $('#main').append('<h2>Fresh:</h2><div id="gridFresh" class="grid">')
      $.each(data, function(key, value){
          var html = '';
          html += '<div class="grid-item';
          if (counter == 1 || counter == 2) {
          html += ' grid-item--width2'
          };
          html += '" id="video'+value.id+'"><img src="'+value.poster+'"/>';
          html += '<h3 class="h3--grid">'+value.name+'</h3>';
          html += '<button class="button--favourite';
          {value.isliked ? html +=' button--remove" ' : html+=' button--add" '};
          html += 'data-favId='+value.id+'><i class="fa fa-2x fa-star" aria-hidden="true"></i></button>';
          html += '<div class="description grid-link" data-id='+value.id+'><p>'+value.description+'</p>';
          html += '<div class="tags"><i class="fa fa-tags" aria-hidden="true"></i>';
          $.each(value.tags, function(key,value) {
            html += '<span class="tag">'+value+'</span>';
          });
          html += '</div></div></div>';
          if (counter < 5) {
            counter = counter + 1;
          } else {
            counter = 1;
          }
          $('#gridFresh').append(html);
          $('#video'+value.id).data('value',value);
      });     
      $('.button--favourite').off().on('click', function(e){
        if ($(this).hasClass('button--add')) {
          $(this).removeClass('button--add');
          $(this).addClass('button--remove');
          addToFav($(this).data('favid'));
       } else {
        $(this).removeClass('button--remove');
        $(this).addClass('button--add');
        removeFav($(this).data('favid')); 
        }
      })
      $('.grid-link').click(function(e) {
       playVideo($(this).parent().data('value'));
       window.scrollTo(0, 0);
      })
    });
  }

  var playVideo = function(video) {
    if($('#videoPlayer').length) {
      videojs('videoPlayer').dispose();
    }
    $('#playlist').html('');
    $('#video__div').html('<video id="videoPlayer" class="video-js vjs-fluid"></video>');
    videojs('videoPlayer', {
      controls: true,
      autoplay: true,
      preload: 'none',
      poster: video.poster
    });
      if (video.subs) {
        $.each(video.subs, function(key, value){
         videojs('videoPlayer').addRemoteTextTrack({
           src: 'subs/'+value.src,
           kind: value.kind,
           srclang: value.srclang,
           label: value.label,
           default: 'default'
          })
        });
      }
      videojs('videoPlayer').src(video.src);
      $('#videoTitle').html('<h2>'+video.name+'</h2>');
      $('#videoDescription').html('<p>'+video.description+'</p>');
      $('#videoTags').html('<i class="fa fa-tags" aria-hidden="true"></i>');
      $.each(video.tags, function(key, value) {
        $('#videoTags').append('<span class="player__tags-tag" data-tag='+value+'>'+value+'</span>');
      });

      $('.player__tags-tag').click(function(e){
        videoSearch($(this).data('tag'));
      });
      $('#video').css({ display: 'block'});
 }

  var videoSearch = function(tags) {
    if($('#videoPlayer').length) {
      videojs('videoPlayer').dispose();
    }
    $('#video').css({display: 'none'});
    $('#playlist').html('');
    $('#main').html('Loading...');
    console.log(tags);
    $.ajax({
      url: apiURL+ "videos/search/"+tags,
      type: "GET",
      contentType: "application/json"
    }).done(function( data ) {
      if (data.length> 0) {
        $('#main').html('<h2>Search: '+tags+'</h2><div class="grid" id="searchGrid"></div>');
        data = checkAllFavs(data);
        $.each(data, function(key, value){
          var html = '';
          html += '<div class="grid-item grid-item-small" id="video'+value.id+'"><img src="'+value.poster+'"/>';
          html += '<h3 class="h3--grid">'+value.name+'</h3>';
          html += '<button class="button--favourite';
          {value.isliked ? html +=' button--remove" ' : html+=' button--add" '};
          html += 'data-favId='+value.id+'><i class="fa fa-2x fa-star" aria-hidden="true"></i></button>';
          html += '<div class="description grid-link"><p>'+value.description+'</p>';
          html += '<div class="tags"><i class="fa fa-tags" aria-hidden="true"></i>';
          $.each(value.tags, function(key,value) {
            html += '<span class="tag">'+value+'</span>';
          });
          html += '</div></div></div>';
          $('#searchGrid').append(html);
          $('#video'+value.id).data('value',value);
      });
      $('.button--favourite').off().on('click', function(e){
        if ($(this).hasClass('button--add')) {
          $(this).removeClass('button--add');
          $(this).addClass('button--remove');
          addToFav($(this).data('favid'));
       } else {
        $(this).removeClass('button--remove');
        $(this).addClass('button--add');
        removeFav($(this).data('favid')); 
        }
      })
      $('.grid-link').click(function(e) {
        playVideo($(this).parent().data('value'));
        window.scrollTo(0, 0);
      })
      } else {
        $('#main').html('<h2>Search: '+tags+'</h2><div class="grid"">No results</div>');
      }
    });
  }

  var favouriteSearch = function() {
    if($('#videoPlayer').length) {
      videojs('videoPlayer').dispose();
    }
    $('#video__div').html('<video id="videoPlayer" class="video-js vjs-fluid vjs-playlistvideo"></video>');
    let favourites = getFavs();
    console.log(favourites.toString());
    $.ajax({
      url: apiURL+ "videos/idsearch",
      type: "POST",
      data: {
        list: favourites.toString()
      }
    }).done(function( data ) {
      if (data.length> 0) {
        videojs('videoPlayer', {
          controls: true,
          autoplay: true,
          preload: 'none'
        }, function() {
          this.on('loadstart', function(){
            let info = playlist[videojs('videoPlayer').playlist.currentItem()];
            $('#videoTitle').html('<h2>'+info.name+'</h2>');
            $('#videoDescription').html('<p>'+info.description+'</p>');
            $('#videoTags').html('<i class="fa fa-tags" aria-hidden="true"></i>');
            $.each(info.tags, function(key, value) {
              $('#videoTags').append('<span class="player__tags-tag" data-tag='+value+'>'+value+'</span>');
            });
      
        });
        });
        $('#playlist').html('<div class="playlist-container"><ul class="vjs-playlist"></ul></div>');
        let playlist = [];
          $.each(data, function(key,value) {
            let video = {
              name: value.name,
              description: value.description,
              sources: value.src,
              thumbnail: [{
                src: value.poster
              }],
              tags: value.tags
            };
            if (value.subs) {
              let subs = [];
              $.each(value.subs, function(key, value){
                let sub = {
                  kind: value.kind,
                  label: value.label,
                  srclang: value.srclang,
                  src: 'subs/'+value.src,
                  default: 'default'
                }
                subs.push(sub);
               });
               video.textTracks = subs;
            }
            playlist.push(video);
          })
          videojs('videoPlayer').playlist(playlist);
          videojs('videoPlayer').playlist.autoadvance(0);
          videojs('videoPlayer').playlistUi();
          $('#videoTitle').html('<h2>'+playlist[0].name+'</h2>');
          $('#videoDescription').html('<p>'+playlist[0].description+'</p>');
          $('#videoTags').html('<i class="fa fa-tags" aria-hidden="true"></i>');
          $.each(playlist[0].tags, function(key, value) {
            $('#videoTags').append('<span class="player__tags-tag" data-tag='+value+'>'+value+'</span>');
          });
    
          $('.player__tags-tag').click(function(e){
            videoSearch($(this).data('tag'));
          });
          $('#video').css({ display: 'block'});
      } else {
        $('#main').html("No favourites");
      }
    });
  }

  $('#searchBtn').click(function(e){
    e.preventDefault();
    videoSearch($('#searchFrm').val());
  });

  $('.link-home').click(function(e) {
    e.preventDefault();
    getAllVideos()
  });

  $('#favourites').click(function(e){
    e.preventDefault();
    favouriteSearch();
  })
