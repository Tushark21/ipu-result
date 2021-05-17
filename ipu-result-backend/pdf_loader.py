import requests
import io

url="http://ggsipu.ac.in/ExamResults/2020/280920/027_BTech_4th_Sem_SEPT_2020.pdf";

def getPDF(url):
    loadedPDF=requests.get(url);
    print("PDF loaded successfully.");
    return io.BytesIO(loadedPDF.content);

#print(getPDF(url));