function deleteStaff(element){
    var length = element.id.length;
    var staffId = element.id.substring(6, length);
    ///////////////////////////////////////////////////
    var route = "http://525687l8u9.zicp.vip/staff/" + staffId;
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
        var staffList =document.getElementById("staffList");
        staffList.innerHTML = "";
        loadWorkers();
    });
}

function storeEditStaff(element){
    var length = element.id.length;

    var staffId = element.id.substring(4, length);
    localStorage.setItem("editStaff", staffId);
}

function loadWorkers(){
    var user = JSON.parse(localStorage.getItem("user"));
    var token = user['token'];
    var staffNum = 0;
    $.ajax({
        headers: {
            'token': token
        },
        contentType: 'application/json; charset=UTF-8',
        type: "get",
        url: "http://525687l8u9.zicp.vip/staff",
        success: function (data){
            var staffs = data['data'];
            staffNum = staffs.length;
            for(var i = 0; i < staffs.length; i++){
                var staff = staffs[i];
                if(staff['role'] == 'manager'){
                    continue;
                }

                var colDiv = document.createElement('div');
                var cardDiv = document.createElement('div');
                var cardBodyDiv = document.createElement('div');
                var borderDiv = document.createElement('div');
                var buttonDiv = document.createElement('div');

                // image
                var avatar = document.createElement('img');
                imageSrc = staff['staffAvatar'];
                console.log(imageSrc);
                if(imageSrc == null){
                    avatar.src="assets/images/avatars/avatar-1.png";
                }else{
                    avatar.src = imageSrc;
                }
                avatar.width = 110;
                avatar.height = 110;
                avatar.classList.add("rounded-circle", "shadow");

                // name
                var name = staff['staffFirstName'] + " " + staff['staffLastName'];
                var h5 = document.createElement('h5');
                h5.innerHTML = name;
                h5.classList.add("mb-0", "mt-5");

                // work number
                var p = document.createElement('p');
                p.classList.add("mb-3");
                p.innerHTML = staff['staffNumber'];

                borderDiv.append(avatar, h5, p);

                // two buttons
                var editA = document.createElement('a');
                var editStaffId = "edit" + staff['staffId'];
                editA.id = editStaffId;
                var editButton = document.createElement('i');
                editButton.classList.add('bx', 'bxs-edit');

                editA.href = "edit-worker.html";
                editA.onclick = function (){
                    storeEditStaff(this);
                }

                editA.append(editButton);

                var deleteA = document.createElement('a');
                var deleteStaffId = "delete" + staff['staffId'];
                deleteA.id = deleteStaffId;
                var deleteButton = document.createElement('i');
                deleteButton.classList.add('bx', "bxs-trash");

                deleteA.onclick = function (){
                    deleteStaff(this);
                };
                deleteA.classList.add("ms-3");
                deleteA.append(deleteButton);


                buttonDiv.classList.add("d-flex", "order-actions");
                buttonDiv.append(editA, deleteA);


                borderDiv.classList.add("p-4", "border", "radius-15");
                borderDiv.append(buttonDiv);


                cardBodyDiv.classList.add("card-body", "text-center");
                cardBodyDiv.append(borderDiv);


                cardDiv.classList.add("card", "radius-15");
                cardDiv.append(cardBodyDiv);


                colDiv.classList.add("col");
                colDiv.append(cardDiv);

                var staffList =document.getElementById("staffList");
                staffList.append(colDiv);
            }
        }
    });
}

function loadEditStaff(){
    var editStaffId = localStorage.getItem('editStaff');
    // get the information of this staff
    var route = "http://525687l8u9.zicp.vip/staff/" + editStaffId;
    $.ajax({
        contentType: 'application/json; charset=UTF-8',
        type: "get",
        url: route,
        success: function (data){
            var staff = data['data'];
            console.log(staff);
            var firstName = document.getElementById("inputFirstName");
            firstName.value = staff['staffFirstName'];
            var lastName = document.getElementById('inputLastName');
            lastName.value = staff['staffLastName'];
            var workNumber = document.getElementById("inputEmailAddress");
            workNumber.value = staff['staffNumber'];
        }
    });
}

function  editStaff(){
    var editStaffId = localStorage.getItem("editStaff");
    var firstName = document.getElementById("inputFirstName").value;
    var lastName = document.getElementById('inputLastName').value;
    var workNumber = document.getElementById("inputEmailAddress").value;
    var password = document.getElementById("inputChoosePassword").value;
    var route = "http://525687l8u9.zicp.vip/staff/" + editStaffId;
    $.ajax({
        contentType: 'application/json; charset=UTF-8',
        type: "post",
        url: route,
        data: JSON.stringify({
            "staffFirstName": firstName,
            "staffLastName": lastName,
            "staffNumber": workNumber,
            "staffPassword": password
        }),
        success: function (data){
            var code = data['code'];
            if(code === '0'){
                window.location.href="worker-list.html";
            }else{
                var alert = document.getElementById('alert');
                alert.innerHTML = data['msg'];
            }
        }
    });
}

function addStaff(){
    var user = JSON.parse(localStorage.getItem("user"));
    var token = user['token'];
    var firstName = document.getElementById("inputFirstName").value;
    var lastName = document.getElementById('inputLastName').value;
    var workNumber = document.getElementById("inputEmailAddress").value;
    var password = document.getElementById("inputChoosePassword").value;
    $.ajax({
        headers: {
            'token': token
        },
        contentType: 'application/json; charset=UTF-8',
        type: "post",
        url: "http://525687l8u9.zicp.vip/staff/",
        data: JSON.stringify({
            "staffFirstName": firstName,
            "staffLastName": lastName,
            "staffNumber": workNumber,
            "staffPassword": password
        }),
        success: function (data){
            var code = data['code'];
            if(code === '0'){
                window.location.href="worker-list.html";
            }else{
                var alert = document.getElementById('alert');
                alert.innerHTML = data['msg'];
            }
        }
    });
}