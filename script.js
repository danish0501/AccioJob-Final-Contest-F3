fetch("https://ipinfo.io/json?token=15f68756cc5492")
    .then((response) => response.json())
    .then((jsonResponse) => {
        console.log(jsonResponse);
        let IP = (document.getElementById("ip").innerHTML = jsonResponse.ip);
        console.log(jsonResponse);
        document.getElementById("get_data").addEventListener("click", () => {
            document.getElementById("btn").style.display = "none";
           
            // get the lat and long
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        let lat = position.coords.latitude;
                        let long = position.coords.longitude;
                        // console.log("lat", lat, "long", long);


                        let box1 = document.getElementById("box1");

                        box1.innerHTML += `
                            <p>Lat: ${lat}</p>
                            <p>Region: ${jsonResponse.region}</p>
                            <p>Organisation:${jsonResponse.org}</p>
                            <p>Lon:${long}</p>
                            <p>City:${jsonResponse.city}</p>
                            <p>Hostname: </p>
                            `;
                       document.getElementById("filter").style.display = "block";
                        let box2 = document.getElementById("box1");

                        box2.innerHTML += `<br/><br/><iframe src="https://maps.google.com/maps?q=${lat}, ${long}&z=15&output=embed" width="90%" height="370" frameborder="0" style="border:0"></iframe>`;

                        // fetch(
                        //     `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`
                        // )
                        //     .then((response) => response.json())
                        //     .then((data) => {
                        //         console.log(data);
                        //             document.body.innerHTML += `
                        // <br/><br/>
                        // <p>location : ${data.name}</p>
                        // <p>${lat}, ${long}</p>
                        // <p>timezone: ${data.timezone}</p>
                        // <p>windspeed: ${data.wind.speed}</p>
                        // <p>humidity: ${data.main.humidity}</p>
                        // <p>wind direction(in deg): ${data.wind.deg}</p>
                        // <p>feels like: ${data.main.feels_like}</p>
                        // <p>uv index:</p>
                        // `;
                        // });

                        fetch(
                            "https://api.ipgeolocation.io/ipgeo?apiKey=bbb627d8419d43f0a83fd96a1670514c"
                        )
                            .then((data) => {
                                return data.json();
                            })
                            .then((objectData) => {
                                data = objectData;
                                console.log(data);

                                let box3 = document.getElementById("box1");

                                box3.innerHTML += `
                                    <p>Time Zone: ${jsonResponse.timezone}</p><br>
                                    <p>Date And Time:${data.time_zone.current_time}</p><br>
                                    <p>Pincode:${jsonResponse.postal}</p><br>
                                    <p>Message: Number of pincode(s) found: <label id="dataCount"></label></p>
                                 `;
                            });

                        // 800008
                        fetch(`https://api.postalpincode.in/pincode/${jsonResponse.postal}`)
                            .then((data) => {
                                return data.json();
                            })
                            .then((objectData) => {
                                poData = objectData;
                                document.getElementById("dataCount").innerHTML = poData[0].PostOffice.length;
                                console.log(poData[0].PostOffice);
                                let postOffice = poData[0].PostOffice;

                                postOffice.map((item) => {
                                    let lItem = document.createElement("div");
                                    lItem.className = "container";

                                    lItem.innerHTML = `
                                        <p>Name: ${item.Name}</p>
                                        <p>Branch Type: ${item.BranchType}</p>
                                        <p>Delivery Status: ${item.DeliveryStatus}</p>
                                        <p>District: ${item.District}</p>
                                        <p>Division: ${item.Division}</p>
                                    `;
                                    loadOrders.append(lItem);
                                });
                            });
                    },
                    (error) => {
                        alert(error);
                    }
                );
            } else {
                x.innerHTML = "Geolocation is not supported by this browser.";
            }
            document.getElementById("filter").addEventListener("keyup", () =>{
                let container = document.getElementsByClassName("container");
                for(let i = 0; i < container.length; i++){
                    var con = container[i];
                    var searchText = document.getElementById("filter").value.toLowerCase();
                    if(con.innerHTML.toLowerCase().includes(searchText) == true){
                        con.style.display = " inline-block";
                    }
                    else{
                        con.style.display = "none";
                    }
                }
            })
        });

       

        //             fetch(
        //     "https://api.ipgeolocation.io/ipgeo?apiKey=bbb627d8419d43f0a83fd96a1670514c"
        //   )
        //     .then((data) => {
        //       return data.json();
        //     })
        //     .then((objectData) => {
        //       data = objectData;
        //       console.log(data);
        //      })
    });

// let API_KEY = "1c18bdc3e52a15f56b3af6951038e572";

//   function showPosition(position) {
//     x.innerHTML = "Latitude: " + position.coords.latitude +
//     "<br>Longitude: " + position.coords.longitude;
//   }

// fetch(
//     "https://api.ipgeolocation.io/ipgeo?apiKey=bbb627d8419d43f0a83fd96a1670514c"
//   )
//     .then((data) => {
//       return data.json();
//     })
//     .then((objectData) => {
//       data = objectData;
//       console.log(data);
//       document.body.innerHTML += `
//       <p>Time Zone: ${data.time_zone.name}</p>
//       <p>Date And Time:${data.time_zone.current_time}</p>
//       <p>Pincode:${data.zipcode}</p>
//       <p>Message: Number of pincode(s) found:</p>
//       `
//      })