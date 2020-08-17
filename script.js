
    
// Save input City to local storage and push to search history
    var cityElem = document.querySelector("#city");
    var savedSearch = [];

    // get item from storage and append it to the screen
     var searchElem = JSON.parse(localStorage.getItem("User"))

     var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];
    var dayNames= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

    var newDate = new Date();
        newDate.setDate(newDate.getDate());    
        $('#Date').html(dayNames[newDate.getDay()] + " " + newDate.getDate() + ' ' + monthNames[newDate.getMonth()] + ' ' + newDate.getFullYear());
    
        if(searchElem !== null) {
            for (var i = 0; i<searchElem.length; i++) {
                    $(".searchhistory").append("<div><a class = 'saved' id='" +searchElem[i]+"'> " + searchElem[i] +  "</a></div>")
               
                    // var a = $(".saved");
                    //     a.attr("id", searchElem[i]);
                
                
                $.ajax ({
                    url: 'http://api.openweathermap.org/data/2.5/weather?q=' + searchElem[0] + "&units=imperial" + "&APPID=2e7712007ae88c6a7b26e1e008ca4659",
                    type: "GET",
                    dataType:"jsonp",

                    
                }).then(function (data) {
                        // console.log (data);
                        var widget = show(data),

                        //store coordinates into locationElem to use for UVI Ajax function
                        latitude= data.coord.lat
                        longitude = data.coord.lon
                        console.log(data)
                        let unix_timestamp = data.dt
                        var date = new Date(unix_timestamp * 1000);
                        var hours = date.getHours();
                        var minutes = "0" + date.getMinutes();
                        var seconds = "0" + date.getSeconds();

                        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

                        console.log(formattedTime);  
                        
                            
                            
                        var name = data.name
                        console.log(name)
                        var daytemp = data.main.temp
                        var dayhumidity = data.main.humidity
                        var daywindspeed = data.wind.speed
                        var iconcode = data.weather[0].icon;
                        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                        $('#wicon').attr('src', iconurl);
                            

                        // $("#show").html(daytemp + formattedTime + name +dayhumidity + daywindspeed)

                        $("#daytemp").html(daytemp + "°F")
                        $("#name").html(name)
                        $("#daydate").html(formattedTime)
                        $("#dayhumidity").html("Humidity = " + dayhumidity + "%")
                        $("#daywindspeed").html("Windspeed = " + daywindspeed + "MPH")
                        
                    }).then(function(data3) {
                        console.log(latitude)
                        
                    // ajax call for UVI index   
                    $.ajax ({
                        url: 'http://api.openweathermap.org/data/2.5/uvi?appid=2e7712007ae88c6a7b26e1e008ca4659' + '&lon=' + longitude + '&lat=' + latitude,
                        
                        type: "GET",
                        dataType:"json",
                        success : function (data2) {
                        // console.log (data2);
                            
                        var widget1 = show3(data2);

                        $("#uvIndex").html(widget1);
                        
                        if ( data2.value > 5)
                        $("#uvIndex").css("backgroundColor", "red")

                        $("uvi").val('');
                        }
                    })});

                    //ajax call for 5 day forecast
                    $.ajax ({
                        url: 'http://api.openweathermap.org/data/2.5/forecast?q=' + searchElem[0] + "&units=imperial" + "&APPID=2e7712007ae88c6a7b26e1e008ca4659",
                        type: "GET",
                        dataType:"jsonp",
                        success : function (data1) {
                            console.log (data1);
                            var widget1 = show2(data1);

                             $("5daycity").val('');
                        
                        // passing forecast into different days      

        //day 1:
                    const date1 = new Date(data1.list[1].dt_txt)
                    const dateTimeFormat1 = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }) 
                    const [{ value: month1 },,{ value: day1 },,{ value: year1 }] = dateTimeFormat1 .formatToParts(date1 ) 
    
                    console.log(`${day1}-${month1}-${year1 }`)
                    var day1date = `${day1}/${month1}/${year1}`  

                        
                            
                            
                    var day1temp = data1.list[1].main.temp
                    var day1humidity = data1.list[1].main.humidity
                    var day1windspeed = data1.list[1].wind.speed
                    var iconcode1 = data1.list[1].weather[0].icon;
                    var iconurl1 = "http://openweathermap.org/img/w/" + iconcode1 + ".png";
                    $('#wicon1').attr('src', iconurl1);
                            

                    $("#day1temp").html(day1temp + "°F")
                    $("#day1date").html(day1date)
                    $("#day1humidity").html("Humidity = " + day1humidity + "%")
                    
                    
        // day 2:  
                    const date2 = new Date(data1.list[12].dt_txt)
                    const dateTimeFormat2 = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }) 
                    const [{ value: month2 },,{ value: day2 },,{ value: year2 }] = dateTimeFormat2 .formatToParts(date2 ) 
    
                    console.log(`${day2}-${month2}-${year2 }`)
                    var day2date = `${day2}/${month2}/${year2}`  

                        
                            
                            
                    var day2temp = data1.list[12].main.temp
                    var day2humidity = data1.list[12].main.humidity
                    var day2windspeed = data1.list[12].wind.speed
                    var iconcode2 = data1.list[12].weather[0].icon;
                    var iconurl2 = "http://openweathermap.org/img/w/" + iconcode2 + ".png";
                    $('#wicon2').attr('src', iconurl2);
                            

                    $("#day2temp").html(day2temp + "°F")
                    $("#day2date").html(day2date)
                    $("#day2humidity").html("Humidity = " + day2humidity + "%")
                    
        // day 3:
                    const date3 = new Date(data1.list[20].dt_txt)
                    const dateTimeFormat3 = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }) 
                    const [{ value: month3 },,{ value: day3 },,{ value: year3 }] = dateTimeFormat3 .formatToParts(date3 ) 
    
                    console.log(`${day3}-${month3}-${year3}`)
                    var day3date = `${day3}/${month3}/${year3}`  

                        
                            
                            
                    var day3temp = data1.list[20].main.temp
                    var day3humidity = data1.list[20].main.humidity
                    var day3windspeed = data1.list[20].wind.speed
                    var iconcode3 = data1.list[20].weather[0].icon;
                    var iconurl3 = "http://openweathermap.org/img/w/" + iconcode3 + ".png";
                    $('#wicon3').attr('src', iconurl3);
                            

                    $("#day3temp").html(day3temp + "°F")
                    $("#day3date").html(day3date)
                    $("#day3humidity").html("Humidity = " + day3humidity + "%")
          // day 4:
                    const date4 = new Date(data1.list[28].dt_txt)
                    const dateTimeFormat4 = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }) 
                    const [{ value: month4 },,{ value: day4 },,{ value: year4 }] = dateTimeFormat4 .formatToParts(date4 ) 
    
                    console.log(`${day4}-${month4}-${year4}`)
                    var day4date = `${day4}/${month4}/${year4}`  

                        
                            
                            
                    var day4temp = data1.list[28].main.temp
                    var day4humidity = data1.list[28].main.humidity
                    var day4windspeed = data1.list[28].wind.speed
                    var iconcode4 = data1.list[28].weather[0].icon;
                    var iconurl4 = "http://openweathermap.org/img/w/" + iconcode4 + ".png";
                    $('#wicon4').attr('src', iconurl4);
                            
                    $("#day4temp").html(day4temp + "°F")
                    $("#day4date").html(day4date)
                    $("#day4humidity").html("Humidity = " + day4humidity + "%")
          // day 5:
                    const date5 = new Date(data1.list[36].dt_txt)
                    const dateTimeFormat5 = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }) 
                    const [{ value: month5 },,{ value: day5 },,{ value: year5 }] = dateTimeFormat5 .formatToParts(date5 ) 
    
                    console.log(`${day5}-${month5}-${year5}`)
                    var day5date = `${day5}/${month5}/${year5}`  

                        
                            
                            
                    var day5temp = data1.list[36].main.temp
                    var day5humidity = data1.list[36].main.humidity
                    var day5windspeed = data1.list[36].wind.speed
                    var iconcode5 = data1.list[36].weather[0].icon;
                    var iconurl5 = "http://openweathermap.org/img/w/" + iconcode5 + ".png";
                    $('#wicon5').attr('src', iconurl5);
                            
                    $("#day5temp").html(day5temp + "°F")
                    $("#day5date").html(day5date)
                    $("#day5humidity").html("Humidity = " + day5humidity + "%")
                            
                        }
                    })
                    
                
                    function show (data) {
                        latitude= data.coord.lat
                        longitude = data.coord.lon
                        var iconcode = data.weather[0].icon;
                        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                        $('#wicon').attr('src', iconurl);
                        
                    
                        return "<h3><strong>Weather</strong>: " + data.weather[0].main +"<h3>" +
                        "<h3><strong>Location</strong>: " + data.name +"<h3>" +
                        "<h3><strong>Date</strong>: " + data.weather[0].main +"<h3>" +
                        "<h3><strong>Temperature</strong>: " + data.weather[0].main +"<h3>" +
                        "<h3><strong>Humidity</strong>: " + data.weather[0].main +"<h3>" +
                        "<h3><strong>Wind Speed</strong>: " + data.weather[0].description +"<h3>" +
                        "<h3><strong>UV Index</strong>: " + data.weather[0].main +"<h3>";
                        }
                    
                    function show3 (data2) {
                        return "<h3><strong>UV Index:" + data2.value;
                    }

                                   
                                
                    function show2 (data1) { 

                        console.log(data1)
                        
                        const date = new Date(data1.list[0].dt_txt)
                        const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }) 
                        const [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat .formatToParts(date ) 

                        console.log(`${day}-${month}-${year }`)
                        var today = `${day}👠${month}👢${year}`            
                        //tomorrow         
                        return "<h3>" + today +"<h3>" +
                                "<h3>" + data1.city.name +"<h3>" +
                                "<h3><strong>Temperature</strong>: " + data1.list[0].main.temp + "°F" + "<h3>" +
                                "<h3><strong>Humidity</strong>: " + data1.list[0].main.humidity + "°F" + "<h3>" +
                                "<h3><strong>Wind Speed</strong>: " + data1.list[0].wind.speed + "°F" + "<h3>";

                                // console.log(data1)
                        
                               
                        }

                
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
        $(".searchhistory").append("<div><a class = 'todaysaved' id='" + cityElem.value + "'> " + cityElem.value +  "</a></div>");
        
        
        // var a = $(".saved");
        // a.attr("data-name", cityElem.value);
        
        // console.log(searchElem)

    // Request the API for current weather conditions
        var city = $("#city").val();
        console.log(city)
        
            if (city !== '') {
                var a = $(".saved");
                $.ajax ({
                    url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=metric" + "&APPID=2e7712007ae88c6a7b26e1e008ca4659",
                    type: "GET",
                    dataType:"jsonp",
                }).then(function (data) {
                    // console.log (data);
                    var widget = show(data),

                    //store coordinates into locationElem to use for UVI Ajax function
                    latitude= data.coord.lat
                    longitude = data.coord.lon
                    console.log(data)
                    let unix_timestamp = data.dt
                    var date = new Date(unix_timestamp * 1000);
                    var hours = date.getHours();
                    var minutes = "0" + date.getMinutes();
                    var seconds = "0" + date.getSeconds();

                    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

                    console.log(formattedTime);  
                    
                        
                        
                    var name = data.name
                    console.log(name)
                    var daytemp = data.main.temp
                    var dayhumidity = data.main.humidity
                    var daywindspeed = data.wind.speed
                    var iconcode = data.weather[0].icon;
                    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                    $('#wicon').attr('src', iconurl);
                        

                    $("#daytemp").html(daytemp + "°F")
                        $("#name").html(name)
                        $("#daydate").html(formattedTime)
                        $("#dayhumidity").html("Humidity = " + dayhumidity + "%")
                        $("#daywindspeed").html("Windspeed = " + daywindspeed + "MPH")
                        
                    // ajax call for UVI index   
                    $.ajax ({
                        url: 'http://api.openweathermap.org/data/2.5/uvi?appid=2e7712007ae88c6a7b26e1e008ca4659' + '&lon=' + longitude + '&lat=' + latitude,
                        
                        type: "GET",
                        dataType:"json",
                        success : function (data2) {
                        // console.log (data2);
                            
                        var widget1 = show3(data2);

                        $("#uvIndex").html(widget1);
                        
                        if ( data2.value > 5)
                        $("#uvIndex").css("backgroundColor", "red")

                        $("uvi").val('');
                        }
                    })});

                    //ajax call for 5 day forecast
                    $.ajax ({
                        url: 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + "&units=imperial" + "&APPID=2e7712007ae88c6a7b26e1e008ca4659",
                        type: "GET",
                        dataType:"jsonp",
                        success : function (data1) {
                            console.log (data1);
                            var widget1 = show2(data1);
                            

                            // `$("#show").html(widget1);`
                            

                            $("5daycity").val('');
                        
                        // passing forecast into different days
        //day 1:
                    const date1 = new Date(data1.list[1].dt_txt)
                    const dateTimeFormat1 = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }) 
                    const [{ value: month1 },,{ value: day1 },,{ value: year1 }] = dateTimeFormat1 .formatToParts(date1 ) 
    
                    console.log(`${day1}-${month1}-${year1 }`)
                    var day1date = `${day1}/${month1}/${year1}`  

                        
                            
                            
                    var day1temp = data1.list[1].main.temp
                    var day1humidity = data1.list[1].main.humidity
                    var day1windspeed = data1.list[1].wind.speed
                    var iconcode1 = data1.list[1].weather[0].icon;
                    var iconurl1 = "http://openweathermap.org/img/w/" + iconcode1 + ".png";
                    $('#wicon1').attr('src', iconurl1);
                            

                    $("#day1temp").html(day1temp + "°F")
                    $("#day1date").html(day1date)
                    $("#day1humidity").html("Humidity = " + day1humidity + "%")
        // day 2:  
                    const date2 = new Date(data1.list[12].dt_txt)
                    const dateTimeFormat2 = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }) 
                    const [{ value: month2 },,{ value: day2 },,{ value: year2 }] = dateTimeFormat2 .formatToParts(date2 ) 
    
                    console.log(`${day2}-${month2}-${year2 }`)
                    var day2date = `${day2}/${month2}/${year2}`  

                        
                            
                            
                    var day2temp = data1.list[12].main.temp
                    var day2humidity = data1.list[12].main.humidity
                    var day2windspeed = data1.list[12].wind.speed
                    var iconcode2 = data1.list[12].weather[0].icon;
                    var iconurl2 = "http://openweathermap.org/img/w/" + iconcode2 + ".png";
                    $('#wicon2').attr('src', iconurl2);
                            

                    $("#day2temp").html(day2temp + "°F")
                    $("#day2date").html(day2date)
                    $("#day2humidity").html("Humidity = " + day2humidity + "%")
        // day 3:
                    const date3 = new Date(data1.list[20].dt_txt)
                    const dateTimeFormat3 = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }) 
                    const [{ value: month3 },,{ value: day3 },,{ value: year3 }] = dateTimeFormat3 .formatToParts(date3 ) 
    
                    console.log(`${day3}-${month3}-${year3}`)
                    var day3date = `${day3}/${month3}/${year3}`  

                        
                            
                            
                    var day3temp = data1.list[20].main.temp
                    var day3humidity = data1.list[20].main.humidity
                    var day3windspeed = data1.list[20].wind.speed
                    var iconcode3 = data1.list[20].weather[0].icon;
                    var iconurl3 = "http://openweathermap.org/img/w/" + iconcode3 + ".png";
                    $('#wicon3').attr('src', iconurl3);
                            

                    $("#day3temp").html(day3temp + "°F")
                    $("#day3date").html(day3date)
                    $("#day3humidity").html("Humidity = " + day3humidity + "%")
          // day 4:
                    const date4 = new Date(data1.list[28].dt_txt)
                    const dateTimeFormat4 = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }) 
                    const [{ value: month4 },,{ value: day4 },,{ value: year4 }] = dateTimeFormat4 .formatToParts(date4 ) 
    
                    console.log(`${day4}-${month4}-${year4}`)
                    var day4date = `${day4}/${month4}/${year4}`  

                        
                            
                            
                    var day4temp = data1.list[28].main.temp
                    var day4humidity = data1.list[28].main.humidity
                    var day4windspeed = data1.list[28].wind.speed
                    var iconcode4 = data1.list[28].weather[0].icon;
                    var iconurl4 = "http://openweathermap.org/img/w/" + iconcode4 + ".png";
                    $('#wicon4').attr('src', iconurl4);
                            

                    $("#day4temp").html(day4temp + "°F")
                    $("#day4date").html(day4date)
                    $("#day4humidity").html("Humidity = " + day4humidity + "%")
          // day 5:
                    const date5 = new Date(data1.list[36].dt_txt)
                    const dateTimeFormat5 = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }) 
                    const [{ value: month5 },,{ value: day5 },,{ value: year5 }] = dateTimeFormat5 .formatToParts(date5 ) 
    
                    console.log(`${day5}-${month5}-${year5}`)
                    var day5date = `${day5}/${month5}/${year5}`  

                        
                            
                            
                    var day5temp = data1.list[36].main.temp
                    var day5humidity = data1.list[36].main.humidity
                    var day5windspeed = data1.list[36].wind.speed
                    var iconcode5 = data1.list[36].weather[0].icon;
                    var iconurl5 = "http://openweathermap.org/img/w/" + iconcode5 + ".png";
                    $('#wicon5').attr('src', iconurl5);
                            

                    $("#day5temp").html(day5temp + "°F")
                    $("#day5date").html(day5date)
                    $("#day5humidity").html("Humidity = " + day5humidity + "%")
                            
                        }
                    })
                    
                
                    function show (data) {
                        latitude= data.coord.lat
                        longitude = data.coord.lon
                        var iconcode = data.weather[0].icon;
                        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                        $('#wicon').attr('src', iconurl);
                        
                    
                        return "<h3><strong>Weather</strong>: " + data.weather[0].main +"<h3>" +
                        "<h3><strong>Location</strong>: " + data.name +"<h3>" +
                        "<h3><strong>Date</strong>: " + data.weather[0].main +"<h3>" +
                        "<h3><strong>Temperature</strong>: " + data.weather[0].main +"<h3>" +
                        "<h3><strong>Humidity</strong>: " + data.weather[0].main +"<h3>" +
                        "<h3><strong>Wind Speed</strong>: " + data.weather[0].description +"<h3>" +
                        "<h3><strong>UV Index</strong>: " + data.weather[0].main +"<h3>";
                        }
                    
                    function show3 (data2) {
                        return "<h3><strong>UV Index:" + data2.value;
                    }

                                   
                                
                    function show2 (data1) { 

                        console.log(data1)
                        
                        const date = new Date(data1.list[0].dt_txt)
                        const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }) 
                        const [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat .formatToParts(date ) 

                        console.log(`${day}-${month}-${year }`)
                        var today = `${day}👠${month}👢${year}`            
                        //tomorrow         
                        return "<h3>" + today +"<h3>" +
                                "<h3>" + data1.city.name +"<h3>" +
                                "<h3><strong>Temperature</strong>: " + data1.list[0].main.temp + "°F" + "<h3>" +
                                "<h3><strong>Humidity</strong>: " + data1.list[0].main.humidity + "°F" + "<h3>" +
                                "<h3><strong>Wind Speed</strong>: " + data1.list[0].wind.speed + "°F" + "<h3>";

                                // console.log(data1)
                        
                               
                        }
                }else{
                    $("#error").html('Field cannot be empty');

                    
                }
                




function show (data) {
    latitude= data.coord.lat
    longitude = data.coord.lon
    var iconcode = data.weather[0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    $('#wicon').attr('src', iconurl);

    return "<h3><strong>Weather</strong>: " + data.weather[0].main +"<h3>" +
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
});

$('.todaysaved').click(function()  {

    consolelog(this.id);
    prompt(hello)
})

$('.saved').click (function() {
    console.log(this.id);
    var city = this.id;
        console.log(city)
        
            if (city !== '') {
                $.ajax ({
                    url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=metric" + "&APPID=2e7712007ae88c6a7b26e1e008ca4659",
                    type: "GET",
                    dataType:"jsonp",
                }).then(function (data) {
                    // console.log (data);
                    var widget = show(data),

                    //store coordinates into locationElem to use for UVI Ajax function
                    latitude= data.coord.lat
                    longitude = data.coord.lon
                    console.log(data)
                    let unix_timestamp = data.dt
                    var date = new Date(unix_timestamp * 1000);
                    var hours = date.getHours();
                    var minutes = "0" + date.getMinutes();
                    var seconds = "0" + date.getSeconds();

                    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

                    console.log(formattedTime);  
                    
                        
                        
                    var name = data.name
                    console.log(name)
                    var daytemp = data.main.temp
                    var dayhumidity = data.main.humidity
                    var daywindspeed = data.wind.speed
                    var iconcode = data.weather[0].icon;
                    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                    $('#wicon').attr('src', iconurl);
                        

                    $("#daytemp").html(daytemp + "°F")
                    $("#name").html(name)
                    $("#daydate").html(formattedTime)
                    $("#dayhumidity").html("Humidity = " + dayhumidity + "%")
                    $("#daywindspeed").html("Windspeed = " + daywindspeed + "MPH")
                }).then(function(data3) {
                        console.log(latitude)
                        
                    // ajax call for UVI index   
                    $.ajax ({
                        url: 'http://api.openweathermap.org/data/2.5/uvi?appid=2e7712007ae88c6a7b26e1e008ca4659' + '&lon=' + longitude + '&lat=' + latitude,
                        
                        type: "GET",
                        dataType:"json",
                        success : function (data2) {
                        // console.log (data2);
                            
                        var widget1 = show3(data2);

                        $("#uvIndex").html(widget1);
                        
                        if ( data2.value > 5)
                        $("#uvIndex").css("backgroundColor", "red")

                        $("uvi").val('');
                        }
                    })});

                    //ajax call for 5 day forecast
                    $.ajax ({
                        url: 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + "&units=imperial" + "&APPID=2e7712007ae88c6a7b26e1e008ca4659",
                        type: "GET",
                        dataType:"jsonp",
                        success : function (data1) {
                            console.log (data1);
                            var widget1 = show2(data1);
                            

                            // `$("#show").html(widget1);`
                            

                            $("5daycity").val('');
                        
                        // passing forecast into different days
        //day 1:
                    const date1 = new Date(data1.list[1].dt_txt)
                    const dateTimeFormat1 = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }) 
                    const [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat1 .formatToParts(date1 ) 
    
                    console.log(`${day}-${month}-${year }`)
                    var day1date = `${day}/${month}/${year}`  

                        
                            
                            
                    var day1temp = data1.list[1].main.temp
                    var day1humidity = data1.list[1].main.humidity
                    var day1windspeed = data1.list[1].wind.speed
                    var iconcode1 = data1.list[1].weather[0].icon;
                    var iconurl1 = "http://openweathermap.org/img/w/" + iconcode1 + ".png";
                    $('#wicon1').attr('src', iconurl1);
                            
                    $("#day1temp").html(day1temp + "°F")
                    $("#day1date").html(day1date)
                    $("#day1humidity").html("Humidity = " + day1humidity + "%")
        // day 2:  
                    const date2 = new Date(data1.list[12].dt_txt)
                    const dateTimeFormat2 = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }) 
                    const [{ value: month2 },,{ value: day2 },,{ value: year2 }] = dateTimeFormat2 .formatToParts(date2 ) 
    
                    console.log(`${day2}-${month2}-${year2 }`)
                    var day2date = `${day2}/${month2}/${year2}`  

                        
                            
                            
                    var day2temp = data1.list[12].main.temp
                    var day2humidity = data1.list[12].main.humidity
                    var day2windspeed = data1.list[12].wind.speed
                    var iconcode2 = data1.list[12].weather[0].icon;
                    var iconurl2 = "http://openweathermap.org/img/w/" + iconcode2 + ".png";
                    $('#wicon2').attr('src', iconurl2);
                            

                    $("#day2temp").html(day2temp + "°F")
                    $("#day2date").html(day2date)
                    $("#day2humidity").html("Humidity = " + day2humidity + "%")
        // day 3:
                    const date3 = new Date(data1.list[20].dt_txt)
                    const dateTimeFormat3 = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }) 
                    const [{ value: month3 },,{ value: day3 },,{ value: year3 }] = dateTimeFormat3 .formatToParts(date3 ) 
    
                    console.log(`${day3}-${month3}-${year3}`)
                    var day3date = `${day3}/${month3}/${year3}`  

                        
                            
                            
                    var day3temp = data1.list[20].main.temp
                    var day3humidity = data1.list[20].main.humidity
                    var day3windspeed = data1.list[20].wind.speed
                    var iconcode3 = data1.list[20].weather[0].icon;
                    var iconurl3 = "http://openweathermap.org/img/w/" + iconcode3 + ".png";
                    $('#wicon3').attr('src', iconurl3);
                            

                    $("#day3temp").html(day3temp + "°F")
                    $("#day3date").html(day3date)
                    $("#day3humidity").html("Humidity = " + day3humidity + "%")
          // day 4:
                    const date4 = new Date(data1.list[28].dt_txt)
                    const dateTimeFormat4 = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }) 
                    const [{ value: month4 },,{ value: day4 },,{ value: year4 }] = dateTimeFormat4 .formatToParts(date4 ) 
    
                    console.log(`${day4}-${month4}-${year4}`)
                    var day4date = `${day4}/${month4}/${year4}`  

                        
                            
                            
                    var day4temp = data1.list[28].main.temp
                    var day4humidity = data1.list[28].main.humidity
                    var day4windspeed = data1.list[28].wind.speed
                    var iconcode4 = data1.list[28].weather[0].icon;
                    var iconurl4 = "http://openweathermap.org/img/w/" + iconcode4 + ".png";
                    $('#wicon4').attr('src', iconurl4);
                            

                    $("#day4temp").html(day4temp + "°F")
                    $("#day4date").html(day4date)
                    $("#day4humidity").html("Humidity = " + day4humidity + "%")
          // day 5:
                    const date5 = new Date(data1.list[36].dt_txt)
                    const dateTimeFormat5 = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }) 
                    const [{ value: month5 },,{ value: day5 },,{ value: year5 }] = dateTimeFormat5 .formatToParts(date5 ) 
    
                    console.log(`${day5}-${month5}-${year5}`)
                    var day5date = `${day5}/${month5}/${year5}`  

                        
                            
                            
                    var day5temp = data1.list[36].main.temp
                    var day5humidity = data1.list[36].main.humidity
                    var day5windspeed = data1.list[36].wind.speed
                    var iconcode5 = data1.list[36].weather[0].icon;
                    var iconurl5 = "http://openweathermap.org/img/w/" + iconcode5 + ".png";
                    $('#wicon5').attr('src', iconurl5);
                            

                    $("#day5temp").html(day5temp + "°F")
                    $("#day5date").html(day5date)
                    $("#day5humidity").html("Humidity = " + day5humidity + "%")
                        }
                    })
                    
                
                    function show (data) {
                        latitude= data.coord.lat
                        longitude = data.coord.lon
                        var iconcode = data.weather[0].icon;
                        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                        $('#wicon').attr('src', iconurl);
                        
                    
                        return "<h3><strong>Weather</strong>: " + data.weather[0].main +"<h3>" +
                        "<h3><strong>Location</strong>: " + data.name +"<h3>" +
                        "<h3><strong>Date</strong>: " + data.weather[0].main +"<h3>" +
                        "<h3><strong>Temperature</strong>: " + data.weather[0].main +"<h3>" +
                        "<h3><strong>Humidity</strong>: " + data.weather[0].main +"<h3>" +
                        "<h3><strong>Wind Speed</strong>: " + data.weather[0].description +"<h3>" +
                        "<h3><strong>UV Index</strong>: " + data.weather[0].main +"<h3>";
                        }
                    
                    function show3 (data2) {
                        return "<h3><strong>UV Index:" + data2.value;
                    }

                                   
                                
                    function show2 (data1) { 

                        console.log(data1)
                        
                        const date = new Date(data1.list[0].dt_txt)
                        const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' }) 
                        const [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat .formatToParts(date ) 

                        console.log(`${day}-${month}-${year }`)
                        var today = `${day}/${month}/${year}`            
                        //tomorrow         
                        return "<h3>" + today +"<h3>" +
                                "<h3>" + data1.city.name +"<h3>" +
                                "<h3><strong>Temperature</strong>: " + data1.list[0].main.temp + "°F" + "<h3>" +
                                "<h3><strong>Humidity</strong>: " + data1.list[0].main.humidity + "°F" + "<h3>" +
                                "<h3><strong>Wind Speed</strong>: " + data1.list[0].wind.speed + "°F" + "<h3>";

                                // console.log(data1)
                        
                               
                        }
                }else{
                    $("#error").html('Field cannot be empty');

                    
                }
                




function show (data) {
    latitude= data.coord.lat
    longitude = data.coord.lon
    var iconcode = data.weather[0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    $('#wicon').attr('src', iconurl);

    return "<h3><strong>Weather</strong>: " + data.weather[0].main +"<h3>" +
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
});

