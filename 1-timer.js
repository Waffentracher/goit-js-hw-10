import"./assets/modulepreload-polyfill-3cfb730f.js";import{f as y,i as s}from"./assets/vendor-77e16229.js";const a=document.querySelector("#datetime-picker"),n=document.querySelector("#start-timer"),S=document.querySelector("[data-days]"),f=document.querySelector("[data-hours]"),g=document.querySelector("[data-minutes]"),T=document.querySelector("[data-seconds]");let c;n.disabled=!0;const p=e=>{const u=Math.floor(e/864e5),l=Math.floor(e%864e5/36e5),m=Math.floor(e%864e5%36e5/6e4),h=Math.floor(e%864e5%36e5%6e4/1e3);return{days:u,hours:l,minutes:m,seconds:h}},i=e=>{const{days:t,hours:o,minutes:r,seconds:d}=p(e);S.textContent=t.toString().padStart(2,"0"),f.textContent=o.toString().padStart(2,"0"),g.textContent=r.toString().padStart(2,"0"),T.textContent=d.toString().padStart(2,"0")},v=()=>{const e=new Date(a.value).getTime();if(isNaN(e)){s.error({title:"Error",message:"Please choose a valid date and time."});return}n.disabled=!0,c=setInterval(()=>{const t=new Date().getTime(),o=e-t;o<0?(clearInterval(c),i(0),s.success({title:"Countdown Finished",message:"The countdown has reached its end."}),n.disabled=!1):i(o)},1e3)},w=()=>{const e=new Date(a.value).getTime(),t=new Date().getTime();e<=t?(n.disabled=!0,s.error({title:"Error",message:"Please choose a date and time in the future."})):n.disabled=!1};a.addEventListener("input",w);n.addEventListener("click",v);y(a,{enableTime:!0,dateFormat:"Y-m-d H:i",minDate:"now"});
//# sourceMappingURL=1-timer.js.map
