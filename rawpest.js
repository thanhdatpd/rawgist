console.clear();
var all = "";
var allQuesAndAns= "";
var replaceHTMLesc = (instr)=>{
    return  instr.replaceAll("&quot", "\"")
        .replaceAll("</br>", "\n")
        .replaceAll("&amp;", "")
        .replaceAll("&lt;", "")
        .replaceAll("&gt;", '')
        .replaceAll("&quot;","" )
        .replaceAll("&#039;",'' )
        .replaceAll("&lt", "<")
        .replaceAll("&gt", ">")
}
function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}


if (initState?.quiz?.quiz_content) {
    for (part of initState.quiz.quiz_content) {
        for (ques of part.array_question) {
            let { question, array_answer } = ques;
            let ans = array_answer.filter(e => e.correct)?.[0]?.answer
            all += `${question} \n ${ans} \n`
            let allans = array_answer.map(e=>e.correct?`*${e.answer}`:e.answer);
            allans = allans.join("\n");
            allQuesAndAns += `${question} \n ${allans}\n\n`
        }
    }
} else {
    for (let i = 0; i < initState.quiz.questions.length; i++) {
        let q = initState.quiz.questions[i];
        let title = q.title
        let rightAns = q.answers.filter(e => e.is_correct===1)?.[0]?.option
        all += `${title} \n\t${rightAns} \n`
        
        let allans = q.answers.map(e=>e.is_correct?`*${e.option}`:e.option);
        allans = allans.join("\n");
        allQuesAndAns += `${title} \n ${allans}\n\n`
    }
}

var getAnsOnly = () => replaceHTMLesc(all)
var getAns = () => replaceHTMLesc(allQuesAndAns)
