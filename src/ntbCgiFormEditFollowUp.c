/*
	Universidade Federal do Rio de Janeiro
	Escola Politecnica
	Departamento de Engenharia Eletronica e de Computacao
	
	Laboratorio de Processamento de Sinais
	Projeto Neural TB (Guadalupe)
	Autor: Igor Cunha Braganca
	Atualização: Laura Moraes

	$Author$
	$Date$
	$Log$
 */
 
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/file.h>
#include <libxml/parser.h>
#include <libxml/tree.h>
#include <libxml/xmlstring.h>

#include "cgi.h"
#include "functions.h"
#include "const.h"

#define XML_FILE_PATH "./xml/pacientesGuadalupe.xml"
#define USUARIO_ANONIMO "anonimo"

void usualFreeMemory (xmlDocPtr doc)
{
	if (doc)
		xmlFreeDoc(doc);
	xmlCleanupParser();
	xmlMemoryDump();
}
void printError (char *msg)
{
	/*cgi_init_headers();
	
	printf ("<html><head><title>Erro</title></head><body><h2>%s</h2></body></html>", msg);*/
	printf ("</script></head><body><h2>%s</h2></body></html>", msg);
}

int main (void)/*(int argc,char**argv)*/
{
	int indice1;
	char *username, *pid, fraseFinal[FIELD_MAX],fraseFinal2[FIELD_MAX], *temp;
	FILE* document;
	int estado;
	/** 
	*	se estado = 0 (verdadeiro)
	*	se estado = 1 (falso)
	*/
	
	/* variaveis usadas pela libxml2 */
	xmlDocPtr doc;
	xmlNodePtr root_element, cur_node, cur_node_children;
	
	
	cgi_init();
	cgi_process_form();
	
	pid = cgi_param("pid");
	username = cgi_param("uid");

	if(username == NULL)
		username = USUARIO_ANONIMO;
	
	// cgi_init_headers();
	// Funcao criada por Felipe para fazer com que o browser interprete o
	// HTML como utf-8.
	cgi_init_headers_with_content_type("text/html; charset=utf-8");

	/* HTML */
	printf ("<html>\n");
	printf ("<head>\n");
	printf ("\n");
	printf ("	<title>Follow Up 90 dias - Preencha todos os campos do Formul&aacute;rio abaixo.</title>\n");
	printf ("	<link rel=\"stylesheet\" type=\"text/css\" href=\"css/main.css\">\n");
	printf ("	<link rel=\"stylesheet\" type=\"text/css\" href=\"css/menu.css\">\n");
	printf ("	<link rel=\"stylesheet\" type=\"text/css\" href=\"css/form.css\">\n");
	printf ("	<script charset=\"ISO-8859-1\" language=javascript src=\"js/funcoes.js\"></script>\n");
	printf ("	<script charset=\"ISO-8859-1\" language=javascript src=\"js/validar.js\"></script>\n");
	printf ("\n");
	printf ("<script>\n");
	printf ("function validarDataDesconhecida(form)\n");
	printf ("{\n");
	printf ("	if(form.mudanca.checked)\n");
	printf ("	{\n");
	printf ("		form.mudanca_mes.value= \"XX\";\n");
	printf ("		form.mudanca_ano.value= \"XXXX\";\n");
	printf ("		form.mudanca_mes.readOnly= true;\n");
	printf ("		form.mudanca_ano.readOnly= true;\n");
	printf ("	}\n");
	printf ("	else\n");
	printf ("	{\n");
	printf ("		form.mudanca_mes.value= '';\n");
	printf ("		form.mudanca_ano.value= '';\n");
	printf ("		form.mudanca_mes.readOnly= false;\n");
	printf ("		form.mudanca_ano.readOnly= false;\n");
	printf ("	}\n");
	printf ("}\n");
	printf ("</script>\n");
	printf ("\n");
	printf ("\n");
	printf ("<script>\n");
	printf ("\n");
	printf ("tabFields= new Array(26);\n");
	printf ("\n");
	printf ("	tabFields[0] = [\"criterioEntrada\", \"01 - Crit&eacute;rio de entrada:\"];\n");
	printf ("	tabFields[1] = [\"tratamentoPrescritoTB\", \"02 - Tratamento prescrito para TB:\"];\n");
	printf ("	tabFields[2] = [\"inicio_dia\", \"02.1 -  Data do in&iacute;cio (dia/m&ecirc;s/ano):\"];\n");
	printf ("	tabFields[3] = [\"tratamentoPrescritoTBFarmacos\", \"02.2 - Farmacos utilizados:\"];\n");
	printf ("	tabFields[4] = [\"obito\", \"04 - Houve &oacute;bito?\"];\n");
	printf ("	tabFields[5] = [\"casoObito\", \"04.1 - Qual a causa?\"];\n");
	printf ("	tabFields[6] = [\"mudancaEsquemaTratamentoTB\", \"05 - Mudan&ccedil;a de esquema de tratamento para TB?\"];\n");
	printf ("	tabFields[7] = [\"mudanca_mes\", \"05.1 - Data do in&iacute;cio (m&ecirc;s/ano):\"];\n");
	printf ("	tabFields[8] = [\"mudancaMotivo\", \"05.3 - Motivo:\"];\n");
	printf ("	tabFields[9] = [\"tosseDiminuida\", \"06 - Tosse diminu&iacute;da:\"];\n");
	printf ("	tabFields[10] = [\"pesoAtual90dias\", \"07 - Peso atual(kg):\"];\n");
	printf ("	tabFields[11] = [\"probabilidadeTBAtivaAposEstudoRX\", \"09 - Probabilidade de TB ativa ao avaliar o RXT:\"];\n");
	printf ("	tabFields[12] = [\"cavitacao90dias\", \"09.1 - Cavita&ccedil;&atilde;o\"];\n");
	printf ("	tabFields[13] = [\"padraoTipico90dias\", \"09.2 - Padr&atilde;o t&oacute;pico (infiltrado em lobo(s) superior(es) e/ou segmento apical de lobo inferior):\"];\n");
	printf ("	tabFields[14] = [\"compativel90dias\", \"09.3 - Compat&iacute;vel (alargamento mediastinal ou linf.  hilar , padr&atilde;o miliar,ou derrame pleural):\"];\n");
	printf ("	tabFields[15] = [\"atipico90dias\", \"09.4 - At&iacute;pico (qualquer outro padr&atilde;o):\"];\n");
	printf ("	tabFields[16] = [\"NSA90dias\", \"09.4 - At&iacute;pico (qualquer outro padr&atilde;o):\"];\n");
	printf ("	tabFields[17] = [\"casoBaixaProbabilidade90dias\", \"09.1 - Em caso de baixa probabilidade de TB ativa responda:\"];\n");
	printf ("	tabFields[18] = [\"rx_dia\", \"10 - Data do RX:\"];\n");
	printf ("	tabFields[19] = [\"followUpRXTorax\", \"11 - Follow up do RX de T&oacute;rax (compare com o RXT inicial como o atual):\"];\n");
	printf ("	tabFields[20] = [\"testeHIV90dias\", \"12 - HIV teste:\"];\n");
	printf ("	tabFields[21] = [\"antihiv_dia\", \"13 - Data do Anti-HIV(dia/m&ecirc;s/ano):\"];\n");
	printf ("	tabFields[22] = [\"diagnostico90dias\", \"14 - Diagn&oacute;stico 90 dias:\"];\n");
	printf ("	tabFields[23] = [\"diagnosticoDiferenteTB\", \"14.1 - Em caso de outro Diagn&oacute;stico diferente de TB:\"];\n");
	printf ("	tabFields[24] = [\"diagnosticoFinal\", \"15 - Realizado por dois investigadores ap&oacute;s revis&atilde;o dos dados eresultados de exames (an&aacute;lise deve ser realizada as cegas):\"];\n");
	printf ("	tabFields[25] = [\"reacoesAdversasTuberculostaticos\", \"03 - Rea&ccedil;&atilde;o adversa dos tuberculost&aacute;ticos?\"];\n");
	printf ("	tabFields[26] = [\"reacoesAdversasTuberculostaticosMaiores\", \"03.1 - Maiores:\"];\n");
	printf ("	tabFields[27] = [\"reacoesAdversasTuberculostaticosMenores\", \"03.2 - Menores:\"];\n");
	printf ("	tabFields[28] = [\"mudancaFarmacos\", \"05.2 - F&aacute;rmacos utilizados:\"];\n");
	printf ("	tabFields[29] = [\"alteracoesEvolutivasNoExameFisico\", \"08 - Altera&ccedil;&otilde;es evolutivas no exame f&iacute;sico:\"];\n");
	printf ("	tabFields[30] = [\"inicio_mes\",\"02.1 -  Data do in&iacute;cio (dia/m&ecirc;s/ano):\"];\n");
	printf ("	tabFields[31] = [\"inicio_ano\",\"02.1 -  Data do in&iacute;cio (dia/m&ecirc;s/ano):\"];\n");
	printf ("	tabFields[32] = [\"mudanca_ano\",\"05.1 - Data do in&iacute;cio (m&ecirc;s/ano):\"];\n");
	printf ("	tabFields[33] = [\"rx_mes\",\"10 - Data do RX:\"];\n");
	printf ("	tabFields[34] = [\"rx_ano\",\"10 - Data do RX:\"];\n");
	printf ("	tabFields[35] = [\"antihiv_mes\",\"13 - Data do Anti-HIV(dia/m&ecirc;s/ano):\"];\n");
	printf ("	tabFields[36] = [\"antihiv_ano\",\"13 - Data do Anti-HIV(dia/m&ecirc;s/ano):\"];\n");
	printf ("	tabFields[37] = [\"observacoes\",\" 16 - Observa&ccedil;&otilde;es: \"];\n");
	printf ("	tabFields[38] = [\"avaliadorMedicoFollowUp\",\"Avaliado por:\"];\n");
	printf ("	tabFields[39] = [\"quemCadastrou\",\"Cadastrado por:\"];\n");
	printf ("	tabFields[40] = [\"dia_FollowUp\",\"Data:\"];\n");
	printf ("	tabFields[41] = [\"mes_FollowUp\",\"Data:\"];\n");
	printf ("	tabFields[42] = [\"ano_FollowUp\",\"Data:\"];\n");
	printf ("\n");
	printf ("	var tabValores= new Array(\"Masculino\", \"Feminino\", \"Presente\", \"Ausente\", \"Ignorado\",\"Sim\", \"N&atilde;o\", \"Branco\", \"N&atilde;o-branco\", \"Negro\", \"Mulato\", \"&Iacute;ndio\", \"Asi&aacute;tico\", \"Outro\", \"Casado\", \"Solteiro\", \"Separado\", \"Vi&uacute;vo\", \"Pulm&atilde;o\", \"Pleura\", \"Ganglio\");\n");
	printf ("\n");
	printf ("	function inicializaOcultos(tabela)\n");
	printf ("	{\n");
	printf ("	\n");
	printf ("	document.getElementById(tabela).rows[3].style.display = \"none\";//data de inicio\n");
	printf ("	document.getElementById(tabela).rows[4].style.display = \"none\";//farmacos\n");
	printf ("	document.getElementById(tabela).rows[6].style.display = \"none\";//maiores\n");
	printf ("	document.getElementById(tabela).rows[7].style.display = \"none\";//menores\n");
	printf ("	document.getElementById(tabela).rows[9].style.display = \"none\";//causa do obito\n");
	printf ("	document.getElementById(tabela).rows[11].style.display = \"none\";//data da mudanca\n");
	printf ("	document.getElementById(tabela).rows[12].style.display = \"none\";//farmacos\n");
	printf ("	document.getElementById(tabela).rows[13].style.display = \"none\";//farmacos\n");
	printf ("	document.getElementById(tabela).rows[14].style.display = \"none\";//farmacos\n");
	printf ("	document.getElementById(tabela).rows[15].style.display = \"none\";//motivo\n");
	printf ("	document.getElementById(tabela).rows[22].style.display = \"none\";//cavitacao\n");
	printf ("	document.getElementById(tabela).rows[23].style.display = \"none\";//padrao tipico\n");
	printf ("	document.getElementById(tabela).rows[24].style.display = \"none\";//compativel\n");
	printf ("	document.getElementById(tabela).rows[25].style.display = \"none\";//atipico\n");
	printf ("	document.getElementById(tabela).rows[26].style.display = \"none\";//nsa\n");
	printf ("	document.getElementById(tabela).rows[27].style.display = \"none\";//baixa probabilidade\n");
	printf ("	document.getElementById(tabela).rows[28].style.display = \"none\";//baixa probabilidade\n");
	printf ("	document.getElementById(tabela).rows[36].style.display = \"none\";//diagnostico diferente de tb\n");
	printf ("	\n");
	printf ("	}\n");
	printf ("\n");
	printf ("	function desabilitarRadio (name, num)\n");
	printf ("	{\n");
	printf ("		for(indice=0; indice< num; indice++)\n");
	printf ("			name[indice].disabled = true;\n");
	printf ("	}\n");
	printf ("\n");
	printf ("	function habilitarRadio (name, num)\n");
	printf ("	{\n");
	printf ("		for(indice=0; indice< num; indice++)\n");
	printf ("			name[indice].disabled = false;\n");
	printf ("	}\n");
	printf ("\n");

/*******************************************************************************************************************************************************************************************/
		/*** funcao em javascipt que atribui valores aos campos do formulario ***/
		printf ("	function preencherCampos (form)\n");
		printf ("	{\n");
		printf ("		var tabela = new Array ();\n");
		
		/*** Funcao em c, usando a libxml2, que escreve o nome do input e o valor para ser inserido no formulario pela funcao em javascript ***/

		LIBXML_TEST_VERSION

		/******************************************************************************
			*            OPENING AND PARSING AN XML FILE TO A TREE                       *
		 ******************************************************************************/
document = fopen(XML_FILE_PATH, "r");
 	
 	if (document == NULL) {
        printError("O arquivo de pacientes não pode ser aberto");
        exit(0);
    }
    
	if(flock(fileno(document), LOCK_EX)) {
        printError("Erro ao trancar o arquivo");
       	fclose(document);
        exit(0);
    }
    
   //printWait("Trancado!");
   //sleep(20);
    
		doc = xmlReadFd(fileno(document), XML_FILE_PATH, NULL, 256);
		if (doc == NULL)
		{
			usualFreeMemory(NULL);
			flock(fileno(document), LOCK_EX);
			fclose(document);
			exit(0);
		}

		/*** Procurando o paciente pelo Numero Geral ***/

		root_element = xmlDocGetRootElement(doc);

		cur_node = root_element->children; /* vai para a tag <pacientes> */

		estado = 1;

		while((cur_node != NULL) && (estado == 1))
		{

			cur_node_children = cur_node->children->children; /*vai para a tag <numero geral> */

			/*
				Verifica se a tag selecionada eh a tag "numeroGeral", se n for esta tag eh procurada 
			*/
			while ((!xmlStrEqual(cur_node_children->name, BAD_CAST "numeroGeral")) && (cur_node_children))
					cur_node_children = cur_node_children->next;
			
			/*
				Verifica se o paciente em questao possui o numero geral procurado
			*/
			if (xmlStrEqual(cur_node_children->children->content, BAD_CAST pid))
				estado = 0;
			else
				cur_node = cur_node->next;		
		}
		printf ("\t\ttabela[0] = [\"%s\",\"%s\"];\n", cur_node_children->name, cur_node_children->children->content);		//Coloca a primeira posicao da tabela como Numero Geral

		/*
			saindo deste lup, teremos o noh do paciente que procuramos em cur_node
		*/
		
		if(cur_node != NULL)
		{
			cur_node = cur_node->children;
		
			while ((!xmlStrEqual(cur_node->name, BAD_CAST "followUp")) && (cur_node))
					cur_node = cur_node->next;
		}

		if(!cur_node) //MENSAGEM DE ERRO
		{
			printf("</script></head><body>Paciente não encontrado! Por favor, verifique se ele não foi excluído!</body></html>");
			flock(fileno(document), LOCK_EX);
			fclose(document);
			exit(0);
		}
		cur_node_children = cur_node->children;

		for(indice1 = 1; cur_node_children != NULL; cur_node_children = cur_node_children->next, indice1 ++)
		{	
			if((cur_node_children->children != NULL) && (cur_node_children->name != NULL))
			{
				if(strcmp((char *)cur_node_children->name,"quemCadastrou") != 0)
				{
				temp = translate_escape_character(cur_node_children->children->content);
				printf ("\t\ttabela[%i] = [\"%s\",\"%s\"];\n", indice1, cur_node_children->name, temp);
				free(temp);
				}
			}
			else
				indice1 --;
		}
		
		usualFreeMemory(NULL);	
		flock(fileno(document), LOCK_EX);
		fclose(document);
							/*
							tabela[0] = [\"campo1\",\"casa\"];\n\
							tabela[1] = [\"campo2\",\"cachorro\"];\n\
							tabela[2] = [\"campo3\",\"carro\"];\n\
							tabela[3] = [\"campo4\",\"caminhao\"];\n\
							tabela[4] = [\"radio1\",\"1\"];\n\
							*/
		/************/
		
		printf ("		var indice1,indice2;\n");
		printf ("		\n");
		printf ("		for(indice1 = 0 ;indice1 < %i;indice1 ++)\n",indice1);
		printf ("		{\n");
		printf ("			for(indice2 = 0;indice2 < form.elements.length; indice2 ++)\n");
		printf ("			{\n");
		printf ("				if(form.elements[indice2].name == tabela[indice1][0])\n");
		printf ("				{\n");
		printf ("					if((form.elements[indice2].type == \"text\") || (form.elements[indice2].type == \"textarea\") || (form.elements[indice2].type == \"select-one\"))\n");
		printf ("						form.elements[indice2].value = tabela[indice1][1];\n");
		printf ("					\n");
		printf ("					if((form.elements[indice2].type == \"radio\")||(form.elements[indice2].type == \"checkbox\"))\n");
		printf ("						if(form.elements[indice2].value == tabela[indice1][1])\n");
		printf ("							form.elements[indice2].click();\n");
		printf ("				}\n");
		printf ("			}\n");
		printf ("		}\n");
		printf ("	}\n");
		printf ("	\n");

/*******************************************************************************************************************************************************************************************/
	printf ("</script>\r\n");
	printf ("</head>\r\n");
	printf ("\r\n");
	printf ("<body border=\"0\" onLoad=\"inicializaOcultos('tabelaFollowUp'); preencherCampos(check);\">\r\n");
	printf ("\r\n");

	showMenu("followUp",username);

	printf ("<div align=\"center\"><br>\n");
	printf ("<span style=\"font-size: 13pt\" class=\"bold\">Projeto - Novos M&eacute;todos Diagn&oacute;sicos em TB pulmonar - Policlinica Augusto Amaral Peixoto - SMS - RJ</span>\n");
	printf ("<h4>(<i>Follow up</i> 90 dias)</h4>\n");
	printf ("\n");
	printf ("	<form name=\"check\" method=\"post\" action=\"editPatientOutrosForms.cgi\" onSubmit=\"return validar_follow_up (this)\">\n");
	printf ("	<!-- action=\"addPatientInfo.cgi\" -->\n");
	printf ("	<!-- --><input type=\"hidden\" name=\"form\" value=\"followUp\" />\n");
	printf ("		<input type=\"hidden\" name=\"uid\" value=\"%s\" />\n",username);
	printf ("		<br>\n");
	printf ("\n");
	printf ("		<!-- Numero Geral -->\n");
	printf ("	<!-- --><b>N&uacute;mero Geral : </b><input name=\"numeroGeral\" type=\"text\" size=\"6\" value=\"\" readonly=\"readonly\"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br><br>\n");
	printf ("	<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" id=\"tabelaFollowUp\" class=\"tabela\">\n");
	printf ("		<tr>\n");
	printf ("\n");
	printf ("		<td colspan=\"5\" class=\"label\"><b>Follow Up</b></td>\n");
	printf ("	</tr>\n");
	printf ("\n");
	printf ("	<!-- CRITERIO DE ENTRADA -->\n");
	printf ("		\n");
	printf ("	<tr class=\"par\">\n");
	printf ("	<td><b><script>document.write(tabFields[0][1]);</script></b></td>\n");
	printf ("	<td colspan=\"4\">\n");
	printf ("		<input name=\"criterioEntrada\" type=\"radio\" value=\"2BAAR+_1_2+\">2 BAAR positivos + 1 ou 2 culturas positivas no LJ;\n");
	printf ("		<p><input name=\"criterioEntrada\" type=\"radio\" value=\"1BAAR+_1_2+\">1 BAAR positivo + 1 ou 2 culturas  positivas no LJ;</p>\n");
	printf ("		<p><input name=\"criterioEntrada\" type=\"radio\" value=\"2BAAR-_1_2+\">2 BAAR negativos + 1 ou 2 culturas positivas no LJ;</p>\n");
	printf ("		<p><input name=\"criterioEntrada\" type=\"radio\" value=\"2BAAR-_1_2-\">2 BAAR positivos + culturas  negativas no LJ;</p>\n");
	printf ("		<p><input name=\"criterioEntrada\" type=\"radio\" value=\"1BAAR+_1_2-\">1BAAR positivo + culturas negativas no LJ</p>\n");
	printf ("		<p><input name=\"criterioEntrada\" type=\"radio\" value=\"2BAAR-_1_2-\">2BAAR negativos + culturas negativas no LJ</p>\n");
	printf ("		<p><input name=\"criterioEntrada\" type=\"radio\" value=\"1BAAR-_1_2-\">1BAAR negativo + culturas negativas no LJ</p>\n");
	printf ("	</td>\n");
	printf ("	</tr>\n");
	printf ("\n");
	printf ("	<!-- TRATAMENTO PRESCRITO TB -->\n");
	printf ("\n");
	printf ("	<tr class=\"impar\">\n");
	printf ("	<td><script>document.write(tabFields[1][1]);</script></td>\n");
	printf ("	<td><input name=\"tratamentoPrescritoTB\" type=\"radio\" value=\"sim\" onclick=\"if(tratamentoPrescritoTBFarmacos[7].checked == true){farmacos7.disabled = false;}else{farmacos7.disabled = true;}  inicio_dia.disabled = false; inicio_mes.disabled = false; inicio_ano.disabled = false; habilitarRadio(tratamentoPrescritoTBFarmacos,8); exibeLinhaOculta('tabelaFollowUp', 3);exibeLinhaOculta('tabelaFollowUp', 4);\">Sim</td>\n");
	printf ("	<td><input name=\"tratamentoPrescritoTB\" type=\"radio\" value=\"nao\" onclick=\"farmacos7.disabled = true;inicio_dia.disabled = true; inicio_mes.disabled = true; inicio_ano.disabled = true; desabilitarRadio(tratamentoPrescritoTBFarmacos,8);ocultaLinha('tabelaFollowUp', 3);ocultaLinha('tabelaFollowUp', 4)\">N&atilde;o</td>\n");
	printf ("	<td><input name=\"tratamentoPrescritoTB\" type=\"radio\" value=\"ignorado\" onclick=\"farmacos7.disabled = true; inicio_dia.disabled = true; inicio_mes.disabled = true; inicio_ano.disabled = true; desabilitarRadio(tratamentoPrescritoTBFarmacos,8);ocultaLinha('tabelaFollowUp', 3);ocultaLinha('tabelaFollowUp', 4)\">Ignorado</td>\n");
	printf ("	<td></td>\n");
	printf ("	</tr>\n");
	printf ("	\n");
	printf ("	<!--DATA DO INICIO-->\n");
	printf ("	\n");
	printf ("	<tr class=\"impar\">\n");
	printf ("	<td ><script>document.write(tabFields[2][1]);</script></td> \n");
	printf ("	<td  colspan=\"4\"><input name=\"inicio_dia\" type=\"text\" maxlength=\"2\" size=\"2\" disabled=\"true\" onKeyUp=\"if(this.value.length == 2)this.blur();\" onChange=\"if(validarDia(this))inicio_mes.focus();\"> / <input name=\"inicio_mes\" type=\"text\" maxlength=\"2\" size=\"2\" disabled=\"true\" onKeyUp=\"if(this.value.length == 2)this.blur();\" onChange=\"if(validarMes(this))inicio_ano.focus();\"> / <input name=\"inicio_ano\" type=\"text\" maxlength=\"4\" size=\"4\" disabled=\"true\" onKeyUp=\"if(this.value.length == 4)this.blur();\" onChange=\"validarAno(this);\" onBlur=\"validarQualquerData(inicio_dia,inicio_mes,inicio_ano)\"></td>\n");
	printf ("	</tr>\n");
	printf ("	\n");
	printf ("	<!-- FARMACOS UTILIZADOS -->\n");
	printf ("	\n");
	printf ("	<tr class=\"impar\">\n");
	printf ("	<td><script>document.write(tabFields[3][1]);</script></td> \n");
	printf ("	<td><input name=\"tratamentoPrescritoTBFarmacos\" type=\"checkbox\" value=\"rifampicina\" disabled=\"true\">Rifampicina\n");
	printf ("	<br><input name=\"tratamentoPrescritoTBFarmacos\" type=\"checkbox\" value=\"isoniazida\" disabled=\"true\">Isoniazida\n");
	printf ("	<br><input name=\"tratamentoPrescritoTBFarmacos\" type=\"checkbox\" value=\"pirazinamida\" disabled=\"true\">Pirazinamida</td>\n");
	printf ("	<td><input name=\"tratamentoPrescritoTBFarmacos\" type=\"checkbox\" value=\"etambutol\" disabled=\"true\">Etambutol\n");
	printf ("	<br><input name=\"tratamentoPrescritoTBFarmacos\" type=\"checkbox\" value=\"etionamida\" disabled=\"true\">Etionamida\n");
	printf ("	<br><input name=\"tratamentoPrescritoTBFarmacos\" type=\"checkbox\" value=\"estreptomicina\" disabled=\"true\">Estreptomicina</td>\n");
	printf ("	<td colspan=\"2\"><input name=\"tratamentoPrescritoTBFarmacos\" type=\"checkbox\" value=\"ofloxacina\" disabled=\"true\">Ofloxacina\n");
	printf ("	<br><input name=\"tratamentoPrescritoTBFarmacos\" type=\"checkbox\" value=\"outros\" disabled=\"true\" onClick=\"if(this.checked){farmacos7.disabled = false;farmacos7.focus();}else{farmacos7.disabled = true}\">Outros: <input name=\"farmacos7\" type=\"text\" maxlength=\"100\" size=\"5\" disabled=\"true\"></td>\n");
	printf ("	</tr>\n");
	printf ("	\n");
	printf ("	<!-- REACOES ADVERSAS -->\n");
	printf ("	\n");
	printf ("	<tr class=\"par\">\n");
	printf ("	<td><script>document.write(tabFields[25][1]);</script></td>\n");
	printf ("	<td><input name=\"reacoesAdversasTuberculostaticos\" type=\"radio\" value=\"sim\" onclick=\"habilitarRadio(reacoesAdversasTuberculostaticosMaiores,15);habilitarRadio(reacoesAdversasTuberculostaticosMenores,15);exibeLinhaOculta('tabelaFollowUp', 6);exibeLinhaOculta('tabelaFollowUp', 7);\">Sim</td>\n");
	printf ("	<td><input name=\"reacoesAdversasTuberculostaticos\" type=\"radio\" value=\"nao\" onclick=\"desabilitarRadio(reacoesAdversasTuberculostaticosMaiores,15);desabilitarRadio(reacoesAdversasTuberculostaticosMenores,15);ocultaLinha('tabelaFollowUp', 6);ocultaLinha('tabelaFollowUp', 7)\">N&atilde;o</td>\n");
	printf ("	<td><input name=\"reacoesAdversasTuberculostaticos\" type=\"radio\" value=\"ignorado\" onclick=\"desabilitarRadio(reacoesAdversasTuberculostaticosMaiores,15);desabilitarRadio(reacoesAdversasTuberculostaticosMenores,15);ocultaLinha('tabelaFollowUp', 6);ocultaLinha('tabelaFollowUp', 7)\">Ignorado</td>\n");
	printf ("	<td><input name=\"reacoesAdversasTuberculostaticos\" type=\"radio\" value=\"nsa\" onclick=\"desabilitarRadio(reacoesAdversasTuberculostaticosMaiores,15);desabilitarRadio(reacoesAdversasTuberculostaticosMenores,15);ocultaLinha('tabelaFollowUp', 6);ocultaLinha('tabelaFollowUp', 7)\">NSA</td>\n");
	printf ("	</tr>\n");
	printf ("	<tr class=\"impar\">\n");
	printf ("	<td><script>document.write(tabFields[26][1]);</script></td>\n");
	printf ("\n");
	printf ("	<td><input name=\"reacoesAdversasTuberculostaticosMaiores\" type=\"checkbox\" value=\"exantema\" disabled=\"true\">Exantema\n");
	printf ("	<br><input name=\"reacoesAdversasTuberculostaticosMaiores\" type=\"checkbox\" value=\"confusao_mental\" disabled=\"true\">Confus&atilde;o mental\n");
	printf ("	<br><input name=\"reacoesAdversasTuberculostaticosMaiores\" type=\"checkbox\" value=\"ictericia\" disabled=\"true\">Icter&iacute;cia\n");
	printf ("	<br><input name=\"reacoesAdversasTuberculostaticosMaiores\" type=\"checkbox\" value=\"hepatotoxicidade\" disabled=\"true\">Hepatotoxicidade\n");
	printf ("	<br><input name=\"reacoesAdversasTuberculostaticosMaiores\" type=\"checkbox\" value=\"vertigem_nistagmo\" disabled=\"true\">Vertigem/Nist&acute;gmo</td>\n");
	printf ("	<td><input name=\"reacoesAdversasTuberculostaticosMaiores\" type=\"checkbox\" value=\"hipoacusia\" disabled=\"true\">Hipoacusia\n");
	printf ("	<br><input name=\"reacoesAdversasTuberculostaticosMaiores\" type=\"checkbox\" value=\"crise_convulsiva\" disabled=\"true\">Crise convulsiva\n");
	printf ("	<br><input name=\"reacoesAdversasTuberculostaticosMaiores\" type=\"checkbox\" value=\"encefalopatia\" disabled=\"true\">Encefalopatia\n");
	printf ("	<br><input name=\"reacoesAdversasTuberculostaticosMaiores\" type=\"checkbox\" value=\"psicose\" disabled=\"true\">Psicose\n");
	printf ("	<br><input name=\"reacoesAdversasTuberculostaticosMaiores\" type=\"checkbox\" value=\"neurite_optica\" disabled=\"true\">Neurite &oacute;ptica</td>\n");
	printf ("	<td colspan=\"2\"><input name=\"reacoesAdversasTuberculostaticosMaiores\" type=\"checkbox\" value=\"plaqueto_leuco_eosi\" disabled=\"true\">Plaquetopenia/Leucopenia/Eosinofilia\n");
	printf ("	<br><input name=\"reacoesAdversasTuberculostaticosMaiores\" type=\"checkbox\" value=\"anemia\" disabled=\"true\">Anemia hemol./Vasculite\n");
	printf ("	<br><input name=\"reacoesAdversasTuberculostaticosMaiores\" type=\"checkbox\" value=\"choque_purpura\" disabled=\"true\">Choque/P&uacute;rpura\n");
	printf ("	<br><input name=\"reacoesAdversasTuberculostaticosMaiores\" type=\"checkbox\" value=\"nefrite_interstcial\" disabled=\"true\">Nefrite intersticial\n");
	printf ("	<br><input name=\"reacoesAdversasTuberculostaticosMaiores\" type=\"checkbox\" value=\"rabdomiolise\" disabled=\"true\">Rabdomi&oacute;lise/Insuf. Renal</td>\n");
	printf ("\n");
	printf ("	</tr>\n");
	printf ("	<tr class=\"par\">\n");
	printf ("	<td><script>document.write(tabFields[27][1]);</script></td>\n");
	printf ("	<td><input name=\"reacoesAdversasTuberculostaticosMenores\" type=\"checkbox\" value=\"prurido\" disabled=\"true\">Prurido\n");
	printf ("	<br><input name=\"reacoesAdversasTuberculostaticosMenores\" type=\"checkbox\" value=\"anorexia\" disabled=\"true\">Anorexia\n");
	printf ("	<br><input name=\"reacoesAdversasTuberculostaticosMenores\" type=\"checkbox\" value=\"nauseas_vomito\" disabled=\"true\">N&acute;useas/Vomitos\n");
	printf ("	<br><input name=\"reacoesAdversasTuberculostaticosMenores\" type=\"checkbox\" value=\"dor_abdomem\" disabled=\"true\">Dor abdominal\n");
	printf ("	<br><input name=\"reacoesAdversasTuberculostaticosMenores\" type=\"checkbox\" value=\"dor_articular\" disabled=\"true\">Dor articular</td>\n");
	printf ("	<td><input name=\"reacoesAdversasTuberculostaticosMenores\" type=\"checkbox\" value=\"neurite\" disabled=\"true\">Neurite perif&eacute;rica\n");
	printf ("	<br><input name=\"reacoesAdversasTuberculostaticosMenores\" type=\"checkbox\" value=\"euforia\" disabled=\"true\">Euforia\n");
	printf ("	<br><input name=\"reacoesAdversasTuberculostaticosMenores\" type=\"checkbox\" value=\"insonia_sonolencia\" disabled=\"true\">Ins&ocirc;nia/Sonol&ecirc;ncia\n");
	printf ("	<br><input name=\"reacoesAdversasTuberculostaticosMenores\" type=\"checkbox\" value=\"ansiedade\" disabled=\"true\">Ansiedade\n");
	printf ("	<br><input name=\"reacoesAdversasTuberculostaticosMenores\" type=\"checkbox\" value=\"cefaleia\" disabled=\"true\">Cefal&eacute;ia</td>\n");
	printf ("	<td colspan=\"2\"><input name=\"reacoesAdversasTuberculostaticosMenores\" type=\"checkbox\" value=\"acne\" disabled=\"true\">Acne\n");
	printf ("	<br><input name=\"reacoesAdversasTuberculostaticosMenores\" type=\"checkbox\" value=\"hiperuricemia\" disabled=\"true\">Hiperuricemia\n");
	printf ("	<br><input name=\"reacoesAdversasTuberculostaticosMenores\" type=\"checkbox\" value=\"febre\" disabled=\"true\">Febre\n");
	printf ("	<br><input name=\"reacoesAdversasTuberculostaticosMenores\" type=\"checkbox\" value=\"hipotensao\" disabled=\"true\">Hipotens&atilde;o ortost&acute;tica\n");
	printf ("	<br><input name=\"reacoesAdversasTuberculostaticosMenores\" type=\"checkbox\" value=\"ginecomastia\" disabled=\"true\">Ginecomastia</td>\n");
	printf ("	</tr>\n");
	printf ("	\n");
	printf ("	<!-- OBITO -->\n");
	printf ("	\n");
	printf ("	<tr class=\"impar\">\n");
	printf ("	<td ><script>document.write(tabFields[4][1]);</script></td>\n");
	printf ("	<td><input name=\"obito\" type=\"radio\" value=\"sim\" onclick=\"habilitarRadio(casoObito,3);exibeLinhaOculta('tabelaFollowUp', 9)\">Sim</td>\n");
	printf ("	<td><input name=\"obito\" type=\"radio\" value=\"nao\" onclick=\"desabilitarRadio(casoObito,3);ocultaLinha('tabelaFollowUp', 9)\">N&atilde;o</td>\n");
	printf ("	<td><input name=\"obito\" type=\"radio\" value=\"ignorado\" onclick=\"desabilitarRadio(casoObito,3);ocultaLinha('tabelaFollowUp', 9)\">Ignorado</td>\n");
	printf ("	<td></td>\n");
	printf ("	</tr>\n");
	printf ("\n");
	printf ("	\n");
	printf ("	<!-- CASO AFIRMATIVO CAUSA -->\n");
	printf ("\n");
	printf ("	\n");
	printf ("	<tr class=\"impar\">\n");
	printf ("	<td ><script>document.write(tabFields[5][1]);</script></td>\n");
	printf ("	<td>\n");
	printf ("	<input name=\"casoObito\" type=\"radio\" value=\"tb\" disabled=\"true\">TB</td>\n");
	printf ("	<td><input name=\"casoObito\" type=\"radio\" value=\"nao_tb\" disabled=\"true\">N&atilde;o TB</td>\n");
	printf ("	<td><input name=\"casoObito\" type=\"radio\" value=\"ignorado\" disabled=\"true\">Ignorado</td>\n");
	printf ("	<td></td>\n");
	printf ("	</tr>\n");
	printf ("	\n");
	printf ("	<!-- MUDANCA DE ESQUEMA -->\n");
	printf ("	\n");
	printf ("\n");
	printf ("<tr class=\"par\">\n");
	printf ("	<td ><script>document.write(tabFields[6][1]);</script></td>\n");
	printf ("	<td><input name=\"mudancaEsquemaTratamentoTB\" type=\"radio\" value=\"sim\" onclick=\"if(mudancaMotivo[3].checked == true){motivo.disabled = false;}else{motivo.disabled = true;}    habilitarRadio(mudancaFarmacos,8);habilitarRadio(mudancaMotivo,4); mudanca_mes.disabled = false; mudanca_ano.disabled = false; mudanca.disabled =false; exibeLinhaOculta('tabelaFollowUp', 11);exibeLinhaOculta('tabelaFollowUp', 12);exibeLinhaOculta('tabelaFollowUp', 13);exibeLinhaOculta('tabelaFollowUp', 14);exibeLinhaOculta('tabelaFollowUp', 15);\">Sim</td>\n");
	printf ("	<td><input name=\"mudancaEsquemaTratamentoTB\" type=\"radio\" value=\"nao\" onclick=\"motivo.disabled =true; desabilitarRadio(mudancaFarmacos,8);desabilitarRadio(mudancaMotivo,4); mudanca_mes.disabled = true; mudanca_ano.disabled = true; mudanca.disabled =true;ocultaLinha('tabelaFollowUp', 11);ocultaLinha('tabelaFollowUp', 12);ocultaLinha('tabelaFollowUp', 13);ocultaLinha('tabelaFollowUp', 14);ocultaLinha('tabelaFollowUp', 15);\">N&atilde;o</td>\n");
	printf ("	<td><input name=\"mudancaEsquemaTratamentoTB\" type=\"radio\" value=\"ignorado\" onclick=\"motivo.disabled =true; desabilitarRadio(mudancaFarmacos,8);desabilitarRadio(mudancaMotivo,4); mudanca_mes.disabled = true; mudanca_ano.disabled = true; mudanca.disabled =true;ocultaLinha('tabelaFollowUp', 11);ocultaLinha('tabelaFollowUp', 12);ocultaLinha('tabelaFollowUp', 13);ocultaLinha('tabelaFollowUp', 14);ocultaLinha('tabelaFollowUp', 15);\">Ignorado</td>\n");
	printf ("	<td><input name=\"mudancaEsquemaTratamentoTB\" type=\"radio\" value=\"NSA\" onclick=\"motivo.disabled =true; desabilitarRadio(mudancaFarmacos,8);desabilitarRadio(mudancaMotivo,4); mudanca_mes.disabled = true; mudanca_ano.disabled = true; mudanca.disabled =true;ocultaLinha('tabelaFollowUp', 11);ocultaLinha('tabelaFollowUp', 12);ocultaLinha('tabelaFollowUp', 13);ocultaLinha('tabelaFollowUp', 14);ocultaLinha('tabelaFollowUp', 15);\">NSA</td>\n");
	printf ("	</tr>\n");
	printf ("	\n");
	printf ("	<!-- DATA DA MUDANCA -->\n");
	printf ("	\n");
	printf ("	<tr class=\"par\">\n");
	printf ("	<td ><script>document.write(tabFields[7][1]);</script></td> \n");
	printf ("	<td ><input name=\"mudanca_mes\" type=\"text\" maxlength=\"2\" size=\"2\" disabled=\"true\" onKeyUp=\"if(this.value.length == 2)this.blur();\" onChange=\"if(validarMes(this))mudanca_ano.focus();\"> / <input name=\"mudanca_ano\" type=\"text\" maxlength=\"4\" size=\"4\" disabled=\"true\" onKeyUp=\"if(this.value.length == 4)this.blur();\" onChange=\"validarAno(this);\" onBlur=\"validarQualquerData(01,mudanca_mes,mudanca_ano)\"></td>\n");
	printf ("	<td colspan=\"3\"><input name=\"mudanca\" id=\"mudanca\" type=\"checkbox\" value=\"ignorada\" disabled=\"true\" onClick=\"if(this.checked == true){mudanca_mes.disabled = true; mudanca_ano.disabled = true}else{mudanca_mes.disabled = false; mudanca_ano.disabled = false;}\">Ignorada</td>\n");
	printf ("	</tr>\n");
	printf ("	\n");
	printf ("	<!-- FARMACOS UTILIZADOS 2 -->\n");
	printf ("	\n");
	printf ("	<tr class=\"par\">\n");
	printf ("	<td><script>document.write(tabFields[28][1]);</script></td>\n");
	printf ("	<td><input name=\"mudancaFarmacos\" type=\"checkbox\" value=\"rifampicina\" disabled=\"true\">Rifampicina</td>\n");
	printf ("	<td><input name=\"mudancaFarmacos\" type=\"checkbox\" value=\"isoniazida\" disabled=\"true\">Isoniazida</td>\n");
	printf ("	<td><input name=\"mudancaFarmacos\" type=\"checkbox\" value=\"pirazinamida\" disabled=\"true\">Pirazinamida</td>\n");
	printf ("	<td></td>\n");
	printf ("	</tr>\n");
	printf ("	<tr class=\"par\">\n");
	printf ("	<td>&nbsp;</td>\n");
	printf ("	<td><input name=\"mudancaFarmacos\" type=\"checkbox\" value=\"etambutol\" disabled=\"true\">Etambutol</td>\n");
	printf ("	<td><input name=\"mudancaFarmacos\" type=\"checkbox\" value=\"etionamida\" disabled=\"true\">Etionamida</td>\n");
	printf ("	<td><input name=\"mudancaFarmacos\" type=\"checkbox\" value=\"estreptomicina\" disabled=\"true\">Estreptomicina</td>\n");
	printf ("	<td></td>\n");
	printf ("</tr>\n");
	printf ("	<tr class=\"par\">\n");
	printf ("	<td>&nbsp;</td>\n");
	printf ("	<td><input name=\"mudancaFarmacos\" type=\"checkbox\" value=\"ofloxacina\" disabled=\"true\">Ofloxacina</td>\n");
	printf ("	<td colspan=\"3\"><input name=\"mudancaFarmacos\" type=\"checkbox\" value=\"outros\" disabled=\"true\" onClick=\"if(this.checked){farmacos14.disabled = false;farmacos14.focus();}else{farmacos14.disabled = true}\">Outros: <input name=\"farmacos14\" type=\"text\" maxlength=\"100\" size=\"5\" disabled=\"true\"></td>\n");
	printf ("	</tr>\n");
	printf ("	\n");
	printf ("	<!-- MOTIVO -->\n");
	printf ("	\n");
	printf ("	<tr class=\"par\">\n");
	printf ("	<td><script>document.write(tabFields[8][1]);</script></td>\n");
	printf ("	<td><input name=\"mudancaMotivo\" type=\"radio\" value=\"reacao_adversa\"  disabled=\"true\" onClick=\"motivo.disabled = true\">Rea&ccedil;&atilde;o adversa</td>\n");
	printf ("	<td><input name=\"mudancaMotivo\" type=\"radio\" value=\"interacao_medicamentosa\" disabled=\"true\" onClick=\"motivo.disabled = true\">Intera&ccedil;&atilde;o medicamentosa</td>\n");
	printf ("	<td><input name=\"mudancaMotivo\" type=\"radio\" value=\"falencia\" disabled=\"true\" onClick=\"motivo.disabled = true\">Fal&ecirc;ncia</td>\n");
	printf ("	<td><input name=\"mudancaMotivo\" type=\"radio\" value=\"outro\" disabled=\"true\" onClick=\"motivo.disabled = false;motivo.focus();\">Outro:<input name=\"motivo\" type=\"text\" maxlength=\"100\" size=\"8\" disabled=\"true\"></td>\n");
	printf ("	</tr>\n");
	printf ("	\n");
	printf ("	<tr>\n");
	printf ("	<td colspan=\"5\" class=\"label\"><b>Avalia&ccedil;&atilde;o Cl&iacute;nica:</b></td>\n");
	printf ("	</tr>\n");
	printf ("\n");
	printf ("<!-- TOSSE DIMINUIDA -->\n");
	printf ("	\n");
	printf ("	<tr class=\"par\">\n");
	printf ("	<td ><script>document.write(tabFields[9][1]);</script></td>\n");
	printf ("	<td><input name=\"tosseDiminuida\" type=\"radio\" value=\"sim\">Sim</td>\n");
	printf ("	<td><input name=\"tosseDiminuida\" type=\"radio\" value=\"nao\">N&atilde;o</td>\n");
	printf ("	<td><input name=\"tosseDiminuida\" type=\"radio\" value=\"ignorado\">Ignorado</td>\n");
	printf ("	<td><input name=\"tosseDiminuida\" type=\"radio\" value=\"NSA\">NSA</td>\n");
	printf ("	</tr>\n");
	printf ("	\n");
	printf ("	<!-- PESO ATUAL -->\n");
	printf ("	\n");
	printf ("	<tr class=\"impar\">\n");
	printf ("	<td><script>document.write(tabFields[10][1]);</script></td> \n");
	printf ("	<td colspan=\"4\"><input name=\"pesoAtual90dias\" type=\"text\" maxlength=\"5\" size=\"5\" onBlur=\"validarCampoPeso(this); this.value = arredondarNcasasDecimais(this.value,1);\"></td>\n");
	printf ("	</tr>\n");
	printf ("	<!-- Alteracoes Evolutivas no Exame Fisico -->\n");
	printf ("\n");
	printf ("	<tr class=\"par\">\n");
	printf ("		<td><script>document.write(tabFields[29][1]);</script></td>\n");
	printf ("		<td colspan=\"5\"><input name=\"alteracoesEvolutivasNoExameFisico\" type=\"text\" size=\"75\"></td>\n");
	printf ("	</tr>\n");
	printf ("\n");
	printf ("	<tr>\n");
	printf ("	<td colspan=\"5\" class=\"label\"><b>RX de t&oacute;rax(entre 60 e 90 dias no estudo):</b></td>\n");
	printf ("	</tr>\n");
	printf ("	\n");
	printf ("<!-- PROB TB ATIVA AVALIACAO RX -->\n");
	printf ("\n");
	printf ("	\n");
	printf ("	<tr class=\"impar\">\n");
	printf ("	<td><script>document.write(tabFields[11][1]);</script></td>\n");
	printf ("	<td><input name=\"probabilidadeTBAtivaAposEstudoRX\" type=\"radio\" value=\"alta\" onclick=\"desabilitarRadio(casoBaixaProbabilidade90dias,5);NSA90dias.disabled = false;habilitarRadio(cavitacao90dias,3); habilitarRadio(padraoTipico90dias,3); habilitarRadio(compativel90dias,3); habilitarRadio(atipico90dias,3); exibeLinhaOculta('tabelaFollowUp', 22);exibeLinhaOculta('tabelaFollowUp', 23);exibeLinhaOculta('tabelaFollowUp', 24);exibeLinhaOculta('tabelaFollowUp', 25);exibeLinhaOculta('tabelaFollowUp', 26);ocultaLinha('tabelaFollowUp', 27);ocultaLinha('tabelaFollowUp', 28)\">Alta</td>\n");
	printf ("	<td><input name=\"probabilidadeTBAtivaAposEstudoRX\" type=\"radio\" value=\"media\" onclick=\"desabilitarRadio(casoBaixaProbabilidade90dias,5);NSA90dias.disabled = false;habilitarRadio(cavitacao90dias,3); habilitarRadio(padraoTipico90dias,3); habilitarRadio(compativel90dias,3); habilitarRadio(atipico90dias,3);exibeLinhaOculta('tabelaFollowUp', 22);exibeLinhaOculta('tabelaFollowUp', 23);exibeLinhaOculta('tabelaFollowUp', 24);exibeLinhaOculta('tabelaFollowUp', 2);exibeLinhaOculta('tabelaFollowUp', 26);ocultaLinha('tabelaFollowUp', 27);ocultaLinha('tabelaFollowUp', 28)\">M&eacute;dia</td>\n");
	printf ("	<td><input name=\"probabilidadeTBAtivaAposEstudoRX\" type=\"radio\" value=\"baixa\" onclick=\"habilitarRadio(casoBaixaProbabilidade90dias,5); NSA90dias.disabled = true;desabilitarRadio(cavitacao90dias,3); desabilitarRadio(padraoTipico90dias,3); desabilitarRadio(compativel90dias,3); desabilitarRadio(atipico90dias,3);ocultaLinha('tabelaFollowUp', 22);ocultaLinha('tabelaFollowUp', 23);ocultaLinha('tabelaFollowUp', 24);ocultaLinha('tabelaFollowUp', 25);ocultaLinha('tabelaFollowUp', 26);exibeLinhaOculta('tabelaFollowUp', 27);exibeLinhaOculta('tabelaFollowUp', 28)\">Baixa</td>\n");
	printf ("	<td></td>\n");
	printf ("\n");
	printf ("	</td>\n");
	printf ("	\n");
	printf ("	<!-- CAVITACAO -->\n");
	printf ("	\n");
	printf ("	<tr class=\"impar\">\n");
	printf ("	<td><script>document.write(tabFields[12][1]);</script></td>\n");
	printf ("	<td><input name=\"cavitacao90dias\" type=\"radio\" value=\"sim\" disabled=\"true\">Sim</td>\n");
	printf ("	<td><input name=\"cavitacao90dias\" type=\"radio\" value=\"nao\" disabled=\"true\">N&atilde;o</td>\n");
	printf ("	<td><input name=\"cavitacao90dias\" type=\"radio\" value=\"ignorado\" disabled=\"true\">Ignorado</td>\n");
	printf ("	<td></td>\n");
	printf ("	</tr>\n");
	printf ("	\n");
	printf ("	<!-- PADRAO TIPICO -->\n");
	printf ("\n");
	printf ("	<tr class=\"impar\">\n");
	printf ("	<td><script>document.write(tabFields[13][1]);</script></td>\n");
	printf ("	<td><input name=\"padraoTipico90dias\" type=\"radio\" value=\"sim\" disabled=\"true\">Sim</td>\n");
	printf ("	<td><input name=\"padraoTipico90dias\" type=\"radio\" value=\"nao\" disabled=\"true\">N&atilde;o</td>\n");
	printf ("	<td><input name=\"padraoTipico90dias\" type=\"radio\" value=\"ignorado\" disabled=\"true\">Ignorado</td>\n");
	printf ("	<td></td>\n");
	printf ("	</tr>\n");
	printf ("	\n");
	printf ("	<!-- COMPATIVEL -->\n");
	printf ("	\n");
	printf ("	<tr class=\"impar\">\n");
	printf ("	<td><script>document.write(tabFields[14][1]);</script></td>\n");
	printf ("	<td><input name=\"compativel90dias\" type=\"radio\" value=\"sim\" disabled=\"true\">Sim</td>\n");
	printf ("	<td><input name=\"compativel90dias\" type=\"radio\" value=\"nao\" disabled=\"true\">N&atilde;o</td>\n");
	printf ("	<td><input name=\"compativel90dias\" type=\"radio\" value=\"ignorado\" disabled=\"true\">Ignorado</td>\n");
	printf ("	<td></td>\n");
	printf ("	</tr>\n");
	printf ("	\n");
	printf ("	<!-- ATIPICO -->\n");
	printf ("\n");
	printf ("	\n");
	printf ("	<tr class=\"impar\">\n");
	printf ("	<td><script>document.write(tabFields[15][1]);</script></td>\n");
	printf ("	<td><input name=\"atipico90dias\" type=\"radio\" value=\"sim\" disabled=\"true\">Sim</td>\n");
	printf ("	<td><input name=\"atipico90dias\" type=\"radio\" value=\"nao\" disabled=\"true\">N&atilde;o</td>\n");
	printf ("	<td><input name=\"atipico90dias\" type=\"radio\" value=\"ignorado\" disabled=\"true\">Ignorado</td>\n");
	printf ("	<td></td>\n");
	printf ("	</tr>\n");
	printf ("	\n");
	printf ("	<!-- NSA -->\n");
	printf ("	\n");
	printf ("	<tr class=\"impar\">\n");
	printf ("	<td></td>\n");
	printf ("	<td colspan=\"4\"><input name=\"NSA90dias\" type=\"checkbox\" value=\"nsa\" disabled=\"true\">NSA</td>\n");
	printf ("	</tr>\n");
	printf ("	\n");
	printf ("	<!-- CASO BAIXA PROBABILIDADE DE TB -->\n");
	printf ("\n");
	printf ("	<tr class=\"impar\">\n");
	printf ("	<td><script>document.write(tabFields[17][1]);</script></td>\n");
	printf ("	<td ><input name=\"casoBaixaProbabilidade90dias\" type=\"radio\" value=\"inativa_sequela\" disabled=\"true\">TB inativa/<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sequela</td>\n");
	printf ("	<td ><input name=\"casoBaixaProbabilidade90dias\" type=\"radio\" value=\"outra_doenca\" disabled=\"true\">Outra<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;doen&ccedil;a</td>\n");
	printf ("	<td><input name=\"casoBaixaProbabilidade90dias\" type=\"radio\" value=\"normal\" disabled=\"true\">Normal</td>\n");
	printf ("	<td></td>\n");
	printf ("	<tr class=\"impar\">\n");
	printf ("	<td></td>\n");
	printf ("	<td><input name=\"casoBaixaProbabilidade90dias\" type=\"radio\" value=\"ignorado\" disabled=\"true\">Ignorado</td>\n");
	printf ("	<td colspan=\"3\"><input name=\"casoBaixaProbabilidade90dias\" type=\"radio\" value=\"nsa\" disabled=\"true\">NSA</td>\n");
	printf ("	</tr>\n");
	printf ("	\n");
	printf ("	<!-- DATA DO RX -->\n");
	printf ("\n");
	printf ("	\n");
	printf ("	<tr class=\"par\">\n");
	printf ("	<td ><script>document.write(tabFields[18][1]);</script></td> \n");
	printf ("	<td colspan=\"4\"><input name=\"rx_dia\" type=\"text\" maxlength=\"2\" size=\"2\" onKeyUp=\"if(this.value.length == 2)this.blur();\" onChange=\"if(validarDia(this))rx_mes.focus();\"> / <input name=\"rx_mes\" type=\"text\" maxlength=\"2\" size=\"2\" onKeyUp=\"if(this.value.length == 2)this.blur();\" onChange=\"if(validarMes(this))rx_ano.focus();\"> / <input name=\"rx_ano\" type=\"text\" maxlength=\"4\" size=\"4\" onKeyUp=\"if(this.value.length == 4)this.blur();\" onChange=\"validarAno(this);\" onBlur=\"validarQualquerData(rx_dia,rx_mes,rx_ano)\"></td>\n");
	printf ("	</tr>\n");
	printf ("	\n");
	printf ("	<!-- FOLLOW UP DO RX -->\n");
	printf ("	\n");
	printf ("	<tr class=\"impar\">\n");
	printf ("\n");
	printf ("	<td><script>document.write(tabFields[19][1]);</script></td>\n");
	printf ("	<td><input name=\"followUpRXTorax\" type=\"radio\" value=\"melhora\">Melhora</td>\n");
	printf ("	<td><input name=\"followUpRXTorax\" type=\"radio\" value=\"inalterado\">Inalterado</td>\n");
	printf ("	<td><input name=\"followUpRXTorax\" type=\"radio\" value=\"piorado\">Piorado</td>\n");
	printf ("	<td><input name=\"followUpRXTorax\" type=\"radio\" value=\"ignorado\">Ignorado</td>\n");
	printf ("	</tr>\n");
	printf ("\n");
	printf ("	\n");
	printf ("<tr>\n");
	printf ("<td colspan=\"5\" class=\"label\"><b>HIV/AIDS:</b></th>\n");
	printf ("</tr>\n");
	printf ("\n");
	printf ("	<!-- HIV/AIDS -->\n");
	printf ("	\n");
	printf ("	<tr class=\"impar\">\n");
	printf ("	<td><script>document.write(tabFields[20][1]);</script></td>\n");
	printf ("	<td><input name=\"testeHIV90dias\" type=\"radio\" value=\"positivo\">Positivo</td>\n");
	printf ("	<td><input name=\"testeHIV90dias\" type=\"radio\" value=\"negativo\">Negativo</td>\n");
	printf ("	<td colspan=\"2\"><input name=\"testeHIV90dias\" type=\"radio\" value=\"nao_realizado\">N&atilde;o realizado ou resultado desconhecido</td>\n");
	printf ("	</tr>\n");
	printf ("	\n");
	printf ("	<!-- DATA ANTI-HIV -->\n");
	printf ("	\n");
	printf ("	<tr class=\"par\">\n");
	printf ("	<td><script>document.write(tabFields[21][1]);</script></td> \n");
	printf ("	<td colspan=\"4\"><input name=\"antihiv_dia\" type=\"text\" maxlength=\"2\" size=\"2\" onKeyUp=\"if(this.value.length == 2)this.blur();\" onChange=\"if(validarDia(this))antihiv_mes.focus();\"> / <input name=\"antihiv_mes\" type=\"text\" maxlength=\"2\" size=\"2\" onKeyUp=\"if(this.value.length == 2)this.blur();\" onChange=\"if(validarMes(this))antihiv_ano.focus();\"> / <input name=\"antihiv_ano\" type=\"text\" maxlength=\"4\" size=\"4\" onKeyUp=\"if(this.value.length == 4)this.blur();\" onChange=\"validarAno(this);\" onBlur=\"validarQualquerData(antihiv_dia,antihiv_mes,antihiv_ano)\"></td>\n");
	printf ("\n");
	printf ("	</tr>\n");
	printf ("	\n");
	printf ("	<!-- Diagn&oacute;stico 90 DIAS -->\n");
	printf ("	\n");
	printf ("	<tr class=\"impar\">\n");
	printf ("	<td><script>document.write(tabFields[22][1]);</script></td>\n");
	printf ("	<td><input name=\"diagnostico90dias\" type=\"radio\" value=\"pulmonar\" onclick=\"outro_diagnostico_sim.disabled = true;desabilitarRadio(diagnosticoDiferenteTB,9); ocultaLinha('tabelaFollowUp', 36)\">TB pulmonar</td>\n");
	printf ("	<td><input name=\"diagnostico90dias\" type=\"radio\" value=\"extra\" onclick=\"outro_diagnostico_sim.disabled = true;desabilitarRadio(diagnosticoDiferenteTB,9); ocultaLinha('tabelaFollowUp', 36)\">TB Extra-<br>pulmonar</td>\n");
	printf ("	<td><input name=\"diagnostico90dias\" type=\"radio\" value=\"pulmonar_extra\" onclick=\"outro_diagnostico_sim.disabled = true;desabilitarRadio(diagnosticoDiferenteTB,9); ocultaLinha('tabelaFollowUp', 36)\">Pulmonar+<br>+Extra</td>\n");
	printf ("	<td></td></tr>\n");
	printf ("	<tr class=\"impar\">\n");
	printf ("	<td></td>\n");
	printf ("	<td><input name=\"diagnostico90dias\" type=\"radio\" value=\"nao_tb\" onclick=\"if(diagnosticoDiferenteTB[8].checked == true){outro_diagnostico_sim.disabled = false}else{outro_diagnostico_sim.disabled = true} ;habilitarRadio(diagnosticoDiferenteTB,9); exibeLinhaOculta('tabelaFollowUp', 36)\">N&atilde;o TB</td>\n");
	printf ("	<td><input name=\"diagnostico90dias\" type=\"radio\" value=\"ignorado\" onclick=\"outro_diagnostico_sim.disabled = true;desabilitarRadio(diagnosticoDiferenteTB,9); ocultaLinha('tabelaFollowUp', 36)\">Ignorado</td>\n");
	printf ("\n");
	printf ("	<td></td><td></td>\n");
	printf ("	</tr>\n");
	printf ("\n");
	printf ("	\n");
	printf ("	<!-- CASO  DIAGNOSTICO DIFERENTE TB  -->\n");
	printf ("	\n");
	printf ("	<tr class=\"impar\">\n");
	printf ("	<td ><script>document.write(tabFields[23][1]);</script></td> \n");
	printf ("	<td ><input name=\"diagnosticoDiferenteTB\" type=\"radio\" value=\"ca_de_pulmao\" disabled=\"true\" onClick=\"outro_diagnostico_sim.disabled=true\">CA de pulm&atilde;o\n");
	printf ("	<br><input name=\"diagnosticoDiferenteTB\" type=\"radio\" value=\"pneumo_bacteria\" disabled=\"true\" onClick=\"outro_diagnostico_sim.disabled=true\">Pneumonia bacteriana\n");
	printf ("	<br><input name=\"diagnosticoDiferenteTB\" type=\"radio\" value=\"pneu_viral\" disabled=\"true\" onClick=\"outro_diagnostico_sim.disabled=true\">Pneumonia viral</td>\n");
	printf ("	<td ><input name=\"diagnosticoDiferenteTB\" type=\"radio\" value=\"micose_pulmonar\" disabled=\"true\" onClick=\"outro_diagnostico_sim.disabled=true\">Micose pulmonar\n");
	printf ("	<br><input name=\"diagnosticoDiferenteTB\" type=\"radio\" value=\"pneumoconiose\" disabled=\"true\" onClick=\"outro_diagnostico_sim.disabled=true\">Pneumoconiose\n");
	printf ("	<br><input name=\"diagnosticoDiferenteTB\" type=\"radio\" value=\"dpco_infeccao\" disabled=\"true\" onClick=\"outro_diagnostico_sim.disabled=true\">DPOC + Infec&ccedil;&atilde;o <Br>br&ocirc;nquica inespec&iacute;fica</td>\n");
	printf ("	<td colspan=\"2\"><input name=\"diagnosticoDiferenteTB\" type=\"radio\" value=\"sequela_infeccao\" disabled=\"true\" onClick=\"outro_diagnostico_sim.disabled=true\">Sequela de TB + Infe&ccedil;&atilde;o<br> br&ocirc;nquica inespec&iacute;fica\n");
	printf ("	<br><input name=\"diagnosticoDiferenteTB\" type=\"radio\" value=\"falencia_cardiaca\" disabled=\"true\" onClick=\"outro_diagnostico_sim.disabled=true\">Fal&ecirc;ncia card&iacute;aca\n");
	printf ("	<br><input name=\"diagnosticoDiferenteTB\" type=\"radio\" value=\"outros\" disabled=\"true\" onClick=\"outro_diagnostico_sim.disabled=false;outro_diagnostico_sim.focus();\">Outro: <input name=\"outro_diagnostico_sim\" type=\"text\" maxlength=\"100\" size=\"5\" disabled=\"true\"></td>\n");
	printf ("	</tr>\n");
	printf ("	\n");
	printf ("	<td colspan=\"5\" class=\"label\"><b>Diagn&oacute;stico Final:</b></th>\n");
	printf ("\n");
	printf ("	\n");
	printf ("	<!-- DIAGNOSTICO FINAL -->\n");
	printf ("	\n");
	printf ("	<tr class=\"impar\">\n");
	printf ("	<td width=\"320\"><script>document.write(tabFields[24][1]);</script></td>\n");
	printf ("	<td colspan=\"4\">\n");
	printf ("		<input name=\"diagnosticoFinal\" type=\"radio\" value=\"confirmado\">Diagn&oacute;stico confirmado de TB: cultura (+) para M. tb pelo padr&atilde;o ouro, LJ ou BACTEC;\n");
	printf ("		<p><input name=\"diagnosticoFinal\" type=\"radio\" value=\"provavel\">Diagn&oacute;stico de probabilidade: BAAR (+) e cultura (-) com resposta cl&iacute;nica / radiol&oacute;gica ou evid&ecirc;ncia de granuloma com BAAR positivo na aut&oacute;psia;</p>\n");
	printf ("		<p><input name=\"diagnosticoFinal\" type=\"radio\" value=\"clinico\">Diagn&oacute;stico cl&iacute;nico: BAAR (-) e cultura (-) com resposta cl&iacute;nica/radiol&oacute;gica ao tratamento compat&iacute;vel com TB pulmonar;</p>\n");
	printf ("		<p><input name=\"diagnosticoFinal\" type=\"radio\" value=\"pulmonar_com_baar+\">Pulmonar com BAAR (+): Sinais e sintomas compat&iacute;veis com TB pulmonar, RX de t&oacute;rax anormal e BAAR do escarro (+);</p>\n");
	printf ("		<p><input name=\"diagnosticoFinal\" type=\"radio\" value=\"pulmonar_com_baar-\">Pulmonar com BAAR (-): Sinais e sintomas compat&iacute;veis com TB pulmonar, RX de t&oacute;rax anormal, Prova tubercul&iacute;nica positiva e BAAR do escarro (-);</p>\n");
	printf ("		<p><input name=\"diagnosticoFinal\" type=\"radio\" value=\"pulmonar_com_baar-2\">Pulmonar com BAAR (-) e resposta cl&iacute;nica compat&iacute;vel: Sinais e sintomas compat&iacute;veis com TB pulmonar, RX de t&oacute;rax anormal, Prova tubercul&iacute;nica negativa e BAAR do escarro (-).</p>\n");
	printf ("	</td>\n");
	printf ("</tr>\n");
	printf ("\n");
	printf ("	</div>\n");
	printf ("\n");
	printf ("		<!-- Observacoes -->\n");
	printf ("\n");
	printf ("		<tr class=\"par\">\n");
	printf ("			<td colspan=\"1\"><script>document.write(tabFields[37][1]);</script></td>\n");
	printf ("			<td colspan=\"4\" align =\"center\"><textarea name=\"observacoes\" rows=\"5\" cols=\"65\"></textarea></td>\n");
	printf ("		</tr>	\n");
	printf ("			<tr>\n");
	printf ("			<td>&nbsp;</td>\n");
	printf ("		</tr>\n");
	printf ("\n");
	printf ("			</table>\n");
	printf ("			<div align=\"center\">\n");
	printf ("			\n");
	printf ("	<script>document.write(tabFields[38][1]);</script> <input name=\"avaliadorMedicoFollowUp\" type=\"text\" maxlength=\"100\" size=\"25\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n");
	printf ("	<script>document.write(tabFields[39][1]);</script> <input name=\"quemCadastrou\" type=\"text\" readonly=\"readonly\" value=\"%s\" size=\"25\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n",username);
	printf ("	<script>document.write(tabFields[40][1]);</script> <input name=\"dia_FollowUp\" type=\"text\" maxlength=\"2\" size=\"2\" onKeyUp=\"if(this.value.length == 2)this.blur();\" onChange=\"if(validarDia(this))mes_FollowUp.focus();\">/<input type=\"text\" name=\"mes_FollowUp\" maxlength=\"2\" size=\"2\" onKeyUp=\"if(this.value.length == 2)this.blur();\" onChange=\"if(validarMes(this))ano_FollowUp.focus();\">/<input type=\"text\" name=\"ano_FollowUp\" maxlength=\"4\" size=\"4\" onKeyUp=\"if(this.value.length == 4)this.blur();\" onChange=\"validarAno(this);validarQualquerData(dia_FollowUp,mes_FollowUp,ano_FollowUp);\"></td>\n");
	printf ("	\n");
	printf ("	<!--    ENVIAR / LIMPAR     -->\n");
	printf ("\n");
	printf ("	<br>\n");
	printf ("	<br>\n");
	printf ("	<input value=\"Limpar Formul&aacute;rio\" type=\"reset\">\n");
	printf ("	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n");
	printf ("	<input type=\"submit\" value=\"Enviar Formul&aacute;rio\">\n");
	printf ("	<br><br>\n");
	printf ("	</div>\n");
	printf ("	</form>\n");
	printf ("\n");
	printf ("	<p>\n");
	printf ("\n");
	printf ("	<p>\n");
	printf ("</body>\n");
	printf ("</html>");
	
	cgi_end();
	
	return 0;
}

/*
gcc -Wall -c ntbCgiFormEdit.c `xml2-config --cflags`
gcc -Wall -o formEdit.cgi ntbCgiFormEdit.o functions.o `xml2-config --libs` -Llibs/libcgi-1.0 -lcgi
mv -f formEdit.cgi ../formEdit.cgi
*/
