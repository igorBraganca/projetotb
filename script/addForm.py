#!/usr/bin/env python

import cgi;
import cgitb; cgitb.enable(); #Remove after debuging.
import xml.dom.minidom;
import fcntl;
import shutil;

import functions;

xmlEncoding = 'ISO-8859-1';

#Getting the HTML form input data.
form = cgi.FieldStorage()

#Creating the XML document that will hold the new data.
doc = xml.dom.minidom.Document();
data = doc.createElement(form['form'].value);
for k in form.keys():
  if k in ['form', 'pid']: continue;
  val = doc.createElement(k);
  val.appendChild(doc.createTextNode(unicode(form[k].value, xmlEncoding)));
  data.appendChild(val);

#Opening the xml file and locking it to prevent access from other processes.
xmlData = open(functions.PATIENTS_FILE_NAME, 'r+');
fcntl.flock(xmlData, fcntl.LOCK_EX);

#Opening the file used for backup and locking it.
bckData = open(functions.PATIENTS_FILE_NAME + '~', 'w');
fcntl.flock(bckData, fcntl.LOCK_EX);

#Generating the backup.
shutil.copyfileobj(xmlData, bckData);
bckData.close(); #Realeasing the backup file (unlock).

#Parsing the XML file
xmlData.seek(0); #Going to the beginning of the file
dom = xml.dom.minidom.parse(xmlData);

#Retrieving the correct user.
patient = functions.getPatientInfo(dom, form['pid'].value);

#Checking whether the form already exists. If so, we remove it first.
if len(patient.getElementsByTagName(form['form'].value)) != 0:
  patient.removeChild(patient.getElementsByTagName(form['form'].value)[0]);
patient.appendChild(data);

#Saving the new data to the XML file.
xmlData.seek(0); #Going to the beginning of the file.
xmlData.write(dom.toxml(encoding = xmlEncoding));
xmlData.close(); #Releasing the file (calls also unlock).

print "Content-Type: text/html\n\n"     # HTML is following

htmlPage = """
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html" charset="ISO-8859-1" />
  <title>Projeto Neural TB</title>
  <style type="text/css">
"""

htmlPage += open(functions.PROJECT_PATH + "css/search_palm.css", "r").read();

htmlPage += """
  </style>
</head>

<body>
Formul&aacute;rio salvo com sucesso! Clique <a href="search_palm.psp">aqui</a> para retornar &agrave; p&aacute;gina de busca.
</body>
</html>
""";

print htmlPage;
