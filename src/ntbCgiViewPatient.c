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


//#define PATHFILE "xml/xsl/resultado.xsl"

void printError (char *msg)
{
	cgi_init_headers();
	
	printf ("<html><head><title>Erro</title></head><body><h2>%s</h2></body></html>", msg);
}

int main (void)
{
	char tempname [L_tmpnam];
	char comando[100];
	char comando2[100];
	char comando3[100];
	FILE *xsl, *pipe;
	//size_t len;
	//char xmlSearchResultFilePath[FILE_NAME_MAX];
	//char healthCenter[HEALTH_CENTER_NAME_MAX];
	formvars *first;
	char *pid;
	

	cgi_init();
	
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
 
if (tmpnam(tempname) != NULL)
{

/*	sprintf(comando,"arquivo: %s", tempname);
	printError(comando);
*/	
	xsl = fopen(tempname, "w");
	
	fprintf(xsl,"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n");
	fprintf(xsl,"\r\n");
	fprintf(xsl,"<xsl:stylesheet xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\" version=\"1.0\"\r\n");
	fprintf(xsl,"				xmlns:fo=\"http://www.w3.org/1999/XSL/Format\"\r\n");
	fprintf(xsl,"				xmlns=\"http://www.w3.org/1999/xhtml\">\r\n");
	fprintf(xsl,"\r\n");
	fprintf(xsl,"<xsl:include href=\"xml/xsl/fullPatientDetails2.xsl\" />\r\n");
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

	fprintf(xsl,"			<p align=\"right\"><a target=\"blank\" href=\"imprimir.cgi?pid=%s\">Vers&#227;o para Impress&#227;o</a></p>\r\n", pid);

	fprintf(xsl,"			<table>\r\n");
	fprintf(xsl,"			<tr>\r\n");
	fprintf(xsl,"				<th colspan=\"2\">Crit&#233;rio Inicial de Triagem para TB</th>\r\n");
	fprintf(xsl,"			</tr>\r\n");
	fprintf(xsl,"			<xsl:apply-templates select=\"triagem\" />\r\n");

/*
	fprintf(xsl,"			<tr>\r\n");
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

}
else
	printError("Erro ao criar arquivo temporário!\n");
	
	
	
/******************************************************************************
 *            XSL TRANSFORM                                                *
 ******************************************************************************/
 
//NAAAAAAAAO FUNCIONA
	//sprintf(comando,"xsltproc %s xml/pacientesGuadalupe.xml",tempname);
//	system(comando);	 

	//sprintf(comando,"echo xsltproc %s xml/pacientesGuadalupe.xml",tempname);
//	system(comando);	 

cgi_init_headers();

//NAOOOOO FUNCIONA
		printf("<html>\n");
		printf("<head>\n");
		printf("<title>Resultado</title>\n");
		printf("</head>\n");
		printf("<body>\n"); 
		printf("teste\n");
		system("cp xml/xsl/listar.xsl xml/");
		printf("</body>\n");
		printf("</html>\n");


//FUNCIOOONA SEM CSS
//printf("<?xml version=\"1.0\"?>\n");
//printf("<h1>Lista de Pacientes:</h1><table><tr><th>Nomes:</th></tr><tr><td><a href=\"viewPatient.cgi?pid=11\">Dhiana</a></td></tr><tr><td><a href=\"viewPatient.cgi?pid=111111\">Dhiana Deva</a></td></tr><tr><td><a href=\"viewPatient.cgi?pid=553521\">Dhiana tesete RIO</a></td></tr><tr><td><a href=\"viewPatient.cgi?pid=812698\">Teste Casa Trabalho Social</a></td></tr><tr><td><a href=\"viewPatient.cgi?pid=0001\">Teste Desfecho</a></td></tr><tr><td><a href=\"viewPatient.cgi?pid=23432\">Teste Desfecho 2</a></td></tr><tr><td><a href=\"viewPatient.cgi?pid=234\">df</a></td></tr></table>\n");

//NAOOO FUNCIIONA
//printf("%i",system("pwd &"));

//NAOO FUNCIONA
/*   
  pipe = popen(comando, "r" );
  if (pipe == NULL ) 
  {        
	  printf("invoking %s failed:\n", comando);        
	  return 1;    
  }    
  while(!feof(pipe) ) 
  {        
	  if( fgets( comando, 128, pipe ) != NULL ) 
		  {            
		  printf("%s\n", comando );        
		  }    
  }       
  pclose(pipe);
*/


/******************************************************************************
 *            FREE MEMORY AND EXIT                                            *
 ******************************************************************************/
	
	cgi_end();
	
	return (ok);
}
