/*	-----------------------------------------------------------
	  MUUTOKSET
	-----------------------------------------------------------
26.9.2009
	Selkeytetty ja yksinkertaistett funtiorakenteita. Tehty "kaksitasoinen" 
	funktiohierarkia, jolla on pyritty ajatukseen "yksi asia yhteen kertaan".
	
25.9.2009
	Poistettu tila "Pysäytys" ja muutettu tilasiirtymän kohteeksi
	tila "Tauko"
	Poistettu sekunnin viive, kun taukotilasta jatketaan (kutsutaan
	funktiota KuvanEsitys() eikä AloitaEsitys()
	Korvattu teksti Käynnistä yhtenäisemmin tekstillä Jatka

14.4.2009
	Poistettu tarpeeton lomakemääritys
	
24.9.2008
	Muutettu kuvalaskurina käytetyt lomakekentät <span> elementeiksi,
	joiden sisältöä päivitetään kuvanumeroiden muuttuessa.
	LIsätty napit "alkuun" (<<) ja "loppuun" (>>). Kuva eteen / taakse 
	näppäimet muutettu (> ja <)
	--------------------------------------------------------------*/
	
/*	-------------------------------------------------------------
	Globaalit parametrit
	------------------------------------------------------------- */
    var taysViive=7; // Palkin maksimipituus (=viiveen pituus)
    var ajastin;  // Ajastimen nimi
    
/*	-------------------------------------------------------------
	Globaalit muuttujat
	------------------------------------------------------------- */
    var kuvaNro; // Kuvalaskurin alkuarvo
    var viimKuva; // Viimeisen kuvan numero funktiokutsusta
    var kuvaViive; // Kertoo jäljellä olevan viiveen
    var systeeminTila="Esitys";

/*	-------------------------------------------------------------
	HTML-sivun muodostaminen
	-------------------------------------------------------------  */
function Kuvaesitys(otsikko,maks) {
	with (document) {
		write("<table><tr><td class='top'>");
		write("<h1>"+otsikko+"</h1>");
     	write('<br />');
     	write('<span id="kuvaLaskurinPaikka">1</span> / <span id="viimNroPaikka"></span>');
      	write("</td></tr><tr><td class='middle'>");
      	write('<img border="1" id="photo" name="photo"  />');
      	write("</td></tr><tr><td class='bottom'>");
      	write("<input type='button' id='begin' value=' << ' onclick='EnsimKuva ()'>");
      	write("<input type='button' id='back' value=' < ' onclick='EdellinenKuva ()'>");
      	write("<input type='button' id='start' value='Keskeytä' onclick='AloitaLopeta ()'>");
      	write("<input type='button' id='forward' value=' > ' onclick='SeuraavaKuva ()'>");
      	write("<input type='button' id='end' value=' >> ' onclick='ViimKuva ()'>");
     	write('<div style="color:#777777" id="palkinPaikka">&nbsp;</div>');
      	write("</td></tr></table>");
		}
		
/* Esityksen aloitus */
      	viimKuva=maks;
      	viimNroPaikka.innerHTML = viimKuva;
      	AloitaAlusta ();
	}       
/*	--------------------------------------------------------
				TAPAHTUMAKÄSITTELIJÄT
	-------------------------------------------------------- */
	
/*	--------------------------------------------------------
	Sekunnin timeout laukeaa
	--------------------------------------------------------*/
function TimeOut () {
		if (kuvaViive > 0) {
			OdotaVielä ();
			systeeminTila="Esitys";
		}
		else {
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
		systeeminTila="Esitys";
}
function SiirrySeuraavaanKuvaan () {
		NäytäSeuraavaKuva ();
		MuutaNäppäin ("Keskeytä");
		KäynnistäAjastin ();
}
function KeskeytäEsitys () {
       	PysäytäAjastin ();
	    MuutaNäppäin ("Jatka");
}
function NäytäEnsimmäinenKuva () {
		PysäytäAjastin ();
		kuvaNro = 1;
		NaytaKuva (kuvaNro);
		MuutaNappain ("Jatka");
}
function NäytäSeuraavaKuva () {
		kuvaNro=kuvaNro+1;
		NaytaKuva (kuvaNro);
}
function NäytäViimeinenKuva () {
		PysäytäAjastin ();
		kuvaNro=viimKuva;
		NaytaKuva (kuvaNro);
		MuutaNäppäin ("Aloita alusta");
}
/*	------------------------------------------------------------
	                   PERUSTOIMINNOT
	------------------------------------------------------------ */
function OdotaVielä () {
		kuvaViive=kuvaViive-1;
		NäytäPalkki (kuvaViive);
		ajastin=setTimeout ('TimeOut ()', 1000);
}		
function NäytäKuva (numero) {
		kuvaLaskurinPaikka.innerHTML=numero;
		photo.src="kuva_" + numero + ".jpg";
}
function KäynnistäAjastin () {
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
		palkinPaikka.innerHTML=palkki;
}
function MuutaNäppäin (teksti) {
		start.value=teksti;
}
