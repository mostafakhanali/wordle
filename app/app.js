// let word;

// async function getword() {
//     const promise = await fetch('https://words.dev-apis.com/word-of-the-day');
//     const newWord = await promise.json();
//     const word = newWord.word;
//     return word;
// }

// word = getword()

// word.then((aWord) => { console.log(aWord); });

function start() {
    let game = document.querySelector('body')

    // ---------    Starting game  ----------
    const new_word_url = "https://words.dev-apis.com/word-of-the-day?random=1";
    const Validatin_url = "https://words.dev-apis.com/validate-word";
    let word = '';
    let puzzle = document.querySelector(".container");

    // puzzle.children[0].children[0].innerText ='D'


    async function get_word(word_url) {
        let SECRETWORD
        const newWordJson = await fetch(word_url);
        const newWord = await newWordJson.json();
        SECRETWORD = newWord.word;
        return SECRETWORD;
    }
    async function validate(aWord) {
        const valation = await fetch(Validatin_url, {
            method: "POST",
            body: JSON.stringify({ "word": aWord })
        })
        const isValid = await valation.json();
        return (isValid.validWord)

    }
    function isLetter(letter) {
        return /^[a-zA-Z]$/.test(letter);
    };

    function checkWord(word, SECRETWORD, i) {
        if (word === SECRETWORD) {
            for (let jj = 0; jj < 5; jj++) {
                puzzle.children[i].children[jj].style.backgroundColor = 'rgba(43, 248, 111, 0.616)';

            }
        } else {
            for (let ii = 0; ii < 5; ii++) {
                let Include = {};
                let contaian = {};
                if (SECRETWORD.includes(word[ii])) {
                    // includes[SECRETWORD[ii]] = SECRETWORD.split(SECRETWORD[ii]).length-1


                    if (SECRETWORD[ii] === word[ii]) {

                        puzzle.children[i].children[ii].style.backgroundColor = 'rgba(43, 248, 111, 0.616)'
                    } else if ((SECRETWORD.split(word[ii]).length - 1) >= (word.substring(0, ii + 1).split(word[ii]).length - 1)) {
                        puzzle.children[i].children[ii].style.backgroundColor = "rgba(237, 240, 55, 0.6)"
                    } else {
                        puzzle.children[i].children[ii].style.backgroundColor = "rgba(50,50,50,0.2)"
                    }
                } else {
                    puzzle.children[i].children[ii].style.backgroundColor = "rgba(50,50,50,0.2)"
                }

            }
        }

    };

    // function add_char(game, placeHolder) {
    //     game.addEventListener('keyup', (char) => {
    //         if (isLetter(char)) {
    //             console.log(char);
    //         };
    //     })
    // };

    async function runGame() {
        let SECRETWORD = await get_word(new_word_url);
        game = document.querySelector('body')
        let i = 0;
        let j = 0;

        // **** Desktop ****

        this.addEventListener('keyup', (keybordInput) => {
            char = keybordInput.key;

            if (isLetter(char)) {
                if (i < 6) {
                    if (j < 5) {
                        word += char;
                        puzzle.children[i].children[j].innerText = char.toUpperCase();
                        j++

                    }
                }
                else {
                    endGame.classList.add("lose");
                    endGame.innerText = "Game over";
                }
            }
            else if (char == "Backspace") {
                if (j !== 0) {
                    j -= 1;
                    word = word.substring(0, word.length - 1);
                    puzzle.children[i].children[j].innerText = "";
                }

            }
            else if (char == "Enter") {

                if (word !== "") {
                    validate(word).then((isValid) => {
                        if (isValid) {
                            //  Write a functio to check-word and make it cololrful
                            checkWord(word, SECRETWORD, i)
                            if (word === SECRETWORD) {
                                const endGame = document.querySelector(".end-game");
                                endGame.classList.add("win");
                                endGame.innerText = "You Win";
                                j = 6;
                                i = 6;
                            }

                            i++;
                            j = 0;

                            if (i >= 6 && (word !== SECRETWORD)) {
                                const endGame = document.querySelector(".end-game");
                                endGame.classList.add("lose");
                                endGame.innerHTML = `<div class="game-over-text">Game Over\nThe word was ${SECRETWORD}<div>`
                            }
                            word = '';
                        }
                        else {
                            console.log("not valid word");
                        }
                    })
                }

            };
        })

        //  **** Mobile ****
        const page = document.querySelector(".container");

        page.addEventListener('click', () => {
            navigator.virtualKeyboard.show();
        })

        checkBtn = document.querySelector(".check-btn")
        checkBtn.addEventListener('click', () => {
            if (word !== "") {
                validate(word).then((isValid) => {
                    if (isValid) {
                        //  Write a functio to check-word and make it cololrful
                        checkWord(word, SECRETWORD, i)
                        if (word === SECRETWORD) {
                            const endGame = document.querySelector(".end-game");
                            endGame.classList.add("win");
                            endGame.innerText = "You Win";
                            j = 6;
                            i = 6;
                        }
                        i++;
                        j = 0;
                        if (i >= 6 && (word !== SECRETWORD)) {
                            const endGame = document.querySelector(".end-game");
                            endGame.classList.add("lose");
                            endGame.innerText = `Game over\nThe word was: ${SECRETWORD}`
                        }
                        word = '';
                    }
                    else {
                        console.info("show not valid word")
                    }
                })
            }

        }
        );




    };

    runGame();


}


start()


