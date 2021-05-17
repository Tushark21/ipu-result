import requests
from bs4 import BeautifulSoup
import re

url="http://ggsipu.ac.in/ExamResults/ExamResultsmain.htm";
webName="http://ggsipu.ac.in/ExamResults/";

def getURLs(url):
    urls=[];
    page=requests.get(url);
    soup=BeautifulSoup(page.content,'html.parser');

    #print(soup.find_all('a'));
    aTags=soup.find_all('a');

    for tag in aTags:
        if re.search("(CSE)",tag.text) != None:
            #print(webName+tag['href']);
            urls.append(webName+tag['href']);

        elif re.search("(cse)",tag.text) != None:
            #print(webName+tag['href']);
            urls.append(webName+tag['href']);

    return urls;

#print(getURLs(url));