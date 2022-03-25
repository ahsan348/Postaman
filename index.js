console.log('hello world');

function getElements(string) {
    let div = document.createElement('div');
    div.innerHTML= string;
    return div.firstElementChild;
}

let addcount =0;

let parabox = document.getElementById('parameterbox');
parabox.style.display = "none";

let parameter = document.getElementById('parameters');

parameter.addEventListener('click', () => {
    let jsonBox = document.getElementById('jsonBox');
    jsonBox.style.display = "none";
    parabox.style.display = "block";
})

let json = document.getElementById('json');

json.addEventListener('click', () => {
    jsonBox.style.display = "block";
    parabox.style.display = "none";
})

let addbtn = document.getElementById('addparameter');
addbtn.addEventListener('click', () => {
    let newparameter = document.getElementById('newparameter');

    let string = `<div class="row g-3 mt-2">
                    <div class="col-sm-2">
                        <label for="parameters" class="col-form-label">Parameter ${addcount + 2}</label>
                    </div>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" placeholder="Enter parameter key ${addcount + 2}" aria-label="key">
                    </div>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" placeholder="Enter parameter value ${addcount + 2}" aria-label="value">
                    </div>
                    <div class="col-sm">
                        <button type="button" class="btn btn-dark remove" id="removeparameter">-</button>
                    </div>
                </div>`
    let element = getElements(string);
    newparameter.appendChild(element)
    addcount++;

    // let removeElement = document.getElementById('removeparameter');
    // removeElement.addEventListener('click',(e)=>{
    //     e.target.parentElement.remove();
    //     console.log('remove')
    // })
    let remove = document.getElementsByClassName('remove');

    for (let cheez of remove){
        cheez.addEventListener('click',(e)=>{
            e.target.parentElement.parentElement.remove()
        })
    }
})