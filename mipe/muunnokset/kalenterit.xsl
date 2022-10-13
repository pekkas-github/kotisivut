<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/Kalenterit">
 	<html>
 		<head>
 		<link rel="stylesheet" type="text/css" href="../tyylit/yleiset.css" />

 		</head>
 		<body>
 			<xsl:apply-templates/>
 		</body>
 	</html>
</xsl:template>

<xsl:template match="Vuosi">
	<h1 class="hdCalYear" id="{@vuosi}">Kalenteri <xsl:value-of select="@vuosi" /></h1>
	<table class="tblCal">
		<xsl:apply-templates select="Kuukausi" />
	</table>
</xsl:template>

<xsl:template match="Kuukausi">
	<tr><td colspan="3">
		<h2 class="hdCalMonth"><xsl:value-of select="@kk" /></h2>
	</td></tr>
	<xsl:apply-templates select="Tapahtuma" />
</xsl:template>

<xsl:template match="Tapahtuma">
	<tr>
		<td class="tdCalLeft"><xsl:value-of select="Pvm" /></td>
		<td class="tdCalMid"><xsl:value-of select="Nimi" /></td>
		<td><xsl:value-of select="Kuvaus" /></td>
	</tr>
</xsl:template>
 			
</xsl:stylesheet>