def getNumber(str):
    #print(str);
    num="";
    for i in str:
        if i>='0' and i<='9':
            num+=i;
        else:
            if len(num)<=0:
                return 0;
            #print(num);
            return int(num);

    if len(num)<=0:
        return 0;
                
    return int(num);


def removeSpace(str):
    newStr='';
    prevSpace=False;
    firstChar=True;
    individualList=[[],[],[],[],[]];
    studentsList=[];
    lineNo=0;
    maxLen=0;

    for i in str:
        if firstChar:
            firstChar=False;
            continue;
        
        if i!=' ' and i!='\n':
            newStr+=i;
            prevSpace=False;
        
        elif i=='\n':
            if maxLen<len(newStr):
                maxLen=len(newStr);

            if newStr!='':
                individualList[lineNo].append(newStr);

            if maxLen<7:
                break;
            
            newStr='';
            lineNo+=1;
            if lineNo>4:
                studentsList.append(individualList);
                individualList=[[],[],[],[],[]];
                lineNo=0;
                maxLen=0;

        elif i==' ' and prevSpace==False:
            if maxLen<len(newStr):
                maxLen=len(newStr);

            if newStr!='':
                individualList[lineNo].append(newStr);
            newStr='';
            prevSpace=True;

    return studentsList;

def getStudentDict(lst):
    studentList=[];
    for l in lst:
        studentDict={};
        studentDict['enrollmentno']=l[0][0];
        
        #Subjects
        i=1;
        subList=[];
        while i<len(l[0])-1:
            subList.append(l[0][i]);
            i+=1;
        
        subList.append("Total");
        studentDict['remark']=l[0][len(l[0])-1];
        studentDict['subjects']=subList;

        #Name
        i=0;
        name='';
        while i<len(l[1])-1:
            name+=l[1][i]+' ';
            i+=1;
        
        name+=l[1][len(l[1])-1];
        studentDict['name']=name;

        #Internal & External Marks
        i=2;
        intMarkList=[];
        extMarksList=[];
        intTotal=0;
        extTotal=0;
        totalMarks=0;
        while i<len(l[2]):
            if i%2==0:
                intMarkList.append(l[2][i]);
                intTotal+=getNumber(l[2][i]);
            else:
                extMarksList.append(l[2][i]);
                extTotal+=getNumber(l[2][i]);
            i+=1;
            
        totalMarks+=intTotal+extTotal;
        intMarkList.append(intTotal);
        extMarksList.append(extTotal);
        studentDict['internal']=intMarkList;
        studentDict['external']=extMarksList;

        #Total Marks
        i=1;
        subjectMarkList=[];
        while i<len(l[4]):
            subjectMarkList.append(l[4][i]);

            i+=1;
        subjectMarkList.append(totalMarks);

        studentDict['subjectmarks']=subjectMarkList;
        studentDict['maximummarks']=(len(subjectMarkList)-1)*100;
        studentDict['percentage']=round((totalMarks)/(len(subjectMarkList)-1),2);
        
        studentList.append(studentDict);
    
    return studentList;