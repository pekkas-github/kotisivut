<?xml version="1.0" encoding="ISO-8859-1"?>

<xsl:template match="/Kalenterit_lista">
 <html>
  	<head>
	  	<link rel="stylesheet" type="text/css" href="../tyylit/yleiset.css" />
  	</head>
  	<body class="bodySide">
		<div class="hdSide">
			Kalenterit
		</div>
		<div class="contSide">
			<xsl:apply-templates select="vuosi" />
		</div>
	</body>
 </html>
</xsl:template>

<xsl:template match="vuosi">
	<a href="kalenterit.xml#{.}" target="kalenteriruutu">
		<xsl:value-of select="." />
	</a>
	<br />
</xsl:template>

</xsl:stylesheet>