//Classe usada para associar o nome de um input field em HTML a um dado texto de apresentacao.
function Question(name, text)
{
  this.name = name;
  this.text = text;
}

//Retorna a lista de nos XML filhos para umd eterminado objeto. Esta funcao deve ser usada no
//ligar de chamar direto o atributo children (ou childNodes), visto que o nome do atributo
//muda dependendo do Browser. esta funcao esta validada para operacao com o firefox e o
//Internet Explorer Mobile.
function getChildren(obj)
{
  var chlildrenName = "childNodes";
  if (navigator.appName.match("Internet Explorer") != null) chlildrenName = "children";
  return obj[chlildrenName];
}

//Esta funcao substitui o uso da funcao default obj.getElementsByTagName, visto que a mesma
//nao existe no Mobile IE.
function getElementsByTagName(obj, tagName)
{
  var childList = getChildren(obj);
  var ret = new Array();  
  for (var i=0; i < childList.length; i++)
  {
    var childTagName = new String(childList[i].tagName);
    if (childTagName.toLowerCase() == tagName) ret.push(childList[i]);
  }
  return ret;
}

//Esta funcao permite selectionar um objeto (field), e setar o seu valor para "value",
//somente se "setField" for true. Do contrario, so seleciona o obj, sem setar sem valor.
function safeSelect(field, setField, value)
{
    if (setField)
    {
      var state = field.readOnly;
      field.readOnly = false;
      field.value = value;
      field.readOnly = state;
    }
    
    field.select();
}

//Esta funcao substitui o uso da funcao default obj.getElementsByName, visto que a mesma
//nao existe no Mobile IE.
function getElementsByName(fieldName)
{
  var retList = new Array();
  var formList = document.forms;
  for (var i=0; i < formList.length; i++) // Running each form.
  {
    var objList = formList[i].elements;
    for (var j=0; j < objList.length; j++) // Running each element within a form.
    {
      if (objList[j].name == fieldName) retList.push(objList[j]);
    }
  }
  return retList;
}


//Seta o valor do objeto "obj" com o valor "objVal". Se "obj" for uma textbox, ou textarea,
//entao o conteudo do texto especificado por objVal sera usado. Se "obj" for um botao de radio
//Entao a funcao procurara aquele botao de radio que contem o valor igual a "objVal", e chamara
//o metodo "click" do mesmo.
function setObjValue(objName, objVal)
{
  if ( (objName[0].type == "text") || (objName[0].type == "textarea") )
  {
    var state = objName[0].readOnly;
    objName[0].readOnly = false;
    objName[0].value = objVal;
    objName[0].readOnly = state;
  }
  else if (objName[0].type == "radio")
  {
    for (var i=0; i< objName.length; i++)
    {
      if ( objName[i].value == objVal)
      {
        objName[i].click();
        break;
      }
    }
  }
}

function putDate()
{
	var d = new Date();
	var day = d.getDate();
	var month = d.getMonth() + 1;
	var year = d.getFullYear();
	
	document.write(day + "/" + month + "/" + year);
}

function exibeLinhaOculta(tabela, linha)
{
  var obj = document.getElementById(tabela);
  if (obj.tagName == "TABLE") obj.rows[linha].style.display = "";
  else
  {
    obj.style.display = "";
    //Colocando todos os itens habilitados.
    var tagList = getElementsByTagName(obj, "input");
    tagList.concat(getElementsByTagName(obj, "textarea"));
    for (var i=0; i < tagList.length; i++) tagList[i].disabled = false; 
  }

}

function ocultaLinha(tabela, linha)
{
  var obj = document.getElementById(tabela);
  if (obj.tagName == "TABLE") obj.rows[linha].style.display = "none";
  else
  {
    obj.style.display = "none";
    //Colocando todos os itens desabilitados.
    var tagList = getElementsByTagName(obj, "input");
    tagList.concat(getElementsByTagName(obj, "textarea"));
    for (var i=0; i < tagList.length; i++) tagList[i].disabled = true; 
  }
}


var totalPontos = 0;

function pontuacaoIdade()
{
	if (document.check.idade.value < 59)
	{
		totalPontos += 1;
	}
}

function getCheckedValue(radioObj)
{
	if (!radioObj)
		return "";
	var radioLength = radioObj.length;
	if (radioLength == undefined)
		if (radioObj.checked)
			return radioObj.value;
		else
			return "";
	for (var i = 0; i < radioLength; i++)
	{
		if (radioObj[i].checked)
		{
			return radioObj[i].value;
		}
	}
	return "";
}

function pontuacaoSimples(doenca,pontos)
{
	if (doenca == "sim")
	{
		totalPontos += pontos;
	}
}

function pontuacaoSemanas(doenca,semanas)
{
	if (doenca == "sim")
	{
		if (semanas > 2)
		{
			totalPontos += 2;
		}
		else
		{
			totalPontos += 1;
		}
	}
}

function pontosEmagrecimento(pesoAtual,pesoHabitual)
{
	var emagrecimento = pesoHabitual - pesoAtual
	
	if (pesoAtual <= 70)
	{	
		if (emagrecimento >= 3)
		{
			totalPontos += 2
		}
	}
	else
	{
		if (emagrecimento >= 5)
		{
			totalPontos += 2
		}
	}
}

function diagnostico()
{	
	document.check.pontuacao.value = totalPontos
}

function enviar()
{
	var i,j,len,c1,c2;
	var nLinhas = document.getElementById('tabelaSintomas').rows.length;
	c1 = c2 = 0;
	
	if (confirm('Tem certeza que deseja enviar este formul�rio?'))
	{
		for (i = 0; i < nLinhas; i++)
			if (document.getElementById('tabelaSintomas').rows[i].style.display != "none")
			{
				len = document.getElementById('tabelaSintomas').rows[i].getElementsByTagName("input").length;
				for (j = 0; j < len; j++)
				{
					tipo = document.getElementById('tabelaSintomas').rows[i].getElementsByTagName("input")[j].type;
					valor = document.getElementById('tabelaSintomas').rows[i].getElementsByTagName("input")[j].value;
					checked = document.getElementById('tabelaSintomas').rows[i].getElementsByTagName("input")[j].checked;
					
					if (((tipo == "text") || (tipo == "password")) && (valor == ""))
					{
						//document.getElementById('tabelaSintomas').rows[i].getElementsByTagName("input")[j].style.border = medium solid red;
						alert ("Falha no envio: h� campos n�o preenchidos.");
						
						return false;
					}
					
					else if (((tipo == "checkbox") || (tipo == "radio")) && (checked == "false") && (valor != ""))
					{
						c2++;
					}
				}
			}
		return true;
	}
	
	else
		return false;
}

function isNumberString(InString)
{
	if(InString.length==0)
		return (true);
	var RefString="1234567890";
	for (Count=0; Count < InString.length; Count++)
	{
		TempChar= InString.substring (Count, Count+1);
		if (RefString.indexOf (TempChar, 0)==-1)
			return (false);
	}
	return (true);
}

//Valida se o campo e um numero nao-negativo valido.
function validarCampoNumerico(campo)
{
	globalvar = campo;
	
	if(campo.value != "")
	{
		if (!isNumberString(campo.value))
		{
			alert("Valor inv�lido, digite somente n�meros.");
			
			campo.value = "";
			setTimeout("globalvar.focus()",250);
			return (false);
		}
	}
	
	return (true);
}

//Valida se o campo e um numero positivo valido.
function validarCampoNumericoPositivo(campo)
{
	globalvar = campo;
	
	if (campo.readOnly) return; // We don't check if it is read only.

	if(campo.value != "")
	{
		if ((!isNumberString(campo.value)) || (campo.value <= 0))
		{
			alert("Valor inv�lido, digite somente n�meros maiores que zero.");
			
			campo.value = "";
			setTimeout("globalvar.focus()",250);
		}
	}
}


function validarNumEPonto (campo)
{
	if(campo.length == 0)
		return(true);
	var stringRef = ".1234567890";
	for (indice = 0; indice < campo.length; indice ++)
	{
		if(stringRef.indexOf(campo.charAt(indice),0) == -1 )
			return (false);
	}

	return (true);
}

function mudarVirgulaParaPonto (campo)
{
	campo.value = campo.value.replace(/,/g,".");
}

function validarCampoPeso (campo)
{	
	globalvar = campo;

	if(campo.value != "")
	{
		mudarVirgulaParaPonto(campo);
		
		if(validarNumEPonto(campo.value) == false)
		{
			alert("Valor inv�lido, digite somente n�meros, \".\" e \",\".");
			
			campo.value = "";
			setTimeout("globalvar.focus()",250);
			return (false);
		}
	}
	return (true);
}

function trabalharComCampoPeso (campo)
{
	if(validarCampoPeso(campo))
	{
		campo.value = arredondarNcasasDecimais(campo.value,1);
		return (true);
	}

	return (false);
}

function validarPorcentagem(campo)
{
	globalvar = campo;

	if(campo.value != "")
	{
		if (campo.value > 100)
		{
			alert("Digite um valor entre 0 e 100.");
			campo.value = "";
			setTimeout("globalvar.focus()",250);
		}
	}
}

function validarDia(campoDia)
{
	if(campoDia.readOnly == true)
		return true;
		
	if(campoDia.disabled == true)
		return true;

	globalvar = campoDia;
	if(campoDia.value != "")
	{
		if(campoDia.value.length != 2)
		{
			alert("O campo dia deve conter dois d�gitos.");
			campoDia.value = "";
			setTimeout("globalvar.focus()",250);
			return false;
		}
		if(!isNumberString(campoDia.value))
		{
			alert("Valor inv�lido para dia, digite somente n�meros.");
			campoDia.value = "";
			setTimeout("globalvar.focus()",250);			
			return false;
		}
		if(campoDia.value < 1 || campoDia.value > 31)
		{
			alert("Dia inv�lido:" +"\n" +"Use valores entre 01 e 31");
			campoDia.value = "";
			setTimeout("globalvar.focus()",250);
			return false;
		}
	}
	return true;
}

function validarMes(campoMes)
{
	globalvar = campoMes;
	
	if(campoMes.readOnly == true)
		return true;
		
	if(campoMes.disabled == true)
		return true;
	
	if(campoMes.value != "")
	{
		if(campoMes.value.length != 2)
		{
			alert("O campo m�s deve conter dois d�gitos.");
			campoMes.value = "";
			setTimeout("globalvar.focus()",250);
			return false;
		}
		if (!isNumberString(campoMes.value))
		{
			alert("Valor inv�lido para m�s, digite somente n�meros.");
			campoMes.value = "";
			setTimeout("globalvar.focus()",250);
			return false;
		}
		if (campoMes.value < 1 || campoMes.value > 12)
		{
			alert("M�s inv�lido:" +"\n" +"Use valores entre 01 e 12");
			campoMes.value = "";
			setTimeout("globalvar.focus()",250);
			return false;
		}
	}
	return true;
}

function validarAno(campoAno)
{
	if(campoAno.readOnly == true)
		return true;
	
	if(campoAno.disabled == true)
		return true;
		
	globalvar = campoAno;
	if(campoAno.value != "")
	{
		if(campoAno.value.length != 4)
		{
			alert("O campo ano deve conter quatro d�gitos.");
			campoAno.value = "";
			setTimeout("globalvar.focus()",250);
			return false;
		}
		if(!isNumberString(campoAno.value))
		{
			alert("Valor inv�lido para ano, digite somente n�meros.");
			campoAno.value = "";
			setTimeout("globalvar.focus()",250);
			return false;
		}
	}
	return true;
}

function validarQualquerData(campoDia,campoMes,campoAno)
{
	today = new Date();
	dia = Number(campoDia.value);
	mes = Number(campoMes.value);
	ano = Number(campoAno.value);
	dia_atual = today.getDate();
	mes_atual = today.getMonth() + 1;
	ano_atual = today.getFullYear();

	if((dia == "") ||  (mes == "") || (ano == ""))
		return (true);
	
        if(campoMes.disabled != true)
        {
        switch(mes)
	{
		case 1://janeiro
			if(dia<1 || dia>31)
			{
				alert("Dia inv�lido:" +"\n" +"Use valores entre 01 e 31");
				campoDia.value = "";
				globalvar = campoDia;
				setTimeout("globalvar.focus()",250);
				return false;
			}
		break;
		case 2://fevereiro
			if((retcode=(ano-1900)%4 )== 0) // Se o ano e bissexto
			{
				if(dia<1 || dia>29)
				{
					alert("Dia inv�lido:" +"\n" +"Use valores entre 01 e 29, pois este � o m�s de Fevereiro");
					campoDia.value = "";
					globalvar = campoDia;
					setTimeout("globalvar.focus()",250);
					return false;
				}
			}
			else 
				if(dia<1 || dia>28)//O ano nao e bissexto
				{
					alert("Dia inv�lido:" +"\n" +"Use valores entre 01 e 28, pois este � o m�s de Fevereiro");
					campoDia.value = "";
					globalvar = campoDia;
					setTimeout("globalvar.focus()",250);
					return false;
				}
		break;
		case 3://marco
			if(dia<1 || dia>31)
			{
				alert("Dia inv�lido:" +"\n" +"Use valores entre 01 e 31");
				campoDia.value = "";
				globalvar = campoDia;
				setTimeout("globalvar.focus()",250);
				return false;
			}
		break;
		case 4://abril
			if(dia<1 || dia>30)
			{
				alert("Dia inv�lido:" +"\n" +"Use valores entre 01 e 30");
				campoDia.value = "";
				globalvar = campoDia;
				setTimeout("globalvar.focus()",250);
				return false;
			}
		break;
		case 5://maio
			if(dia<1 || dia>31)
			{
				alert("Dia inv�lido:" +"\n" +"Use valores entre 01 e 31");
				campoDia.value = "";
				globalvar = campoDia;
				setTimeout("globalvar.focus()",250);
				return false;
			}
		break;
		case 6://junho
			if(dia<1 || dia>30)
			{
				alert("Dia inv�lido:" +"\n" +"Use valores entre 01 e 30");
				campoDia.value = "";
				globalvar = campoDia;
				setTimeout("globalvar.focus()",250);
				return false;
			}
		break;
		case 7://julho
			if(dia<1 || dia>31)
			{
				alert("Dia inv�lido:" +"\n" +"Use valores entre 01 e 31");
				campoDia.value = "";
				globalvar = campoDia;
				setTimeout("globalvar.focus()",250);
				return false;
			}
		break;
		case 8://agosto
			if(dia<1 || dia>31)
			{
				alert("Dia inv�lido:" +"\n" +"Use valores entre 01 e 31");
				campoDia.value = "";
				globalvar = campoDia;
				setTimeout("globalvar.focus()",250);
				return false;
			}
		break;
		case 9://setembro
			if(dia<1 || dia>30)
			{
				alert("Dia inv�lido:" +"\n" +"Use valores entre 01 e 30");
				campoDia.value = "";
				globalvar = campoDia;
				setTimeout("globalvar.focus()",250);
				return false;
			}
		break;
		case 10://outubro
			if(dia<1 || dia>31)
			{
				alert("Dia inv�lido:" +"\n" +"Use valores entre 01 e 31");
				campoDia.value = "";
				globalvar = campoDia;
				setTimeout("globalvar.focus()",250);
				return false;
			}
		break;
		case 11://novembro
			if(dia<1 || dia>30)
			{
				alert("Dia inv�lido:" +"\n" +"Use valores entre 01 e 30");
				campoDia.value = "";
				globalvar = campoDia;
				setTimeout("globalvar.focus()",250);
				return false;
			}
		break;
		case 12://dezembro
			if(dia<1 || dia>31)
			{
				alert("Dia inv�lido:" +"\n" +"Use valores entre 01 e 31");
				campoDia.value = "";
				globalvar = campoDia;
				setTimeout("globalvar.focus()",250);
				return false;
			}
		break;
		default://mes inv�lido
		
		alert("M�s inv�lido:" +"\n" +"Use valores entre 01 e 12");
		campoMes.value = "";
		globalvar = campoMes;
		setTimeout("globalvar.focus()",250);
		return false;
	}
        }
        
	if(((dia > dia_atual) && (mes == mes_atual) && (ano == ano_atual)) || ((mes > mes_atual) && (ano == ano_atual)) || (ano > ano_atual))
	{ 	
			alert("Data inv�lida, a data preenchida n�o pode ser posterior a data de hoje.");
                        campoDia.value = "";
			campoMes.value = "";
			campoAno.value = "";
			if(campoDia.value == undefined)
                            globalvar = campoMes;
                        else
                            globalvar = campoDia;
			setTimeout("globalvar.focus()",250);
			return false;
	}
	
	return true;
}

/*
  Funcao que valida qualquer data....
  Verifica se eh uma data valida...
  Se eh posterio a data atual...
  Se eh anterior a data de nascimento.....
*/
function validarData(dia,mes,ano)
{			
	if((dia.readOnly == true) || (mes.readOnly == true) || (ano.readOnly == true))
		return true;

	if(validarQualquerData(dia,mes,ano))
	{	
		if((document.check.ano_nascimento.value != "") && (document.check.mes_nascimento.value != "") && (document.check.dia_nascimento.value != ""))
		{
			if((document.check.ano_nascimento.value != "") && (document.check.mes_nascimento.value == "XX") && (document.check.dia_nascimento.value == "XX"))
			{
				if(parseInt(ano.value) < parseInt(document.check.ano_nascimento.value))
				{
					alert("Data inv�lida. A data n�o pode ser anterior � data de nascimento do paciente.");
					ano.value = "";
					globalvar = ano;
					setTimeout("globalvar.focus()",250);
				}
			}
			else
			{
				if ((parseInt(ano.value) < parseInt(document.check.ano_nascimento.value)) || ((mes.value < document.check.mes_nascimento.value) && (ano.value == document.check.ano_nascimento.value)) || ((parseInt(dia.value) < parseInt(document.check.dia_nascimento.value)) && (parseInt(mes.value) == parseInt(document.check.mes_nascimento.value)) && (parseInt(ano.value) == parseInt(document.check.ano_nascimento.value))))
				{
					alert("Data inv�lida. A data n�o pode ser anterior � data de nascimento do paciente.");
					dia.value="";
					mes.value="";
					ano.value="";
			                if(dia.value == undefined)
                                            globalvar = mes;
                                        else
                                            globalvar = dia;
					setTimeout("globalvar.focus()",250);
					
					return false;
				}
			}
		}
		return true;
	}
	return false;
}

/*
  Funcao que valida data de nascimento....
  Verifica se eh uma data valida...
  Se eh posterior a data atual...
  Se com essa data o paciente vai ter mais de 120 anos.....
*/
function validarDataDeNascimento(form)
{
	today = new Date();
	dia = form.dia_nascimento;
	mes = form.mes_nascimento;
	ano = form.ano_nascimento;
	dia_atual =today.getDate();
	mes_atual =today.getMonth();
	ano_atual =today.getFullYear();
	
	if((dia.readOnly == true) || (mes.readOnly == true) || (ano.readOnly == true))
		return true;
		
	if((dia.value == "") || (mes.value == "") || (ano.value == ""))
		return (true);
		
	if(validarQualquerData(dia,mes,ano))
	{
		if ((ano_atual - ano < 1) || (ano_atual - ano > 120) || (ano_atual - ano == 1 && mes_atual - mes < 1) || (ano_atual - ano == 1 && mes_atual == mes && dia_atual - dia < 1))
		{
			alert("Ano inv�lido:\n A idade n�o deve ser maior que 120 anos, nem menor do que 1 ano.");
			form.dia_nascimento.value = "";
			form.mes_nascimento.value = "";
			form.ano_nascimento.value = "";
			setTimeout("form.ano_nascimento.focus()",250);
			return false;
		}
		return true;
	}	
	return false;
}

function validarIdade(campoIdade)
{
	globalvar = campoIdade;
	if(campoIdade.value != "")
	{
		if(!isNumberString(campoIdade.value))
		{
			alert("Valor inv�lido para idade, digite somente n�meros.");
			campoIdade.value = "";
			setTimeout("globalvar.focus()",250);
			return false;
		}			
		if ((campoIdade.value < 1 || campoIdade.value > 120) && campoIdade.value != "")
		{
			alert("Ano inv�lido:\n A idade nao deve ser maior que 120 anos, nem menor do que 1 ano.");
			campoIdade.value = "";
			setTimeout("globalvar.focus()",250);
			return false;
		}
	}
	
	return true;
}

function habilitaIdade(form)
{
	if (form.habilita_idade.checked)
 	{
		setTimeout("form.idade.focus()",250);
		form.dia_nascimento.value = "XX";
		form.mes_nascimento.value = "XX";
		form.ano_nascimento.value = "XXXX";
		form.idade.value = "";
		form.idade.readOnly = false;
		form.dia_nascimento.readOnly = true;
		form.mes_nascimento.readOnly = true;
		form.ano_nascimento.readOnly = true;
		document.getElementById("aproximadamente").innerHTML = tabFields[14][1] + " aproximada:";
	}
	else
	{
		form.dia_nascimento.value = "";
		form.mes_nascimento.value = "";
		form.ano_nascimento.value = "";
		form.idade.value= "";
		form.idade.readOnly = true;
		form.dia_nascimento.readOnly = false;
		form.mes_nascimento.readOnly = false;
		form.ano_nascimento.readOnly = false;
		document.getElementById("aproximadamente").innerHTML = tabFields[14][1] + ":";
		setTimeout("form.dia_nascimento.focus()",250);
	}
}

function calcularAnoNascimento(idade)
{
	today = new Date();
	anoAtual = today.getFullYear();
	return (anoAtual - idade);
}

function calcularIdade(diaNascimento, mesNascimento, anoNascimento)
{
	today = new Date();
	diaAtual = today.getDate();
	mesAtual = today.getMonth();
	anoAtual = today.getFullYear();
	idade = (anoAtual - anoNascimento);
	if(mesNascimento-1 > mesAtual)
		idade--;
	if(mesNascimento-1 == mesAtual)
		if(diaNascimento > diaAtual)
			idade--;
	return(idade);
}

function getElement(aID){ 
    return (document.getElementById(aID)) || document.all[aID];
}

function validarHora(campo)
{
	globalvar = campo;
	if(campo.value != "")
	{
		if (campo.value.length == 1)
		{
			alert("A hora precisa ter exatamente 2 d�gitos.");
			campo.value = "";
			setTimeout("globalvar.focus()",250); 
			return false;    
		}
	  
		if (campo.value > 23)
		{
			alert("Digite um valor entre 0 e 23.");
			campo.value = "";
			setTimeout("globalvar.focus()",250);
			return false;
		}
	}
	return true;
}

function validarMinuto(campo)
{
	globalvar = campo;
	if(campo.value != "")
	{
		if (campo.value.length == 1)
		{
			alert("Os minutos precisam ter exatamente 2 d�gitos.");
			campo.value = ""; 
			setTimeout("globalvar.focus()",250);
			return false;    
		}

		if (campo.value > 59)
		{
			alert("Digite um valor entre 0 e 59.");
			campo.value = ""; 
			setTimeout("globalvar.focus()",250);
			return false;
		}
	}
	return true;
}

function validarTempo(campo)
{
	globalvar = campo;
	if(campo.value != "")
	{
		if(parseInt(document.check.idade.value) < parseInt(campo.value))
		{
			alert("Valor inv�lido, este valor deve ser menor do que a idade do paciente.");
			campo.value = "";
			setTimeout("globalvar.focus()",250);
		}
	}
}

function showmenu(elmnt)
{
	document.getElementById(elmnt).style.visibility = "visible";
}

function hidemenu(elmnt)
{
	document.getElementById(elmnt).style.visibility = "hidden";
}

function calcularCage(campo)
{
	if (campo == "sim")
	{
		cagePontos += 1;
	}
}

function escreverCage()
{
	if (getCheckedValue(document.check.facilidadeFazerAmizades) == "sim")
	{
		document.check.cage.value = "POSITIVO";
	}
	else
	{
		cagePontos = 0;

		calcularCage(getCheckedValue(document.check.diminuirQtdBebida));
		calcularCage(getCheckedValue(document.check.criticaModoBeber));
		calcularCage(getCheckedValue(document.check.bebidaManha));
		calcularCage(getCheckedValue(document.check.culpadoManeiraBeber));
	
		if (cagePontos < 4)
		{
			document.check.cage.value = "POSITIVO";
		}
		else
		{
			document.check.cage.value = "NEGATIVO";
		}
	}
}

function definirCage()
{
	document.check.cage.value = "Negativo";		
	
	if ((getCheckedValue(document.check.diminuirQtdBebida) == "sim") && (getCheckedValue(document.check.criticaModoBeber) == "sim"))
	{
		document.check.cage.value = "Positivo";
	}
	
	if ((getCheckedValue(document.check.diminuirQtdBebida) == "sim") && (getCheckedValue(document.check.bebidaManha) == "sim"))
	{
		document.check.cage.value = "Positivo";
	}
	
	if ((getCheckedValue(document.check.diminuirQtdBebida) == "sim") && (getCheckedValue(document.check.culpadoManeiraBeber) == "sim"))
	{
		document.check.cage.value = "Positivo";
	}
	
	if ((getCheckedValue(document.check.criticaModoBeber) == "sim") && (getCheckedValue(document.check.bebidaManha) == "sim"))
	{
		document.check.cage.value = "Positivo";
	}
		
	if ((getCheckedValue(document.check.criticaModoBeber) == "sim") && (getCheckedValue(document.check.culpadoManeiraBeber) == "sim"))
	{
		document.check.cage.value = "Positivo";
	}
	
	if ((getCheckedValue(document.check.bebidaManha) == "sim") && (getCheckedValue(document.check.culpadoManeiraBeber) == "sim"))
	{
		document.check.cage.value = "Positivo";
	}
}

function confirmar(form)
{ 
    if (confirm('Tem certeza que deseja enviar este formul�rio?'))

	{ 
       document.form.submit() 
    } 
} 

function arredondarNcasasDecimais (valor, casas)
{
   var numeroArredondado = Math.round(valor * Math.pow(10,casas)) / Math.pow(10,casas);
   
   return numeroArredondado;
}

function perdaPeso(habitual,atual)
{
	var perda;
	var habitualDez
	
	perda = habitual - atual;
	habitualDez = habitual * 0.1;
	if (perda > habitualDez)
	{
		document.check.perdaDePeso.value = "SIM";
		setTimeout("document.check.perdaDePeso_semanas.focus()",250);
		return false;
	}
	else
	{
		document.check.perdaDePeso.value = "nao";
		return true;
	}
}

function naturalidade ( campo1, campo2) /* naturalidadeEstado,,, naturalidadeCidade */
{
	if(campo1.value != 'RJ' && campo1.value != "")
		return false;

	if(campo1.value == 'RJ')
		if(campo2.value.toUpperCase() != "RIO DE JANEIRO")
			return false;

	return true;
}

function validarTempoViagem (horaA,minA,horaB,minB,horaC,minC,tempoTotalHora,tempoTotalMin)
/**
	A - Que horas voc� saiu de casa?
	B - Que horas voc� chegou no posto?
	C - Que horas voc� viu o m�dico?
**/
{
	var tempoA,tempoB,tempoC;
	tempoA = tempoB = tempoC = 0;
	
	tempoA = (Number(horaA.value)*60) + Number(minA.value);
	tempoB = (Number(horaB.value)*60) + Number(minB.value);
	tempoC = (Number(horaC.value)*60) + Number(minC.value);

	if((horaA.value != "") && (minA.value != "") && (horaB.value != "") && (minB.value != ""))
	{
		if(tempoB < tempoA)
		{
			alert("A hora que voc� chegou no posto de sa�de n�o pode ser anterior a hora que voc� saiu de casa.");
			horaB.value = "";
			minB.value = "";
			globalvar = horaB;
			setTimeout("globalvar.focus()",250);
			return false;
		}
		
		if((tempoB < tempoA) && (tempoC < tempoB))
		{
			alert("A hora que voc� chegou no posto de sa�de e a hora em que voc� viu o m�dico n�o podem ser anteriores a hora que voc� saiu de casa.");
			horaB.value = "";
			minB.value = "";
			horaC.value = "";
			minC.value = "";
			globalvar = horaB;
			setTimeout("globalvar.focus()",250);
			return false;
		}
		if((horaC.value != "") && (minC.value != ""))
		{	
			if(tempoC < tempoB)
			{
				alert("A hora em que voc� viu o m�dico n�o pode ser anterior a hora que voc� chegou no posto.");
				horaC.value = "";
				minC.value = "";
				globalvar = horaC;
				setTimeout("globalvar.focus()",250);
				return false
			}
			/** CALCULO DO TEMPO QUE LEVOU PARA SAIR DE CASA ATEH SER ATENDIDO PELO MEDICO **/
			
			tempoTotalMin.value = (tempoC - tempoA) % 60;
			if (tempoTotalMin.value.length == 1) 
				tempoTotalMin.value = "0" + tempoTotalMin.value;
				
			tempoTotalHora.value = ((tempoC - tempoA) - tempoTotalMin.value) / 60;
			if (tempoTotalHora.value.length == 1) 
				tempoTotalHora.value = "0" + tempoTotalHora.value;
		}
	}
	return true;
}

function validar_hora_escarro (horaA,minA,horaB,minB)
{
/**
	A - Quando voc� teve que trazer a 2� amostra de escarro h� alguns dias, em que hor�rio voc� escarrou no potinho?
	B - Que horas voc� acordou no dia de escarrar pela segunda vez no potinho?
**/
	var tempoA = tempoB = 0;
	
	tempoA = (Number(horaA.value)*60) + Number(minA.value);
	tempoB = (Number(horaB.value)*60) + Number(minB.value);
	
	if((horaA.value != "") && (minA.value != "") && (horaB.value != "") && (minB.value != ""))
		if(tempoA < tempoB)
		{
			alert("A hora em que voc� coletou o escarro no potinho n�o pode ser anterior a hora em que voc� acordou para coletar o escarro.");
			horaB.value = "";
			minB.value = "";
			horaA.value = "";
			minA.value = "";
			globalvar = horaA;
			setTimeout("globalvar.focus()",250);
			return false;
		}
	
	return true;
}

function validarNumeroDeDigitos (campo, num)
{
	if(campo.value != "")
	{
		if(campo.value.length != num)
		{
			alert("Este campo deve conter " + num + " d�gitos.");
			campo.value = "";
			globalvar = campo;
			setTimeout("globalvar.focus()",250);
		}
	}
}

function desabilitarRadio (name, num)
{
	for(indice=0; indice< num; indice++)
		name[indice].disabled = true;
}

function habilitarRadio (name, num)
{
	for(indice=0; indice< num; indice++)
		name[indice].disabled = false;
}

/*
**	para as funcoes desabilitarRadio e habilitarRadio
**	name -> nome do campo
**	num -> numero de opcoes do campo
*/
