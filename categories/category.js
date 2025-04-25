let VocabList = [
    {
        id: "1",
        name: "cây cối",
        description: "",
    }
]
const WordListEl = document.querySelector("tbody")

//lấy dữ liệu từ localstorage
if(localStorage.getItem(VocabList)){
    VocabList = JSON.parse(localStorage.getItem("VocabList"))
}

function saveToLocalStorage(){
    localStorage.setItem("VocabList", JSON.stringify(VocabList));
}

function renderVocab(List = VocabList){
    let dataHTML=``;
    for (let i=0; i<List.length; i++){
        dataHTML+=`
            <tr>
                <td>${List[i].name}</td>
                <td>${List[i].description}</td>
                <td>
                  <button>sửa</button>
                  <button>Xóa</button>
                </td>
              </tr>
        `
    }
    WordListEl.innerHTML=dataHTML;
}

function addVocab(event){
    event.preventDefault();
    // VocabList.push({
    //     name: event.target.
    // })
}
renderVocab()