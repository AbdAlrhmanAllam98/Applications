let currentQuestion=0,rightAnswers=0,allData,dataCount,countDownInterval,periodForQuestion=90;
let quizQuestion=document.querySelector(".quiz-question");
let quizAnswers=document.querySelector(".quiz-answers");
let answers=document.getElementsByClassName("answer");
let bulletSpans=document.querySelector(".bullets .spans");
let result=document.querySelector(".result");
getDataFromJson();
for (let i = 1; i <= dataCount; i++) {
    createElement(bulletSpans,"span","","","data-order",i);
}
document.querySelector("button").onclick=function(){
    document.querySelectorAll(`.bullets .spans span`)[currentQuestion].classList.add("on");
    checkAnswer(allData[currentQuestion]);
    if(currentQuestion == dataCount-1){
        quizQuestion.remove();
        quizAnswers.remove();
        showResult();
    }
    else{
        clearInterval(countDownInterval);
        countDown(periodForQuestion);
        quizAnswers.innerHTML="";
        quizQuestion.innerHTML="";
        currentQuestion++;
        addData(allData);
    }
}
function getDataFromJson(){
    let httpRequest=new XMLHttpRequest();
    httpRequest.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
            allData=JSON.parse(this.responseText);
            countDown(periodForQuestion);
            dataCount=allData.length;
            addData(allData);
        }
    }
    httpRequest.open("GET","../js/html-questions.json",false);
    httpRequest.send();
}
function addData(data){
    document.querySelector(".questions-count span").innerHTML=dataCount;
    createElement(quizQuestion,"h2","",data[currentQuestion].title,null,null);
    for(let i=1;i<=4;i++){
        let answer=createElement(quizAnswers,"div","answer","",null,null);
        let input=createElement(answer,"input","","","type","radio");
        input.id="answer_"+(i);
        let answerOrder=input.id;
        input.name="question";
        let label =createElement(answer,"label","",data[currentQuestion][answerOrder],"for",answerOrder);
        label.setAttribute("data-answer",data[currentQuestion][answerOrder]);
    }
}
function checkAnswer(question){
    for (let i = 0; i < answers.length; i++) {
        if(answers[i].childNodes[1].checked){
            if(question.right_answer==answers[i].childNodes[2].dataset.answer){
                rightAnswers++;
            }
        }
    }
}
function showResult(){
    let theResult;
    if(rightAnswers>(dataCount/2)&&rightAnswers<dataCount){
        theResult=`<span class="good">Good</span> ,${rightAnswers} From ${dataCount}`;
    }
    else if(rightAnswers==dataCount){
        theResult=`<span class="perfect">Perfect</span> ,${rightAnswers} From ${dataCount}`;
    }
    else{
        theResult=`<span class="bad">Bad</span> ,${rightAnswers} From ${dataCount}`;
    }
    result.innerHTML=theResult;
}
function createElement(parent,element,className,text,attribute,value){
    let elementTag=document.createElement(element);
    elementTag.className=className;
    elementTag.setAttribute(attribute,value);
    let textNode=document.createTextNode(text);
    elementTag.appendChild(textNode);
    parent.appendChild(elementTag);
    return elementTag;
}
function countDown(duration){
    let minutes,seconds;
    if(currentQuestion<allData.length){
        countDownInterval=setInterval(function() {
            minutes=parseInt(duration/60);
            seconds=duration % 60;
            document.querySelector(".count-down").innerHTML=`${(minutes>=10)?minutes:"0"+minutes} : ${(seconds>=10)?seconds:"0"+seconds}`;
    if(--duration==0){
        clearInterval(countDownInterval);
        document.querySelector("button").click();
    } }, 1000);
}}