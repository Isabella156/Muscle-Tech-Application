function staffLogin(){
    var workNumber = document.getElementById("inputEmailAddress").value;
    var password = document.getElementById("inputChoosePassword").value;
    $.ajax({
        contentType: 'application/json; charset=UTF-8',
        type: "post",
        url: "http://525687l8u9.zicp.vip/staff/login",
        data:JSON.stringify({
            "staffNumber": workNumber,
            "staffPassword": password }),
        success: function (data){
            var code = data['code'];
            if(code === '0'){
                var staffInfo = data['data'];
                localStorage.setItem("user", JSON.stringify(staffInfo));
                window.location.href="worker-list.html";
            }else{
                var alert = document.getElementById("alert");
                alert.innerHTML = data['msg'];
            }
        }
    });
}

