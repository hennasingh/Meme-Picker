import { catsData } from "./data.js"

const emotionsDiv = document.getElementById('emotion-radios')
const imageBtn = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')

imageBtn.addEventListener('click', renderCat)

emotionsDiv.addEventListener('change', highlightCheckedOption)

memeModalCloseBtn.addEventListener('click', closeModal)

function closeModal() {
    memeModal.style.display = "none"
}


function getMatchingCatsArray() {
    if(document.querySelector('input[type="radio"]:checked')) {
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const matchingCatsArray = catsData.filter(function(cat) {
            if(gifsOnlyOption.checked) {
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            } else {
                return cat.emotionTags.includes(selectedEmotion)
            }
        })
        return matchingCatsArray
    }
}

function renderCat() {
    const cat = getSingleCatObject()
    memeModalInner.innerHTML = `
        <img 
            src="./images/${cat.image}"
            class="cat-img"
            alt="${cat.alt}"
        >
    `
    memeModal.style.display = "flex"

}

function getSingleCatObject() {
    const catsArray = getMatchingCatsArray()

    if(catsArray.length === 1){
        return catsArray[0]
    } else {
        return catsArray[Math.floor(Math.random() * catsArray.length)]
    }
}



function highlightCheckedOption(event) {

    let classArray = document.getElementsByClassName('radio')
     for(let emo of classArray) {
        emo.classList.remove("highlight")
     }
    document.getElementById(event.target.id).parentElement.classList.add("highlight")

}

function getEmotionsArray(cats) {
    const emotionsArray = []
    for(let cat of cats){
        for(let emotion of cat.emotionTags) {
                if(!emotionsArray.includes(emotion)) 
                    emotionsArray.push(emotion)
        }
    }
    return emotionsArray
}

function renderEmotionsRadios(cats) {
    let emotions = getEmotionsArray(cats)
    let radioItems = ``
    for(let emo of emotions){
        let para = `
        <div class="radio">
            <label for="${emo}">${emo}</label>
            <input 
                type="radio"
                id="${emo}"
                value="${emo}"
                name="emotions"
            >
        </div>
        `
        radioItems+= para
    }
    emotionsDiv.innerHTML+= radioItems
}

renderEmotionsRadios(catsData)



