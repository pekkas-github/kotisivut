<?xml version="1.0" encoding="ISO-8859-1"?>

<xsl:template match="/paivakirjasivut">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
  	<title>Sivupalkki - P�iv�kirja</title>
	<link rel="stylesheet" type="text/css" href="../tyylit/yleiset.css" />

	<style type="text/css">
	  td.l
	  {vertical-align:top;
	  text-align:right;
	  font-family:arial, sans-serif;
	  font-size:80%;
	  padding-right:3px;
	  padding-bottom:2px;
	  }
	</style>
</head>
<body class="bodySide">
	<div class="hdSide">
		P�iv�kirja
	</div>
	<div class="contSide">
	<table cellspacing="0" cellpadding="0">
		<xsl:apply-templates select="juttu" />
	</table>
	</div>
</body>
</html>
</xsl:template>

<xsl:template match="juttu">
   <tr>
      <td class="l"><xsl:value-of select="@pvm" /></td>
      <td><a href="{@linkki}" target="sahkeruutu"><xsl:value-of select="@otsikko" /></a></td>
    </tr>
</xsl:template>

</xsl:transform>