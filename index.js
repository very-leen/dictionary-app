const API = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const infoDisplay = document.querySelector("#info-display");

document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.querySelector("#search-form");
    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const searchTerm = document.querySelector("#search-term").value.trim()
        const APIURL = API + searchTerm;
        console.log(APIURL);
        fetchData(APIURL);
    })
})

async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        renderWordDetails(data);
    } catch (error) {
        console.log(error);
        const missingWord = document.createElement("h2");
        infoDisplay.replaceChildren()
        missingWord.textContent = error.message;
        infoDisplay.appendChild(missingWord)
    }
}

function renderWordDetails(data) {
    //console.log(data[0].meanings);
    infoDisplay.replaceChildren();
    const wordParagraph = document.createElement("h2");
    wordParagraph.textContent = data[0].word;
    infoDisplay.appendChild(wordParagraph);
    const meanings = data[0].meanings;
    meanings.forEach((definitionType) => {
        const figureOfSpeech = document.createElement("small");
        figureOfSpeech.textContent = definitionType.partOfSpeech
        infoDisplay.appendChild(figureOfSpeech)
        definitionType.definitions.forEach((terminology) => {
            const definitionParagraph = document.createElement("blockquote");
            for (const key in terminology) {
                if (key === "definition") definitionParagraph.textContent = terminology[key];
                console.log(definitionParagraph)
                infoDisplay.appendChild(definitionParagraph)
            }
        })
        const synoTitle = document.createElement("h4");
        synoTitle.textContent = "Synonyms";
        infoDisplay.appendChild(synoTitle)
        if (definitionType.synonyms.length > 0) {
            definitionType.synonyms.forEach((synonym) => {
                const synonyms = document.createElement("p");
                synonyms.textContent = synonym;
                infoDisplay.appendChild(synonyms)
            })
        } else {
            const noSynonyms = document.createElement("p");
            noSynonyms.textContent = "No synonyms found";
            infoDisplay.appendChild(noSynonyms)
        }

    })
}