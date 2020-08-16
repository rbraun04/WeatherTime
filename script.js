
    
// Save input City to local storage and push to search history
    var cityElem = document.querySelector("#city");
    var savedSearch = [];

    // get item from storage and append it to the screen
     var searchElem = JSON.parse(localStorage.getItem("User"))
        if(searchElem !== null) {
            for (var i = 0; i<searchElem.length; i++) {
                $(".searchhistory").append("<div><a class='saved'> " + searchElem[i] +  "</a></div>");
               
                var a = $(".saved");
                a.attr("id", searchElem[i]);
                
        }};



    
var searchElem = [];
var latitude1 = [];
var longitude1 = [];

   
   
   
$('#submit').click (function() {

    
    var latitude = [];
    var longitude = [];
latitude1 = latitude
    longitude1 = longitude
    // Save the City Name to Local Storage
        event.preventDefault();

        searchElem.push(cityElem.value)
        localStorage.setItem("User", JSON.stringify(searchElem));
        $(".searchhistory").append("<div><a class='saved'> "  + cityElem.value + "</a></div>");
        
        var a = $(".saved");
        a.attr("data-name", cityElem.value);
        
        console.log(searchElem)

    // Request the API for current weather conditions
        var city = $("#city").val();
        console.log(city)
        
            if (city !== '') {
                    $.ajax ({
                        url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=metric" + "&APPID=2e7712007ae88c6a7b26e1e008ca4659",
                        type: "GET",
                        dataType:"jsonp",
                    }).then(function (data) {
                            console.log (data);
                            var widget = show(data),

                            //store coordinates into locationElem to use for UVI Ajax function
                            latitude= data.coord.lat
                            longitude = data.coord.lon

                            console.log(latitude)
                            console.log(longitude)
                            $("#show").html(widget);

                            // $("city").val('');
                    }).then(function(data3) {
                        console.log(latitude)
                        
                    // ajax call for UVI index   
                    $.ajax ({
                        url: 'http://api.openweathermap.org/data/2.5/uvi?appid=2e7712007ae88c6a7b26e1e008ca4659' + '&lon=' + longitude + '&lat=' + latitude,
                        
                        type: "GET",
                        dataType:"json",
                        success : function (data2) {
                        console.log (data2);
                            
                        var widget1 = show2(data2);

                        $("#show3").html(widget1);

                        $("uvi").val('');
                        }
                    })});

                    //ajax call for 5 day forecast
                    $.ajax ({
                        url: 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + "&units=metric" + "&APPID=2e7712007ae88c6a7b26e1e008ca4659",
                        type: "GET",
                        dataType:"jsonp",
                        success : function (data1) {
                            console.log (data1);
                            var widget1 = show2(data1);

                            $("#show2").html(widget1);

                            $("5daycity").val('');
                        }
                    })
                    // // http://api.openweathermap.org/data/2.5/uvi?appid=2e7712007ae88c6a7b26e1e008ca4659&lon=51.51&lat=-0.13
                   
                }else{
                    $("#error").html('Field cannot be empty');

                    
                }
                




function show (data) {
    latitude= data.coord.lat
    longitude = data.coord.lon
    return "<h3><strong>Weather</strong>: " + data.weather[0].main +"<h3>" +
    "<h3><strong>icon</strong>: " + data.weather[0].icon + ".png" +"<h3>" +
    "<h3><strong>Location</strong>: " + data.name +"<h3>" +
    "<h3><strong>Date</strong>: " + data.weather[0].main +"<h3>" +
    "<h3><strong>Temperature</strong>: " + data.weather[0].main +"<h3>" +
    "<h3><strong>Humidity</strong>: " + data.weather[0].main +"<h3>" +
            "<h3><strong>Wind Speed</strong>: " + data.weather[0].description +"<h3>" +
            "<h3><strong>UV Index</strong>: " + data.weather[0].main +"<h3>";
    }

               
            
function show2 (data1) {           
    return "<h3><strong>Weather</strong>: " + data1.list[0].weather[0].main +"<h3>" +
            "<h3><strong>Description</strong>: " + data1.list[0].description +"<h3>" +
            "<h3><strong>Temperature</strong>: " + data1.list[0].main +"<h3>";
            console.log(data1)
           
    }
 
// run this function whe user clicks previously searched city

$('.saved').click (function() {
    // Save the City Name to Local Storage

// Request the API for current weather conditions
        var city = $(".saved").map(function() {
            return this.id
        }).get();
        console.log(city)
    
        if (city !== '') {
            $.ajax ({
                url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=metric" + "&APPID=2e7712007ae88c6a7b26e1e008ca4659",
                type: "GET",
                dataType:"jsonp",
            }).then(function (data) {
                    console.log (data);
                    var widget = show(data),

                    //store coordinates into locationElem to use for UVI Ajax function
                    latitude= data.coord.lat
                    longitude = data.coord.lon

                    console.log(latitude)
                    console.log(longitude)
                    $("#show").html(widget);

                    // $("city").val('');
            }).then(function(data3) {
                console.log(latitude)
                
            // ajax call for UVI index   
            $.ajax ({
                url: 'http://api.openweathermap.org/data/2.5/uvi?appid=2e7712007ae88c6a7b26e1e008ca4659' + '&lon=' + longitude + '&lat=' + latitude,
                
                type: "GET",
                dataType:"json",
                success : function (data2) {
                console.log (data2);
                    
                var widget1 = show2(data2);

                $("#show3").html(widget1);

                $("uvi").val('');
                }
            })});

            //ajax call for 5 day forecast
            $.ajax ({
                url: 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + "&units=metric" + "&APPID=2e7712007ae88c6a7b26e1e008ca4659",
                type: "GET",
                dataType:"jsonp",
                success : function (data1) {
                    console.log (data1);
                    var widget1 = show2(data1);

                    $("#show2").html(widget1);

                    $("5daycity").val('');
                }
            })
            // // http://api.openweathermap.org/data/2.5/uvi?appid=2e7712007ae88c6a7b26e1e008ca4659&lon=51.51&lat=-0.13
           
        }else{
            $("#error").html('Field cannot be empty');

            
        }
});
});