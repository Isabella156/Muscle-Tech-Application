function deleteAdver(element){
    var length = element.id.length;
    var adverId = element.id.substring(6, length);
    var route = "http://525687l8u9.zicp.vip/advertisement/" + adverId;
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
        var adverList = document.getElementById('tbody');
        adverList.innerHTML = "";
        loadAdver();
    });
}

function storeEditAdver(element){
    var length = element.id.length;
    var adverId = element.id.substring(4, length);
    localStorage.setItem("editAdver", adverId);
}

function storeViewAdver(element){
    var length = element.id.length;
    var adverId = element.id.substring(4, length);
    localStorage.setItem("viewAdver", adverId);
}

function loadAdver(){
    var user = JSON.parse(localStorage.getItem("user"));
    var token = user['token'];
    $.ajax({
        headers: {
            'token': token
        },
        contentType: 'application/json; charset=UTF-8',
        type: "get",
        url: "http://525687l8u9.zicp.vip/advertisement",
        success: function (data){
            var advertisements = data['data'];
            console.log(advertisements);
            for(var i = 0; i < advertisements.length; i++){
                var advertisement = advertisements[i];

                var h6 = document.createElement('h6');
                h6.classList.add("mb-0", "font-14");
                h6.innerHTML = "#" + (i + 1);

                var ms2div = document.createElement('div');
                ms2div.classList.add("ms-2");
                ms2div.append(h6);

                var dflexDiv = document.createElement('div');
                dflexDiv.classList.add("d-flex", "align-items-center");
                dflexDiv.append(ms2div);

                var orderTd = document.createElement('td');
                orderTd.append(dflexDiv);

                var titleTd = document.createElement('td');
                titleTd.innerHTML = advertisement['advertisementName'];

                var dateTd = document.createElement('td');
                dateTd.innerHTML = advertisement['datetime'];

                var viewA = document.createElement('a');
                var viewAdverId = "view" + advertisement['advertisementId'];
                viewA.id = viewAdverId;
                var viewButton = document.createElement('button');
                viewButton.type = "button";
                viewButton.classList.add("btn", "btn-primary", "btn-sm", "radius-30", "px-4");
                viewA.innerHTML = "View Details";
                viewA.onclick = function (){
                    storeViewAdver(this);
                    window.location.href="adver-detail.html";
                }
                viewButton.append(viewA);

                var viewTd = document.createElement('td');
                viewTd.append(viewButton);

                var editButton = document.createElement('i');
                editButton.classList.add("bx", "bxs-edit");
                var editA = document.createElement('a');
                var editAdverId = "edit" + advertisement['advertisementId'];
                editA.id = editAdverId;
                editA.href = "adver-edit.html";
                editA.onclick = function (){
                    storeEditAdver(this);
                }
                editA.append(editButton);

                var deleteButton = document.createElement('i');
                deleteButton.classList.add("bx", "bxs-trash");
                var deleteA = document.createElement('a');
                var deleteAdverId = "delete" + advertisement['advertisementId'];
                deleteA.id = deleteAdverId;
                deleteA.onclick = function (){
                    deleteAdver(this);
                }
                deleteA.append(deleteButton);
                deleteA.classList.add("ms-3");

                var orderDiv = document.createElement('div');
                orderDiv.classList.add("d-flex", "order-actions");
                orderDiv.append(editA, deleteA);

                var buttonTd = document.createElement('td');
                buttonTd.append(orderDiv);

                var tr = document.createElement('tr');
                tr.append(orderTd, titleTd, dateTd, viewTd, buttonTd);

                var tbody = document.getElementById("tbody");
                tbody.append(tr);
            }
        }
    });
}

function loadViewAdver(){
    var viewAdverId = localStorage.getItem('viewAdver');
    var route = "http://525687l8u9.zicp.vip/advertisement/" + viewAdverId;
    $.ajax({
        contentType: 'application/json; charset=UTF-8',
        type: "get",
        url: route,
        success: function (data){
            var advertisement = data['data'];
            var adverImage = document.getElementById('adverImage');
            adverImage.src = advertisement['advertisementPicture'];
            var adverName = document.getElementById('adverName');
            adverName.value = advertisement['advertisementName'];
        }
    });
}

function loadEditAdver(){
    var editAdverId = localStorage.getItem("editAdver");
    var route = "http://525687l8u9.zicp.vip/advertisement/" + editAdverId;
    $.ajax({
        contentType: 'application/json; charset=UTF-8',
        type: "get",
        url: route,
        success: function (data){
            var advertisement = data['data'];
            var adverName = document.getElementById("adverName");
            adverName.value = advertisement['advertisementName'];
            var adverImage = document.getElementById('adverImage');
            adverImage.src = advertisement['advertisementPicture'];
        }
    });
}

function editAdver(){
    var editAdverId = localStorage.getItem('editAdver');
    var name = document.getElementById('adverName').value;
    var files = $('#fancy-file-upload')[0].files;
    var data = new FormData();
    console.log(files.length)
    if (files.length != 0){
        data.append('file', files[0]);
    }
    data.append('name', name);
    console.log(data);

    $.ajax({
        type: "post",
        url: "http://525687l8u9.zicp.vip/advertisement/" + editAdverId,
        data: data,
        processData: false,
        contentType: false,
        success: function (data){
            var code = data['code']
            if(code == '0'){
                window.location.href="adver-list.html";
            }
        }
    });
}

function addAdver(){
    var user = JSON.parse(localStorage.getItem("user"));
    var token = user['token'];
    var name = document.getElementById('adverName').value;
    var files = $('#fancy-file-upload')[0].files;
    var data = new FormData();
    data.append('file', files[0]);
    data.append('name', name);

    $.ajax({
        headers: {
            'token': token
        },
        type: "post",
        url: "http://525687l8u9.zicp.vip/advertisement/",
        data: data,
        processData: false,
        contentType: false,
        success: function (data){
            var code = data['code'];
            if(code == '0'){
                window.location.href="adver-list.html";
            }
        }
    });
}