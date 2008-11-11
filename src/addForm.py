#!/usr/bin/env python

import datetime;
import cgi;
import pysqlite2.dbapi2;
import cgitb; cgitb.enable(); #Reomving after debuging.
import functions;

form = cgi.FieldStorage()

#Getting the HTML information in an organized way and doing any necessary process.
storeMap = {}
storeMap["pid"] = "'%s'" % form["pid"].value;
storeMap["ondeMora"] = "'%s'" % form["ondeMora"].value;
storeMap["transporte"] = "'%s'" % form["transporte"].value;
storeMap["custoTransporteA"] = str(form.getvalue("custoTransporteA", 0));
company = str(form["numeroAcompanhantesA"].value);
if company == "NA": company = "0";
storeMap["numeroAcompanhantesA"] = company;
storeMap["horaSaidaCasaA"] = "'%s:%s'" % (form["horaSaidaCasaA"].value, form["minutoSaidaCasaA"].value);
storeMap["horaChegadaPostoA"] = "'%s:%s'" % (form["horaChegadaPostoA"].value, form["minutoChegadaPostoA"].value);
storeMap["horaMedicoA"] = "'%s:%s'" % (form["horaMedicoA"].value, form["minutoMedicoA"].value);
storeMap["horaTotalA"] = "'%s:%s'" % (form["horaTotalA"].value, form["minutoTotalA"].value);
storeMap["pernoite"] = "'%s'" % form.getvalue("pernoite", "NA");
storeMap["custoPernoite"] = str(form.getvalue("custoPernoite", 0));
storeMap["custoAmigos"] = str(form.getvalue("custoAmigos", 0));
#storeMap["comeu_bebeu"] = form.getvalue("comeu_bebeu");
storeMap["custoComidaBebidaA"] = str(form["custoComidaBebidaA"].value);
#storeMap["pagar_algo_posto"] = form.getvalue("pagar_algo_posto");
storeMap["custoPostoA"] = str(form["custoPostoA"].value);
storeMap["profissao"] = "'%s'" % form["profissao"].value;
storeMap["estudantePerdeuAula"] = "'%s'" % form.getvalue("estudantePerdeuAula", "NA");
storeMap["quantoDeixouGanharA"] = str(form["quantoDeixouGanharA"].value);
storeMap["quemArcouCustos"] = "'%s'" % form.getvalue("quemArcouCustos", "NA");
storeMap["gastoAcompanhante"] = str(form.getvalue("gastoAcompanhante", 0));
estudante = 0;
if form.getvalue("estudante") == "estudante": estudante = 1;
storeMap["estudante"] = str(estudante);
storeMap["observacoes"] = "'%s'" % form["observacoes"].value;
storeMap["avaliadorEnfermeiroA"] = "'%s'" % form["avaliadorEnfermeiroA"].value;
storeMap["quemCadastrou"] = "'%s'" % form["quemCadastrou"].value;
#Making sure sqlite will receive the date exactly as yyyy-mm-dd.
d = datetime.date(int(form["ano_CustoA"].value), int(form["mes_CustoA"].value), int(form["dia_CustoA"].value));
storeMap["dia_CustoA"] = "'%s'" % d;

#Connecting to the database to store the values.
con = pysqlite2.dbapi2.connect("xml/costs.db");
cur = con.cursor();
functions.tableInsert(cur, "custos_a", storeMap);
con.commit();

print "Content-Type: text/html"     # HTML is following
print;
print "Information added successfully!";
