function loadUser(){
    $.ajax({
        contentType: 'application/json; charset=UTF-8',
        type: "get",
        url: "http://525687l8u9.zicp.vip/user",
        dataType: "json",
        success: function (data){
            var users = data['data'];
            console.log(users);
            for(var i = 0; i < users.length; i++){
                var user = users[i];

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
                titleTd.innerHTML = user['userName'];

                var phoneTd = document.createElement('td');
                phoneTd.innerHTML = user['userPhoneNumber'];

                var tr = document.createElement('tr');
                tr.append(orderTd, titleTd, phoneTd);

                var tbody = document.getElementById("tbody");
                tbody.append(tr);
            }
        }
    });
}