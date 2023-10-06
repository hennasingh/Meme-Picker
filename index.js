import { catsData } from "./data.js"

const emotionsDiv = document.getElementById('emotion-radios')

emotionsDiv.addEventListener('change', highlightCheckedOption)

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



