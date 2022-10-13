<?xml version="1.0" encoding="UTF-8"?>
<xsl:transform version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/paivakirjasivut">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  	<title>Sivupalkki - Päiväkirja</title>
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
		Päiväkirja
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