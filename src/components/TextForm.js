import React, { useState } from 'react'


export default function TextForm(props) {

    //number of unique words 
    const clickUniqueWords = () => {
        let set = new Set(text.split(' '));
        props.showAlert("The number of unique word is " + set.size, "success");


    }

    //text to speech
    var TextTospeech = () => {
        if ('speechSynthesis' in window) {
            var msg = new SpeechSynthesisUtterance();
            msg.lang = "en-US";
            msg.text = text;
            msg.volume = 1;
            msg.rate = 1;
            msg.pitch = 1;
            msg.text = text;
            msg.lang = 'hi-IN';
            window.speechSynthesis.speak(msg);
            props.showAlert("Voice Assistant Start", "success");
        }
        else {

            props.showAlert("Sorry, your browser doesn't support text to speech!");
            // props.showAlert("Text Cleared!", "success");
        }

    };

    const StopSpeakClickHandle = () => {
        window.speechSynthesis.cancel()
        props.showAlert("Voice Assistant Stoped", "success");
    }



    const stringReplace = () => {
        let word = prompt('Enter The Word which you wanna Rplace');
        let newword = prompt('Enter New word ');
        let myArray = text.split(' ');
        myArray.forEach((element, index) => {
            if (element === word) {
                myArray[index] = newword;
            }

        })
        setText(myArray.toString().replaceAll(',', ' '));

    }

    //Function to extract all the emails 
    const handleExtractEmails = () => {
        const pattern = /([a-zA-Z0-9-]+@[a-zA-Z]+\.[a-zA-Z]{2,3})/gim;
        const match = text.matchAll(pattern);
        let allMatches = []

        for (let eachMatch of match) {
            allMatches.push(eachMatch[1])
        }
        if (allMatches.length === 0){
            props.showAlert("Email not found","danger");
        } 
        else {
            setText(allMatches.join("\n"))
            props.showAlert(" These are the Etracted email ", "success");

        }


    };

    //search words in string
    const handleSrchClick = () => {
        let str = prompt("enter the string you wanna search :");
        let newText = text.includes(str, 0);
        if (newText === true) {
            alert("The string " + str + " is present at INDEX Number " + text.indexOf(str));
        }
        else {
            alert("the string " + str + " is not present..");
        }
    }


    //remove special char
    const removeSpecialCharacters = () => {
        //console.log(event)
        let newText = text.replace(/[^a-zA-Z0-9]/g, ' ')
        setText(newText)
        props.showAlert("You successfully Remove the special char", "success");
    }

    //domain of the email
    const EmailDomain = () => {
        let newText = text.split("@");
        let later = newText[1].split(".");
        // console.log(later);
        setText("Your account is on " + later[0] + " And your username is " + newText[0]);


    }

    //trim sentences
    const trim = () => {
        if (text.length === 0) props.showAlert("Text Not Found In TextBox", "danger");
        let index1 = prompt("Enter #Starting index number you wanna Trim ");
        let index2 = prompt("Enter #Last index number you wanna Trim ");

        const msg = text.slice(index1, index2);
        setText(msg);
        if (text.length === 0) props.showAlert("Text Not Found In TextBox", "danger");
        else
            props.showAlert("You successfully convert the text into UPPER Case", "success");
    }

    //upload text file
    const readTxt = (event) => {
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.onload = function (event) {
            setText(event.target.result);
        };
        reader.readAsText(file);
    }

   
    //Alternate click
    const handleAlternateClick = () => {
        let chars = text.toLowerCase().split("");
        for (let i = 0; i < chars.length; i += 2) {
            chars[i] = chars[i].toUpperCase();
        }
        setText(chars.join(""));
    }

    //download txt
    const downloadText = () => {
        const element = document.createElement("a");
        const file = new Blob([text], {
            type: "text/plain"
        });
        element.href = URL.createObjectURL(file);
        element.download = "myFile.txt";
        element.click();
    }

    // //find phone number
    // const handleFindPhoneNumbers = () => {
    //     const data = text.split(" ");
    //     let numbers = [];
    //     data.forEach((element) => {
    //         if (element.length === 10 && !isNaN(Number(element))) {
    //             numbers.push(element);

    //         }
    //     });
    //     setPhoneNumbers(numbers);
    // };
    //copy text
    const handleCopy = () => {
        if(text.size()===0)props.showAlert("Empty TextBox is Empty please insert some text ", "warning");

        navigator.clipboard.writeText(text);
        // alert("Text Copied successfully");
        props.showAlert("Text Copied successfully ", "success");
    }

    //remove duplicate
    const handleDuplicates = () => {
        let wordArr = text.split(" ");
        let newText = wordArr.filter((item, pos) => {
            return wordArr.indexOf(item) === pos;
        })
        newText = newText.join(" ");
        
        setText(newText);
        if(text===newText)props.showAlert("Duplicate not present in Text, or Empty TextBox is Empty ", "warning");
        else
        props.showAlert("Duplicate removed successfully ", "success");
    }

    //function for BOLD
    const handleBoldClick = () => {
        setTextStyle({
            fontWeight: textStyle.fontWeight === "bold" ? "" : "bold",
            fontStyle: textStyle.fontStyle
        })
    }
    //function for Italic
    const handleItalicClick = () => {
        setTextStyle({
            fontStyle: textStyle.fontStyle === "italic" ? "" : "italic",
            fontWeight: textStyle.fontWeight
        });
    }




    // to encode text to base64
    function base64Encode() {
        setText(btoa(text));
        if (text.length === 0) props.showAlert("Text Not Found In TextBox", "danger");
        else
            props.showAlert("String Incoded", "success");
    }

    // to decode base64 to text

    function base64Decode() {
        setText(atob(text));
        if (text.length === 0) props.showAlert("Text Not Found In TextBox", "danger");
        else
            props.showAlert("String Decoded", "success");

    }

    //upper and lower case
    const toAlteredCase = () => {
        let arr = text.split("");
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === arr[i].toLowerCase()) {
                arr[i] = arr[i].toUpperCase();
            } else {
                arr[i] = arr[i].toLowerCase();
            }
        }
        setText(arr.join(""));
    }
    //Remove extra spaces
    const handleExtraSpaces = () => {
        let words = text.split(' ');
        let joinedWords = '';
        // console.log(words);
        words.forEach((elem) => {
            if (elem[0] !== undefined) {
                joinedWords += elem + " ";
                // console.log(joinedWords);
            }
        })
        setText(joinedWords);
        if (joinedWords.length === 0) props.showAlert("Text Not Found In TextBox", "danger");
        else
            props.showAlert("Extra Space Removed from The String", "success");
    }

    const handleReverse = (event) => {
        /* Convert string to array*/
        let strArr = text.split("");
        /* Reverse array*/
        strArr = strArr.reverse();
        /* Convert array to string*/
        let newText = strArr.join("");
        setText(newText);
        if (newText.length === 0) props.showAlert("Text Not Found In TextBox", "danger");
        else
            // props.showAlert("You successfully convert the text into LOWER Case","success");
            props.showAlert("The String reversed successfully", "success");

    };



    const capitalizeFirst = () => {
        // const lower = text.toLowerCase();
        // let capitalizedText = text.charAt(0).toUpperCase() + lower.slice(1);
        // setText(capitalizedText);
        let newText = text.split(" ").map(el => el.charAt(0).toUpperCase() + el.slice(1)).join(" ");
        setText(newText);
        if (newText.length === 0) props.showAlert("Text Not Found In TextBox", "danger");
        else
            props.showAlert("You successfully convert the text into Alternate UPPER Case", "success");
    };

    const handleUP = () => {
        let newText = text.toUpperCase();
        setText(newText);
        if (newText.length === 0) props.showAlert("Text Not Found In TextBox", "danger");
        else
            props.showAlert("You successfully convert the text into UPPER Case", "success");
    }
    //clear textarea
    const ClearText = () => {
        let newText = "";
        setText(newText);
        props.showAlert("Text Box Cleared", "success");
    }

    const handleDown = () => {
        // console.log("lower button is clicked");
        //  setText("raj how are you and are you good at programming ")
        let newText = text.toLowerCase();
        setText(newText);
        if (newText.length === 0) props.showAlert("Text Not Found In TextBox", "danger");
        else
            props.showAlert("You successfully convert the text into LOWER Case", "success");

    }

    //===========================================effort=======================






    /*Character code conversion function*/

    const handleCharCodeConversionClick = () => {
        let convertedText = text.split('').map((val) => val.charCodeAt(0));
        setText(convertedText.join(' '));
    }


    //repeat the string
    const handleToRepeat = () => {
        let newText = text.concat(" ");
        setText(newText.repeat(2));
    }


    //upper case conversion after every full stop
    const handle_1stChar_Click = () => {
        const arr = text.split(". ");

        for (let i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        }
        const newtext3 = arr.join(". ");
        setText(newtext3);
    };

    // refresh page
    const refreshPage = () => {
        window.location.reload(false);
    }


    //======================================

    const checkslang = () => {
        let count = 0;
        let lowertext = text.toLowerCase();
        if (lowertext.includes('mf')) {
            count++;
            props.showAlert(`"There are ${count}  Slang in the sentence"`, "success")
        }
        else if (lowertext.includes('bc')) {
            count++;
            setText(text + " There are " + count + " slangs in the sentence")
        }
        else if (lowertext.includes('fuck')) {
            count++;
            setText(text + " There are " + count + " slangs in the sentence")
        }
        else if (lowertext.includes('chill')) {
            count++;
            setText(text + "There are " + count + " slangs in the sentence")
        }
       else  if (lowertext.includes('lame')) {
            count++;
            setText(text + " There are " + count + " slangs in the sentence")
        }
       else  if (lowertext.includes('cool')) {
            count++;
            setText(text + " There are " + count + " slangs in the sentence")
        }
       else if (lowertext.includes('pissed')) {
            count++;
            setText(text + " There are " + count + " slangs in the sentence")
        }
        else if (lowertext.includes('super')) {
            count++;
            setText(text + " There are " + count + " slangs in the sentence")
        }
        else {
            setText(text + " - No slangs here");
        }

    }




    // color change

    const colo = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }


        document.getElementById("mybox").style.color = color;
    }
    //======================================================================================
    const handleOnChange = (event) => {
        // console.log("upper button is on change");
        setText((event.target.value));
    }

    //word count
    const handlewordchange = (event) => {
        // console.log(event.target.value)
        setword(event.target.value)
        setwordcount('')
    }
    const handlewordcountclick = () => {

        setwordcount((text.split(word)).length - 1)
    }
    const [word, setword] = useState("")
    // const [number, setPhoneNumbers] = useState("")
    const [wordcount, setwordcount] = useState("0")

    //=============================word count=====

    const [text, setText] = useState("Enter Your Text Here");
    //=============================bold && italic=====================

    const [textStyle, setTextStyle] = useState({
        fontWeight: "",
        fontStyle: ""
    })

    return (
        <>

            <div className='container'>
                <h1>{props.Heading}</h1>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">{props.level}</label>
                    <textarea style={textStyle} className="form-control" value={text} onChange={handleOnChange} id="exampleFormControlTextarea1" rows="8"></textarea>
                </div>

                <button type="button" className="btn btn-primary mx-2" onClick={handleDown}>Convert To Lower Case </button>
                <button type="button" className="btn btn-success my-2 mx-2" onClick={handleUP}>Convert To Upper Case</button>
                <button type="button" className="btn btn-danger my-2 mx-2" onClick={ClearText}>Clear Text</button>
                <button type="button" className="btn btn-primary my-2 mx-2" onClick={capitalizeFirst}>Capt</button>
                <button type="button" className="btn btn-warning my-2 mx-2" onClick={TextTospeech}>SPEAK </button>
                <button type="button" className="btn btn-danger my-2 mx-2" onClick={StopSpeakClickHandle}>Stop SPEAK </button>
                <button type="button" className="btn btn-warning my-2 mx-2" onClick={handleReverse}>Reverse </button>
                <button type="button" className="btn btn-warning my-2 mx-2" onClick={handleExtraSpaces}>Remove Space </button>
                <button type="button" className="btn btn-primary my-2 mx-2" onClick={base64Encode}>Encode</button>
                <button type="button" className="btn btn-warning my-2 mx-2 my-2" onClick={base64Decode}>Decode</button>
                <button type="button" className="btn btn-warning my-2 mx-2" onClick={handleBoldClick}>Bold</button>
                <button type="button" className="btn btn-warning my-2 mx-2" onClick={handleItalicClick}>Italic</button>
                <button type="button" className="btn btn-primary my-2  mx-2" onClick={handleDuplicates}>Remove Duplicate</button>
                {/* <button type="button" className="btn btn-warning  mx-2" onClick={handleFindPhoneNumbers}>Find Contacts</button> */}
                <button type="button" className="btn btn-warning my-2 mx-2" onClick={handleExtractEmails}>Find Email</button>
                <button type="button" className="btn btn-success my-2 mx-2" onClick={downloadText}>Download Txt</button>
                <button type="button" className="btn btn-warning my-2 mx-2" onClick={stringReplace}>Replace</button>
                <button type="button" className="btn btn-primary my-2  mx-2" onClick={handleAlternateClick}>AlternateClick</button>
                <button type="button" className="btn btn-warning my-2 mx-2" onClick={handleCopy}>Copy Text</button>
                <button type="button" className="btn btn-warning my-2 mx-2" onClick={handleCharCodeConversionClick}>ASCII </button>
                <button type="button" className="btn btn-success my-2 mx-2" onClick={EmailDomain}>Email Domain </button>
                <button type="button" className="btn btn-warning my-2  mx-2" onClick={trim}>Trim </button>
                <button type="button" className="btn btn-danger my-2 mx-2" onClick={removeSpecialCharacters}>Remove Special char </button>
                <button type="button" className="btn btn-warning my-2 mx-2" onClick={handleToRepeat}>Repeat String </button>
                <button type="button" className="btn btn-warning my-2 mx-2" onClick={handle_1stChar_Click}>First char Caps </button>
                <button type="button" className="btn btn-success my-2 mx-2" onClick={refreshPage}>Refresh page </button>
                <button type="button" className="btn btn-warning my-2 mx-2" onClick={colo}>COLOR</button>
                <button type="button" className="btn btn-warning my-2 mx-2" onClick={toAlteredCase}>alter</button>
                <button type="button" className="btn btn-warning my-2 mx-2" onClick={clickUniqueWords}>Unique</button>
                <button type="button" className="btn btn-primary my-2 mx-2" onClick={handleSrchClick}>Search</button>
                <button type="button" className="btn btn-danger my-2  mx-2" onClick={checkslang}>slang</button>




                <input type="file" className="btn btn-secondary my-3" accept="text/plain" onChange={readTxt} />





            </div>
            <div className='container my-3'>

                <input type="text" value={word} onChange={handlewordchange} />
                <button onClick={handlewordcountclick} className="btn btn-primary">Count occurances</button>
                <input type="number" value={wordcount} />

            </div>
            <div className='container my-4' >

                <h2>Your text summary</h2>
                <p>{text.split(/\s+/).filter((element) => { return element.length !== 0 }).length} words and {text.length} characters</p>
                <p>Number of sentences =

                    {text === ""
                        ? text
                            .trim()
                            .split(".")
                            .filter((text) => text !== "").length
                        : text.split(".").length - 1}



                </p>
                <p>{0.008 * text.split(/\s+/).filter((element) => { return element.length !== 0 }).length} Minutes read</p>
                <p>Approx Reading Time: {0.008 * text.split(" ").length}     Minutes</p>

                <h2>Preview</h2>
                <p>{text.length > 0 ? text : "Nothing to preview!"}</p>




            </div>
            {/* <div className='container'>
                <h2>Preview</h2>
                <div className='container'>
                    <p style={textStyle}>{text}</p>
                </div>


            </div> */}


            {/* <p>  here {number}</p> */}
        </>
    )
}






















