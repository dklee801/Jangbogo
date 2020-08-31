// form - CSRF
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

var csrftoken = getCookie('csrftoken');

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}


$("form").submit(function(event){
    event.preventDefault();
    var user_id = $("input[type=hidden]").val();
   if (confirm('보유/구매목록에 추가하시겠습니까?')) {
   console.log($("#search_expire_period").attr("value"))
        // Save it!
        $.ajax({
            async : true,
            url : '/users/'+ user_id +'/add_product/',
            type : "POST",
            dataType : "json",
            beforeSend: function(xhr, settings) {
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", csrftoken);
                }
            },
            data: {
                "prdReportNo" : $("#search_prdlst_cd").attr("value"),
                "pur_name" : $("#search_name").text(),
                "pur_company" : $("#search_company_nm").text(),
                "pur_jejodate": $("#jejo_date").val(),
                "pur_date": $("#pur_date").val(),
                "pur_expire_period": $("#search_expire_period").attr("value"),
            },
            success : function(result) {
                alert(result.message);
            },
            error: function(error){
                alert(result.message);
            }
        });
    } else {
        // Do nothing!
        console.log('Thing was not saved to the database.');
    }
});