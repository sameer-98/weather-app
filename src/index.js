import { compareAsc, getDay } from "date-fns";

const input = document.querySelector('#query');
const form = document.querySelector('form');
const output = document.querySelector('#temp')
const key = '93ff4a8ba893ceacc126529890c68f5d';
const daysList = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
form.addEventListener('submit', async function(e)
{
    e.preventDefault();
    const data  = await getData();
    displayData(data);
});

async function getData(){
    const response1 = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${input.value}&&appid=${key}`,{mode: 'cors'});
    const location = await response1.json();
    const lat = location[0].lat;
    const lon = location[0].lon;
    const response2 = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric`,{mode:'cors'});
    const weather = await response2.json();
    return weather
}
function displayData(data){
    console.log('hello');
    const list = data.list;
    const obj = {};
    list.forEach(item => {
        const dayNum = getDay(new Date (item.dt_txt.split(' ')[0]));
        const day = daysList[dayNum];
        if (obj.hasOwnProperty(day)) return;
        obj[day] = item.main.temp;
    });
    console.log(obj);

}