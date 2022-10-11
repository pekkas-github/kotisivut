/*	---------------------------------------------------------------------------------------
	MUUTOKSET
	---------------------------------------------------------------------------------------
1.10.09
	Firefoxissa Javascriptin ‰‰kkˆsten kanssa oli ongelmia. Firefoxissa
	jotenkin hukattiin xsl-tiedoston ISO-8859-1 -m‰‰ritys. Ratkaisuna oli se, ett‰
	javascriptin importaavaan script-t‰giin lis‰ttiin attribuutti charset="ISO-8859-1". 
	
29.9.2009
	Selkeytetty ja yksinkertaistett funtiorakenteita. Tehty "kaksi-kolmitasoinen" 
	funktiohierarkia, jolla on pyritty ajatukseen "yksi asia yhteen kertaan" eli
	- tapahtumien k‰sittely
		- toimenpiteiden toteuttaminen
			- perustoimintojen ohjelmointi
	Lis‰ksi on esitett‰vien kuvien tiedostonimet tuodaan taulukkomuuttujassa,
	jolloin toisaalta kuvien m‰‰r‰ tulee automaattisesti muuttujan alkioiden
	m‰‰r‰st‰ ja toisaalta kuvien esitysj‰rjestyst‰ on helppo muuttaa.

22.9.09 testausversio

	Tama javascript liittyy xsl-muunnokseen, joka muodostaa varsinsien
	html-sivun seka xml-tiedostoon, jossa on lista naytettavista kuvista.
	
	Tama xml -> xsl -> javascript yhdistelma toimii Safarissa ja Explorerissa,
	mutta jostakin syysta EI FIREFOXISSA. Nayttaa silta, etta javascript tyssaa
	kohtaan, jossa sivulla olevaan elementtiin pitaisi kirjoittaa sisalto

	Naytettavien kuvien tiedostonimet tuodaan taulukkomuuttujassa Kuvat,
	jonka arvot taytetaan kutsuvassa xsl-sivussa.
	
	Sivu muodostetaan xsl-muunnoksessa, joten sivunmuodostus on
	voitu poistaa javascriptista
	-----------------------------------------------------------------------------------------*/
	
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
    var kuvaViive; // Kertoo jaljella olevan viiveen
    var systeeminTila="Esitys";

/* Esityksen aloitus */

function Kuvaesitys() {
      	viimKuva=Kuvat.length;
      	viimKuvaNro=document.getElementById("viimNroPaikka");
      	viimKuvaNro.innerHTML = viimKuva;
      	AloitaAlusta ();
	}       

/*	--------------------------------------------------------
				TAPAHTUMAKaSITTELIJaT
	-------------------------------------------------------- */
	
/*	--------------------------------------------------------
	Sekunnin timeout laukeaa
	--------------------------------------------------------*/
function TimeOut () {
		if (kuvaViive > 0) {
			odotaViel‰ ();
			systeeminTila="Esitys";
		}
		else {N‰yt‰ViimeinenKuva
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
function odotaViel‰ () {
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
		nappi=document.getElementById("start");
		nappi.value=teksti;
}
