import xml.dom.minidom;
import re;
import os;
import fcntl;

PROJECT_PATH = os.path.dirname(__file__) + os.path.sep;
USERS_FILE_NAME = PROJECT_PATH + "xml/users.xml";
PATIENTS_FILE_NAME = PROJECT_PATH + "xml/pacientesGuadalupe.xml";

def fmt2GetMethod(s):
  """Formata a string de entrada "s" para que possa ser passada via metodo GET para o CGI."""
  s = re.sub(' ', '+', s);
  s = re.sub('&', '%26', s);
  s = re.sub(';', '%3B', s);
  return s;


def encode(textStr):
  """Retorna a string de entrada (textStr) codificada em UTF-8."""
  return textStr.encode("utf-8");


def authenticateUser(userName, password):
  """Recebe 2 strings. O nome do usuario e a sua senha. Com isso, comecta-se a base
     dados de usuarios do sistema, e verifica se o login existe e a senha confere.
     A funcao retorna uma tuple com os seguintes valores:
      - ok:    booleano, com valor True se o usuario foi autenticado corretamente.
      - group: o grupo ao qual o usuario pertence. Este campo e uma string vazia se 
               o usuario nao existe.
      - msg:   A mensagem de erro justificando a falha na autenticacao do usuario. 
               E uma string vazia em caso de sucesso"""

  if (not userName) or (not password) : return (False, "", "Preencha todos os campos.");
  xmlData = open(USERS_FILE_NAME, 'r');
  fcntl.flock(xmlData, fcntl.LOCK_EX);
  dom = xml.dom.minidom.parse(xmlData);
  
  for usuario in dom.getElementsByTagName("usuario"):
    name = usuario.getElementsByTagName("username")[0].childNodes[0].data;
    passWd = usuario.getElementsByTagName("senha")[0].childNodes[0].data;
    group = usuario.getElementsByTagName("grupo")[0].childNodes[0].data;
    if (name == userName) and (passWd == password):
      xmlData.close();
      return (True, group, "");
  
  #No matching user was found if we get here.
  xmlData.close();
  return (False, "", "Usu&aacute;rio n&atilde;o encontrado ou senha inv&aacute;lida.");


def getPatientInfo(dom, pid):
  """Recebe um node xml (xml.dom.minidom.Document) e o numero geral do paciente (pid).
     Retorna um objeto xml.minidom.node contendo as informacoes encontradas do paciente
     solicitado."""
     
  for patient in dom.getElementsByTagName("paciente"):
    if patient.getAttribute("removido") == "sim": continue;
    if patient.getElementsByTagName("triagem")[0].getElementsByTagName("numeroGeral")[0].childNodes[0].data == pid: return patient;
  return None;


def getPatientsList():
  """Retorna um mapa onde a chave e o nome de cada paciente, e o valor e um mapa com as seguintes
     chaves:
       - id : o numero geral do paciente.
       - doneForms: uma lista contendo o nome dos formularios existentes para este paciente.
       """
  xmlData = open(PATIENTS_FILE_NAME, 'r');
  fcntl.flock(xmlData, fcntl.LOCK_EX);
  dom = xml.dom.minidom.parse(xmlData);

  ret = {};  
  for patient in dom.getElementsByTagName("paciente"):
    removido = patient.getAttribute("removido");
    idNum = patient.getElementsByTagName("triagem")[0].getElementsByTagName("numeroGeral")[0].childNodes[0].data;
    name = patient.getElementsByTagName("triagem")[0].getElementsByTagName("nomeCompleto")[0].childNodes[0].data;
    forms = [s.nodeName for s in patient.childNodes if s.nodeName != '#text'];
    if removido == "nao": ret[name] = {'id' : idNum, 'doneForms' : forms};
  
  xmlData.close();
  return ret;


def getSingleInfo(pid, form, field):
  """Retorna uma informacao especifica para umd ado paciente. Recebe o numero geral (pid),
     o nome do formulariod esejado (form), e o nome do campo (field) desejado."""

  #Opening the xml file and locking it to prevent access from other processes.
  xmlData = open(PATIENTS_FILE_NAME, 'r');
  fcntl.flock(xmlData, fcntl.LOCK_EX);

  #Parsing the XML file
  dom = xml.dom.minidom.parse(xmlData);

  #Retrieving the correct user.
  patient = getPatientInfo(dom, pid);
  value = patient.getElementsByTagName(form)[0].getElementsByTagName(field)[0].childNodes[0].data;
  xmlData.close();

  return value;
 
 
def formAsMap(pid, form):
  """Busca o paciente com numero geral (pid), e converte o formulario (form) desejado
     em um dicionario onde a chave e o nome doc ampo, e o valor e o conteudo do campo.
     Retorna um dicionario vazio se o formulario desejado nao foi encontrado."""

  #Opening the xml file and locking it to prevent access from other processes.
  xmlData = open(PATIENTS_FILE_NAME, 'r');
  fcntl.flock(xmlData, fcntl.LOCK_EX);

  #Parsing the XML file
  dom = xml.dom.minidom.parse(xmlData);

  #Retrieving the correct user.
  xmlForm = getPatientInfo(dom, pid).getElementsByTagName(form);
  if len(xmlForm) == 0: return {};
  
  ret = {};
  for field in xmlForm[0].childNodes:
    if field.nodeName != '#text':
      ret[field.nodeName] = field.childNodes[0].data
  xmlData.close();

  return ret;
