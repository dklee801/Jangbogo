//버튼 색 제거,추가
$('.tab_menu_btn').on('click',function(){
    $('.tab_menu_btn').removeClass('on');
    $(this).addClass('on')
});

//1번 컨텐츠
$('.tab_menu_btn1').on('click',function(){
    $('.tab_box').hide();
    $('.tab_box1').show();
});

//2번 컨텐츠
$('.tab_menu_btn2').on('click',function(){
    $('.tab_box').hide();
    $('.tab_box2').show();
});


//3번 컨텐츠
$('.tab_menu_btn3').on('click',function(){
    $('.tab_box').hide();
    $('.tab_box3').show();
});


//4번 컨텐츠
$('.tab_menu_btn4').on('click',function(){
    $('.tab_box4').show();
});


function call_jepumjax(){
    var search_key = $("#search_key").attr("search_key");
    var keyId ="8c21dcaf0ba44796ada4"
    var serviceId = "I1250"
    var dataType = "json"
    var startIdx = "1"
    var endIdx = "200"
    console.log("http://openapi.foodsafetykorea.go.kr/api/" + keyId +"/"+ serviceId +"/"+ dataType +"/"+ startIdx +"/"+ endIdx +"/PRDLST_NM="+search_key+"/");
    $.ajax({
        async : true,
        url : "http://openapi.foodsafetykorea.go.kr/api/" + keyId +"/"+ serviceId +"/"+ dataType +"/"+ startIdx +"/"+ endIdx +"/PRDLST_NM="+search_key+"/",
        type : "GET",
        dataType : "json",
        success : function(result) {

            $.each(result.I1250.row, function(idx,item) {
                var tr = $("<tr></tr>")
                var jepum = $("<td></td>").text(item.PRDLST_NM)
                var upche = $("<td></td>").text(item.BSSH_NM)
                var yuhyung = $("<td></td>").text(item.PRDLST_DCNM)
                var yutong = $("<td></td>").text(item.POG_DAYCNT)
                var highcalorie = $("<td></td>").text(item.HIENG_LNTRT_DVS_NM)
                var children = $("<td></td>").text(item.CHILD_CRTFC_YN)
                var buttonTd = $("<td></td>")
                var jejoTd = $("<td></td>")
                var purTd = $("<td></td>")
                var button = $("<input />").attr("type","button").attr("value","추가하기")
                button.on("click",function() {
                    location.href = '/users/1/notice_board/'
                })

                var jejo_date = $("<input />").attr("type","date")
                var pur_date = $("<input />").attr("type","date")

                buttonTd.append(button)
                jejoTd.append(jejo_date)
                purTd.append(pur_date)

                tr.append(jepum)
                tr.append(upche)
                tr.append(yuhyung)
                tr.append(yutong)
                tr.append(highcalorie)
                tr.append(children)
                tr.append(jejoTd)
                tr.append(purTd)
                tr.append(buttonTd)

                $("#tbody_jepum").append(tr)
            })
        },
        error : function(error) {
            alert("실패")
        }
    })
}

function call_fakejax(){
    var search_key = $("#search_key").attr("search_key");
    var parameters = $("#search_key").attr("parameters");
    console.log(parameters)
    $.ajax({
        async : true,
        url : "http://apis.data.go.kr/1470000/FoodFlshdErtsInfoService/getFoodFlshdErtsItem",
        data : {
            serviceKey : parameters,
            Entrps : search_key
        },
        type : "GET",
        dataType : "XML",
        success : function(result) {
            alert("성공fake")

            $(result).find("item").each(function(){
                console.log($(this).find("PRDUCT").text())
                var tr = $("<tr></tr>") // <tr></tr>
                var productTd =  $("<td></td>").text($(this).find("PRDUCT").text()) // <td></td>
                var upcheTd = $("<td></td>").text($(this).find("ENTRPS").text()) // <td></td>
                var fakenameTd = $("<td></td>").text($(this).find("DSPS_CMMND").text()) // <td></td>
                var fakedateTd = $("<td></td>").text($(this).find("DSPS_DT").text()) // <td></td>
                var fakedetailTd = $("<td></td>").text($(this).find("FOUND_CN").text()) // <td></td>
                var fakelawTd = $("<td></td>").text($(this).find("VIOLT").text()) // <td></td>

                tr.append(productTd)
                tr.append(upcheTd)
                tr.append(fakenameTd)
                tr.append(fakedateTd)
                tr.append(fakedetailTd)
                tr.append(fakelawTd)

                $("#tbody_fake").append(tr)
            })


            // $("tbody").empty()
            //
            // $.each(result.I1250.row, function(idx,item) {
            //     var tr = $("<tr></tr>")
            //     var jepum = $("<td></td>").text(item.PRDLST_NM)
            //     var upche = $("<td></td>").text(item.BSSH_NM)
            //     var yuhyung = $("<td></td>").text(item.PRDLST_DCNM)
            //     var yutong = $("<td></td>").text(item.POG_DAYCNT)
            //     var highcalorie = $("<td></td>").text(item.HIENG_LNTRT_DVS_NM)
            //     var children = $("<td></td>").text(item.CHILD_CRTFC_YN)
            //     var buttonTd = $("<td></td>")
            //     var jejoTd = $("<td></td>")
            //     var purTd = $("<td></td>")
            //     var button = $("<input />").attr("type","button").attr("value","추가하기")
            //     button.on("click",function() {
            //         location.href = '/users/1/notice_board/'
            //     })
            //
            //     var jejo_date = $("<input />").attr("type","date")
            //     var pur_date = $("<input />").attr("type","date")
            //
            //     buttonTd.append(button)
            //     jejoTd.append(jejo_date)
            //     purTd.append(pur_date)
            //
            //     tr.append(jepum)
            //     tr.append(upche)
            //     tr.append(yuhyung)
            //     tr.append(yutong)
            //     tr.append(highcalorie)
            //     tr.append(children)
            //     tr.append(jejoTd)
            //     tr.append(purTd)
            //     tr.append(buttonTd)
            //
            //     $("tbody").append(tr)
            // })

        },
        error : function(error) {
            alert("실패fake")
        }
    })
}


function init() {
    console.log('초기화');
    call_jepumjax()
    call_fakejax()
}

init()

