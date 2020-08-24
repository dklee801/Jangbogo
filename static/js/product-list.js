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


function LoadingWithMask() {
    //화면의 높이와 너비를 구합니다.
    var maskHeight = $(document).height();
    var maskWidth  = window.document.body.clientWidth;
    var gif = '/static/img/loading_icon.gif'

    //화면에 출력할 마스크를 설정해줍니다.
    var mask       ="<div id='mask' style='position:absolute; z-index:9000; background-color:#000000; display:flex; align-items: center; justify-content: center; left:0; top:0;'></div>";
    var loadingImg ='';

    loadingImg +="<div id='loadingImg'>";
    loadingImg +=" <img src='"+ gif +"' style=' display: block; margin: 0px auto; margin-top: -50px;'/>";
    loadingImg +="</div>";

    //화면에 레이어 추가
    $("body")
        .append(mask)
    $("#mask").append(loadingImg)

    //마스크의 높이와 너비를 화면 것으로 만들어 전체 화면을 채웁니다.
    $('#mask').css({
            'width' : maskWidth
            ,'height': maskHeight
            ,'opacity' :'0.3'
    });

    //마스크 표시
    $('#mask').show();

    //로딩중 이미지 표시
    $('#loadingImg').show();
}

function closeLoadingWithMask() {
    $('#mask, #loadingImg').hide();
    $('#mask, #loadingImg').remove();
}

function call_jepum(){
    LoadingWithMask();

    var search_key = $("#search_key").attr("search_key");
    var keyId ="8c21dcaf0ba44796ada4"
    var serviceId = "I1250"
    var dataType = "json"
    var startIdx = "1"
    var endIdx = "200"

    $.ajax({
        async : true,
        url : "http://openapi.foodsafetykorea.go.kr/api/" + keyId +"/"+ serviceId +"/"+ dataType +"/"+ startIdx +"/"+ endIdx +"/PRDLST_NM="+search_key+"/",
        type : "GET",
        dataType : "json",
        success : function(result) {
        closeLoadingWithMask();
        var noResultJepum = false
        if (result.I1250.total_count === "0"){
            noResultJepum = true;
        }
        else{
        $.each(result.I1250.row, function(idx,item) {
            var tr = $("<tr></tr>")
            var prdReportNo = item.PRDLST_REPORT_NO //제품제조번호
            var jepum = $("<td></td>").text(item.PRDLST_NM) //제품명
            var upche = $("<td></td>").text(item.BSSH_NM) //업체명
            var yuhyung = $("<td></td>").text(item.PRDLST_DCNM) //유형
            var yutong = $("<td></td>").text(item.POG_DAYCNT) // 유통기한
            //var highcalorie = $("<td></td>").text(item.HIENG_LNTRT_DVS_NM) //고열량저영양식품여부
            //var children = $("<td></td>").text(item.CHILD_CRTFC_YN) //어린이기호식품품질인증여부
            var buttonTd = $("<td></td>") //추가하기 버튼
            var jejoTd = $("<td></td>") // 제조일자
            var purTd = $("<td></td>") // 구매일자
            var button = $("<input />").attr("type","button").attr("value","추가하기")
            button.on("click", function() {
               var user_id = $("input[type=hidden]").val()
               if (user_id === ''){
                alert("로그인 후 이용가능한 서비스입니다.");
               }else if (confirm('보유/구매목록에 추가하시겠습니까?')) {
                    // Save it!
                    $.ajax({
                        async : true,
                        url : '/users/' + user_id + '/add_product/',
                        type : "POST",
                        dataType : "json",
                        beforeSend: function(xhr, settings) {
                            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                                xhr.setRequestHeader("X-CSRFToken", csrftoken);
                            }
                        },
                        data: {
                            "prdReportNo" : prdReportNo,
                            "pur_name" : item.PRDLST_NM,
                            "pur_company" : item.BSSH_NM,
                            "pur_jejodate": jejo_date.val(),
                            "pur_date": pur_date.val(),
                            "pur_expire_period": item.POG_DAYCNT
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
            //tr.append(highcalorie)
            //tr.append(children)
            tr.append(jejoTd)
            tr.append(purTd)
            tr.append(buttonTd)

            $("#tbody_jepum").append(tr)
            })
        }
        call_youngyangjepum(noResultJepum);
        },
        error : function(error) {
            alert("call_jepum 실패")
        }
    })
}

function call_youngyangjepum(noResultJepum){
    LoadingWithMask();
    var search_key = $("#search_key").attr("search_key");
    var keyId ="8c21dcaf0ba44796ada4"
    var serviceId = "I0030"
    var dataType = "json"
    var startIdx = "1"
    var endIdx = "200"

    $.ajax({
        async : true,
        url : "http://openapi.foodsafetykorea.go.kr/api/" + keyId +"/"+ serviceId +"/"+ dataType +"/"+ startIdx +"/"+ endIdx +"/PRDLST_NM="+search_key+"/",
        type : "GET",
        dataType : "json",
        success : function(result) {
        closeLoadingWithMask();
            if (result.I0030.total_count === "0" && noResultJepum === true){
                var tr = $("<tr></tr>");
                var noResultMsg = $("<h3></h3>").text("검색결과가 없습니다.");
                tr.append(noResultMsg);
                $("#tbody_jepum").append(tr);
            }
            else{
                $.each(result.I0030.row, function(idx,item) {
                    var tr = $("<tr></tr>")
                    var prdReportNo = item.PRDLST_REPORT_NO //제품제조번호
                    var jepum = $("<td></td>").text(item.PRDLST_NM) //제품명
                    var upche = $("<td></td>").text(item.BSSH_NM) //업체명
                    var yuhyung = $("<td></td>").text(item.PRDLST_DCNM) //유형
                    var yutong = $("<td></td>").text(item.POG_DAYCNT) // 유통기한
                    //var highcalorie = $("<td></td>").text(item.HIENG_LNTRT_DVS_NM) //고열량저영양식품여부
                    //var children = $("<td></td>").text(item.CHILD_CRTFC_YN) //어린이기호식품품질인증여부
                    var buttonTd = $("<td></td>") //추가하기 버튼
                    var jejoTd = $("<td></td>") // 제조일자
                    var purTd = $("<td></td>") // 구매일자
                    var button = $("<input />").attr("type","button").attr("value","추가하기")
                    button.on("click", function() {
                        var user_id = $("input[type=hidden]").val();
                        if (user_id === ''){
                            alert("로그인 후 이용가능한 서비스입니다.");
                        }else if (confirm('보유/구매목록에 추가하시겠습니까?')) {
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
                                    "prdReportNo" : prdReportNo,
                                    "pur_name" : item.PRDLST_NM,
                                    "pur_company" : item.BSSH_NM,
                                    "pur_jejodate": jejo_date.val(),
                                    "pur_date": pur_date.val(),
                                    "pur_expire_period": item.POG_DAYCNT
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
                    //tr.append(highcalorie)
                    //tr.append(children)
                    tr.append(jejoTd)
                    tr.append(purTd)
                    tr.append(buttonTd)

                    $("#tbody_jepum").append(tr)


                })
            }
        },
        error : function(error) {
            alert(" call_youngyangjepum 실패")
        }
    })
}


function call_recall(){
    console.log("회수, 판매중지 api 작업중");
    var search_key = $("#search_key").attr("search_key");
   // var parameters = $("#search_key").attr("parameters");
    var keyId ="8c21dcaf0ba44796ada4"

    $("#tbody_recall").empty();
    $.ajax({
        type:"GET",
        url : "http://openapi.foodsafetykorea.go.kr/api/" + keyId +"/I0490/json/1/1000/",
        success: function(result){
        noResult = true;
            $.each(result.I0490.row, function(idx,item) {
                if (item["PRDTNM"].includes(search_key)){
                    noResult = false;
                    var tr = $("<tr></tr>") // <tr></tr>
                    var productTd = $("<td></td>").text(item["PRDTNM"]) // 제품명
                    var entrpsTd = $("<td></td>").text(item["BSSHNM"]) // 업체명
                    var productTypeTd =  $("<td></td>").text(item["PRDLST_CD_NM"]) // 유형
                    var expiredTd =  $("<td></td>").text(item["DISTBTMLMT"]) // 유통기한
                    var cretDtTd =  $("<td></td>").text(item["CRET_DTM"]) // 등록일
                    var rtrTd =  $("<td></td>").text(item["RTRVLPRVNS"]) // 회수사유
                    var rtrRtrTd =  $("<td></td>").text(item["RTRVLPLANDOC_RTRVLMTHD"]) // 회수방법
                    var buttonTd = $("<td></td>") //상세 버튼
                    var button = $("<input />").attr("type","button").attr("value","상세")

                    button.on("click", function() {
                        $.ajax({
                            async : true,
                            url : '/jangbogo/recall_list/saveDetail/',
                            type : "POST",
                            dataType : "json",
                            beforeSend: function(xhr, settings) {
                                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                                    xhr.setRequestHeader("X-CSRFToken", csrftoken);
                                }
                            },
                            data: {/*1	PRDTNM	제품명
                                    2	RTRVLPRVNS	회수사유
                                    3	BSSHNM	제조업체명
                                    4	ADDR	업체주소
                                    5	PRCSCITYPOINT_TELNO	전화번호
                                    //6	BRCDNO	바코드번호
                                    7	FRMLCUNIT	포장단위
                                    8	MNFDT	제조일자
                                    9	RTRVLPLANDOC_RTRVLMTHD	회수방법
                                    10	DISTBTMLMT	유통기한
                                    11	PRDLST_TYPE	식품분류
                                    12	IMG_FILE_PATH	제품사진 URL
                                    13	PRDLST_CD	품목코드
                                    14	CRET_DTM	등록일
                                    15	RTRVLDSUSE_SEQ	회수.판매중지 일련번호
                                    16	PRDLST_REPORT_NO	품목제조보고번호
                                    17	RTRVL_GRDCD_NM	회수등급
                                    18	PRDLST_CD_NM	품목유형(품목코드명)*/
                                    "prdtnm": item["PRDTNM"],
                                    "rtrvlprvns": item["RTRVLPRVNS"],
                                    "bsshnm": item["BSSHNM"],
                                    "addr": item["ADDR"],
                                    "prcscitypoint_telno": item["PRCSCITYPOINT_TELNO"],
                                    //"brcdno": item["BRCDNO"],
                                    "frmlcunit": item["FRMLCUNIT"],
                                    "mnfdt": item["MNFDT"],
                                    "rtrvlplandoc_rtrvlmthd": item["RTRVLPLANDOC_RTRVLMTHD"],
                                    "distbtmlmt": item["DISTBTMLMT"],
                                    "prdlst_type": item["PRDLST_TYPE"],
                                    "img_file_path": item["IMG_FILE_PATH"],
                                    "prdlst_cd": item["PRDLST_CD"],
                                    "cret_dtm": item["CRET_DTM"],
                                    "rtrvldsuse_seq": item["RTRVLDSUSE_SEQ"],
                                    "prdlst_report_no": item["PRDLST_REPORT_NO"],
                                    "rtrvl_grdcd_nm": item["RTRVL_GRDCD_NM"],
                                    "prdlst_cd_nm": item["PRDLST_CD_NM"],
                            },
                            success : function(result) {
                                console.log(result.message);
                                location.href = '/jangbogo/recall_list/detail/' + item["PRDTNM"] +"/"+ item["BSSHNM"]+"/";
                            },
                            error: function(error){
                                 console.log(result.message);
                                 console.log(error);
                            }
                        });
                    })
                    buttonTd.append(button)

                    tr.append(productTd)
                    tr.append(entrpsTd)
                    tr.append(productTypeTd)
                    tr.append(expiredTd)
                    tr.append(cretDtTd)
                    tr.append(rtrTd)
                    tr.append(rtrRtrTd)
                    tr.append(buttonTd)

                    $("#tbody_recall").append(tr)
                }


            })
          if (noResult === true){
            var tr = $("<tr></tr>");
            var noResultMsg = $("<h3></h3>").text("검색결과가 없습니다.");
            tr.append(noResultMsg);
            $("#tbody_recall").append(tr);
          }


        },
        error: function(error){
            console.log("에러났엉 ㅠ");
            console.log(error)
        }
    })
}

function call_fake(){
    var search_key = $("#search_key").attr("search_key");
    var parameters = $("#search_key").attr("parameters");
    $("#tbody_fake").empty();
    $.ajax({
        async : true,
        url : "http://apis.data.go.kr/1470000/FoodFlshdErtsInfoService/getFoodFlshdErtsItem",
        data : {
            serviceKey : parameters,
            Prduct : search_key
        },
        type : "GET",
        dataType : "XML",
        success : function(result) {
            $(result).find("item").each(function(){
                var tr = $("<tr></tr>") // <tr></tr>
                var productTd =  $("<td></td>").text($(this).find("PRDUCT").text()) // <td></td>
                var upcheTd = $("<td></td>").text($(this).find("ENTRPS").text()) // <td></td>
                var fakenameTd = $("<td></td>").text($(this).find("DSPS_CMMND").text()) //처분명
                var fakedateTd = $("<td></td>").text($(this).find("DSPS_DT").text()) //행정처분일자
                var fakedetailTd = $("<td></td>").text($(this).find("FOUND_CN").text()) //광고(적발)내용
                var fakelawTd = $("<td></td>").text($(this).find("VIOLT").text()) //위반법령

                tr.append(productTd)
                tr.append(upcheTd)
                tr.append(fakenameTd)
                tr.append(fakedateTd)
                tr.append(fakedetailTd)
                tr.append(fakelawTd)

                $("#tbody_fake").append(tr)
            })
        },
        error : function(error) {
            alert("실패fake")
        }
    })
}

function init() {
    call_jepum();
    //call_youngyangjepum();
    call_recall();
    call_fake();
    //$(".tab_menu_btn2").on("click", call_recall);
    //$(".tab_menu_btn3").on("click", call_fake);
}

init();
