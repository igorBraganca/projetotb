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
	char *pid, *uid;
	
	
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
	
	//uid = cgi_param("uid");
	
		if(!(uid= getenv("REMOTE_USER"))) //verifica se string lida é null
	  {
		printf("Content-type: text/html\n\n");
		printf("<html>\n");
		printf("<head>\n");
		printf("<title>Resultado</title>\n");
		printf("</head>\n");
		printf("<body>\n");
    printf("Erro ao verificar o usuário.");
		printf("</body>\n");
		printf("</html>\n");
		exit(0);
		}
		
	pid = cgi_param("pid");
	
/******************************************************************************
 *            CREATE XSL SEARCH FILE                                          *
 ******************************************************************************/
//modificações xsltproc
if (tmpnam(tempname) != NULL)
{
 
	xsl = fopen(tempname, "w");
// 4 de 6	
	fprintf(xsl,"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n");
	fprintf(xsl,"<xsl:stylesheet xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\" version=\"1.0\">\r\n");
//	fprintf(xsl,"				xmlns:fo=\"http://www.w3.org/1999/XSL/Format\"\r\n");
//	fprintf(xsl,"				xmlns=\"http://www.w3.org/1999/xhtml\">\r\n");
	fprintf(xsl,"<xsl:output omit-xml-declaration=\"yes\" encoding=\"ISO-8859-1\" method=\"xml\"/>\r\n"); 
	fprintf(xsl,"\r\n");
	getUserPublicPath(address);
	fprintf(xsl,"<xsl:include href=\"%s/xml/xsl/formStatus.xsl\" />\r\n",address);
	fprintf(xsl,"\r\n");
	
	fprintf(xsl,"<xsl:variable name=\"uid\" select=\"string('%s')\" />\r\n", uid);
	fprintf(xsl,"<xsl:variable name=\"id\" select=\"string('%s')\" />\r\n", pid);
	fprintf(xsl,"\r\n");
	
	fprintf(xsl,"<xsl:template match=\"/\">\r\n");
	//fprintf(xsl,"\r\n");
	//fprintf(xsl,"	<html>\r\n");
	//fprintf(xsl,"	<head>\r\n");
	//fprintf(xsl,"		<link rel=\"stylesheet\" type=\"text/css\" href=\"css/menu.css\" />\r\n");
	//fprintf(xsl,"		<link rel=\"stylesheet\" type=\"text/css\" href=\"css/patientForms.css\" />\r\n");
	//fprintf(xsl,"		<script charset=\"ISO-8859-1\" type=\"javascript\" src=\"js/funcoes.js\"></script>\r\n");
	//fprintf(xsl,"		<title>Projeto Neural TB - Formul&#225;rios</title>\r\n");
	//fprintf(xsl,"	</head>\r\n");
	//fprintf(xsl,"\r\n");
	//fprintf(xsl,"	<body>\r\n");
	fprintf(xsl,"	<xsl:apply-templates select=\"pacientes/paciente\" />\r\n");
	//fprintf(xsl,"	</body>\r\n");
	//fprintf(xsl,"	</html>\r\n");
	//fprintf(xsl,"	\r\n");
	fprintf(xsl,"</xsl:template>\r\n");
	fprintf(xsl,"\r\n");
	fprintf(xsl,"</xsl:stylesheet>");
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
	cgi_init_headers();
	
	printf("<html>\n");
	printf("<head>\n");
	printf("<link rel=\"stylesheet\" type=\"text/css\" href=\"css/patientForms.css\" />\n");
	printf("	<script src=\"js/funcoes.js\"></script>\n");
	printf("\t<title>Formul&aacute;rios</title>\n");
	printf("</head>\n");
	printf("<body>\n");
	fflush(stdout);
	sprintf(comando,"xsltproc %s xml/pacientesGuadalupe.xml 2>&1",tempname);
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
