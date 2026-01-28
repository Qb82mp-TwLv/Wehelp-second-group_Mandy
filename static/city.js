
// 取得時間
async function getTime(time) {
    const get_time = document.querySelector(".get-time");
    if (get_time){
        get_time.textContent = String(time);
    }
}

// 取得city的名稱
async function getCityName() {
    const urlParams = new URLSearchParams(window.location.search);
    const cityName = urlParams.get("city");
    if (cityName !== undefined && cityName !== ""){
        getCityLocationInfo(cityName);
    }
}

const locationData = document.querySelector(".location-data");

getCityLocationInfo("台北市");
async function getCityLocationInfo(city) {
    if (locationData){
        try{
            // const url = `/api/airquality?county=${city}`;
            // const response = await fetch(url, {method: "GET"});

            // const data = await response.json();

            // if (!response.ok || data.error !== undefined){

            // }else{
            //     createLocationObject();
            // }
            const data = [{
                "city":"台北市",
                "location":"汐止",
                    "airquality":{
                        "AQI":"71",
                        "status":"普通",
                        "pm2.5":"25",
                        "pm2.5_avg":"19.8",
                        "pm10":"43",
                        "pm10_avg":"37",
                        "o3":"42",
                        "o3_8hr":"25",
                        "co":"0.45",
                        "co_8hr":"0.5",
                        "so2":"1.1",
                        "no2":"26"
                    },
                "time":"2026.01.28 (Wed) 12:00"}];
            // },{
            //     "city":"台北市",
            //     "location":"新店",
            //     "airquality":{
            //             "AQI":"72",
            //             "status":"普通",
            //             "pm2.5":"23",
            //             "pm2.5_avg":"20.1",
            //             "pm10":"28",
            //             "pm10_avg":"31",
            //             "o3":"49",
            //             "o3_8hr":"29",
            //             "co":"0.32",
            //             "co_8hr":"0.3",
            //             "so2":"1.1",
            //             "no2":"15"
            //     },
            //     "time":"2026.01.28 (Wed) 12:00"
            // },{
            //     "city":"台北市",
            //     "location":"土城",
            //     "airquality":{
            //             "AQI":"78",
            //             "status":"普通",
            //             "pm2.5":"26",
            //             "pm2.5_avg":"22.3",
            //             "pm10":"48",
            //             "pm10_avg":"38",
            //             "o3":"48",
            //             "o3_8hr":"28",
            //             "co":"0.37",
            //             "co_8hr":"0.4",
            //             "so2":"0.9",
            //             "no2":"16"
            //     },
            //     "time":"2026.01.28 (Wed) 12:00"
            // }];

            getTime(data[0]["time"]);
            createLocationObject(data);
            
        }catch{
            const dataContainer = document.createElement("div");
            dataContainer.classList.add("data-container-nodata");
            dataContainer.textContent = "抱歉發生錯誤，請看其他縣市的資料，謝謝。";

            locationData.appendChild(dataContainer);
        }
    }
};

async function createLocationObject(data) { 
    try{    
        for(let k=0; k<data.length; k++){
            const dataContainer = document.createElement("div");
            dataContainer.classList.add("data-container");
            if (locationData){
                locationData.appendChild(dataContainer);
            };

            const location = data[k]["location"];
            const airQuality = data[k]["airquality"];
            console.log(location);
            console.log(airQuality);
            blockOne(location, airQuality, dataContainer);
            blockTwo(airQuality, dataContainer);
        }
        
    }catch{
        const dataContainer = document.createElement("div");
        dataContainer.classList.add("data-container-nodata");
        dataContainer.textContent = "抱歉發生錯誤，請看其他縣市的資料，謝謝。";

        locationData.appendChild(dataContainer);
    }
}

async function blockOne(location, airQuality, dataContainer) {
    // 第一區塊
    const dataBlockOne = document.createElement("div");
    dataBlockOne.classList.add("data-blockOne");
    // 文字部分
    const blockOneText = document.createElement("div");
    blockOneText.classList.add("blockOne-text");
    // location名稱
    const textLocationTitle = document.createElement("div");
    textLocationTitle.classList.add("text-location-title");
    const textNameStr = document.createElement("div");
    textNameStr.textContent = String(location);
    textLocationTitle.appendChild(textNameStr);
    // 其他location的資訊
    const textLocationAnother = document.createElement("div");
    textLocationAnother.classList.add("text-location-another");
    // 空氣狀態與粒子
    const anotherStatus = document.createElement("div");
    anotherStatus.classList.add("another-status");
    anotherStatus.textContent = String(airQuality["status"]);
    // const anotherPollutant = document.createElement("div");
    // anotherPollutant.classList.add("another-pollutant");
    // anotherPollutant.textContent = "細懸浮微粒";
    textLocationAnother.appendChild(anotherStatus);
    //textLocationAnother.appendChild(anotherPollutant);
    // 將文字部分組合
    blockOneText.appendChild(textLocationTitle);
    blockOneText.appendChild(textLocationAnother);

    // 圖的部分
    const blockOneChart = document.createElement("div");
    blockOneChart.classList.add("blockOne-chart");
    // SVG圖
    const svgNS = "http://www.w3.org/2000/svg";
    const chartCircle = document.createElementNS(svgNS, "svg");
    chartCircle.setAttribute("viewBox", "25 0 70 70");
    chartCircle.classList.add("chart-circular");
    // SVG圖形
    const circlePathOne = document.createElementNS(svgNS, "path");
    circlePathOne.classList.add("chart-track");
    circlePathOne.setAttribute("d", "M10 60 a 10 10 0 0 1 0 0 a 50 50 0 0 1 100 0");
    const circlePathTwo = document.createElementNS(svgNS, "path");
    circlePathTwo.classList.add("chart-slideRail");
    circlePathTwo.setAttribute("d", "M10 60 a 10 10 0 0 1 0 0 a 50 50 0 0 1 100 0");
    circlePathTwo.setAttribute("pathLength", "500");
    // const scope = ;
    circlePathTwo.style.strokeDasharray=`${String(airQuality["AQI"])}, 500`;
    chartCircle.appendChild(circlePathOne);
    chartCircle.appendChild(circlePathTwo);
    // 圖的文字
    const chartText = document.createElement("div");
    chartText.classList.add("chart-text");
    // 空氣品質文字
    const aqiText = document.createElement("div");
    aqiText.textContent = "AQI";
    const aqiValue = document.createElement("div");
    aqiValue.classList.add("chart-text-big");
    aqiValue.textContent = String(airQuality["AQI"]);
    chartText.appendChild(aqiText);
    chartText.appendChild(aqiValue);
    // 將SVG與AQI文字組合
    blockOneChart.appendChild(chartCircle);
    blockOneChart.appendChild(chartText);

    dataBlockOne.appendChild(blockOneText);
    dataBlockOne.appendChild(blockOneChart);

    dataContainer.appendChild(dataBlockOne);
}

async function blockTwo(airQuality, dataContainer) {
    const titleArr = ["PM2.5", "PM10", "O3", "CO", "SO", "NO2"];

    // 第二區塊
    const dataBlockTwo = document.createElement("div");
    dataBlockTwo.classList.add("data-blockTwo");

    // title
    for(let i = 0; i < titleArr.length; i++){
        const blockTwoDetail = document.createElement("div");
        blockTwoDetail.classList.add("blockTwo-detail");
        const detailContainer = document.createElement("div");
        detailContainer.classList.add("detail-container");

        const detailTitle = document.createElement("div");
        detailTitle.classList.add("detail-title");
        const detailContent = document.createElement("div");
        detailContent.classList.add("detail-content");
        if (i === 0){
            const bigTitle = document.createTextNode("PM");
            const subTag = document.createElement("sub");
            subTag.appendChild(document.createTextNode("2.5(μg/m"));
            const supTag = document.createElement("sup");
            supTag.textContent="3";
            subTag.appendChild(supTag);
            subTag.appendChild(document.createTextNode(")"));
            detailTitle.appendChild(bigTitle);
            detailTitle.appendChild(subTag);
        }

        if (i === 1){
            const bigTitle = document.createTextNode("PM");
            const subTag = document.createElement("sub");
            subTag.appendChild(document.createTextNode("10(μg/m"));
            const supTag = document.createElement("sup");
            supTag.textContent="3";
            subTag.appendChild(supTag);
            subTag.appendChild(document.createTextNode(")"));
            detailTitle.appendChild(bigTitle);
            detailTitle.appendChild(subTag);
        }

        if (i === 2){
            const bigTitle = document.createTextNode("O");
            const subTag = document.createElement("sub");
            subTag.textContent="3(ppb)";

            detailTitle.appendChild(bigTitle);
            detailTitle.appendChild(subTag);
        }

        if (i === 3){
            const bigTitle = document.createTextNode("CO");
            const subTag = document.createElement("sub");
            subTag.textContent="(ppm)";

            detailTitle.appendChild(bigTitle);
            detailTitle.appendChild(subTag);
        }

        if (i === 4){
            const bigTitle = document.createTextNode("SO");
            const subTag = document.createElement("sub");
            subTag.textContent="2(ppb)";

            detailTitle.appendChild(bigTitle);
            detailTitle.appendChild(subTag);
        }

        if (i === 5){
            const bigTitle = document.createTextNode("NO");
            const subTag = document.createElement("sub");
            subTag.textContent="2(ppb)";

            detailTitle.appendChild(bigTitle);
            detailTitle.appendChild(subTag);
        }

        if (i === 0 || i ===1){
            //數值
            const contentValueAvg = document.createElement("div");
            contentValueAvg.classList.add("content-value");
            if (i === 0){
                contentValueAvg.textContent=String(airQuality["pm2.5_avg"]);
            }else{
                contentValueAvg.textContent=String(airQuality["pm10_avg"]);
            }
            const contentValue = document.createElement("div");
            contentValue.classList.add("content-value");
            if (i === 0){
                contentValue.textContent=String(airQuality["pm2.5"]);
            }else{
                contentValue.textContent=String(airQuality["pm10"]);
            }
            
            // 文字
            const contentMeanAvg = document.createElement("div");
            contentMeanAvg.classList.add("content-mean");
            contentMeanAvg.textContent="移動平均";
            const contentMean = document.createElement("div");
            contentMean.classList.add("content-mean");
            contentMean.textContent= "小時濃度";
            detailContent.appendChild(contentValueAvg);
            detailContent.appendChild(contentValue);
            detailContent.appendChild(contentMeanAvg);
            detailContent.appendChild(contentMean);
        }

        if (i === 2 || i ===3){
            //數值
            const contentValueAvg = document.createElement("div");
            contentValueAvg.classList.add("content-value");
            if (i === 2){
                contentValueAvg.textContent=String(airQuality["o3_8hr"]);
            }else{
                contentValueAvg.textContent=String(airQuality["co_8hr"]);
            }
            const contentValue = document.createElement("div");
            contentValue.classList.add("content-value");
            if (i === 2){
                contentValue.textContent=String(airQuality["o3"]);
            }else{
                contentValue.textContent=String(airQuality["co"]);
            }

            // 文字
            const contentMeanAvg = document.createElement("div");
            contentMeanAvg.classList.add("content-mean");
            contentMeanAvg.textContent="8hr移動平均";
            const contentMean = document.createElement("div");
            contentMean.classList.add("content-mean");
            contentMean.textContent= "小時濃度";
            detailContent.appendChild(contentValueAvg);
            detailContent.appendChild(contentValue);
            detailContent.appendChild(contentMeanAvg);
            detailContent.appendChild(contentMean);
        }

        if (i === 4 || i === 5){
            detailContent.classList.add("only-value");
            //數值
            const contentValue = document.createElement("div");
            contentValue.classList.add("content-value");
            if (i === 4){
                contentValue.textContent=String(airQuality["so2"]);
            }else{
                contentValue.textContent=String(airQuality["no2"]);
            }

            // 文字
            const contentMean = document.createElement("div");
            contentMean.classList.add("content-mean");
            contentMean.textContent= "小時濃度";
            detailContent.appendChild(contentValue);
            detailContent.appendChild(contentMean);
        }

        detailContainer.appendChild(detailTitle);
        detailContainer.appendChild(detailContent);

        blockTwoDetail.appendChild(detailContainer);
        dataBlockTwo.appendChild(blockTwoDetail);
    };

    dataContainer.appendChild(dataBlockTwo);
}
