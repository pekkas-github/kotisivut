<?xml version="1.0" encoding="ISO-8859-1"?><!--	Versio 2.1 / Tukee rakenteita "uutissivu_v2.1.dtd" sekä vanhempaa "uutissivu_v2.0.dtd"
 --><xsl:stylesheet version="1.0"xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/uutissivu">

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
		<link rel="stylesheet" type="text/css" href="../../tyylit/yleiset.css" />
		<!-- Kuvaesityksen avaaminen uuteen ikkkunaan -->
		<script type="text/javascript">
			function openWindow (filename) {
				window.open (filename,"show",'heigh=700, width=575, location=0, scrollbars=0, status=0, titlebar=0, toolbar=0');
			}
		</script>
	</head>
	
	<body class="bodyMain">

		<!-- Otsikko -->
		<div class="hdMain">
			<xsl:value-of select="@otsikko" />
		</div>

		<!-- Vasen palsta = Tapahtumat --> 
		<div id="contUutisetVasen">
			<xsl:apply-templates select="tapahtumat" />
		</div>

		<!-- Oikea palsta = Vakiojutu -->
		<div id="contUutisetOikea">
			<xsl:apply-templates select="vakiojutut" />
			
			<!-- Ennen 8/09 kolmantena osiona oli käytössä elementti "napit".
				  8/09 jälkeen on käytetty yleistä "nappi"-elemettiä, joka voi sijaita
				  missä kohdassa tahansa dokumenttia -->
			<xsl:apply-templates select="napit" />
		</div>
	</body>
	
</html>
</xsl:template>

<xsl:template match="tapahtuma">
	<h1 class="contUutisetH1"><xsl:value-of select="@otsikko" /></h1>
	<xsl:apply-templates />
</xsl:template>

<xsl:template match="saa">
	<h1 class="contUutisetH1">Kuukauden sää</h1>
	<xsl:apply-templates />
</xsl:template>

<xsl:template match="ajatus">
	<h1 class="contUutisetH1">Kuukauden ajatus</h1>
	<xsl:apply-templates select="kuva" />
	<p id="sitaatti">
		"<xsl:value-of select='sitaatti' />"
	</p>
	<p>
		<xsl:value-of select="lahde" />
	</p>
</xsl:template>

<xsl:template match="valokuva">
	<h1 class="contUutisetH1">Kuukauden kuva</h1>
	<xsl:apply-templates />
</xsl:template>

<!-- Geneeriset elementit -->

<xsl:template match="teksti">
	<p><xsl:value-of select="." /></p>
</xsl:template>

<xsl:template match="kuvateksti">
<!-- Ennen sivua 8/09 oli kuukauden kuvan tekstielementin 
	   nimi "kuvateksti". 8/09 alkaen elementin nimi on normaali "teksti" -->
	<p><xsl:value-of select="." /></p>
</xsl:template>

<xsl:template match="kuvaus">
<!-- Ennen sivua 8/09 oli säähän liittyvän tekstielementin 
	   nimi "kuvaus". 8/09 alkaen elementin nimi on normaali "teksti" -->
	<p><xsl:value-of select="." /></p>
</xsl:template>

<xsl:template match="kuva">
<!-- Ennen sivua 8/09 viitattiin kuvatiedostoon attribuutilla "tiedosto" -->
	<xsl:if test="@tiedosto">
		<img class="{@muoto}" src="{@tiedosto}" title="{@kuvaus}" />
	</xsl:if>
<!-- Sivusta 8/09 alkaen viitataan kuvatiedostoon attribuutilla "osoite" -->
	<xsl:if test="@osoite">
		<img class="{@muoto}" src="{@osoite}" title="{@kuvaus}" />
	</xsl:if>
</xsl:template>

<xsl:template match="linkki">
	<p><a href="{@osoite}" target="{@kohde}">
		<xsl:value-of select="." />
	</a></p>
</xsl:template>

<xsl:template match="nappi">
	<xsl:choose>
		<!-- Sivusta 8/09 alkaen kuvaesitysikkunan osoite luetaan elementin "@osoite"-attribuuista -->
		<xsl:when test="@osoite">
			<p>
				<form>
					<input type="button" value="{@teksti}" onclick="openWindow ('{@osoite}')" />
				</form>
			</p>
		</xsl:when>
		<!-- Ennen sivua 8/09 kuvaesitysikkunaan avattava tiedosto oli oletuksena "albumi/Kuvaesitys.html" -->
		<xsl:otherwise>
			<p>
				<form>
					<input type="button" value="{@teksti}" onclick="openWindow ('albumi/Kuvaesitys.html')" />
				</form>
			</p>
		</xsl:otherwise>
	</xsl:choose>

</xsl:template>

</xsl:stylesheet>
