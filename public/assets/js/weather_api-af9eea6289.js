function WeatherApi(){const e=document.getElementById("weathermain"),t=document.getElementById("weatherform"),n=document.getElementById("searchloc");async function a(t){const n=await fetch((e=>`https://api.openweathermap.org/data/2.5/weather?q=${e}&appid=dc2b9624f8f4860d5ae5ddbc75cf4bc6`)(t),{origin:"cors"});!function(t){const n=(i=t.main.temp,Math.floor(i-273.15)),a=document.createElement("div");var i;a.classList.add("weather"),a.innerHTML=`\n    \n          <h2 class="m-0 p-0"><img src="https://openweathermap.org/img/wn/${t.weather[0].icon}@2x.png" class="img-fluid" /> ${n}°C <img src="https://openweathermap.org/img/wn/${t.weather[0].icon}@2x.png" class="img-fluid" /></h2>\n          <small>${t.weather[0].main}</small>\n          <small>${t.name}, ${t.sys.country}</small>\n\n          `,e.innerHTML="",e.appendChild(a)}(await n.json())}t.addEventListener("submit",(e=>{e.preventDefault();const t=n.value;t&&a(t)})),a("Mumbai")}WeatherApi();