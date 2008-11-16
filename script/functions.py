import xml.dom.minidom;
import re;
import os;

PROJECT_PATH = os.path.dirname(__file__);
USERS_FILE_NAME = PROJECT_PATH + "xml/users.xml";
PATIENTS_FILE_NAME = PROJECT_PATH + "xml/pacientesGuadalupe.xml";


def fmt2GetMethod(s):
  s = re.sub(' ', '+', s);
  s = re.sub('&', '%26', s);
  s = re.sub(';', '%3B', s);
  return s;


def authenticateUser(userName, password):
  if (not userName) or (not password) : return (False, "", "Preencha todos os campos.");
  dom = xml.dom.minidom.parse(USERS_FILE_NAME);
  
  for usuario in dom.getElementsByTagName("usuario"):
    name = usuario.getElementsByTagName("username")[0].childNodes[0].data;
    passWd = usuario.getElementsByTagName("senha")[0].childNodes[0].data;
    group = usuario.getElementsByTagName("grupo")[0].childNodes[0].data;
    if (name == userName) and (passWd == password): return (True, group, "");
  
  #No matching user was found if we get here.
  return (False, "", "Usu&aacute;rio n&atilde;o encontrado ou senha inv&aacute;lida.");



def getPatientInfo(dom, pid):
  for patient in dom.getElementsByTagName("paciente"):
    if patient.getAttribute("removido") == "sim": continue;
    if patient.getElementsByTagName("numeroGeral")[0].childNodes[0].data == pid: return patient;
  return None;



def getPatientsList():
  dom = xml.dom.minidom.parse(PATIENTS_FILE_NAME);
  ret = {};  
  for patient in dom.getElementsByTagName("paciente"):
    removido = patient.getAttribute("removido");
    idNum = patient.getElementsByTagName("numeroGeral")[0].childNodes[0].data;
    name = patient.getElementsByTagName("nomeCompleto")[0].childNodes[0].data;
    if removido == "nao": ret[name] = idNum;
  return ret;
  

def tableInsert(dbCursor, tbName, storeMap):
  #Organizing the info to build de insert statement.
  fields = [];
  values = [];
  for k,v in storeMap.iteritems():
    fields.append(k);
    values.append(v);

  dbCursor.execute("INSERT INTO %s (%s) VALUES (%s);" % (tbName, ','.join(fields), ','.join(values)));
