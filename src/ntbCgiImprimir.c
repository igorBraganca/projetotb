/*
	Universidade Federal do Rio de Janeiro
	Escola Politecnica
	Departamento de Engenharia Eletronica e de Computacao
	
	Laboratorio de Processamento de Sinais
	Projeto Neural TB
	
	Autor: Patrick Svaiter
*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

#include "cgi.h"

#include "ntbError.h"
//#include "ntbConfig.h"
//#include "ntbConsts.h"
#include "ntbFunctions.h"

//#include "ntbSearchPatient.h"


//modificaçoes xsltproc
//#define PATHFILE "xml/xsl/resultado.xsl"
void printError (char *msg)
{
	cgi_init_headers();
	
	printf ("<html><head><title>Erro</title></head><body><h2>%s</h2></body></html>", msg);
}
// 1 de 6

int main (void)
{
//modificaçoes xsltproc
	char tempname [L_tmpnam];
	char comando[100];
	char address[100];
//2 de 6


	FILE *xsl;
	//size_t len;
	//char xmlSearchResultFilePath[FILE_NAME_MAX];
	//char healthCenter[HEALTH_CENTER_NAME_MAX];
	formvars *first;
	char *pid;
	
	
	cgi_init();
//modificações xsltproc
	cgi_init_headers();
	fflush(stdout);
//3de 6
	
/******************************************************************************
 *            READ CONTENT STRING FROM SERVER.                                *
 *            PROCESS DATA.                                                   *
 *            CREATE A LINKED LIST.                                           *
 ******************************************************************************/
	
	first = cgi_process_form();
	
/******************************************************************************
 *            ACQUIRE VALUES CHOSEN BY USER                                   *
 ******************************************************************************/
	
	pid = cgi_param("pid");
	
/******************************************************************************
 *            CREATE XSL SEARCH FILE                                          *
 ******************************************************************************/
	
//modificações xsltproc
if (tmpnam(tempname) != NULL)
{
 
	xsl = fopen(tempname, "w");
// 4 de 6		
	fprintf(xsl,"<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>\r\n");
	fprintf(xsl,"\r\n");
	fprintf(xsl,"<xsl:stylesheet xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\" version=\"1.0\">\r\n");
//	fprintf(xsl,"				xmlns:fo=\"http://www.w3.org/1999/XSL/Format\"\r\n");
//	fprintf(xsl,"				xmlns=\"http://www.w3.org/1999/xhtml\">\r\n");
	fprintf(xsl,"<xsl:output omit-xml-declaration=\"yes\" encoding=\"ISO-8859-1\" method=\"xml\"/>\r\n"); 
	fprintf(xsl,"\r\n");
	getUserPublicPath(address);
	fprintf(xsl,"<xsl:include href=\"%s/xml/xsl/fullPatientDetails2.xsl\" />\r\n",address);
// 5...
	fprintf(xsl,"\r\n");
	fprintf(xsl,"<xsl:template match=\"/\">\r\n");
	fprintf(xsl,"\r\n");
	fprintf(xsl,"		\r\n");
	fprintf(xsl,"		<xsl:apply-templates select=\"pacientes\" />\r\n");
	fprintf(xsl,"		\r\n");
	fprintf(xsl,"</xsl:template>\r\n");
	fprintf(xsl,"\r\n");
	fprintf(xsl,"\r\n");
	fprintf(xsl,"<xsl:template match=\"pacientes\">\r\n");
	fprintf(xsl,"	<!-- Tags' values -->\r\n");
	fprintf(xsl,"	<xsl:for-each select=\"paciente[@removido = 'nao']\">\r\n");
	fprintf(xsl,"	<xsl:sort select=\"descendant::nomeCompleto\" />\r\n");
	fprintf(xsl,"		<xsl:if test=\"triagem/numeroGeral = '%s'\">\r\n", pid);


	fprintf(xsl,"			<table>\r\n");
	fprintf(xsl,"			<tr>\r\n");
	fprintf(xsl,"				<th colspan=\"2\">Crit&#233;rio Inicial de Triagem para TB</th>\r\n");
	fprintf(xsl,"			</tr>\r\n");
	fprintf(xsl,"			<xsl:apply-templates select=\"triagem\" />\r\n");

/*	fprintf(xsl,"			<tr>\r\n");
	fprintf(xsl,"				<td colspan=\"2\" height=\"10\"></td>\r\n");
	fprintf(xsl,"			</tr>\r\n");
	fprintf(xsl,"			\r\n");
	fprintf(xsl,"			<tr>\r\n");
	fprintf(xsl,"				<th colspan=\"2\">Question&#225;rio de Custos - Parte A</th>\r\n");
	fprintf(xsl,"			</tr>\r\n");
	fprintf(xsl,"			<xsl:apply-templates select=\"custosA\" />\r\n");
	fprintf(xsl,"			<tr>\r\n");
	fprintf(xsl,"				<td colspan=\"2\" height=\"10\"></td>\r\n");
	fprintf(xsl,"			</tr>\r\n");
	fprintf(xsl,"			\r\n");
	fprintf(xsl,"			<tr>\r\n");
	fprintf(xsl,"				<th colspan=\"2\">Consulta M&#233;dica</th>\r\n");
	fprintf(xsl,"			</tr>\r\n");
	fprintf(xsl,"			<xsl:apply-templates select=\"consultaMedica\" />\r\n");
	fprintf(xsl,"			<tr>\r\n");	
	fprintf(xsl,"				<td class=\"title3\" colspan=\"2\" height=\"10\"></td>\r\n");
	fprintf(xsl,"			</tr>\r\n");
	fprintf(xsl,"			\r\n");
	fprintf(xsl,"			<tr>\r\n");
	fprintf(xsl,"				<th class=\"title3\" colspan=\"2\">Question&#225;rio de Custos - Partes B e C</th>\r\n");
	fprintf(xsl,"			</tr>\r\n");
	fprintf(xsl,"			<xsl:apply-templates select=\"custosBeC\" />\r\n");
	fprintf(xsl,"			<tr>\r\n");
	fprintf(xsl,"				<td class=\"title3\" colspan=\"2\" height=\"10\"></td>\r\n");
	fprintf(xsl,"			</tr>\r\n");
	fprintf(xsl,"			\r\n");
	fprintf(xsl,"			<tr>\r\n");
	fprintf(xsl,"				<th colspan=\"2\">Follow Up - 90 dias</th>\r\n");
	fprintf(xsl,"			</tr>\r\n");
	fprintf(xsl,"			<xsl:apply-templates select=\"followUp\" />\r\n");
	fprintf(xsl,"			<tr>\r\n");
	fprintf(xsl,"				<td colspan=\"2\" height=\"10\"></td>\r\n");
	fprintf(xsl,"			</tr>\r\n");
	fprintf(xsl,"			\r\n");
	fprintf(xsl,"			<tr>\r\n");
	fprintf(xsl,"				<th class=\"title3\">Gr&#225;fico de Grupo</th>\r\n");
	fprintf(xsl,"				<td><!--<a href=\"{concat(graficoGrupo, triagem/numeroGeral)}\" target=\"_blank\">Visualizar</a>--></td>\r\n");
	fprintf(xsl,"			</tr>\r\n");
*/
	fprintf(xsl,"			</table>\r\n");
	fprintf(xsl,"			<br /><br />\r\n");
	fprintf(xsl,"		</xsl:if>\r\n");
	fprintf(xsl,"	</xsl:for-each>\r\n");
	fprintf(xsl,"	\r\n");
	fprintf(xsl,"</xsl:template>\r\n");
	fprintf(xsl,"\r\n");
	fprintf(xsl,"</xsl:stylesheet>\r\n");
	fclose(xsl);
	
//Modificações xsltproc
}
else
	printError("Erro ao criar arquivo temporário!\n");
// 5 de 6
	
/******************************************************************************
 *            PRINTING RESULT                                                 *
 ******************************************************************************/
	
	
//Modificações xsltproc
	
	printf("<html>\n");
	printf("<head>\n");
	printf("<link rel=\"stylesheet\" type=\"text/css\" href=\"css/imprimir.css\" />\n");	
	printf("\t<title>Vers&atilde;o de Impress&atilde;o</title>\n");
	printf("</head>\n");
	printf("<body id=\"result\" onLoad=\"window.print()\">\n");
	sprintf(comando,"xsltproc %s xml/pacientesGuadalupe.xml 2>&1",tempname);
	fflush(stdout);
	system(comando);
	
	
	sprintf(comando,"rm %s 2>&1",tempname);
	system(comando);
	
	printf("</body>\n");
	printf("</html>");
// 6 de 6
/******************************************************************************
 *            FREE MEMORY AND EXIT                                            *
 ******************************************************************************/
	
	cgi_end();
	
	return (ok);
}
