#Este e um MakeFile via scons.
#Usado para compilar e instalar o projeto 'projetotb'. Se nenhum diretorio de instalacao
#for especificado, o projeto sera instalado no diretorio 'public_html', no mesmo diretorio
#deste arquivo.
#
#Author: Rodrigo Coura Torres (Rodrigo.Torres@cern.ch)
#

import os;
import re;

#Esta funcao devolve todos os arquivos do path sourceDir, que tenha uma das extensoes
#passadas na lista exList.
def getSourceFiles(sourcesDir, extList):
	srcFilter = re.compile('|'.join(['\.%s\Z' % i for i in extList]));
	return ['%s%s%s' % (sourcesDir, os.path.sep, f) for f in os.listdir(sourcesDir) if srcFilter.search(f) is not None];

#Paths para a localizacao de bibliotecas.
lib_path = ['/usr/lib'];

#Lista de bibliotecas a serem linkadas ao projeto.
aux_lib = ['xml2'];

#Paths para a localizacao de arquivos de include.
inc_path = ['.', '/usr/include/libxml2'];

## Lista de flags de compilacao.
cxx_flags = [];

#Criando o nosso ambiente de compilacao.
env = Environment(CPPPATH = inc_path, ENV = os.environ);

#Compilando os CGIs.
cgiList = []
for prog in getSourceFiles('./src', ['cpp', 'c', 'cxx']):
  binName = env.Program(target = prog + '.cgi', source = prog, CCFLAGS = cxx_flags, LIBS = aux_lib, 
                        LIBPATH = lib_path);
  cgiList.append(binName)

#Como os outros arquivos nao precisam de compilacao, apenas os adicionamos a lista
#de instalacao.
htmlList = getSourceFiles('./html', ['htm', 'html', 'psp']);
scriptList = getSourceFiles('./script', ['py', 'sh', 'php']);
jsList = getSourceFiles('./js', ['js']);
cssList = getSourceFiles('./css', ['css']);
imgList = getSourceFiles('./images', ['jpg', 'gif', 'png']);
xmlList = [];

#Definindo onde cada tipo de arquivo sera instalado
cgiInstDir = './projetotb';
htmlInstDir = './projetotb';
scriptInstDir = './projetotb';
jsInstDir = './projetotb/js';
cssInstDir = './projetotb/css';
imgInstDir = './projetotb/images';
xmlInstDir = './projetotb/xml';

#Associando os diretorios de instalacao aos arquivos destinados a eles.
env.Install(cgiInstDir, cgiList);
env.Install(htmlInstDir, htmlList);
env.Install(scriptInstDir, scriptList);
env.Install(jsInstDir, jsList);
env.Install(cssInstDir, cssList);
env.Install(imgInstDir, imgList);
env.Install(xmlInstDir, xmlList);

#Criando o alias de instalacao.
env.Alias('install', [cgiInstDir, htmlInstDir, scriptInstDir, jsInstDir, cssInstDir, imgInstDir, xmlInstDir]);
