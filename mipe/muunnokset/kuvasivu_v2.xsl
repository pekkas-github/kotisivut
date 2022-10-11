<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:transform version="1.0"xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<!-- 	kuvasivu_v1-dev_2; testausversio
	Testataan:
	- kuvan ja tekstin  tallentaminen objekteina ja objektien kokoaminen taulukoksi
  -->

<xsl:template match="kuvaesitys">
<html>
	<head>
		<title>Esitysruutu</title>
    	<link rel="stylesheet"  type="text/css" href="../../../tyylit/kuvaesitys_dev.css" />
    	<script type="text/javascript" language="JavaScript" charset="ISO-8859-1" src="../../../skriptit/Kuvaesitys_v2.js">

    	</script>

	</head>
	<body onload="Kuvaesitys()">
		<!-- Tehdään kuvien osoitteille ja teksteille objekti KuvaObj 
			   ja talletetaan ne taulukkomuuttujaan Kuvat  -->
		<script>
			var i=1;
			var Kuvat = new Array();
			<xsl:for-each select="kuva">
				Kuvat[i] = new Object ();
				Kuvat[i].kuva = "<xsl:value-of select='@osoite' />";
				Kuvat[i].teksti = "<xsl:value-of select='.' />";
				i=i+1;
			</xsl:for-each>
		</script>
	
			<div class="top">
				<h1><xsl:value-of select="@otsikko" /></h1>
				<br />
				<span id="kuvaLaskurinPaikka" name="kuvaLaskurinPaikka">1</span> / <span id="viimNroPaikka"> </span>
			</div>
		<table>
			<tr><td class='middle'>
				<img border="1" id="kuvanPaikka" name="photo"  />
			</td></tr>
     	</table>
			<div id="tekstinPaikka"> </div>
			<div class="bottom">
				<input type="button" id="begin" value=" &lt;&lt; " onclick="EnsimKuva ()" />
      			<input type="button" id="back" value=" &lt; " onclick="EdellinenKuva ()" />
				<input type="button" id="start" value="Keskeytä" onclick="AloitaLopeta ()" />
				<input type="button" id="forward" value=" &gt; " onclick="SeuraavaKuva ()" />
      			<input type="button" id="end" value=" &gt;&gt; " onclick="ViimKuva ()" />
      		</div>
     			<div style="color:#777777" id="palkinPaikka"></div>
		
	</body>
</html>
</xsl:template>
</xsl:transform>