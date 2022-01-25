$(function () {

  //Definir variables para las funciones
  var apiUrl = "https://api.themoviedb.org/3/movie/";
  var apiKey = "2f8f6e6ea3307c5052ac80d28cd5f3d2";
  var popup = $(".popup");

  //Definir una función para cerrar el popup cuando se hace clic en el documento ( fuera del popup )
  $("#close").click(function() {
    // le quita al popup la clase visible que es la que hace que se vea
    popup.removeClass("visible");
  });


  //Get popular movies
  $.getJSON( apiUrl + "popular?api_key=" + apiKey + "&page=1", function( data ) {

    //Recorrer la matriz de resultados "results" cortada a 10 elementos mediante slice
    $.each( data.results.slice(0, 9), function( key, movie ) {

      //Crear un nuevo elemento HTML <li> con título, imagen y descripcion breve
      var element = $("<li><h3>" + movie.original_title + "</h3><img src=\"https://image.tmdb.org/t/p/w200/" + movie.poster_path + "\" /><p>" + movie.overview + "</p></li>").click(function() {
        openMovie(movie);
      }).appendTo("#populars");;
    });
  });

  //Get top rated movies
  $.getJSON( apiUrl + "top_rated?api_key=" + apiKey + "&page=1", function( data ) {

    $.each( data.results.slice(0, 9), function( key, movie ) {
      var element = $("<li class=\"movie\"><h3>" + movie.original_title + "</h3><img src=\"https://image.tmdb.org/t/p/w200/" + movie.poster_path + "\" /><p>" + movie.overview + "</p></li>").click(function() {
        openMovie(movie);
      }).appendTo("#top_rated");;
    });
  });

  //Definir una función para mostrar el detalle de una película cuando se hace click sobre ella. Esta función recibe el objeto movie de la llamada anterior donde se obtienen todas las movies en la lista 
  function openMovie(movie) {

    //Hacer una llamada a la API para obtener toda la info de la movie
    $.getJSON( apiUrl + movie.id + "?api_key=" + apiKey + "&page=1", function( data ) {

      //Reemplazamos el contenido del popup por el de la API una vez obtenido el resultado
      $("#title").text(data.title);
      $("#year").text(data.release_date);
      $("#description").text(data.overview);
      $("#image").attr("src", "https://image.tmdb.org/t/p/w500/" + data.poster_path);
      $("#rate").text(data.vote_average);


      /* Como los generos vienen en un array porque pueden ser varios, creamos una variable para almacenar el conjunto acumulado de los múltiples nombres de cada genero iterandolos con each de jquery
      */
      var genresHtml = "";

      //Iterar cada genero ( si existen )
      $(data.genres).each(function(i, genre) {

        // Añadir / concatenar a la variable de texto el nombre del género y un salto de línea
        genresHtml = genresHtml + "- " + genre.name + "<br />";

      });

      //Aplicamos al identificador #genre el código HTML que hemos creado anteriormente para que los saltos de linea <br /> se visualicen correctamente
      $("#genre").html(genresHtml);


      $("#pictures").attr("src", "https://image.tmdb.org/t/p/w200/" + data.backdrop_path);

      //Abrimos el popup mediante la clase visible que hace un display block
      popup.addClass("visible");

    });

  }


});