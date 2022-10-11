<?xml version="1.0" encoding="ISO-8859-1"?>
<!--	Versio 3.0 / Tukee uutta dokumenttirakennetta uutissivu_3.0.dtd
 -->
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/uutissivu">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
		<link rel="stylesheet" type="text/css" href="../../tyylit/yleiset.css" />
	</head>
	
	<body class="bodyMain">

		<!-- Otsikko -->
		<div class="hdMain_v3">
			<xsl:value-of select="@otsikko" />
		</div>

		<!-- Vasen palsta = Tapahtumat --> 
		<div id="contColumnLeft">
			<xsl:apply-templates select="tapahtumat" />
		</div>
		
		<!-- Oikea palsta = Valokuvaraina -->
		<div id="contColumnRight">
			<xsl:apply-templates select="albumi" />
		</div>
	</body>
	
</html>
</xsl:template>

<xsl:template match="tapahtuma">
	<h1 class="contUutisetH1"><xsl:value-of select="@otsikko" /></h1>
	<xsl:apply-templates />
</xsl:template>

<xsl:template match="teksti">
	<p><xsl:value-of select="." /></p>
</xsl:template>

<xsl:template match="kuvat">
	<h1 class="contUutisetH1"><xsl:value-of select="@otsikko" /></h1>
	<xsl:apply-templates />
</xsl:template>

<xsl:template match="kuva">
	<xsl:if test="@osoite">
		<img class="{@muoto}" src="{@osoite}" title="{@kuvaus}" />
	</xsl:if>
</xsl:template>

<xsl:template match="linkki">
	<p><a href="{@osoite}" target="{@kohde}">
		<xsl:value-of select="." />
	</a></p>
</xsl:template>

</xsl:stylesheet>
