
    
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
   
   
   
$('#submit').click (function() {

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
                        success : function (data) {
                            console.log (data);
                            var widget = show(data);

                            $("#show").html(widget);

                            $("city").val('');
                        }
                                       
                   
                    })
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
                                       
                   
                    });
                }else{
                    $("#error").html('Field cannot be empty');

                    
                }
});


function show (data) {
    return "<h3><strong>Weather</strong>: " + data.weather[0].main +"<h3>" +
            "<h3><strong>Description</strong>: " + data.weather[0].description +"<h3>" +
            "<h3><strong>Temperature</strong>: " + data.weather[0].main +"<h3>";
    }

               
            
function show2 (data1) {           
    return "<h3><strong>Weather</strong>: " + data1.list[0].weather[0].main +"<h3>" +
            "<h3><strong>Description</strong>: " + data1.list[0].description +"<h3>" +
            "<h3><strong>Temperature</strong>: " + data1.list[0].main +"<h3>";
            console.log(data1)
           
    }
 
// run this function whe user clicks saved city

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
                    success : function (data) {
                        console.log (data);
                        var widget = show(data);

                        $("#show").html(widget);

                        $("city").val('');
                    }
                                   
               
                })
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
                                   
               
                });
            }else{
                $("#error").html('Field cannot be empty');

                
            }
});

    