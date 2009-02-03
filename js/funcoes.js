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

/*
function enviar()
{
	var i,j,len;
	var str = "Linhas escondidas: ";
	var nroLinhas = document.getElementById('tabelaSintomas').rows.length - 8;
	if (confirm('Tem certeza que deseja enviar este formulário?'))
	{
		for (i = 0; i < nroLinhas; i++)
			if (document.getElementById('tabelaSintomas').rows[i].style.display != "none")
			{
				len = document.getElementById('tabelaSintomas').rows[i].getElementsByTagName("input").length;
				for (j = 0; j < len; j++)
				{
					nomeCampo = document.getElementById('tabelaSintomas').rows[i].getElementsByTagName("input")[j].name;
					switch (document.getElementsByName(nomeCampo).length)
					{
						case 1:
							if(document.getElementById('tabelaSintomas').rows[i].getElementsByTagName("input")[j].value == "")
							{
								alert("Falha no envio: ha campos nao preenchidos.");
								return false;
							}
						break;
						case 2:
						if(document.getElementById('tabelaSintomas').rows[i].getElementsByTagName("input")[j].checked == false && document.getElementById('tabelaSintomas').rows[i].getElementsByTagName("input")[++j].checked == false)
						{
							alert("Falha no envio: ha campos nao preenchidos.");
							return false;
						}
						break;
						case 3:
						if(document.getElementById('tabelaSintomas').rows[i].getElementsByTagName("input")[j].checked == false && document.getElementById('tabelaSintomas').rows[i].getElementsByTagName("input")[++j].checked == false && document.getElementById('tabelaSintomas').rows[i].getElementsByTagName("input")[++j].checked == false)
						{
							alert("Falha no envio: ha campos nao preenchidos.");
							return false;
						}
						break;
					}
				}
			}
		return true;
	}
	else
	{
		return false;
	}
}
*/

function enviar()
{
	var i,j,len,c1,c2;
	var nLinhas = document.getElementById('tabelaSintomas').rows.length;
	c1 = c2 = 0;
	
	if (confirm('Tem certeza que deseja enviar este formulário?'))
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
						alert ("Falha no envio: há campos não preenchidos.");
						
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
	if (!isNumberString(campo.value))
	{
		alert("Valor inválido, digite somente números.");
		
		campo.value = '';
		campo.focus();
	}
}

//Valida se o campo e um numero positivo valido.
function validarCampoNumericoPositivo(campo)
{
	if ( (!isNumberString(campo.value)) || (campo.value <= 0) )
	{
		alert("Valor inválido, digite somente números maiores que zero.");
		
		campo.value = '';
		campo.focus();
	}
}


function validarNumEPonto (campo)
{
	if(campo.length == 0)
		return(true);
	var stringRef = ".,1234567890";
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
	mudarVirgulaParaPonto(campo);
	
	if(validarNumEPonto(campo.value) == false)
	{
		alert("Valor inválido, digite somente números, \".\" e \",\".");
		campo.value = "";
		return false;
	}
	return true;
}

function trabalharComCampoPeso (campo)
{
	if(validarCampoPeso(campo))
	{
		campo.value = arredondarNcasasDecimais(campo.value,1);
		return true;
	}

	return false;
}

function validarPorcentagem(campo)
{
	if (campo.value > 100)
	{
		alert("Digite um valor entre 0 e 100.");
		campo.value = "";
	}
}

function validarDia(campoDia)
{
	if(campoDia.value != '')
	{
		if(campoDia.value.length != 2)
		{
			alert("O campo dia deve conter dois dígitos.");
			campoDia.value = '';
			campoDia.focus();
			return false;
		}
		if(!isNumberString(campoDia.value))
		{
			alert("Valor inválido para dia, digite somente números.");
			campoDia.value = '';
			campoDia.focus();
			return false;
		}
		if(campoDia.value < 1 || campoDia.value > 31)
		{
			alert("Dia inválido:" +"\n" +"Use valores entre 01 e 31");
			campoDia.value = '';
			campoDia.focus();
			return false;
		}
	}
	return true;
}

function validarMes(campoMes)
{
	if(campoMes.value != '')
	{
		if(campoMes.value.length != 2)
		{
			alert("O campo mês deve conter dois dígitos.");
			campoMes.value = '';
			campoMes.focus();
			return false;
		}
		if (!isNumberString(campoMes.value))
		{
			alert("Valor inválido para mês, digite somente números.");
			campoMes.value = '';
			campoMes.focus();
			return false;
		}
		if (campoMes.value < 1 || campoMes.value > 12)
		{
			alert("Mês inválido:" +"\n" +"Use valores entre 01 e 12");
			campoMes.value = '';
			campoMes.focus();
			return false;
		}
	}
	return true;
}

function validarAno(campoAno)
{
	if(campoAno.value != '')
	{
		if(campoAno.value.length != 4)
		{
			alert("O campo ano deve conter quatro dígitos.");

			campoAno.value = '';
			campoAno.focus();
			return false;
		}
		if(!isNumberString(campoAno.value))
		{
			alert("Valor inválido para ano, digite somente números.");
			campoAno.value = '';
			campoAno.focus();
			return false;
		}
	}
	return true;
}

function validarIdade(campoIdade)
{
	if(!isNumberString(campoIdade.value))
	{
		alert("Valor inválido para idade, digite somente números.");
		campoIdade.focus();
		campoIdade.select();
		return false;
	}			
	if ((campoIdade.value < 1 || campoIdade.value > 120) && campoIdade.value != "")
	{
		alert("Ano inválido:\n A idade nao deve ser maior que 120 anos, nem menor do que 1 ano.");
		campoIdade.focus();
		campoIdade.select();
		return false;
	}
	return true;
}

function validarData(form)
{
	today = new Date();
	dia = form.dia_nascimento.value;
	mes = form.mes_nascimento.value;
	ano = form.ano_nascimento.value;
	dia_atual =today.getDate();
	mes_atual =today.getMonth();
	ano_atual =today.getFullYear();

	switch(mes)
	{
		case '01'://janeiro
			if(dia<1 || dia>31)
			{
				alert("Dia inválido:" +"\n" +"Use valores entre 01 e 31");
				form.dia_nascimento.focus();
				form.dia_nascimento.select();
				return false;
			}
		break;
		case '02'://fevereiro
		if((retcode=(ano-1900)%4 )== 0) // Se o ano e bissexto
		{
			if(dia<1 || dia>29)
			{
				alert("Dia inválido:" +"\n" +"Use valores entre 01 e 29, pois este é o mes de Fevereiro");
				
				form.dia_nascimento.focus();
				form.dia_nascimento.select();
				return false;
			}
		}
		else 
			if(dia<1 || dia>28)//O ano nao e bissexto
			{
				alert("Dia inválido:" +"\n" +"Use valores entre 01 e 28, pois este é o mes de Fevereiro");
				
				form.dia_nascimento.focus();
				form.dia_nascimento.select();
				return false;
			}
		break;
		case '03'://marco
			if(dia<1 || dia>31)
			{
				alert("Dia inválido:" +"\n" +"Use valores entre 01 e 31");
				form.dia_nascimento.focus();
				form.dia_nascimento.select();
				return false;
			}
		break;
		case '04'://abril
		if(dia<1 || dia>30)
		{
			alert("Dia inválido:" +"\n" +"Use valores entre 01 e 30");
			form.dia_nascimento.focus();
			form.dia_nascimento.select();
			return false;
		}
		break;
		case '05'://maio
			if(dia<1 || dia>31)
			{
				alert("Dia inválido:" +"\n" +"Use valores entre 01 e 31");
				form.dia_nascimento.focus();
				form.dia_nascimento.select();
				return false;
			}
		break;
		case '06'://junho
		if(dia<1 || dia>30)
		{
			alert("Dia inválido:" +"\n" +"Use valores entre 01 e 30");
			form.dia_nascimento.focus();
			form.dia_nascimento.select();
			return false;
		}
		break;
		case '07'://julho
			if(dia<1 || dia>31)
			{
				alert("Dia inválido:" +"\n" +"Use valores entre 01 e 31");
				form.dia_nascimento.focus();
				form.dia_nascimento.select();
				return false;
			}
		break;
		case '08'://agosto
			if(dia<1 || dia>31)
			{
				alert("Dia inválido:" +"\n" +"Use valores entre 01 e 31");
				form.dia_nascimento.focus();
				form.dia_nascimento.select();
				return false;
			}
		break;
		case '09'://setembro
			if(dia<1 || dia>30)
			{
				alert("Dia inválido:" +"\n" +"Use valores entre 01 e 30");
				form.dia_nascimento.focus();
				form.dia_nascimento.select();
				return false;
			}
		break;
		case '10'://outubro
			if(dia<1 || dia>31)
			{
				alert("Dia inválido:" +"\n" +"Use valores entre 01 e 31");
				form.dia_nascimento.focus();
				form.dia_nascimento.select();
				return false;
			}
		break;
		case '11'://novembro
			if(dia<1 || dia>30)
			{
				alert("Dia inválido:" +"\n" +"Use valores entre 01 e 30");
				form.dia_nascimento.focus();
				form.dia_nascimento.select();
				return false;
			}
		break;
		case '12'://dezembro
			if(dia<1 || dia>31)
			{
				alert("Dia inválido:" +"\n" +"Use valores entre 01 e 31");
				form.dia_nascimento.focus();
				form.dia_nascimento.select();
				return false;
			}
		break;
		default://mes inválido
		alert("Mês inválido:" +"\n" +"Use valores entre 01 e 12");
		form.mes_nascimento.focus();
		form.mes_nascimento.select();
		return false;
	}
	if ((ano_atual - ano < 1) || (ano_atual - ano > 120) || (ano_atual - ano == 1 && mes_atual - mes < 1) || (ano_atual - ano == 1 && mes_atual == mes && dia_atual - dia < 1))
	{
		alert("Ano inválido:\n A idade não deve ser maior que 120 anos, nem menor do que 1 ano.");

		form.ano_nascimento.focus();
		form.ano_nascimento.select();
		return false;
	}
	BirthDay = new Date(ano, mes-1 ,dia);
	if(BirthDay.getTime()>today.getTime())
	{
		alert("A data de nascimento não pode ser posterior a data de hoje");
		form.ano_nascimento.focus();
		form.ano_nascimento.select();
		return false;
	}
	return true;
}

function habilitaIdade(form)
{
	if (form.habilita_idade.checked)
 	{
		form.dia_nascimento.value = "XX";
		form.mes_nascimento.value = "XX";
		form.ano_nascimento.value = "XXXX";
		form.idade.value = "";
		form.idade.readOnly = false;
		form.dia_nascimento.readOnly = true;
		form.mes_nascimento.readOnly = true;
		form.ano_nascimento.readOnly = true;
		form.idade.focus();
		document.getElementById("aproximadamente").innerHTML = tabFields[14][1] + " aproximada:";
	}
	else
	{
		form.dia_nascimento.value = '';
		form.mes_nascimento.value = '';
		form.ano_nascimento.value = '';
		form.idade.value= '';
		form.idade.readOnly = true;
		form.dia_nascimento.readOnly = false;
		form.mes_nascimento.readOnly = false;
		form.ano_nascimento.readOnly = false;
		document.getElementById("aproximadamente").innerHTML = tabFields[14][1] + ":";
		form.dia_nascimento.focus();
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
	diaAtual =today.getDate();
	mesAtual =today.getMonth();
	anoAtual = today.getFullYear();
	idade= (anoAtual - anoNascimento);
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
  if (campo.value.length == 1)
  {
		alert("A hora precisa ter exatamente 2 dígitos.");
		campo.focus();
		campo.select();
		campo.value = ''; 
		return false;    
  }
  
	if (campo.value > 23)
	{
		alert("Digite um valor entre 0 e 23.");
		campo.focus();
		campo.select();
		campo.value = '';
		return false;
	}
	return true;
}

function validarMinuto(campo)
{
  if (campo.value.length == 1)
  {
		alert("Os minutos precisam ter exatamente 2 dígitos.");
		campo.focus();
		campo.select();
		campo.value = ''; 
		return false;    
  }

	if (campo.value > 59)
	{
		alert("Digite um valor entre 0 e 59.");
		campo.focus();
		campo.select();
		campo.value = ''; 
		return false;
	}
	return true;
}

function validarTempo(campo)
{
	if(parseInt(document.check.idade.value) < parseInt(campo.value))
	{
		alert("O valor deve ser menor do que a idade do paciente.");
		campo.focus();
		campo.select();
	}
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

	if((dia == 0) && (mes == 0) && (ano == 0))
		return true;
	
	switch(mes)
	{
		case 1://janeiro
			if(dia<1 || dia>31)
			{
				alert("Dia inválido:" +"\n" +"Use valores entre 01 e 31");
				campoDia.value = '';
				campoDia.focus();
				return false;
			}
		break;
		case 2://fevereiro
			if((retcode=(ano-1900)%4 )== 0) // Se o ano e bissexto
			{
				if(dia<1 || dia>29)
				{
					alert("Dia inválido:" +"\n" +"Use valores entre 01 e 29, pois este é o mês de Fevereiro");

					campoDia.value = '';
					campoDia.focus();
					return false;
				}
			}
			else 
				if(dia<1 || dia>28)//O ano nao e bissexto
				{
					alert("Dia inválido:" +"\n" +"Use valores entre 01 e 28, pois este é o mês de Fevereiro");
					
					campoDia.value = '';
					campoDia.focus();
					return false;
				}
		break;
		case 3://marco
			if(dia<1 || dia>31)
			{
				alert("Dia inválido:" +"\n" +"Use valores entre 01 e 31");
				campoDia.value = '';
				campoDia.focus();
				return false;
			}
		break;
		case 4://abril
			if(dia<1 || dia>30)
			{
				alert("Dia inválido:" +"\n" +"Use valores entre 01 e 30");
				campoDia.value = '';
					campoDia.focus();
				return false;
			}
		break;
		case 5://maio
			if(dia<1 || dia>31)
			{
				alert("Dia inválido:" +"\n" +"Use valores entre 01 e 31");
				campoDia.value = '';
				campoDia.focus();
				return false;
			}
		break;
		case 6://junho
			if(dia<1 || dia>30)
			{
				alert("Dia inválido:" +"\n" +"Use valores entre 01 e 30");
				campoDia.value = '';
					campoDia.focus();
				return false;
			}
		break;
		case 7://julho
			if(dia<1 || dia>31)
			{
				alert("Dia inválido:" +"\n" +"Use valores entre 01 e 31");
				campoDia.value = '';
				campoDia.focus();
				return false;
			}
		break;
		case 8://agosto
			if(dia<1 || dia>31)
			{
				alert("Dia inválido:" +"\n" +"Use valores entre 01 e 31");
				campoDia.value = '';
				campoDia.focus();
				return false;
			}
		break;
		case 9://setembro
			if(dia<1 || dia>30)
			{
				alert("Dia inválido:" +"\n" +"Use valores entre 01 e 30");
				campoDia.value = '';
				campoDia.focus();
				return false;
			}
		break;
		case 10://outubro
			if(dia<1 || dia>31)
			{
				alert("Dia inválido:" +"\n" +"Use valores entre 01 e 31");
				campoDia.value = '';
				campoDia.focus();
				return false;
			}
		break;
		case 11://novembro
			if(dia<1 || dia>30)
			{
				alert("Dia inválido:" +"\n" +"Use valores entre 01 e 30");
				campoDia.value = '';
				campoDia.focus();
				return false;
			}
		break;
		case 12://dezembro
			if(dia<1 || dia>31)
			{
				alert("Dia inválido:" +"\n" +"Use valores entre 01 e 31");
				campoDia.value = '';
				campoDia.focus();
				return false;
			}
		break;
		default://mes inválido
		
		alert("Mês inválido:" +"\n" +"Use valores entre 01 e 12");

		campoMes.value = '';
		campoMes.focus();
		return false;
	}
	/*if ((ano_atual - ano < 1) || (ano_atual - ano > 120) || (ano_atual - ano == 1 && mes_atual - mes < 1) || (ano_atual - ano == 1 && mes_atual == mes && dia_atual - dia < 1))
	{
		alert("Ano inválido:\n A idade nao deve ser maior que 120 anos, nem menor do que 1 ano.");
		campoAno.focus();
		campoAno.select();
		return false;
	}
	BirthDay = new Date(ano, mes-1 ,dia);
	if(BirthDay.getTime()>today.getTime())
	{
		alert("A data de nascimento nao pode ser posterior a data de hoje");
		campoAno.focus();
		campoAno.select();
		return false;
	} */
	
	if(((dia > dia_atual) && (mes == mes_atual) && (ano == ano_atual)) || ((mes > mes_atual) && (ano == ano_atual)) || (ano > ano_atual))
	{ 	
			alert("A data preenchida não pode ser posterior a data de hoje.");
			campoDia.value = '';
			campoMes.value = '';
			campoAno.value = '';
			campoDia.focus();
			return false;
	}
	
	return true;
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
    if (confirm('Tem certeza que deseja enviar este formulário?'))

	{ 
       document.form.submit() 
    } 
} 

function arredondarNcasasDecimais (valor, casas)
{
   var numeroArredondado = Math.round(valor * Math.pow(10,casas)) / Math.pow(10,casas);

   //valor = numeroArredondado;
   
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
		document.check.perdaDePeso_semanas.disabled = false;
		document.check.perdaDePeso_semanas.select();
	}
	else
	{
		document.check.perdaDePeso.value = "nao";
		document.check.perdaDePeso_semanas.disabled = true;
	}
}

function validarDataExame(dia,mes,ano)
{	
	var d = new Date();
	var Dia = d.getDate();
	var Mes = d.getMonth() + 1;
	var Ano = d.getFullYear();
		
	if (ano.value > Ano)
	{
		alert("Data inválida. Por favor, digite uma data anterior à data de hoje.");

		dia.value="";
		mes.value="";
		ano.value="";
		dia.focus();
	}	
	else if (parseInt(ano.value) < parseInt(document.check.ano_nascimento.value))
	{
		alert("Data inválida. A data não pode ser anterior ao nascimento do paciente.");
		dia.value="";
		mes.value="";
		ano.value="";
		dia.focus();
	}
	else
	{
		if (ano.value == Ano)
		{
			if (mes.value > Mes)
			{
				alert("Data inválida. Por favor, digite uma data anterior à data de hoje.");

				dia.value="";
				mes.value="";
				ano.value="";
				dia.focus();
			}
			else
			{
				if (mes.value == Mes)
				{
					if (dia.value > Dia)
					{
						alert("Data inválida. Por favor, digite uma data anterior à data de hoje.");

						dia.value="";
						mes.value="";
						ano.value="";
						dia.focus();
					}	
				}
			}
		}
	}
}


function naturalidade ( campo1, campo2) /* naturalidadeEstado,,, naturalidadeCidade */
{
	if(campo1.value != 'RJ' && campo1.value != '')
		return false;

	if(campo1.value == 'RJ')
		if(campo2.value.toUpperCase() != "RIO DE JANEIRO")
			return false;

	return true;
}

function validar_tempo_de_viagem_custos_A (horaA,minA,horaB,minB,horaC,minC,tempoTotalHora,tempoTotalMin)
/**
	A - Que horas você saiu de casa?
	B - Que horas você chegou no posto?
	C - Que horas você viu o médico?
**/
{
	var tempoA,tempoB,tempoC;
	tempoA = tempoB = tempoC = 0;
	
	tempoA = (Number(horaA.value)*60) + Number(minA.value);
	tempoB = (Number(horaB.value)*60) + Number(minB.value);
	tempoC = (Number(horaC.value)*60) + Number(minC.value);

	if((horaA.value != '') && (minA.value != '') && (horaB.value != '') && (minB.value != ''))
	{
		if(tempoB < tempoA)
		{
			alert("A hora que você chegou no posto de saúde não pode ser anterior a hora que você saiu de casa.");
			horaB.value = '';
			minB.value = '';
			horaB.focus();
			return false;
		}
		
		if((tempoB < tempoA) && (tempoC < tempoB))
		{
			alert("A hora que você chegou no posto de saúde e a hora em que você viu o médico não podem ser anteriores a hora que você saiu de casa.");
			horaB.value = '';
			minB.value = '';
			horaC.value = '';
			minC.value = '';
			horaB.focus();
			return false;
		}
		
		if((horaC.value != '') && (minC.value != ''))
		{	
			if(tempoC < tempoB)
			{
				alert("A hora em que você viu o médico não pode ser anterior a hora que você chegou no posto.");
				horaC.value = '';
				minC.value = '';
				horaC.focus();
				return false
			}
	
			/** CALCULO DO TEMPO QUE LEVOU PARA SAIR DE CASA ATEH SER ATENDIDO PELO MEDICO **/
			
			tempoTotalMin.value = (tempoC - tempoA) % 60;
			
			tempoTotalHora.value = ((tempoC - tempoA) - tempoTotalMin.value) / 60;
		}
	
	}
	
	return true;
}

function validar_hora_escarro (horaA,minA,horaB,minB)
{
/**
	A - Quando você teve que trazer a 2ª amostra de escarro há alguns dias, em que horário você escarrou no potinho?
	B - Que horas você acordou no dia de escarrar pela segunda vez no potinho?
**/
	var tempoA = tempoB = 0;
	
	tempoA = (Number(horaA.value)*60) + Number(minA.value);
	tempoB = (Number(horaB.value)*60) + Number(minB.value);
	
	if((horaA.value != '') && (minA.value != '') && (horaB.value != '') && (minB.value != ''))
		if(tempoA < tempoB)
		{
			alert("A hora em que você coletou o escarro no potinho não pode ser anterior a hora em que você acordou para coletar o escarro.");
			horaB.value = '';
			minB.value = '';
			horaA.value = '';
			minA.value = '';
			horaA.focus();
			return false;
		}
	
	return true;
}

function validar_numero_de_digitos (campo, num)
{
	if(campo.value.length != 0)
	{
		if(campo.value.length != num)
		{
			alert("Este campo deve conter " + num + " dígitos.");
			campo.value = "";
		}
	}
}