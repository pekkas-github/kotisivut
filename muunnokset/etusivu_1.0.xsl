<?xml version="1.0" encoding="ISO-8859-1"?><xsl:stylesheet version="1.0"xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/tapahtumat">
<html>

	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
		<link rel="stylesheet" type="text/css" href="../tyylit/yleiset.css" />
	</head>
	
	<body class="bodyMain">
		<!-- Otsikko -->
		<div class="hdMain">
			Etusivu - uusimmat jutut
		</div>
		<div id="contEtusivu">
			<xsl:apply-templates />
		</div>
	</body>
	
</html>
</xsl:template>

<xsl:template match="tapahtuma">
	<h1 class="contUutisetH1"><xsl:value-of select="@otsikko" /></h1>
	<xsl:if test="@pvm">
	 	<p>(<xsl:value-of select="@pvm" />)</p>
	 </xsl:if>
	<xsl:apply-templates />
</xsl:template>

<xsl:template match="teksti">
	<p><xsl:value-of select="." /></p>
</xsl:template>

<xsl:template match="kuva">
	<img class="{@muoto}" src="{@osoite}" title="{@kuvaus}" />
</xsl:template>

<xsl:template match="linkki">
	<p><a href="{@osoite}" target="{@kohde}">
		<xsl:value-of select="." />
	</a></p>
</xsl:template>

</xsl:stylesheet>
