/*	-----------------------------------------------------------
	  MUUTOKSET
	-----------------------------------------------------------
29.9.2009
	Selkeytetty ja yksinkertaistett funtiorakenteita. Tehty "kaksi-kolmitasoinen" 
	funktiohierarkia, jolla on pyritty ajatukseen "yksi asia yhteen kertaan" eli
	- tapahtumien k‰sittely
		- toimenpiteiden toteuttaminen
			- perustoimintojen ohjelmointi
	Lis‰ksi on esitett‰vien kuvien tiedostonimet tuodaan taulukkomuuttujassa,
	jolloin toisaalta kuvien m‰‰r‰ tulee automaattisesti muuttujan alkioiden
	m‰‰r‰st‰ ja toisaalta kuvien esitysj‰rjestyst‰ on helppo muuttaa.
	
25.9.2009
	Poistettu tila "Pys‰ytys" ja muutettu tilasiirtym‰n kohteeksi
	tila "Tauko"
	Poistettu sekunnin viive, kun taukotilasta jatketaan (kutsutaan
	funktiota KuvanEsitys() eik‰ AloitaEsitys()
	Korvattu teksti K‰ynnist‰ yhten‰isemmin tekstill‰ Jatka

14.4.2009
	Poistettu tarpeeton lomakem‰‰ritys
	
24.9.2008
	Muutettu kuvalaskurina k‰ytetyt lomakekent‰t <span> elementeiksi,
	joiden sis‰ltˆ‰ p‰ivitet‰‰n kuvanumeroiden muuttuessa.
	LIs‰tty napit "alkuun" (<<) ja "loppuun" (>>). Kuva eteen / taakse 
	n‰pp‰imet muutettu (> ja <)
	--------------------------------------------------------------*/
	
/*	-------------------------------------------------------------
	Globaalit parametrit
	------------------------------------------------------------- */
    var t‰ysViive=7; // Palkin maksimipituus (=viiveen pituus)
    var ajastin;  // Ajastimen nimi
    var txtKeskeyt‰="Keskeyt‰";
    var txtJatka="    Jatka    ";
    var txtAloitaAlusta="Aloita alusta";
    
/*	-------------------------------------------------------------
	Globaalit muuttujat
	------------------------------------------------------------- */
    var kuvaNro; // Kuvalaskuri
    var viimKuva; // Viimeisen kuvan numero
    var kuvaViive; // Kertoo j‰ljell‰ olevan viiveen
    var systeeminTila="Esitys";

/*	-------------------------------------------------------------
	HTML-sivun muodostaminen
	-------------------------------------------------------------  */
function Kuvaesitys(otsikko) {
	with (document) {
		write("<table><tr><td class='top'>");
		write("<h1>"+otsikko+"</h1>");
     	write('<br />');
     	write('<span id="kuvaLaskurinPaikka">1</span> / <span id="viimNroPaikka"></span>');
      	write("</td></tr><tr><td class='middle'>");
      	write('<img border="1" id="kuvanPaikka" name="kuvanPaikka"  />');
      	write("</td></tr><tr><td class='bottom'>");
      	write("<input type='button' id='begin' value=' << ' onclick='EnsimKuva ()'>");
      	write("<input type='button' id='back' value=' < ' onclick='EdellinenKuva ()'>");
      	write("<input type='button' id='start' value='Keskeyt‰' onclick='AloitaLopeta ()'>");
      	write("<input type='button' id='forward' value=' > ' onclick='SeuraavaKuva ()'>");
      	write("<input type='button' id='end' value=' >> ' onclick='ViimKuva ()'>");
     	write('<div style="color:#777777" id="palkinPaikka">&nbsp;</div>');
      	write("</td></tr></table>");
		}
		
/* Esityksen aloitus */
      	viimKuva=Kuvat.length;
      	viimKuvaNro=document.getElementById("viimNroPaikka");
      	viimKuvaNro.innerHTML = viimKuva;
      	AloitaAlusta ();
	}       
/*	--------------------------------------------------------
				TAPAHTUMAKƒSITTELIJƒT
	-------------------------------------------------------- */
	
/*	--------------------------------------------------------
	Sekunnin timeout laukeaa
	--------------------------------------------------------*/
function TimeOut () {
		if (kuvaViive > 0) {
			OdotaViel‰ ();
			systeeminTila="Esitys";
		}
		else {
			if (kuvaNro < viimKuva-1) {
				SiirrySeuraavaanKuvaan ();
				systeeminTila="Esitys";
			}
			else {
				N‰yt‰ViimeinenKuva ();
				systeeminTila="Lopussa";
			}
		}
}
/*	--------------------------------------------------------
	Painettu "aloita/keskeyt‰/jatka" -painiketta
	--------------------------------------------------------*/
function AloitaLopeta () {
	    switch (systeeminTila) {
        case "Esitys":
        	Keskeyt‰Esitys ();
        	systeeminTila="Tauko";
        	break;
        case "Tauko":
        	if (kuvaNro<viimKuva-1) {
        		SiirrySeuraavaanKuvaan ();
        		systeeminTila="Esitys";
        	}
        	else {
        		N‰yt‰ViimeinenKuva ();
        		systeeminTila="Lopussa";
        	}
        	break;
        case "Lopussa":
			AloitaAlusta ();
			systeeminTila="Esitys";
        }
}
/*	-------------------------------------------------
	Painettu "<<" -painiketta  
	-------------------------------------------------*/
function EnsimKuva () {
	N‰yt‰Ensimm‰inenKuva ();
	systeeminTila="Tauko";
}
/*	-------------------------------------------------
	Painettu ">>" -painiketta  
	-------------------------------------------------*/
function ViimKuva () {
	N‰yt‰ViimeinenKuva ();
	systeeminTila = "Lopussa";
}
/*	------------------------------------------------
	Painettu "<" -painiketta 
	------------------------------------------------ */
function EdellinenKuva () {
	switch (systeeminTila) {
		case "Esitys":
			if (kuvaNro == 1) {
				N‰yt‰Ensimm‰inenKuva ();
				systeeminTila="Tauko";
			}
			if (kuvaNro > 1) {
				N‰yt‰EdellinenKuva ();
				systeeminTila="Tauko";
			}
			break;
		case "Tauko":
			if (kuvaNro > 1) {
				N‰yt‰EdellinenKuva ();
				systeeminTila="Tauko";
			}
			break;
		case "Lopussa":
			N‰yt‰EdellinenKuva ();
			systeeminTila="Tauko";
			break;
	}			
}
/* --------------------------------------------
	Painettu ">" -painiketta 
	-------------------------------------------- */
function SeuraavaKuva () {
	switch (systeeminTila) {
		case "Esitys":
			if (kuvaNro==viimKuva-1) {
				N‰yt‰ViimeinenKuva ();
				systeeminTila="Lopussa";
			}
			else {
				SiirrySeuraavaanKuvaan ();
				systeeminTila="Esitys";
			}
			break;
		case "Tauko":
			if (kuvaNro==viimKuva-1) {
				N‰yt‰ViimeinenKuva ();
				systeeminTila="Lopussa";
			}
			else {
				N‰yt‰SeuraavaKuva ();
				systeeminTila="Tauko"
			}
			break;
	}
}
/*	------------------------------------------------------------
	                       TOIMENPITEET
	------------------------------------------------------------ */
function AloitaAlusta () {
		kuvaNro=1;
		N‰yt‰Kuva (kuvaNro);
		K‰ynnist‰Ajastin ();
		MuutaN‰pp‰in (txtKeskeyt‰);
		systeeminTila="Esitys";
}
function SiirrySeuraavaanKuvaan () {
		N‰yt‰SeuraavaKuva ();
		MuutaN‰pp‰in (txtKeskeyt‰);
		K‰ynnist‰Ajastin ();
}
function Keskeyt‰Esitys () {
       	Pys‰yt‰Ajastin ();
	    MuutaN‰pp‰in (txtJatka);
}
function N‰yt‰Ensimm‰inenKuva () {
		Pys‰yt‰Ajastin ();
		kuvaNro = 1;
		N‰yt‰Kuva (kuvaNro);
		MuutaN‰pp‰in (txtJatka);
}
function N‰yt‰SeuraavaKuva () {
		kuvaNro=kuvaNro+1;
		N‰yt‰Kuva (kuvaNro);
}
function N‰yt‰EdellinenKuva () {
		Pys‰yt‰Ajastin ();
		kuvaNro=kuvaNro-1;
		N‰yt‰Kuva (kuvaNro);
		MuutaN‰pp‰in (txtJatka)
}
function N‰yt‰ViimeinenKuva () {
		Pys‰yt‰Ajastin ();
		kuvaNro=viimKuva;
		N‰yt‰Kuva (kuvaNro);
		MuutaN‰pp‰in (txtAloitaAlusta);
}
/*	------------------------------------------------------------
	                   PERUSTOIMINNOT
	------------------------------------------------------------ */
function OdotaViel‰ () {
		kuvaViive=kuvaViive-1;
		N‰yt‰Palkki (kuvaViive);
		ajastin=setTimeout ('TimeOut ()', 1000);
}		
function N‰yt‰Kuva (numero) {
		kuvaLaskuri=document.getElementById("kuvaLaskurinPaikka");
		kuvaNyt=document.getElementById("kuvanPaikka");
		kuvaLaskuri.innerHTML=numero;
		kuvaNyt.src=Kuvat[numero-1];
}
function K‰ynnist‰Ajastin () {
		clearTimeout (ajastin);
		ajastin=setTimeout ('TimeOut ()', 1000);
		kuvaViive=t‰ysViive;
		N‰yt‰Palkki (kuvaViive);
}
function Pys‰yt‰Ajastin () {
		clearTimeout(ajastin);
		kuvaViive=0;
		N‰yt‰Palkki (kuvaViive);
}
function N‰yt‰Palkki (palkinPituus) {
		palkki="&nbsp;";
		while (palkinPituus > 0) {
			palkki = palkki + ". ";
			palkinPituus = palkinPituus-1;
		}
		palkkiNyt=document.getElementById("palkinPaikka");
		palkkiNyt.innerHTML=palkki;
}
function MuutaN‰pp‰in (teksti) {
		start.value=teksti;
}
