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

function getHasProductList(){
    var userId = 1;
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
            callRecallList(result);
            callFakeList(result);
        },
        error: function(request, status, error){
            console.log("에러났엉");
            console.log(error);
        },
    });
}

function callFakeList(result){
$.each(result, function(idx, item){
                var purName = item.fields.pur_name;
                var purCompany = item.fields.pur_company;
                var purDt = item.fields.pur_date;
                var purJejoDt = item.fields.pur_jejodate;
                var expirePeriod = item.fields.pur_expire_period;
     // 허위.과대광고
                $("#false-ad-tbody").empty()
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

function callRecallList(result){
            $("#expired-tbody").empty();
            $.each(result, function(idx, item){
                var purName = item.fields.pur_name;
                var purCompany = item.fields.pur_company;
                var purDt = item.fields.pur_date;
                var purJejoDt = item.fields.pur_jejodate;
                var expirePeriod = item.fields.pur_expire_period;

                // 회수.판매중지
                $("#recall-tbody").empty()
                $.ajax({
                    type:"GET",
                    url: "http://apis.data.go.kr/1470000/FoodHistInfoService/getAdminRtrvlList",
                    data: {
                        "serviceKey": serviceKey,
                        "pdtnm": purName,
                    },
                    success: function(response){
                        $(response).find("item").each(function(){
                            var tr = $("<tr></tr>") // <tr></tr>
                            var productTypeTd =  $("<td></td>").text($(this).find("PDTTYPNM").text()) // <td></td>
                            var productTd = $("<td></td>").text($(this).find("PDTNM").text()) // <td></td>
                            var entrpsTd = $("<td></td>").text($(this).find("BRNCHNM").text()) // <td></td>
                            var mnftDtTd = $("<td></td>").text($(this).find("MNFTDT").text()) // <td></td>
                            var rclcmtTd = $("<td></td>").text($(this).find("RCLCMT").text()) // <td></td>

                            tr.append(productTypeTd)
                            tr.append(productTd)
                            tr.append(entrpsTd)
                            tr.append(mnftDtTd)
                            tr.append(rclcmtTd)

                            $("#recall-tbody").append(tr)
                        })


                    },
                    error: function(error){
                        console.log("에러났엉 ㅠ");
                        console.log(error)
                    }
                })

                // 유통기한 계산
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
            })
}

function init(){
    getHasProductList();
    //callRecallList()
}

init()