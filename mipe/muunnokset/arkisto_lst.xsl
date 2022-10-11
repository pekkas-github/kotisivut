<?xml version="1.0" encoding="ISO-8859-1"?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/uutisarkisto">
<html>
<head>
	<title>Sivupalkki - Uutisarkisto</title>
	<link rel="stylesheet" type="text/css" href="../tyylit/yleiset.css" />
</head>
<body class="bodySide">
	<div class="hdSide">
		Uutisarkisto
	</div>
	<div class="contSide">
		<xsl:apply-templates select="vuosi" />
	</div>
</body>
</html>
</xsl:template>

<xsl:template match="vuosi">
	<div class="subhdSide">
		Vuosi <xsl:value-of select="@vuosi" />
	</div>
	<xsl:apply-templates select="sivu" />
</xsl:template>

<xsl:template match="sivu">
	<a href="../vuosi_{../@vuosi}/{@nimi}/uutissivu.{@tyyppi}" target="uutisruutu">
	<xsl:value-of select="@kuukausi" />
	</a>
	<br />
</xsl:template>

</xsl:stylesheet>