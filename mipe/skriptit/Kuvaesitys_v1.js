/*	---------------------------------------------------------------------------------------
	MUUTOKSET
	---------------------------------------------------------------------------------------
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
    var täysViive=7; // Palkin maksimipituus (=viiveen pituus)
    var ajastin;  // Ajastimen nimi
    var txtKeskeytä="Keskeytä";
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
			odotaVielä ();
			systeeminTila="Esitys";
		}
		else {NäytäViimeinenKuva
			if (kuvaNro < viimKuva-1) {
				SiirrySeuraavaanKuvaan ();
				systeeminTila="Esitys";
			}
			else {
				NäytäViimeinenKuva ();
				systeeminTila="Lopussa";
			}
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
		KäynnistäAjastin ();
		MuutaNäppäin (txtKeskeytä);
		systeeminTila="Esitys";
}
function SiirrySeuraavaanKuvaan () {
		NäytäSeuraavaKuva ();
		MuutaNäppäin (txtKeskeytä);
		KäynnistäAjastin ();
}
function KeskeytäEsitys () {
       	PysäytäAjastin ();
	    MuutaNäppäin (txtJatka);
}
function NäytäEnsimmäinenKuva () {
		PysäytäAjastin ();
		kuvaNro = 1;
		NäytäKuva (kuvaNro);
		MuutaNäppäin (txtJatka);
}
function NäytäSeuraavaKuva () {
		kuvaNro=kuvaNro+1;
		NäytäKuva (kuvaNro);
}
function NäytäEdellinenKuva () {
		PysäytäAjastin ();
		kuvaNro=kuvaNro-1;
		NäytäKuva (kuvaNro);
		MuutaNäppäin (txtJatka)
}
function NäytäViimeinenKuva () {
		PysäytäAjastin ();
		kuvaNro=viimKuva;
		NäytäKuva (kuvaNro);
		MuutaNäppäin (txtAloitaAlusta);
}
/*	------------------------------------------------------------
	                   PERUSTOIMINNOT
	------------------------------------------------------------ */
function odotaVielä () {
		kuvaViive=kuvaViive-1;
		NäytäPalkki (kuvaViive);
		ajastin=setTimeout ('TimeOut ()', 1000);
}		
function NäytäKuva (numero) {
		kuvaLaskuri=document.getElementById("kuvaLaskurinPaikka");
		kuvaNyt=document.getElementById("kuvanPaikka");
		kuvaLaskuri.innerHTML=numero;
		kuvaNyt.src=Kuvat[numero-1];
}
function KäynnistäAjastin () {
		clearTimeout (ajastin);
		ajastin=setTimeout ('TimeOut ()', 1000);
		kuvaViive=täysViive;
		NäytäPalkki (kuvaViive);
}
function PysäytäAjastin () {
		clearTimeout(ajastin);
		kuvaViive=0;
		NäytäPalkki (kuvaViive);
}
function NäytäPalkki (palkinPituus) {
		palkki="&nbsp;";
		while (palkinPituus > 0) {
			palkki = palkki + ". ";
			palkinPituus = palkinPituus-1;
		}
		palkkiNyt=document.getElementById("palkinPaikka");
		palkkiNyt.innerHTML=palkki;
}
function MuutaNäppäin (teksti) {
		nappi=document.getElementById("start");
		nappi.value=teksti;
}
