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
    $.ajax({
      url: apiURL+ "videos",
      type: "GET",
      contentType: "application/json"
    }).done(function( data ) {
      data = checkAllFavs(data);
      console.log(data);
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
          html += '<button class="button--favourite';
          {value.isliked ? html +=' button--remove" ' : html+=' button--add" '};
          html += 'data-favId='+value.id+'><i class="fa fa-2x fa-star" aria-hidden="true"></i></button>';
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
      $('#videoTags').append('<i class="fa fa-tags" aria-hidden="true"></i>');
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
        data = checkAllFavs(data);
        $('#searchTitle').html('<h2>Search: '+tags+'</h2');
        $('#searchGrid').html('');
        $.each(data, function(key, value){
          var html = '';
          html += '<div class="grid-item grid-item-small"><img src="'+value.poster+'"/>';
          html += '<a href="player.php?id='+value.id+'"><h3 class="h3--grid">'+value.name+'</h3></a>';
          html += '<button class="button--favourite';
          {value.isliked ? html +=' button--remove" ' : html+=' button--add" '};
          html += 'data-favId='+value.id+'><i class="fa fa-2x fa-star" aria-hidden="true"></i></button>';
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

  var favouriteSearch = function() {
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
        console.log(data);
      } else {
        $('#favouriteGrid').html("No favouritess");
      }
    });
  }
