function deleteVenue(element){
  var venueId = element.id[6];
  route = "http://525687l8u9.zicp.vip/venue/" + venueId;
  myajax = $.ajax({
    type: "post",
    url: route,
    data:{
      _method: 'DELETE'
    },
    dataType: 'json',
    success: function (data){
      if(data['code'] == '0'){
        alert("Delete successfully");
      }
    }
  });
  $.when(myajax).done(function () {
    var venueList = document.getElementById("venueList");
    venueList.innerHTML = "";
    loadVenues();
  });
}

function storeEditVenue(element){
  var venueId = element.id[4];
  localStorage.setItem("editVenue", venueId);
}

function loadVenues(){
  var user = JSON.parse(localStorage.getItem("user"));
  var token = user['token'];
  $.ajax({
      headers: {
        'token': token
      },
      contentType: 'application/json; charset=UTF-8',
      type: "get",
      url: "http://525687l8u9.zicp.vip/venue",
      success: function(data){
        var venues = data['data'];
        console.log(venues);
        for(var i = 0; i < venues.length; i++){
          var venue = venues[i];

          // name
          var h6 = document.createElement('h6');
          h6.classList.add("card-title", "cursor-pointer");
          h6.innerHTML = venue['venueName'];

          // capacity
          var strong = "<strong>" + venue['capacity'] + "</strong> ";
          if(venue['venueType'] == "0"){
            strong += "people";
          }else{
            strong += "court";
          }
          var capacity = document.createElement('p');
          capacity.classList.add("mb-0", "float-start");
          capacity.innerHTML = strong;

          // price
          var price = document.createElement('p');
          price.classList.add("mb-0", "float-end", "fw-bold");
          var span = document.createElement("span");
          span.innerHTML = "$" + venue['price'];
          price.append(span);

          var clearfix = document.createElement('div');
          clearfix.classList.add('clearfix');
          clearfix.append(capacity, price);

          var editA = document.createElement('a');
          var editVenueId = "edit" + venue['venueId'];
          editA.id = editVenueId;
          var editButton = document.createElement('i');
          editButton.classList.add("bx", "bxs-edit");
          editA.href = "venue-edit.html";
          editA.onclick = function (){
            storeEditVenue(this);
          }
          editA.append(editButton);

          var deleteA = document.createElement('a');
          var deleteVenueId = "delete" + venue['venueId'];
          deleteA.id = deleteVenueId;
          var deleteButton = document.createElement('i');
          deleteButton.classList.add("bx", "bx-trash");
          deleteA.onclick = function (){
            deleteVenue(this);
          }
          deleteA.classList.add("ms-3");
          deleteA.append(deleteButton);

          var buttonDiv = document.createElement('div');
          buttonDiv.classList.add("d-flex", "order-actions");
          buttonDiv.append(editA, deleteA);

          var dflexdiv = document.createElement('div');
          dflexdiv.classList.add("d-flex", "align-items-center", "mt-3", "fs-6");
          dflexdiv.append(buttonDiv);

          var cardBodyDiv = document.createElement('div');
          cardBodyDiv.classList.add('card-body');
          cardBodyDiv.append(h6, clearfix, dflexdiv);

          var img = document.createElement('img');
          img.src = "assets/images/products/1.png";
          img.classList.add("card-img-top");

          var cardDiv = document.createElement("div");
          cardDiv.classList.add('card');
          cardDiv.append(img, cardBodyDiv);

          var colDiv = document.createElement('div');
          colDiv.classList.add("col");
          colDiv.append(cardDiv);

          var venueList = document.getElementById("venueList");
          venueList.append(colDiv);
        }
      }
  });
}

function loadEditVenue(){
  var editVenueId = localStorage.getItem("editVenue");
  var route = "http://525687l8u9.zicp.vip/venue/" + editVenueId;
  $.ajax({
    contentType: 'application/json; charset=UTF-8',
    type: "get",
    url: route,
    success: function (data){
      var venue = data['data'];
      var options = document.getElementById('type');
      options.value = venue['venueName'];
      var price = document.getElementById("price");
      price.value = venue['price'];
      var capacity = document.getElementById('capacity');
      capacity.value = venue['capacity'];
      var coach = document.getElementById("coach");
      coach.value = venue['coach'];
      var coachPrice = document.getElementById("coachPrice");
      coachPrice.value = venue['coachPrice'];
    }
  });
}

function editVenue(){
  var editVenueId = localStorage.getItem("editVenue");
  var options = document.getElementById('type');
  var type = options.value;
  var price = document.getElementById("price").value;
  var capacity = document.getElementById('capacity').value;
  var coach = document.getElementById("coach").value;
  var coachPrice = document.getElementById("coachPrice").value;
  var route = "http://525687l8u9.zicp.vip/venue/" + editVenueId;
  $.ajax({
    contentType: 'application/json; charset=UTF-8',
    type: "post",
    url: route,
    data: JSON.stringify({
      "venueName": type,
      "capacity": capacity,
      "price": price,
      "coach": coach,
      "coachPrice": coachPrice
    }),
    success: function (data){
      var code = data['code'];
      if(code === '0'){
        window.location.href="venue-list.html";
      }
    }
  });
}

function addVenue(){
  var user = JSON.parse(localStorage.getItem("user"));
  var token = user['token'];

  var options = $('#type option:selected');
  var type = options.val();
  var price = document.getElementById("price").value;
  var capacity = document.getElementById('capacity').value;
  var coach = document.getElementById("coach").value;
  var coachPrice = document.getElementById("coachPrice").value;
  $.ajax({
    headers: {
      'token': token
    },
    contentType: 'application/json; charset=UTF-8',
    type: "post",
    url: "http://525687l8u9.zicp.vip/venue",
    data: JSON.stringify({
      "venueName": type,
      "capacity": capacity,
      "price": price,
      "coach": coach,
      "coachPrice": coachPrice
    }),
    success: function (data){
      var code = data['code'];
      if(code === '0'){
        window.location.href="venue-list.html";
      }
    }
  });
}