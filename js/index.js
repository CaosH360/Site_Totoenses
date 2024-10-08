const btn_open_menu = document.getElementById("btn_open_menu");
const list_menu = document.getElementById("list_menu");



var active = false;

btn_open_menu.addEventListener("click",()=>{
    if(active === false){
        list_menu.style.display="flex";
        active=true;
    }else{
        list_menu.style.display="none";
        active=false;
    }
});

