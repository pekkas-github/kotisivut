<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

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