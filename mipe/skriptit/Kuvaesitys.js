/*	-----------------------------------------------------------
	  MUUTOKSET
	-----------------------------------------------------------
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
    var taysViive=7; // Palkin maksimipituus (=viiveen pituus)
    var ajastin;  // Ajastimen nimi
    
/*	-------------------------------------------------------------
	Globaalit muuttujat
	------------------------------------------------------------- */
    var kuvaNro=1; // Kuvalaskurin alkuarvo
    var viimKuva; // Viimeisen kuvan numero funktiokutsusta
    var kuvaViive = taysViive; // Kertoo j‰ljell‰ olevan viiveen
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
      	write("<input type='button' id='start' value='Keskeyt‰' onclick='AloitaLopeta ()'>");
      	write("<input type='button' id='forward' value=' > ' onclick='SeuraavaKuva ()'>");
      	write("<input type='button' id='end' value=' >> ' onclick='ViimKuva ()'>");
     	write('<div style="color:#777777" id="palkinPaikka">&nbsp;</div>');
      	write("</td></tr></table>");
		}
		
/* Esityksen aloitus */
      	viimKuva=maks;
      	viimNroPaikka.innerHTML = viimKuva;
      	NaytaKuva (kuvaNro);
      	NaytaPalkki (kuvaViive);
      	AloitaEsitys ();
	}       

/*	--------------------------------------------------------
	Painettu "aloita/keskeyt‰/jatka" -painiketta  
	--------------------------------------------------------*/

function AloitaLopeta () {
	    switch (systeeminTila) {
        case "Esitys":
        	PysaytaEsitys ();
        	kuvaViive=0;
        	NaytaPalkki(kuvaViive);
		    MuutaNappain ("Jatka");
        	systeeminTila="Tauko";
        	break;
        case "Tauko":
        	MuutaNappain ("Keskeyt‰");
        	systeeminTila="Esitys";
        	KuvanEsitys ();
        	break;
        case "Lopussa":
            kuvaNro=1;
            NaytaKuva (kuvaNro);
            kuvaViive=taysViive;
            NaytaPalkki (kuvaViive);
		    MuutaNappain ("Keskeyt‰");
            AloitaEsitys ();
		    systeeminTila="Esitys";
        }
}

/*	-------------------------------------------------
	Painettu "<<" -painiketta  
	-------------------------------------------------*/

function EnsimKuva () {
	PysaytaEsitys ();
	kuvaNro = 1;
	NaytaKuva (kuvaNro);
	kuvaViive = 0;
	NaytaPalkki (kuvaViive);
	MuutaNappain ("Jatka");
	systeeminTila="Tauko";
}

/*	-------------------------------------------------
	Painettu ">>" -painiketta  
	-------------------------------------------------*/

function ViimKuva () {
	PysaytaEsitys ();
	kuvaNro = viimKuva;;
	NaytaKuva (kuvaNro);
	kuvaViive = 0;
	NaytaPalkki (kuvaViive);
	MuutaNappain ("Aloita alusta");
	systeeminTila = "Lopussa";
}

/*	------------------------------------------------
	Painettu "<" -painiketta 
	------------------------------------------------ */

function EdellinenKuva () {
	switch (systeeminTila) {
		case "Esitys":
			if (kuvaNro == 1) {
				PysaytaEsitys ();
				kuvaViive = 0;
				NaytaPalkki (kuvaViive);
				MuutaNappain ("Jatka");
			}
			if (kuvaNro > 1) {
				PysaytaEsitys ();
				kuvaNro=kuvaNro-1;
				NaytaKuva (kuvaNro);
				kuvaViive = 0;
				NaytaPalkki (kuvaViive);
				MuutaNappain ("Jatka");
			}
			systeeminTila="Tauko";
			break;
		case "Tauko":
			if (kuvaNro == 1) {
				kuvaViive = 0;
				NaytaPalkki (kuvaViive);
				MuutaNappain ("Jatka");
			}
			if (kuvaNro > 1) {
				kuvaNro=kuvaNro-1;
				NaytaKuva (kuvaNro);
				kuvaViive = 0;
				NaytaPalkki (kuvaViive);
				MuutaNappain ("Jatka");
			}
			systeeminTila="Tauko";
			break;
		case "Lopussa":
			kuvaNro=kuvaNro-1;
			NaytaKuva (kuvaNro);
			MuutaNappain ("Jatka");
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
				PysaytaEsitys ();
				kuvaNro=kuvaNro+1;
				NaytaKuva (kuvaNro);
				kuvaViive=0;
				NaytaPalkki (kuvaViive);
				MuutaNappain ("Aloita alusta");
				systeeminTila="Lopussa";
			}
			else {
				if (kuvaNro < viimKuva-1) {
					kuvaNro=kuvaNro+1;
					NaytaKuva (kuvaNro);
					kuvaViive=taysViive;
					NaytaPalkki (kuvaViive);
				}
			}
			break;
		case "Tauko":
			if (kuvaNro==viimKuva-1) {
				kuvaNro=kuvaNro+1;
				NaytaKuva (kuvaNro);
				kuvaViive=0;
				NaytaPalkki (kuvaViive);
				MuutaNappain ("Aloita alusta");
				systeeminTila="Lopussa";
			}
			else {
				if (kuvaNro < viimKuva-1) {
					kuvaNro=kuvaNro+1;
					NaytaKuva (kuvaNro);
					kuvaViive=0;
					NaytaPalkki (kuvaViive);
			    	MuutaNappain ("Jatka");
			    	systeeminTila="Tauko";
				}
			}
			break;
	}
}

/*	Kuvan esitt‰minen viiveen ajan  */

function KuvanEsitys () {
		if (kuvaViive > 0) {
			kuvaViive=kuvaViive-1;
			NaytaPalkki (kuvaViive);
			AloitaEsitys ();
			systeeminTila="Esitys";
		}
		else {
			if (kuvaNro < viimKuva-1) {
				kuvaNro=kuvaNro+1;
				NaytaKuva (kuvaNro);
				kuvaViive=taysViive;
				NaytaPalkki (kuvaViive);
				AloitaEsitys ();
				systeeminTila = "Esitys";
			}
			else {
				kuvaNro=kuvaNro+1;
				NaytaKuva (kuvaNro);
				MuutaNappain ("Aloita alusta");
				systeeminTila="Lopussa";
			}
		}
}

function NaytaKuva (numero) {
		kuvaLaskurinPaikka.innerHTML=numero;
		photo.src="kuva_" + numero + ".jpg";
}

function AloitaEsitys () {
		ajastin=setTimeout ('KuvanEsitys ()', 1000);
}

function PysaytaEsitys () {
		clearTimeout(ajastin);
}

function NaytaPalkki (palkinPituus) {
		palkki="&nbsp;";
		while (palkinPituus > 0) {
			palkki = palkki + ". ";
			palkinPituus = palkinPituus-1;
		}
		palkinPaikka.innerHTML=palkki;
}

function MuutaNappain (teksti) {
		start.value=teksti;
}
