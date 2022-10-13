/* Skripti asettaa cookien arvoksi vierailupäivän ja laskee sekä näyttää, kuinka monta
   päivää on kulunut tämän päivän ja vierailupäivän välillä */
   
window.onload=checkCookie;

var toDay=new Date()
var expirationDay=new Date();
var lastVisit;

function checkCookie() {
	 if (document.cookie.length>0) {
	 	var c_start=10;
	 	var c_end=document.cookie.indexOf(";");
	 	lastVisit=document.cookie.substring(c_start,c_end);
	 	daysBetween= Math.floor((toDay.getTime()-lastVisit)/(1000*60*60*24));
	 	if (daysBetween > 0) {
	 		document.getElementById("cookie").innerHTML="Viimeksi kävit " + daysBetween + " päivää sitten!";
	 	}
	 }
	 setCookie();
}

function setCookie() {
	expirationDay.setMonth(expirationDay.getMonth()+6);
	document.cookie =  "lastVisit="+toDay.getTime();
}
