


let searchradius=5000;
let category="restaurant";

function changeRadius(){
  searchradius=document.getElementById("radius").value;
  
}

function changeCat(){
  category=document.getElementById("category").value;
}




function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 40.749933, lng: -73.98633 },
      zoom: 13,
      mapTypeControl: false,
    });

    let markers=[];
    let selectedpos;






    infoWindow = new google.maps.InfoWindow();




            const searchButton = document.createElement("button");
            searchButton.textContent = "Search Nearby";
            searchButton.classList.add("custom-map-control-button");
            document.getElementById("shops").appendChild(searchButton);
            searchButton.addEventListener("click", () => {
              searchNearbyRestaurants();
            });
          
        
            function searchNearbyRestaurants() {

              clearMarkers();  
              

          
                    const service = new google.maps.places.PlacesService(map);
                    service.nearbySearch(
                      {
                        location: selectedpos,
                        radius: searchradius, 
                        type: [category],
                      },
                      (results, status) => {
                        if (status === google.maps.places.PlacesServiceStatus.OK) {
                          for (let i = 0; i < results.length; i++) {
                            createMarker(results[i]);
                            console.log(results[i]);
                          }
                        }
                      }
                    );

            }

            function createMarker(place) {
              var placeLoc = place.geometry.location;

              selectedpos=place.geometry.location;
              
              var marker = new google.maps.Marker({
                  map : map,
                  position : place.geometry.location
              });
              markers.push(marker);
  
              google.maps.event.addListener(marker, 'click', function() {
                  infowindow.setContent(place.name);
                  infowindow.open(map, this);
              });
          }

          function clearMarkers(){
            for (let i = 0; i < markers.length; i++) {
              markers[i].setMap(null);   
            }
            markers=[];
          }


    const locationButton = document.createElement("button");
  
    locationButton.textContent = "Locate Me";
    locationButton.classList.add("custom-map-control-button");
    document.getElementById("shops").appendChild(locationButton);
    locationButton.addEventListener("click", () => {

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            selectedpos=pos;
            clearMarkers();
  
            infoWindow.setPosition(pos);
            infoWindow.setContent("Location found.");
            infoWindow.open(map);
            map.setCenter(pos);
          },
          () => {
            handleLocationError(true, infoWindow, map.getCenter());
          },
        );
      } else {
        handleLocationError(false, infoWindow, map.getCenter());
      }
    });
  
  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation.",
    );
    infoWindow.open(map);
  }


    const card = document.getElementById("pac-card");
    const input = document.getElementById("pac-input");
    const biasInputElement = document.getElementById("use-location-bias");
    const strictBoundsInputElement = document.getElementById("use-strict-bounds");
    const options = {
      fields: ["formatted_address", "geometry", "name"],
      strictBounds: false,
    };
  
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(card);
  
    const autocomplete = new google.maps.places.Autocomplete(input, options);
  

    autocomplete.bindTo("bounds", map);
  
    const infowindow = new google.maps.InfoWindow();
    const infowindowContent = document.getElementById("infowindow-content");
  
    infowindow.setContent(infowindowContent);
    clearMarkers();
    const marker = new google.maps.Marker({
      map,
      anchorPoint: new google.maps.Point(0, -29),
    });
  
    autocomplete.addListener("place_changed", () => {
      infowindow.close();
      marker.setVisible(false);
  
      const place = autocomplete.getPlace();
      selectedpos=place.geometry.location;
  
      if (!place.geometry || !place.geometry.location) {

        window.alert("No details available for input: '" + place.name + "'");
        return;
      }

      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }
  
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);
      infowindowContent.children["place-name"].textContent = place.name;
      infowindowContent.children["place-address"].textContent =
        place.formatted_address;
      infowindow.open(map, marker);
    });
  

    function setupClickListener(id, types) {
      const radioButton = document.getElementById(id);
  
      radioButton.addEventListener("click", () => {
        autocomplete.setTypes(types);
        input.value = "";
      });
    }
  
    setupClickListener("changetype-all", []);
    setupClickListener("changetype-address", ["address"]);
    setupClickListener("changetype-establishment", ["establishment"]);
    setupClickListener("changetype-geocode", ["geocode"]);
    setupClickListener("changetype-cities", ["(cities)"]);
    setupClickListener("changetype-regions", ["(regions)"]);
    biasInputElement.addEventListener("change", () => {
      if (biasInputElement.checked) {
        autocomplete.bindTo("bounds", map);
      } else {

        autocomplete.unbind("bounds");
        autocomplete.setBounds({ east: 180, west: -180, north: 90, south: -90 });
        strictBoundsInputElement.checked = biasInputElement.checked;
      }
  
      input.value = "";
    });
    strictBoundsInputElement.addEventListener("change", () => {
      autocomplete.setOptions({
        strictBounds: strictBoundsInputElement.checked,
      });
      if (strictBoundsInputElement.checked) {
        biasInputElement.checked = strictBoundsInputElement.checked;
        autocomplete.bindTo("bounds", map);
      }
  
      input.value = "";
    });
    }
  

  



  
  window.initMap = initMap;


let map, infoWindow;

