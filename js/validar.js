/*
 *	Autor: Igor Cunha Braganca
 */

  /***************** VALIDACAO DO FORMULARIO TRIAGEM *****************/
 
 function returnNameCampoTriagem (name)
 {
	var newName = "";
	var estado = false;

 	tabela_triagem = new Array();
	tabela_triagem[0] = ["nomeCompleto", "01 - Nome"];
	tabela_triagem[1] = ["nomeMae","02 - Nome da Mãe"];
	tabela_triagem[2] = ["endereco","03 - Endereço Residencial"];
	tabela_triagem[3] = ["ptoReferencia","04 - Ponto de Referência"];
	tabela_triagem[4] = ["bairro","05 - Bairro"];
	tabela_triagem[5] = ["cep1","CEP"];
	tabela_triagem[6] = ["cidade","06 - Cidade"];
	tabela_triagem[7] = ["fone", "07 - Telefone"];
	tabela_triagem[8] = ["cel", "Celular"];
	tabela_triagem[9] = ["foneContato", "08 - Telefone contato"];
	tabela_triagem[10] = ["nomeContato", "Nome do contato"];
	tabela_triagem[11] = ["dia_nascimento", "09 - Data de Nascimento"];
	tabela_triagem[12] = ["mes_nascimento", "09 - Data de Nascimento"];
	tabela_triagem[13] = ["ano_nascimento", "09 - Data de Nascimento"];
	tabela_triagem[14] = ["idade", "10 - Idade"];
	tabela_triagem[15] = ["naturalidadeEstado", "11 - Naturalidade"];
	tabela_triagem[16] = ["naturalidadeCidade", "Cidade"];
	tabela_triagem[17] = ["naturalidadeAnosRio", "11.1 - Chegou no Rio há"];
	tabela_triagem[18] = ["sexo", "12 - Sexo"];
	tabela_triagem[19] = ["raca1", "13 - Raça"];
	tabela_triagem[20] = ["raca2", "13.1 - Especifique"];
	tabela_triagem[21] = ["estadoCivil", "14 - Estado Civil"];
	tabela_triagem[22] = ["companheiro", "15 - Tem companheiro(a)"];
	tabela_triagem[23] = ["pesoHabitual", "16 - Peso Habitual"];
	tabela_triagem[24] = ["pesoAtual", "17 - Peso Atual"];
	tabela_triagem[25] = ["perdaDePeso", "18 - Perda de peso "];
	tabela_triagem[26] = ["altura", "19 - Altura"];
	tabela_triagem[27] = ["imc", "20 - IMC"];
	tabela_triagem[28] = ["tosse", "21 - Tosse"];
	tabela_triagem[29] = ["tosse_semanas", "Semanas"];
	tabela_triagem[30] = ["expectoracao", "22 - Expectoração"];
	tabela_triagem[31] = ["expectoracao_semanas", "Semanas"];
	tabela_triagem[32] = ["hemoptoico", "23 - Hemoptóico"];
	tabela_triagem[33] = ["hemoptoico_semanas", "Semanas"];
	tabela_triagem[34] = ["hemoptise", "24 - Hemoptise"];
	tabela_triagem[35] = ["hemoptise_semanas", "Semanas"];
	tabela_triagem[36] = ["hemoptiseQtd", "24.1 - Quantidade:"];
	tabela_triagem[37] = ["sudorese", "25 - Sudorese Noturna"];
	tabela_triagem[38] = ["sudorese_semanas", "Semanas"];
	tabela_triagem[39] = ["febre", "26 - Febre"];
	tabela_triagem[40] = ["febre_semanas", "Semanas"];
	tabela_triagem[41] = ["dispneia", "27 - Dispnéia"];
	tabela_triagem[42] = ["dispneia_semanas", "Semanas"];
	tabela_triagem[43] = ["perdaApetite", "28 - Perda de apetite"];
	tabela_triagem[44] = ["perdaApetite_semanas", "Semanas"];
	tabela_triagem[45] = ["dorToracica", "29 - Dor Torácica"];
	tabela_triagem[46] = ["dorToracica_semanas", "Semanas"];
	tabela_triagem[47] = ["result", "Resultado"];//Sinais e Sintomas
	tabela_triagem[48] = ["tratamentoAnteriorTB", "30 - Tratamento de TB anterior"];
	tabela_triagem[49] = ["mes_diagnostico", "30.1 - Data do diagnóstico de TB no passado"];
	tabela_triagem[50] = ["ano_diagnostico", "30.1 - Data do diagnóstico de TB no passado"];
	tabela_triagem[51] = ["TBdesfecho", "30.2 - Desfecho de TB"];
	tabela_triagem[52] = ["internado", "31 - Internação Hospitalar"];
	tabela_triagem[53] = ["prisao", "32 - Esteve em prisão"];
	tabela_triagem[54] = ["delegacia", "33 - Esteve em delegacia"];
	tabela_triagem[55] = ["contatoTBP", "34 - Contato com pessoas com TBP"];
	tabela_triagem[56] = ["contatoTBPmoravaJunto", "34.1 - Morava com você"];
	tabela_triagem[57] = ["contatoTBPtrabalhavaJunto", "34.2 - Trabalhava com você"];
	tabela_triagem[58] = ["contatoTBPamigoParenteColega", "34.3 - Amigo, parente ou colega que não morava com você"];
	tabela_triagem[59] = ["contatoTBPmenorQue3Anos", "34.4 - Alguns destes contatos foi menor do que 3 anos"];
	tabela_triagem[60] = ["contatoTBPqual", "34.5 - Especifique esse contato (pode marcar mais de um)"];
	tabela_triagem[61] = ["fuma", "35 - Fuma"];
	tabela_triagem[62] = ["fumaQtd", "35.1 - Número de cigarros por dia"];
	tabela_triagem[63] = ["fumaTempo", "35.2 - Número de anos que fumou/fuma"];
	tabela_triagem[64] = ["bebida", "36 - Tipo de bebida preferida"];
	tabela_triagem[65] = ["facilidadeFazerAmizades", "36.1 - Possui facilidade em fazer amizades"];
	tabela_triagem[66] = ["diminuirQtdBebida", "36.2 - Já sentiu necessidade de diminuir a quantidade da bebida"];
	tabela_triagem[67] = ["criticaModoBeber", "36.3 - Alguém critica ou já criticou o modo de beber"];
	tabela_triagem[68] = ["bebidaManha", "36.4 - Costuma beber de manhã para diminuir nervosismo/ressaca"];
	tabela_triagem[69] = ["culpadoManeiraBeber", "36.5 - Sente culpa pela maneira que bebe"];
	tabela_triagem[70] = ["cage", "Cage"];
	tabela_triagem[71] = ["primeiraProcuraParaAuxiliodeSaude", "37 - Quando procurou pela primeira vez auxilio para seu problema de saúde?"];
	tabela_triagem[72] = ["lugarDaPrimeiraConsulta", "38 - Onde foi?"];
	tabela_triagem[73] = ["causaDaPrimeiraConsulta", "39 - Porque procurou? "];
	tabela_triagem[74] = ["veioAcompanhadoDeFamiliares", "40 - Veio acompanhado de familiares?"];
	tabela_triagem[75] = ["veioEncaminhadoPorAlgumPostodeSaude", "41 - Foi encaminhado para o Posto pelo P. Saúde de Família"];
	tabela_triagem[76] = ["deQualPostoDeSaudeFoiEncaminhado", "41.1 - Qual?"];
	tabela_triagem[77] = ["veioEncaminhadoPorUnidadedDeSaudeSUS", "42 - Foi encaminhado por unidade de saúde do SUS?"];
	tabela_triagem[78] = ["deQualPostoDeSaudeDoSUSFoiEncaminhado", "42.1 - Qual?"];
	tabela_triagem[79] = ["veioEncaminhadoPorUnidadedDeSaudeParticular", "43 - Foi encaminhado por unidade de saúde Particular?"];
	tabela_triagem[80] = ["deQualPostoDeSaudeparticularFoiEncaminhado", "43.1 - Qual?"];
	tabela_triagem[81] = ["decidiuSozinhoPorAuxilioMedico", "44 - Decidiu sozinho por auxílio médico na Policlínica?"];
	tabela_triagem[82] = ["porqueDecidiuSozinhoPorAuxilioMedico", "44.1 - Porque?"];
	tabela_triagem[83] = ["encaminhadoParaQualSetorDaPoliclinica", "45 - O encaminhamento foi para atendimento em qual setor da Policlínica?"];
	tabela_triagem[84] = ["algumTratamentoParaTosseRecente", "46 - Fez algum tratamento para tosse, ultimamente?"];
	tabela_triagem[85] = ["qualFoiTratamentoRecenteFeito", "46.1 - Qual?"];
	tabela_triagem[86] = ["quantoDiasDurouTratamentoRecenteFeito", "46.2 - Durante quantos dias (total)?"];
	tabela_triagem[87] = ["trouxeRXdeTorax", "47 - Trouxe RX de tórax?"];
	tabela_triagem[88] = ["trouxeAlgumResultadoDeRXdeTorax", "48 - Trouxe algum resultado de RX de tórax?"];
	tabela_triagem[89] = ["trouxeMaterialDeExacarro", "49 - Trouxe material de escarro?"];
	tabela_triagem[90] = ["trouxeAlgumResultadoDeMaterialDeExacarro", "50 - Trouxe algum resultado de exame de escarro?"];
	tabela_triagem[91] = ["trouxeAlgumResultadoDeBiopasia", "51 - Trouxe algum resultado de biópsia?"];
	tabela_triagem[92] = ["trouxeAlgumOutroResultado", "52 - Trouxe algum outro resultado?"];
	tabela_triagem[93] = ["qualOutroResultado", "52.1 - Qual?"];
	tabela_triagem[94] = ["desfechoConsultaInicial", "37 - Desfecho da Consulta Inicial"];
	tabela_triagem[95] = ["inclusao", "38 - Inclusão"];
	tabela_triagem[96] = ["criteriosInclusao", "38.1 - Critérios de Inclusão"];
	tabela_triagem[97] = ["", "38.2 - Data de Coleta dos DOIS Espécimes Respiratórios:"];
	tabela_triagem[98] = ["coleta_1", "#1"];
	tabela_triagem[99] = ["coleta_2", "#2"];
	tabela_triagem[100] = ["cicatrizBCG", "38.3 - Cicatriz de BCG"];
	tabela_triagem[101] = ["resultadoLeitura", "38.4 - Resultado da leitura"];
	tabela_triagem[102] = ["data_aplicacao", "38.5 - Data de aplicação da prova tuberculínica"];
	tabela_triagem[103] = ["data_leitura", "38.6 - Data da Leitura"];
	tabela_triagem[104] = ["PTprimeiraDose", "38.7 - PT 1ª dose leitor"];
	tabela_triagem[105] = ["observacoes", "39 - Observações"];
	tabela_triagem[106] = ["numeroGeral","Nº Geral (TB Adapt)"];
	tabela_triagem[107] = ["dia_inclusao","Data de inclusão"];
	tabela_triagem[108] = ["mes_inclusao","Data de inclusão"];
	tabela_triagem[109] = ["ano_inclusao","Data de inclusão"];
	tabela_triagem[110] = ["cep2","CEP"];
	tabela_triagem[111] = ["avaliador","Avaliado por"];
	tabela_triagem[112] = ["coleta1","38.2 - Data de Coleta dos DOIS Espécimes Respiratórios (#1)"];
	tabela_triagem[113] = ["dia_coleta1","38.2 - Data de Coleta dos DOIS Espécimes Respiratórios (#1)"];
	tabela_triagem[114] = ["mes_coleta1","38.2 - Data de Coleta dos DOIS Espécimes Respiratórios (#1)"];
	tabela_triagem[115] = ["ano_coleta1","38.2 - Data de Coleta dos DOIS Espécimes Respiratórios (#1)"];
	tabela_triagem[116] = ["coleta2","38.2 - Data de Coleta dos DOIS Espécimes Respiratórios (#2)"];
	tabela_triagem[117] = ["dia_coleta2","38.2 - Data de Coleta dos DOIS Espécimes Respiratórios (#2)"];
	tabela_triagem[118] = ["mes_coleta2","38.2 - Data de Coleta dos DOIS Espécimes Respiratórios (#2)"];
	tabela_triagem[119] = ["ano_coleta2","38.2 - Data de Coleta dos DOIS Espécimes Respiratórios (#2)"];
	tabela_triagem[120] = ["dia_aplicacao","38.5 - Data de aplicação da prova tuberculínica"];
	tabela_triagem[121] = ["mes_aplicacao","38.5 - Data de aplicação da prova tuberculínica"];
	tabela_triagem[122] = ["ano_aplicacao","38.5 - Data de aplicação da prova tuberculínica"];
	tabela_triagem[123] = ["dia_leitura","38.6 - Data da Leitura"];
	tabela_triagem[124] = ["mes_leitura","38.6 - Data da Leitura"];
	tabela_triagem[125] = ["ano_leitura","38.6 - Data da Leitura"];
	tabela_triagem[126] = ["perdaDePeso_semanas","Semanas"];
	tabela_triagem[127] = ["dia_termoConsentimento","38.1 - Critérios de Inclusão"];
	tabela_triagem[128] = ["mes_termoConsentimento","38.1 - Critérios de Inclusão"];
	tabela_triagem[129] = ["ano_termoConsentimento","38.1 - Critérios de Inclusão"];
	tabela_triagem[130] = ["pontuacao","Resultado"];

	var indice = 0;
	while((indice < 131) && (estado != true))
	{
		if(tabela_triagem[indice][0] == name)
		{
			estado = true;
			newName = tabela_triagem[indice][1];
		}
		indice ++;
	}
	return newName;
}

 function validar_triagem (form)
{

	var estado = true;
	var texto="";
	var tamanho = 0;
	var novoNome1, novoNome2;
	novoNome1 = "-";



	tamanho = form.elements.length;

	texto="As seguintes perguntas não foram preenchidas:\n\n-------------------------------------------------------------\n";

	for(indice = 0; indice < tamanho; indice ++)
	{

		if(form.elements[indice].type == "text")
		{
			if((form.elements[indice].value == "") && (form.elements[indice].disabled == false))
			{
				estado = false;
				/***********************/
				novoNome2 = returnNameCampoTriagem(form.elements[indice].name);
				if(novoNome2 == novoNome1)
					novoNome1 = novoNome2;
				else
				{
					texto = texto + novoNome2 + "\n";
					novoNome1 = novoNome2;
				}
				/***********************/
			}
		}
		else
		{
			if(form.elements[indice].type == "radio")
			{
				if(form.elements[indice].name == "desfechoConsultaInicial")
				{
					if((form.elements[indice].checked == true) || (form.elements[indice+1].checked == true) || (form.elements[indice+2].checked == true) || (form.elements[indice+4].checked == true) || (form.elements[indice+5].checked == true) || (form.elements[indice+7].checked == true))
					{
						if((form.elements[indice+2].checked == true) && (form.elements[indice+3].value == "") && (form.elements[indice+3].disabled == false))
						{
							estado = false;
							/***********************/
							novoNome2 = returnNameCampoTriagem(form.elements[indice].name);
							if(novoNome2 == novoNome1)
								novoNome1 = novoNome2;
							else
							{
								texto = texto + novoNome2 + "\n";
								novoNome1 = novoNome2;
							}
							/***********************/
						}
						if((form.elements[indice+5].checked == true) && (form.elements[indice+6].value == "") && (form.elements[indice+6].disabled == false))
						{
							estado = false;
							/***********************/
							novoNome2 = returnNameCampoTriagem(form.elements[indice].name);
							if(novoNome2 == novoNome1)
								novoNome1 = novoNome2;
							else
							{
								texto = texto + novoNome2 + "\n";
								novoNome1 = novoNome2;
							}
							/***********************/
						}
					}
					else
					{
						estado = false;
						/***********************/
						novoNome2 = returnNameCampoTriagem(form.elements[indice].name);
						if(novoNome2 == novoNome1)
							novoNome1 = novoNome2;
						else
						{
							texto = texto + novoNome2 + "\n";
							novoNome1 = novoNome2;
						}
						/***********************/
					}
					indice += 7;
				}
				else
				{
					for(contador = 0, radioIndice = 0; form.elements[indice].name == form.elements[indice + 1].name; indice ++, contador ++)
					{
						if(form.elements[indice].checked == true)
							radioIndice ++;
					}

					if(form.elements[indice].checked == true)
					{
						contador ++
						radioIndice ++;
					}

					if(((contador > 1)||(contador == 1)) && (radioIndice != 1)  && (form.elements[indice].disabled == false))
					{
						estado = false;
						/***********************/
						novoNome2 = returnNameCampoTriagem(form.elements[indice].name);
						if(novoNome2 == novoNome1)
							novoNome1 = novoNome2;
						else
						{
							texto = texto + novoNome2 + "\n";
							novoNome1 = novoNome2;
						}
						/***********************/
					}
				}
			}
			else
			{
				if(form.elements[indice].type == "checkbox")
				{
					if((form.elements[indice].name == form.elements[indice + 1].name) && (form.elements[indice].name == form.elements[indice + 2].name))
					{
						if((form.elements[indice].checked == false) && (form.elements[indice+1].checked == false) && (form.elements[indice+2].checked == false) && (form.elements[indice].disabled == false))
						{
							estado = false;
							/***********************/
							novoNome2 = returnNameCampoTriagem(form.elements[indice].name);
							if(novoNome2 == novoNome1)
								novoNome1 = novoNome2;
							else
							{
								texto = texto + novoNome2 + "\n";
								novoNome1 = novoNome2;
							}
							/***********************/
						}
						indice += 2;
					}
				}
				else
				{
					if(form.elements[indice].type == "select-one")
					{
						if((form.elements[indice].value == "") && (form.elements[indice].disabled == false))
						{
							estado = false;
							/***********************/
							novoNome2 = returnNameCampoTriagem(form.elements[indice].name);
							if(novoNome2 == novoNome1)
								novoNome1 = novoNome2;
							else
							{
								texto = texto + novoNome2 + "\n";
								novoNome1 = novoNome2;
							}
							/***********************/
						}
					}
					else
					{
					}
				}

			}
		}
	}

	if(estado == false)
	{

		alert("Preencha todos os campos do formulario, obrigado.\n\nOBS:Não se esqueça de clicar no botão \"Resultado\" no grupo de perguntas Sinais e Sintomas.");
		alert(texto+"-------------------------------------------------------------\n");
		return false;
	}

	if(confirm("Deseja enviar os dados ?"))
	{
		emSubmissao = true;
		return true;
	}
	else
	{

		return false;
	}
}
 /***************************************************************************/

 /***************** VALIDACAO DO FORMULARIO CUSTOS *****************/

function validarCustos(form, data)
{
  var estado = true;
  var texto="";
  var tamanho = 0;
  var novoNome1, novoNome2;
  novoNome1 = "-";

  tamanho = form.elements.length;
  texto="As seguintes perguntas não foram preenchidas:\n";

  for(indice = 0; indice < tamanho; indice ++)
  {
    if(form.elements[indice].type == "text")
    {
      if((form.elements[indice].value == "") && (form.elements[indice].disabled == false))
      {
        estado = false;
        novoNome2 = data[form.elements[indice].name].text;
        if(novoNome2 == novoNome1) novoNome1 = novoNome2;
        else
        {
          texto = texto + novoNome2 + "\n";
          novoNome1 = novoNome2;
        }
      }
    }
    else
    {
      if(form.elements[indice].type == "radio")
      {
        for(contador = 0, radioIndice = 0; form.elements[indice].name == form.elements[indice + 1].name; indice ++, contador ++)
        {
          if(form.elements[indice].checked == true) radioIndice ++;
        }
        if(form.elements[indice].checked == true)
        {
          contador ++
          radioIndice ++;
        }

        if(((contador > 1)||(contador == 1)) && (radioIndice != 1)  && (form.elements[indice].disabled == false))
        {
          estado = false;
          novoNome2 = data[form.elements[indice].name].text;
          if(novoNome2 == novoNome1) novoNome1 = novoNome2;
          else
          {
            texto = texto + novoNome2 + "\n";
            novoNome1 = novoNome2;
          }
        }
      }
      else
      {
        if(form.elements[indice].type == "checkbox")
        {
          if((form.elements[indice].name == form.elements[indice + 1].name) && (form.elements[indice].name == form.elements[indice + 2].name))
          {
            if((form.elements[indice].checked == false) && (form.elements[indice+1].checked == false) && (form.elements[indice+2].checked == false) && (form.elements[indice].disabled == false))
            {
              estado = false;
              novoNome2 = data[form.elements[indice].name].text;
              if(novoNome2 == novoNome1) novoNome1 = novoNome2;
              else
              {
                texto = texto + novoNome2 + "\n";
                novoNome1 = novoNome2;
              }
            }
            indice += 2;
          }
        }
        else
        {
          if(form.elements[indice].type == "select-one")
          {
            if((form.elements[indice].value == "") && (form.elements[indice].disabled == false))
            {
              estado = false;
              novoNome2 = data[form.elements[indice].name].text;
              if(novoNome2 == novoNome1) novoNome1 = novoNome2;
              else
              {
                texto = texto + novoNome2 + "\n";
                novoNome1 = novoNome2;
              }
            }
          }
          else
          {
          }
        }
      }
    }
  }

  if(estado == false)
  {
    alert("Preencha todos os campos do formulário, obrigado.");
    alert(texto);
    return false;
  }

  if(confirm("Deseja enviar os dados ?")) return true;
  else return false;
}
 /***************************************************************************/
 
 /***************** VALIDACAO DO FORMULARIO CONSULTA MEDICA *****************/

 function returnNameCampoConsultaMedica (name)
 {
	var newName = "";
	var estado = false;

	tabela_consulta_medica= new Array(26);
	tabela_consulta_medica[0] = ["inclusao", "Critérios de inclusão:"];
	tabela_consulta_medica[1] = ["especimes_respiratorios", "Data da coleta dos DOIS espécimes respiratórios:"];
	tabela_consulta_medica[2] = ["cicatriz_bcg", "Cicatriz de BCG presente?(Checar deltóide direito):"];
	tabela_consulta_medica[3] = ["resultado_leitura", "Resultado da leitura (milímetros de enduração):"];
	tabela_consulta_medica[4] = ["aplicacao_data", "Data da aplicação da prova tuberculínica (dia/mês/ano):"];
	tabela_consulta_medica[5] = ["leitura_data", "Data da leitura (dia/mês/ano):"];
	tabela_consulta_medica[6] = ["pt_1dose", "PT 1&170; dose Leitor:"];
	tabela_consulta_medica[7] = ["tratamentoAnteriorTB", "01 - Tratamento de TB anterior:"];
	tabela_consulta_medica[8] = ["inh", "01.1 - NH:"];
	tabela_consulta_medica[9] = ["rif", "01.2 - RIF:"];
	tabela_consulta_medica[10] = ["qualEsquema", "01.3 - Qual esquema?"];
	tabela_consulta_medica[11] = ["quimioprofilaxia", "02 - Quimioprofilaxia:"];
	tabela_consulta_medica[12] = ["cagePositivo","03 - Cage positivo: (Verificar no questionario Triagem)"];
	tabela_consulta_medica[13] = ["inhCagePositivo", "03.1 - INH:"];
	tabela_consulta_medica[14] = ["rifCagePositivo", "03.2 - RIF:"];
	tabela_consulta_medica[15] = ["mes_quimio", "03.4 - Data da Quimioprofilaxia:"];
	tabela_consulta_medica[16] = ["desfechoQuimio", "03.5 - Desfecho:"];
	tabela_consulta_medica[17] = ["testeHIV", "04 - HIV teste:"];
	tabela_consulta_medica[18] = ["dia_antihiv", "05 - Data do anti-HIV:"];
	tabela_consulta_medica[19] = ["exameFisico", "07 - Exame físico normal:"];
	tabela_consulta_medica[20] = ["alteracoesNoExameFisico", "07.1 - Descreva as alterações:"];
	tabela_consulta_medica[21] = ["probTBativa", "08 - Probabilidade de TB ativa:"];
	tabela_consulta_medica[22] = ["porcentagemProbTBsemRXsemBAAR", "09 - Qual a probabilidade do diagnóstico de TB pulmonar ativa sem avaliar RX de tórax ou BAAR?"];
	tabela_consulta_medica[23] = ["probTBativaComRX", "10 - Probabilidade de TB ativa ao avaliar o RXT:"];
	tabela_consulta_medica[24] = ["cavitacao", "10.1 - Cavitação:"];
	tabela_consulta_medica[25] = ["padraoTipico", "10.2 - Padrão tópico (infiltrado em lobo(s) superior(es) e/ou segmento apical de lobo inferior):"];
	tabela_consulta_medica[26] = ["compativel", "10.3 - Compatível (alargamento mediastinal ou linf.  hilar , padrão miliar,ou derrame pleural):"];
	tabela_consulta_medica[27] = ["atipico", "10.4 - Atípico (qualquer outro padrão):"];
	tabela_consulta_medica[28] = ["nsa", "10.4 - Atípico (qualquer outro padrão):"];
	tabela_consulta_medica[29] = ["casoBaixaProbabilidade", "10.1 - Em caso de baixa probabilidade de TB ativa responda:"];
	tabela_consulta_medica[30] = ["dia_rx", "11 - Data do RX:"];
	tabela_consulta_medica[31] = ["diagnosticoProbabilidadeRX", "12 - Diagnóstico de probabilidade tendo informação sobre o RX de tórax mas sem conhecimento dos resultados bacteriológicos:"];
	tabela_consulta_medica[32] = ["probabilidadeTBcomRXsemBAAR", "13 - Qual a probabilidade do diagnóstico de TB pulmonar ativa com a avaliação do RX de tórax e sem o BAAR?"];
	tabela_consulta_medica[33] = ["diagnosticoProbabilidadeCasoDuasNegativas", "16 - Caso as duas baciloscopias iniciais sejam negativas, qual seria o diagnóstico de probabilidade de TB?"];
	tabela_consulta_medica[34] = ["probabilidadeTBcomRXcomBAAR", "17 - Qual a probabilidade do diagnóstico de TB pulmonar ativa com a avaliação do RX de tórax e do BAAR?"];
	tabela_consulta_medica[35] = ["desfechoConsultaInicial", "18 - Desfecho da consulta inicial:"];
	tabela_consulta_medica[36] = ["casoTratamentoTB", "19 - Em caso de tratamento para TB(marque qual):"];
	tabela_consulta_medica[37] = ["fatoresRisco", "20 - Fatores de risco para TBP MDR:"];
	tabela_consulta_medica[38] = ["comorbidades", "06 - Comorbidades:"];
	tabela_consulta_medica[39] = ["numeroGeral","Nº Geral (TB Adapt): "];
	tabela_consulta_medica[40] = ["dia_inclusao","Data de inclusão :"];
	tabela_consulta_medica[41] = ["mes_inclusao","Data de inclusão :"];
	tabela_consulta_medica[42] = ["ano_inclusao","Data de inclusão :"];
	tabela_consulta_medica[43] = ["resultadoBaciloscopia1","14 - #1:"];
	tabela_consulta_medica[44] = ["casoPositivo1","14.1 - Se positivo (1):"];
	tabela_consulta_medica[45] = ["resultadoBaciloscopia2","15 - #2:"];
	tabela_consulta_medica[46] = ["casoPositivo2","15.1 - Se positivo (2):"];
	tabela_consulta_medica[47] = ["observacoes"," 21 - Observações: "];
	tabela_consulta_medica[48] = ["avaliador","Avaliado por: "];
	tabela_consulta_medica[49] = ["quemCadastrou","Cadastrado por: "];
	tabela_consulta_medica[50] = ["ano_quimio", "03.4 - Data da Quimioprofilaxia:"];
	tabela_consulta_medica[51] = ["mes_antihiv", "05 - Data do anti-HIV:"];
	tabela_consulta_medica[52] = ["ano_antihiv", "05 - Data do anti-HIV:"];
	tabela_consulta_medica[53] = ["comorbidade", "06 - Comorbidades:"];
	tabela_consulta_medica[54] = ["mes_rx", "11 - Data do RX:"];
	tabela_consulta_medica[55] = ["ano_rx", "11 - Data do RX:"];
	tabela_consulta_medica[56] = ["outrascomorbidades", "06 - Comorbidades: (campo Outras)"];

	var indice = 0;
	while((indice < 57) && (estado != true))
	{
		if(tabela_consulta_medica[indice][0] == name)
		{
			estado = true;
			newName = tabela_consulta_medica[indice][1];
		}
		indice ++;
	}
	return newName;
}

function validar_consulta_medica (form)
{

	var estado = true;
	var texto="";
	var tamanho = 0;
	var novoNome1, novoNome2;
	novoNome1 = "-";


	tamanho = form.elements.length;

	texto="As seguintes perguntas não foram preenchidas:\n\n-------------------------------------------------------------\n";

	for(indice = 0; indice < tamanho; indice ++)
	{

		if(form.elements[indice].type == "text")
		{
			if((form.elements[indice].value == "") && (form.elements[indice].disabled == false))
			{
				estado = false;
				/***********************/
				novoNome2 = returnNameCampoConsultaMedica(form.elements[indice].name);
				if(novoNome2 == novoNome1)
					novoNome1 = novoNome2;
				else
				{
					texto = texto + novoNome2 + "\n";
					novoNome1 = novoNome2;
				}
				/***********************/
			}
		}
		else
		{
			if(form.elements[indice].type == "radio")
			{
				for(contador = 0, radioIndice = 0; form.elements[indice].name == form.elements[indice + 1].name; indice ++, contador ++)
				{
					if(form.elements[indice].checked == true)
						radioIndice ++;
				}

				if(form.elements[indice].checked == true)
				{
					contador ++
					radioIndice ++;
				}

				if(((contador > 1)||(contador == 1)) && (radioIndice != 1)  && (form.elements[indice].disabled == false))
				{
					estado = false;
					/***********************/
					novoNome2 = returnNameCampoConsultaMedica(form.elements[indice].name);
					if(novoNome2 == novoNome1)
						novoNome1 = novoNome2;
					else
					{
						texto = texto + novoNome2 + "\n";
						novoNome1 = novoNome2;
					}
					/***********************/
				}
			}
			else
			{
				if(form.elements[indice].type == "checkbox")
				{
					for(contador = 0, checkboxIndice = 0; form.elements[indice].name == form.elements[indice + 1].name; indice ++, contador ++)
					{
						if(form.elements[indice].checked == true)
							checkboxIndice ++;
					}

					if(form.elements[indice].checked == true)
					{
						contador ++
						checkboxIndice ++;
					}

					if((contador > 1) && (checkboxIndice < 1) && (form.elements[indice].disabled == false))
					{
						estado = false;
						/***********************/

						novoNome2 = returnNameCampoConsultaMedica(form.elements[indice].name);
						if(novoNome2 == novoNome1)
							novoNome1 = novoNome2;
						else
						{
							texto = texto + novoNome2 + "\n";
							novoNome1 = novoNome2;
						}
						/***********************/
					}
				}
				else
				{
					if(form.elements[indice].type == "select-one")
					{
						if((form.elements[indice].value == "") && (form.elements[indice].disabled == false))
						{
							estado = false;
							/***********************/
							novoNome2 = returnNameCampoConsultaMedica(form.elements[indice].name);
							if(novoNome2 == novoNome1)
								novoNome1 = novoNome2;
							else
							{
								texto = texto + novoNome2 + "\n";
								novoNome1 = novoNome2;
							}
							/***********************/
						}
					}
					else
					{
					}
				}

			}
		}
	}

	if(estado == false)
	{
		alert(texto+"-------------------------------------------------------------\n");
		return false;
	}

	if(confirm("Deseja enviar os dados ?"))
	{
		emSubmissao = true;
		return true;
	}
	else
	{

		return false;
	}
}
/*****************************************************************/

/***************** VALIDACAO DO FORMULARIO FOLLOW UP *****************/
function returnNameCampoFollowUP (name)
 {
	var newName = "";
	var estado = false;

	tabela_follow_UP= new Array();
	tabela_follow_UP[0] = ["criterioEntrada", "01 - Critério de entrada:"];
	tabela_follow_UP[1] = ["tratamentoPrescritoTB", "02 - Tratamento prescrito para TB:"];
	tabela_follow_UP[2] = ["inicio_dia", "02.1 -  Data do início (dia/mês/ano):"];
	tabela_follow_UP[3] = ["tratamentoPrescritoTBFarmacos", "02.2 - Farmacos utilizados:"];
	tabela_follow_UP[4] = ["obito", "04 - Houve óbito?"];
	tabela_follow_UP[5] = ["casoObito", "04.1 - Qual a causa?"];
	tabela_follow_UP[6] = ["mudancaEsquemaTratamentoTB", "05 - Mudança de esquema de tratamento para TB?"];
	tabela_follow_UP[7] = ["mudanca_mes", "05.1 - Data do início (mês/ano):"];
	tabela_follow_UP[8] = ["mudancaMotivo", "05.3 - Motivo:"];
	tabela_follow_UP[9] = ["tosseDiminuida", "06 - Tosse diminuída:"];
	tabela_follow_UP[10] = ["pesoAtual90dias", "07 - Peso atual(kg):"];
	tabela_follow_UP[11] = ["probabilidadeTBAtivaAposEstudoRX", "09 - Probabilidade de TB ativa ao avaliar o RXT:"];
	tabela_follow_UP[12] = ["cavitacao90dias", "09.1 - Cavitação"];
	tabela_follow_UP[13] = ["padraoTipico90dias", "09.2 - Padrão tópico (infiltrado em lobo(s) superior(es) e/ou segmento apical de lobo inferior):"];
	tabela_follow_UP[14] = ["compativel90dias", "09.3 - Compatível (alargamento mediastinal ou linf.  hilar , padrão miliar,ou derrame pleural):"];
	tabela_follow_UP[15] = ["atipico90dias", "09.4 - Atípico (qualquer outro padrão):"];
	tabela_follow_UP[16] = ["NSA90dias", "09.4 - Atípico (qualquer outro padrão):"];
	tabela_follow_UP[17] = ["casoBaixaProbabilidade90dias", "09.1 - Em caso de baixa probabilidade de TB ativa responda:"];
	tabela_follow_UP[18] = ["rx_dia", "10 - Data do RX:"];
	tabela_follow_UP[19] = ["followUpRXTorax", "11 - Follow up do RX de Tórax (compare com o RXT inicial como o atual):"];
	tabela_follow_UP[20] = ["testeHIV90dias", "12 - HIV teste:"];
	tabela_follow_UP[21] = ["antihiv_dia", "13 - Data do Anti-HIV(dia/mês/ano):"];
	tabela_follow_UP[22] = ["diagnostico90dias", "14 - Diagnóstico 90 dias:"];
	tabela_follow_UP[23] = ["diagnosticoDiferenteTB", "14.1 - Em caso de outro Diagnóstico diferente de TB:"];
	tabela_follow_UP[24] = ["diagnosticoFinal", "15 - Realizado por dois investigadores após revisão dos dados eresultados de exames (análise deve ser realizada as cegas):"];
	tabela_follow_UP[25] = ["reacoesAdversasTuberculostaticos", "03 - Reação adversa dos tuberculostáticos?"];
	tabela_follow_UP[26] = ["reacoesAdversasTuberculostaticosMaiores", "03.1 - Maiores:"];
	tabela_follow_UP[27] = ["reacoesAdversasTuberculostaticosMenores", "03.2 - Menores:"];
	tabela_follow_UP[28] = ["mudancaFarmacos", "05.2 - Fármacos utilizados:"];
	tabela_follow_UP[29] = ["alteracoesEvolutivasNoExameFisico", "08 - Alterações evolutivas no exame físico:"];
	tabela_follow_UP[30] = ["inicio_mes","02.1 -  Data do início (dia/mês/ano):"];
	tabela_follow_UP[31] = ["inicio_ano","02.1 -  Data do início (dia/mês/ano):"];
	tabela_follow_UP[32] = ["mudanca_ano","05.1 - Data do início (mês/ano):"];
	tabela_follow_UP[33] = ["rx_mes","10 - Data do RX:"];
	tabela_follow_UP[34] = ["rx_ano","10 - Data do RX:"];
	tabela_follow_UP[35] = ["antihiv_mes","13 - Data do Anti-HIV(dia/mês/ano):"];
	tabela_follow_UP[36] = ["antihiv_ano","13 - Data do Anti-HIV(dia/mês/ano):"];
	tabela_follow_UP[37] = ["observacoes"," 16 - Observações: "];
	tabela_follow_UP[38] = ["avaliadorMedicoFollowUp","Avaliado por:"];
	tabela_follow_UP[39] = ["quemCadastrou","Cadastrado por:"];
	tabela_follow_UP[40] = ["dia_FollowUp","Data:"];
	tabela_follow_UP[41] = ["mes_FollowUp","Data:"];
	tabela_follow_UP[42] = ["ano_FollowUp","Data:"];
	tabela_follow_UP[43] = ["farmacos14","05.2 - Fármacos utilizados: (campo Outros)"];
	tabela_follow_UP[44] = ["farmacos7","02.2 - Farmacos utilizados: (campo Outros)"];

	var indice = 0;
	while((indice < 45) && (estado != true))
	{
		if(tabela_follow_UP[indice][0] == name)
		{
			estado = true;
			newName = tabela_follow_UP[indice][1];
		}
		indice ++;
	}
	return newName;
}

function validar_follow_up (form)
{

	var estado = true;
	var texto="";
	var tamanho = 0;
	var novoNome1, novoNome2;
	novoNome1 = "-";


	tamanho = form.elements.length;

	texto="As seguintes perguntas não foram preenchidas:\n\n-------------------------------------------------------------\n";

	for(indice = 0; indice < tamanho; indice ++)
	{

		if(form.elements[indice].type == "text")
		{
			if((form.elements[indice].value == "") && (form.elements[indice].disabled == false))
			{
				estado = false;
				/***********************/
				novoNome2 = returnNameCampoFollowUP(form.elements[indice].name);
				if(novoNome2 == novoNome1)
					novoNome1 = novoNome2;
				else
				{
					texto = texto + novoNome2 + "\n";
					novoNome1 = novoNome2;
				}
				/***********************/
			}
		}
		else
		{
			if(form.elements[indice].type == "radio")
			{
				for(contador = 0, radioIndice = 0; form.elements[indice].name == form.elements[indice + 1].name; indice ++, contador ++)
				{
					if(form.elements[indice].checked == true)
						radioIndice ++;
				}

				if(form.elements[indice].checked == true)
				{
					contador ++
					radioIndice ++;
				}

				if(((contador > 1)||(contador == 1)) && (radioIndice != 1)  && (form.elements[indice].disabled == false))
				{
					estado = false;
					/***********************/
					novoNome2 = returnNameCampoFollowUP(form.elements[indice].name);
					if(novoNome2 == novoNome1)
						novoNome1 = novoNome2;
					else
					{
						texto = texto + novoNome2 + "\n";
						novoNome1 = novoNome2;
					}
					/***********************/
				}
			}
			else
			{
				if(form.elements[indice].type == "checkbox")
				{
					for(contador = 0, checkboxIndice = 0; form.elements[indice].name == form.elements[indice + 1].name; indice ++, contador ++)
					{
						if(form.elements[indice].checked == true)
							checkboxIndice ++;
					}

					if(form.elements[indice].checked == true)
					{
						contador ++
						checkboxIndice ++;
					}

					if((contador > 1) && (checkboxIndice < 1) && (form.elements[indice].disabled == false))
					{
						estado = false;
						/***********************/
						novoNome2 = returnNameCampoFollowUP(form.elements[indice].name);
						if(novoNome2 == novoNome1)
							novoNome1 = novoNome2;
						else
						{
							texto = texto + novoNome2 + "\n";
							novoNome1 = novoNome2;
						}
						/***********************/
					}
				}
				else
				{
					if(form.elements[indice].type == "select-one")
					{
						if((form.elements[indice].value == "") && (form.elements[indice].disabled == false))
						{
							estado = false;
							/***********************/
							novoNome2 = returnNameCampoFollowUP(form.elements[indice].name);
							if(novoNome2 == novoNome1)
								novoNome1 = novoNome2;
							else
							{
								texto = texto + novoNome2 + "\n";
								novoNome1 = novoNome2;
							}
							/***********************/
						}
					}
					else
					{
					}
				}

			}
		}
	}

	if(estado == false)
	{
		alert(texto+"-------------------------------------------------------------\n");
		return false;
	}

	if(confirm("Deseja enviar os dados ?"))
	{
		emSubmissao = true;
		return true;
	}
	else
	{

		return false;
	}
}
/*****************************************************************/

function temAlgumCampoPreenchido(form)
{
    for (i = 0; i < form.elements.length; i++) {
        curr = form.elements[i];

        if ((curr.type == "text") && (curr.value != "")) {
            if (curr.name != "cadastradoPor") {
                return true;
            }
        } else if ((curr.type == "checkbox") && (curr.checked)) {
            return true;
        } else if ((curr.type == "radio") && (curr.checked)) {
            return true;
        }
    }
    return false;
}

