<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

	<xsl:template match="/paivakirja">
		<html>
			<head>
				<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
				<link rel="stylesheet" type="text/css" href="../tyylit/paivakirja.css" />
				<link rel="stylesheet" type="text/css" href="../tyylit/yleiset.css" />
			</head>
			<body class="bodyMain">
				<div class="hdMain">
					<xsl:value-of select="@vuosi" />
				</div>
				<xsl:apply-templates select="juttu" />
			</body>
		</html> 
	</xsl:template>
	
	<xsl:template match="juttu">
		<div class="contDiaryJuttu" id="{@ankkuri}">
			<h2 class="contDiaryH2"><xsl:value-of select="@otsikko" /></h2>
			<h3 class="contDiaryH3"><xsl:value-of select="@pvm" /></h3>
			<xsl:apply-templates />
		</div>
	</xsl:template>

	<xsl:template match="teksti">
		<p class="contDiaryP">
			<xsl:value-of select="." />
		</p>
	</xsl:template>
	
	<xsl:template match="kuva">
		<img class="contDiaryImg" src="{@osoite}" title="{@kuvaus}" />
	</xsl:template>
	
	<xsl:template match="linkki">
		<p class="contDiaryP">
			<a href="{@osoite}" target="blank">
				<xsl:value-of select="." />
			</a>
		</p>
	</xsl:template>
	
	<xsl:template match="lista">
		<ul>
			<xsl:apply-templates />
		</ul>
	</xsl:template>
	
	<xsl:template match="li">
		<li><xsl:value-of select="." /></li>
	</xsl:template>
		
</xsl:stylesheet>