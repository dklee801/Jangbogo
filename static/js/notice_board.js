const DAY = 1000 * 60 * 60 * 24;
function getExpiredPeriod(dt, expiredDt){
    var pYear =  new Date(dt).getFullYear();
    var months = new Date(dt).getMonth() + expiredDt;
    var month = months % 12;
    pYear = pYear + (months / 12);
    var date = new Date(dt).getDate();
    var expireDt = new Date();
    expireDt.setFullYear(pYear);
    expireDt.setMonth(month);
    expireDt.setDate(date);
    var distance = expireDt - new Date();
    var dis_day = Math.floor(distance / DAY);

    return dis_day
}


function LoadingWithMask() {
    //화면의 높이와 너비를 구합니다.
    var maskHeight = $("#recall-list-container").height();
    var maskWidth  = $("#recall-list-container").width();
    var gif = '/static/img/loading_icon.gif'

    //화면에 출력할 마스크를 설정해줍니다.
    var mask       ="<div id='mask' style='position:absolute; z-index:9000; background-color:#000000; display:flex; align-items: center; justify-content: center;'></div>";
    var loadingImg ='';

    loadingImg +="<div id='loadingImg'>";
    loadingImg +=" <img src='"+ gif +"' style=' display: block; margin: 0px auto; margin-top: -50px;'/>";
    loadingImg +="</div>";

    //화면에 레이어 추가
    $("#recall-list-container").prepend(mask)
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

function getHasProductList(){
    var userId = $(".has-product-container").value();
    var container = $(".has-product-container");
    var apiKey = "3d5e3cfb86a24de7a5b6"
    $.ajax({
        type: "GET",
        url: container.attr("url"),
        dataType: "json",
        success: function(response){
            console.log("성공했엉");
            var serviceKey = response.urlInfo.serviceKey
            result = JSON.parse(response.hasProductList)
            callRecallList(serviceKey, result);
            callFakeList(serviceKey, result);
            callExpiredDate(result);
        },
        error: function(request, status, error){
            console.log("에러났엉");
            console.log(error);
        },
    });
}

// 유통기한 조회
function callExpiredDate(result){
    // 유통기한 계산
    $("#expired-tbody").empty();
    $.each(result, function(idx, item){
        var purName = item.fields.pur_name;
        var purCompany = item.fields.pur_company;
        var purDt = item.fields.pur_date;
        var purJejoDt = item.fields.pur_jejodate;
        var expirePeriod = item.fields.pur_expire_period;

        var dt = purJejoDt || purDt;
        var expiredPeriod = getExpiredPeriod(dt, expirePeriod);

        if (expiredPeriod < 31) {
            var tr = $("<tr></tr>") // <tr></tr>
            var productTd =  $("<td></td>").text(purName) // <td></td>
            var entrpsTd = $("<td></td>").text(purCompany) // <td></td>
            var expiredPeriodTd = $("<td></td>").text(expiredPeriod)

            tr.append(productTd)
            tr.append(entrpsTd)
            tr.append(expiredPeriodTd)

            $("#expired-tbody").append(tr)
        }
    });
}

// 허위.과대광고 & 유통기한 조회
function callFakeList(serviceKey, result){
    $("#expired-tbody").empty();
    $.each(result, function(idx, item){
        var purName = item.fields.pur_name;
        var purCompany = item.fields.pur_company;
        var purDt = item.fields.pur_date;
        var purJejoDt = item.fields.pur_jejodate;
        var expirePeriod = item.fields.pur_expire_period;

        $("#false-ad-tbody").empty();
        $.ajax({
            type:"GET",
            url: "http://apis.data.go.kr/1470000/FoodFlshdErtsInfoService/getFoodFlshdErtsList",
            data: {
                "serviceKey": serviceKey,
                "Prduct": purName,
                "Entrps": purCompany,
            },
            success: function(response){
                if ($(response).find("item").text() !== ''){
                    var tr = $("<tr></tr>") // <tr></tr>
                    var productTd = $("<td></td>").text($(response).find("PRDUCT").text()) // <td></td>
                    var entrpsTd = $("<td></td>").text($(response).find("ENTRPS").text()) // <td></td>
                    var dspsDtTd = $("<td></td>").text($(response).find("DSPS_DT").text()) // <td></td>

                    tr.append(productTd)
                    tr.append(entrpsTd)
                    tr.append(dspsDtTd)

                    $("#false-ad-tbody").append(tr)
                }

            },
            error: function(error){
                console.log("에러났엉 ㅠ");
                console.log(error)
            }
        })

        });
}



function callRecallList(serviceKey, result){
    console.log("회수, 판매중지 api 작업중");
    var keyId ="8c21dcaf0ba44796ada4"

    LoadingWithMask();
    $("#recall-tbody").empty();
    $.ajax({
        type:"GET",
        url : "http://openapi.foodsafetykorea.go.kr/api/" + keyId +"/I0490/json/1/1000/",
        success: function(response){
        noResult = true;
            $.each(response.I0490.row, function(idx,item) {
                $.each(result, function(idx, hasProductItem){
                    var pk = hasProductItem.pk;
                    var purName = hasProductItem.fields.pur_name;
                    var purCompany = hasProductItem.fields.pur_company;

                    if (item["PRDTNM"] === purName && item["BSSHNM"].trim() === (purCompany.trim())){
                        var tr = $("<tr></tr>") // <tr></tr>
                        var pkTd =  pk
                        var productTd = $("<td></td>").text(item["PRDTNM"]) // 제품명
                        var entrpsTd = $("<td></td>").text(item["BSSHNM"]) // 업체명
                        var mnftDtTd = $("<td></td>").text(item["CRET_DTM"]) // 등록일
                        var rclcmtTd = $("<td></td>").text(item["RTRVLPRVNS"]) // 회수사유

                        tr.append(pkTd)
                        tr.append(productTd)
                        tr.append(entrpsTd)
                        tr.append(mnftDtTd)
                        tr.append(rclcmtTd)

                        $("#recall-tbody").append(tr)
                        noResult = false;
                    }
                })
            })
          if (noResult === true){
            var tr = $("<tr></tr>");
            var noResultMsg = $("<h3></h3>").text("검색결과가 없습니다.");
            tr.append(noResultMsg);
            $("#tbody_recall").append(tr);
          }

          closeLoadingWithMask();

        },
        error: function(error){
            console.log("에러났엉 ㅠ");
            console.log(error)
        }
    })
}

function init(){
    getHasProductList();
}

init();