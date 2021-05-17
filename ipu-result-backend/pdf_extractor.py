import pdftotext
import re
import json
import utility
import web_scrapper as ws
import pdf_loader as pl

webURL="http://ggsipu.ac.in/ExamResults/ExamResultsmain.htm";

urls=ws.getURLs(webURL);

pdfs=[];
count=0;
for url in urls:
    count+=1;
    print(str(count)+". url:",url,"\n");
    pdfs.append(pdftotext.PDF(pl.getPDF(url)));
    print("\nReading PDF file completed.\n");

print("Result extraction started.");
count=0;
for pdf in pdfs:
    count+=1;
    studentReport=[];
    #Iterate over all the pages
    for page in pdf:
        if re.search("Result of Programme Code:",page) != None:
            resultStr = re.split("\*Passed with Grace Marks", re.split("Remarks", page, 1)[1], 1);
            studentReport.extend(utility.getStudentDict(utility.removeSpace(resultStr[0])));
            #print(utility.removeSpace(resultStr[0]));

    for std in studentReport:
        #print(std,"\n");
        pass;

    with open("report"+str(count)+".json", "w") as outfile: 
        outfile.write(json.dumps(studentReport, indent=4))
        outfile.close();
    print("File report"+str(count)+".json saved.");

print("\nResult extraction completed.");
