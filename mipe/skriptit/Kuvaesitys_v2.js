/*	---------------------------------------------------------------------------------------
	MUUTOKSET
	---------------------------------------------------------------------------------------
31.12.09
	Kuten alla todettiin, ajastinobjekti on keinotekoinen. Versiossa dev_2
	ajastin oli jaettu kolmeksi funktioksi (K‰ynnist‰, OdotaViel, Pys‰yt‰),
	mik‰ myˆs oli v‰h‰n kˆmpelˆ. T‰ss‰ on tehty versio, jossa Ajastin 
	on yksi funktio ja sen toiminta m‰‰r‰ytyy v‰litett‰v‰n parametrin 
	mukaan (start, wait, stop).
	
10.10.09
	Testataan objektiajattelun soveltamista skriptiin
	 - ensin muutetaan ajastin objektiksi. T‰m‰ on sik‰li keinotekoista, ett‰
	   k‰ytˆss‰ on vain yksi ajastin.
	 
8.10.09 testiversio
	Kuvat ja tekstit tulevat taulukkomuuttujassa Kuvat
	talletettuina objekteiksi.
	
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
    var t‰ysViive=7; // Kuvan esitysviive (s)
    var timer; // Ajstimen nimi
    var txtKeskeyt‰="Keskeyt‰";
    var txtJatka="    Jatka    ";
    var txtAloitaAlusta="Aloita alusta";

/*	-------------------------------------------------------------
	Globaalit muuttujat
	------------------------------------------------------------- */
	var delay;		// Viivelaskuri
    var kuvaNro; // Kuvalaskuri
    var viimKuva; // Viimeisen kuvan numero
    var kuvaViive; // Kertoo jaljella olevan viiveen (voi poistaa)
    var systeeminTila="Esitys";

/*	--------------------------------------------------------
				TAPAHTUMAKaSITTELIJaT
	-------------------------------------------------------- */
/*	--------------------------------------------------------
	Esityksen aloitus
	--------------------------------------------------------*/
function Kuvaesitys() {
      	viimKuva=Kuvat.length-1;
      	viimKuvaNro=document.getElementById("viimNroPaikka");
      	viimKuvaNro.innerHTML = viimKuva;
      	AloitaAlusta ();
	}       
/*	--------------------------------------------------------
	Timeout (t‰ysViive) laukeaa
	--------------------------------------------------------*/
function TimeOut () {
			if (kuvaNro < viimKuva-1) {
				SiirrySeuraavaanKuvaan ();
				systeeminTila="Esitys";
			}
			else {
				N‰yt‰ViimeinenKuva ();
				systeeminTila="Lopussa";
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
		MuutaN‰pp‰in (txtKeskeyt‰);
		Ajastin ("start");
}
function SiirrySeuraavaanKuvaan () {
		N‰yt‰SeuraavaKuva ();
		MuutaN‰pp‰in (txtKeskeyt‰);
		Ajastin ("start");
}
function Keskeyt‰Esitys () {
		Ajastin ("stop");
	    MuutaN‰pp‰in (txtJatka);
}
function N‰yt‰Ensimm‰inenKuva () {
		Ajastin ("stop");
		kuvaNro = 1;
		N‰yt‰Kuva (kuvaNro);
		MuutaN‰pp‰in (txtJatka);
}
function N‰yt‰SeuraavaKuva () {
		kuvaNro=kuvaNro+1;
		N‰yt‰Kuva (kuvaNro);
}
function N‰yt‰EdellinenKuva () {
		Ajastin ("stop");
		kuvaNro=kuvaNro-1;
		N‰yt‰Kuva (kuvaNro);
		MuutaN‰pp‰in (txtJatka);
}
function N‰yt‰ViimeinenKuva () {
		Ajastin ("stop");
		kuvaNro=viimKuva;
		N‰yt‰Kuva (kuvaNro);
		MuutaN‰pp‰in (txtAloitaAlusta);
}
/*	------------------------------------------------------------
	                   PERUSTOIMINNOT
	------------------------------------------------------------ */
function N‰yt‰Kuva (numero) {
		kuvaLaskuri=document.getElementById("kuvaLaskurinPaikka");
		kuvaNyt=document.getElementById("kuvanPaikka");
		kuvaTeksti=document.getElementById("tekstinPaikka");
		kuvaLaskuri.innerHTML=numero;
		kuvaNyt.src=Kuvat[numero].kuva;
		kuvaTeksti.innerHTML=Kuvat[numero].teksti;
}
function N‰yt‰Palkki (palkinPituus) {
		var palkki="&nbsp;";
		while (palkinPituus > 0)
		{
			palkki = palkki + ".";
			palkinPituus = palkinPituus-1;
		}
		palkkiNyt=document.getElementById("palkinPaikka");
		palkkiNyt.innerHTML=palkki;
}
function MuutaN‰pp‰in (teksti) {
		nappi=document.getElementById("start");
		nappi.value=teksti;
}

function Ajastin (event) {
		switch (event)
		{
			case "start":
				clearTimeout (timer);
				delay = t‰ysViive;
				N‰yt‰Palkki (delay);
				timer = setTimeout ('Ajastin ("wait")',1000);
				break;
			case "wait":
				delay = delay-1;
				N‰yt‰Palkki (delay);
				if (delay>0)
				{
					timer=setTimeout ('Ajastin ("wait")',1000);
				}
				else
				{
					TimeOut ();
				}
				break;
			case "stop":
				clearTimeout (timer);
				delay = 0;
				N‰yt‰Palkki (delay);
		}
}
