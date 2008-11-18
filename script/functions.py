import xml.dom.minidom;
import re;
import os;
import fcntl;

PROJECT_PATH = os.path.dirname(__file__) + os.path.sep;
USERS_FILE_NAME = PROJECT_PATH + "xml/users.xml";
PATIENTS_FILE_NAME = PROJECT_PATH + "xml/pacientesGuadalupe.xml";

def fmt2GetMethod(s):
  s = re.sub(' ', '+', s);
  s = re.sub('&', '%26', s);
  s = re.sub(';', '%3B', s);
  return s;


def encode(textStr):
  return textStr.encode("utf-8");


def authenticateUser(userName, password):
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
  for patient in dom.getElementsByTagName("paciente"):
    if patient.getAttribute("removido") == "sim": continue;
    if patient.getElementsByTagName("triagem")[0].getElementsByTagName("numeroGeral")[0].childNodes[0].data == pid: return patient;
  return None;


def getPatientsList():
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
 