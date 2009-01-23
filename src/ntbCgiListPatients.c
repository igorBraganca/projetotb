/*
	Universidade Federal do Rio de Janeiro
	Escola Politecnica
	Departamento de Engenharia Eletronica e de Computacao
	
	Laboratorio de Processamento de Sinais
	Projeto Neural TB
	Autor: Igor Bragança

	$Author$
	$Date$
	$Log$
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "cgi.h"
/*
#include "ntbConfig.h"
#include "Const.h"
#include "Types.h"
#include "Error.h"
*/
#include "ntbFunctions.h"



/*<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/

int main (int argc, char **argv)
{
	char *username;
	
	//CGI process
	cgi_init();
	cgi_process_form();
	//username = cgi_param("uid");

	
//modificações xsltproc
	cgi_init_headers();
	fflush(stdout);
//3de 6

	
		if(!(username= getenv("REMOTE_USER"))) //verifica se string lida é null
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
		
//Modificações xsltproc
	
	printf("<html>\n");
	printf("<head>\n");
	printf("\t<title>Todos os Usu&aacute;rios</title>\n");
	printf("<link rel=\"stylesheet\" type=\"text/css\" href=\"css/main.css\" />\n");
	printf("	<script src=\"js/jquery.js\"></script>\n");
	printf("	<script src=\"js/colors.js\"></script>\n");		
	printf("</head>\n");
	printf("<body>\n");

//debugin
	fflush(stdout);		

	system("xsltproc xml/xsl/listar.xsl xml/pacientesGuadalupe.xml 2>&1");
	
	printf("</body>\n");
	printf("</html>");
// 6 de 6
	
	
	cgi_end();
	
	return 0;
}

/*<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/

/* $RCSfile$ */
