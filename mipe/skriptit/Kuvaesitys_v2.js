/*	---------------------------------------------------------------------------------------
	MUUTOKSET
	---------------------------------------------------------------------------------------
31.12.09
	Kuten alla todettiin, ajastinobjekti on keinotekoinen. Versiossa dev_2
	ajastin oli jaettu kolmeksi funktioksi (Käynnistä, OdotaViel, Pysäytä),
	mikä myös oli vähän kömpelö. Tässä on tehty versio, jossa Ajastin 
	on yksi funktio ja sen toiminta määräytyy välitettävän parametrin 
	mukaan (start, wait, stop).
	
10.10.09
	Testataan objektiajattelun soveltamista skriptiin
	 - ensin muutetaan ajastin objektiksi. Tämä on sikäli keinotekoista, että
	   käytössä on vain yksi ajastin.
	 
8.10.09 testiversio
	Kuvat ja tekstit tulevat taulukkomuuttujassa Kuvat
	talletettuina objekteiksi.
	
1.10.09
	Firefoxissa Javascriptin ääkkösten kanssa oli ongelmia. Firefoxissa
	jotenkin hukattiin xsl-tiedoston ISO-8859-1 -määritys. Ratkaisuna oli se, että
	javascriptin importaavaan script-tägiin lisättiin attribuutti charset="ISO-8859-1". 
	
29.9.2009
	Selkeytetty ja yksinkertaistett funtiorakenteita. Tehty "kaksi-kolmitasoinen" 
	funktiohierarkia, jolla on pyritty ajatukseen "yksi asia yhteen kertaan" eli
	- tapahtumien käsittely
		- toimenpiteiden toteuttaminen
			- perustoimintojen ohjelmointi
	Lisäksi on esitettävien kuvien tiedostonimet tuodaan taulukkomuuttujassa,
	jolloin toisaalta kuvien määrä tulee automaattisesti muuttujan alkioiden
	määrästä ja toisaalta kuvien esitysjärjestystä on helppo muuttaa.

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
    var täysViive=7; // Kuvan esitysviive (s)
    var timer; // Ajstimen nimi
    var txtKeskeytä="Keskeytä";
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
	Timeout (täysViive) laukeaa
	--------------------------------------------------------*/
function TimeOut () {
			if (kuvaNro < viimKuva-1) {
				SiirrySeuraavaanKuvaan ();
				systeeminTila="Esitys";
			}
			else {
				NäytäViimeinenKuva ();
				systeeminTila="Lopussa";
			}
		}
/*	--------------------------------------------------------
	Painettu "aloita/keskeytä/jatka" -painiketta
	--------------------------------------------------------*/
function AloitaLopeta () {
	    switch (systeeminTila) {
        case "Esitys":
        	KeskeytäEsitys ();
        	systeeminTila="Tauko";
        	break;
        case "Tauko":
        	if (kuvaNro<viimKuva-1) {
        		SiirrySeuraavaanKuvaan ();
        		systeeminTila="Esitys";
        	}
        	else {
        		NäytäViimeinenKuva ();
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
	NäytäEnsimmäinenKuva ();
	systeeminTila="Tauko";
}
/*	-------------------------------------------------
	Painettu ">>" -painiketta  
	-------------------------------------------------*/
function ViimKuva () {
	NäytäViimeinenKuva ();
	systeeminTila = "Lopussa";
}
/*	------------------------------------------------
	Painettu "<" -painiketta 
	------------------------------------------------ */
function EdellinenKuva () {
	switch (systeeminTila) {
		case "Esitys":
			if (kuvaNro == 1) {
				NäytäEnsimmäinenKuva ();
				systeeminTila="Tauko";
			}
			if (kuvaNro > 1) {
				NäytäEdellinenKuva ();
				systeeminTila="Tauko";
			}
			break;
		case "Tauko":
			if (kuvaNro > 1) {
				NäytäEdellinenKuva ();
				systeeminTila="Tauko";
			}
			break;
		case "Lopussa":
			NäytäEdellinenKuva ();
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
				NäytäViimeinenKuva ();
				systeeminTila="Lopussa";
			}
			else {
				SiirrySeuraavaanKuvaan ();
				systeeminTila="Esitys";
			}
			break;
		case "Tauko":
			if (kuvaNro==viimKuva-1) {
				NäytäViimeinenKuva ();
				systeeminTila="Lopussa";
			}
			else {
				NäytäSeuraavaKuva ();
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
		NäytäKuva (kuvaNro);
		MuutaNäppäin (txtKeskeytä);
		Ajastin ("start");
}
function SiirrySeuraavaanKuvaan () {
		NäytäSeuraavaKuva ();
		MuutaNäppäin (txtKeskeytä);
		Ajastin ("start");
}
function KeskeytäEsitys () {
		Ajastin ("stop");
	    MuutaNäppäin (txtJatka);
}
function NäytäEnsimmäinenKuva () {
		Ajastin ("stop");
		kuvaNro = 1;
		NäytäKuva (kuvaNro);
		MuutaNäppäin (txtJatka);
}
function NäytäSeuraavaKuva () {
		kuvaNro=kuvaNro+1;
		NäytäKuva (kuvaNro);
}
function NäytäEdellinenKuva () {
		Ajastin ("stop");
		kuvaNro=kuvaNro-1;
		NäytäKuva (kuvaNro);
		MuutaNäppäin (txtJatka);
}
function NäytäViimeinenKuva () {
		Ajastin ("stop");
		kuvaNro=viimKuva;
		NäytäKuva (kuvaNro);
		MuutaNäppäin (txtAloitaAlusta);
}
/*	------------------------------------------------------------
	                   PERUSTOIMINNOT
	------------------------------------------------------------ */
function NäytäKuva (numero) {
		kuvaLaskuri=document.getElementById("kuvaLaskurinPaikka");
		kuvaNyt=document.getElementById("kuvanPaikka");
		kuvaTeksti=document.getElementById("tekstinPaikka");
		kuvaLaskuri.innerHTML=numero;
		kuvaNyt.src=Kuvat[numero].kuva;
		kuvaTeksti.innerHTML=Kuvat[numero].teksti;
}
function NäytäPalkki (palkinPituus) {
		var palkki="&nbsp;";
		while (palkinPituus > 0)
		{
			palkki = palkki + ".";
			palkinPituus = palkinPituus-1;
		}
		palkkiNyt=document.getElementById("palkinPaikka");
		palkkiNyt.innerHTML=palkki;
}
function MuutaNäppäin (teksti) {
		nappi=document.getElementById("start");
		nappi.value=teksti;
}

function Ajastin (event) {
		switch (event)
		{
			case "start":
				clearTimeout (timer);
				delay = täysViive;
				NäytäPalkki (delay);
				timer = setTimeout ('Ajastin ("wait")',1000);
				break;
			case "wait":
				delay = delay-1;
				NäytäPalkki (delay);
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
				NäytäPalkki (delay);
		}
}
