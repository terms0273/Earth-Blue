import Weather from "./weather";
import Map from "./map";

import Graph from "./graph";
import OneDayWeatherForecast from "./oneDayWeatherForecast";

$(function() {
  let weather = new Weather();
  let map = new Map();
  let graph = new Graph();
  let oneDay = new OneDayWeatherForecast();

  //検索ボタン押したときに呼ぶ
  $("#search-city").click(updateWeather);

  $("#tab-weather-forecast").click(()=>{
    if($("#tab-weather-forecast").parent().attr("aria-expanded") === "false"){
      d3.select("svg").remove();
      oneDay.print();
    }
  });
  //チェックボックスにチェック
  $(":checkbox").click(()=>{
    graph.init(weather.city);
  });

  //エンターボタンで検索動作
  $("#input-city").keydown((e) =>{
    if(e.keyCode == 13){
      updateWeather();
    }
  });
  weather.send(weather.city);
  setTimeout(()=>{oneDay.init(weather);}, 200);

  //検索したときの動作
  function updateWeather(){
    let newCity = $("#input-city").val();
    weather.send(newCity,map);
    setTimeout(function(){graph.init(weather.city)}, 500);
  };

  $("#input-city").keydown((e) =>{
    if(e.keyCode == 13){
      updateWeather();
    }
  });

  function updateWeather(){
    let newCity = $("#input-city").val();
    weather.send(newCity,map);
    setTimeout(()=>{oneDay.init(weather);}, 500);
  }
});
