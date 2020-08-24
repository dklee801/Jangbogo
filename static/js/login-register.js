var x = document.getElementById("login");
var y = document.getElementById("register");
var z = document.getElementById("btn");
login_font = document.getElementById("loginfont")
register_font = document.getElementById("registerfont")

function login(){
    x.style.left = "50px";
    y.style.left = "450px";
    z.style.left = "0";
    login_font.style.color = "white";
    register_font.style.color = "black";
}

function register(){
    x.style.left = "-400px";
    y.style.left = "50px";
    z.style.left = "110px";
    login_font.style.color = "black";
    register_font.style.color = "white";
}