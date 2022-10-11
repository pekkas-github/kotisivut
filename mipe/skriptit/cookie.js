/* Skripti asettaa cookien arvoksi vierailup‰iv‰n ja laskee sek‰ n‰ytt‰‰, kuinka monta
   p‰iv‰‰ on kulunut t‰m‰n p‰iv‰n ja vierailup‰iv‰n v‰lill‰ */
   
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
	 		document.getElementById("cookie").innerHTML="Viimeksi k‰vit " + daysBetween + " p‰iv‰‰ sitten!";
	 	}
	 }
	 setCookie();
}

function setCookie() {
	expirationDay.setMonth(expirationDay.getMonth()+6);
	document.cookie =  "lastVisit="+toDay.getTime();
}
