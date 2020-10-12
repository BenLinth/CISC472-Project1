$(document).ready(function () {
    var firebaseConfig = {
        apiKey: "AIzaSyDvDRcJ1tAR-ebu0QocqaG0ZXU0276vNLA",
        authDomain: "simplehangman-3bbac.firebaseapp.com",
        databaseURL: "https://simplehangman-3bbac.firebaseio.com",
        projectId: "simplehangman-3bbac",
        storageBucket: "simplehangman-3bbac.appspot.com",
        messagingSenderId: "793883931570",
        appId: "1:793883931570:web:8b7d77a1ae2f6787a9aaab"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    $("#aiWordDiv").hide();
    $("#enter").hide();

    let myDatabase = firebase.database();
    var currentWord = "";
    var previousWordsList = [];
    let num_words = 187632;



    function newWord(previousWord) {
        while (true) {
            myDatabase.ref("dictionary").child(Math.floor(num_words & Math.random()).toString()).once("value", word => {
                if (word.val()[0] == previousWord[previousWord.length - 1]) {
                    previousWordsList.push(currentWord);
                    currentWord = word.val();
                    break;
                }
            })
        }

        $("#aiWord").text(currentWord);
    }



    function startGame() {

        $("#aiWordDiv").show();
        $("#enter").show();
        $("#start").hide();

        myDatabase.ref("dictionary").child(Math.floor(num_words & Math.random()).toString()).once("value", word => {
            currentWord = word.val();
        })
        $("aiWord").text(currentWord);
    }

    $("#start").click(startGame);

    $("#enter").click(()=>{
        let inputWord = $("inputWord").val();
        if(inputWord[0] == currentWord[currentWord.length - 1]){
            var repeat = false;
            for(var i = 0; i < previousWordsList.length; i++){
                if(previousWordsList[i] === inputWord){
                    repeat = true;
                    break;
                }
            }
            if(!repeat){
                newWord(inputWord);
            }
            else{
                alert(`${inputWord} has already appeared.`)
            }
        }
        else{
            alert(`${inputWord} does not have the correct first letter.`)
        }
    })

})