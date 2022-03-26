console.log('hello world');

function getElements(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

let addcount = 0;

let parabox = document.getElementById('parameterbox');
parabox.style.display = "none";

let jsonBox = document.getElementById('jsonBox');
jsonBox.style.display = "none";

let parameter = document.getElementById('parameters');

parameter.addEventListener('click', () => {
    let jsonBox = document.getElementById('jsonBox');
    jsonBox.style.display = "none";
    parabox.style.display = "block";
})

let json = document.getElementById('json');

json.addEventListener('click', () => {
    jsonBox.style.display = "block";
    // requestjson.style.display="block"
    parabox.style.display = "none";

})

let addbtn = document.getElementById('addparameter');
addbtn.addEventListener('click', () => {
    let newparameter = document.getElementById('newparameter');

    let string = `<div class="row g-3 mt-2">
                    <div class="col-sm-2">
                        <label for="parameters" class="col-form-label" style="font-weight: 600;">Parameter ${addcount + 2}</label>
                    </div>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" id="parameterKey" placeholder="Enter parameter key ${addcount + 2}" aria-label="key">
                    </div>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" id="parameterValue" placeholder="Enter parameter value ${addcount + 2}" aria-label="value">
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

    for (let cheez of remove) {
        cheez.addEventListener('click', (e) => {
            e.target.parentElement.parentElement.remove()
        })
    }
})

let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    // console.log('none')
    document.getElementById('prismResponse').innerHTML = "Please wait.. Fetching response...";
    Prism.highlightAll();

    let url = document.getElementById("url").value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    // let contentType = document.querySelector("input[name='contentType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']").value;

    if (contentType == 'newparameter') {
        data = {};

        for (let i = 0; i < addcount + 1; i++) {

            if (document.getElementById('parameterKey' + (i + 1)).value != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;

            }
        }
        data = JSON.stringify(data);

    }

    else {
        data = document.getElementById('Requestjson').value;
    }
    // console.log(url)
    // console.log(requestType)
    // console.log(contentType, "json")
    // console.log(data)
    if (requestType == 'GET') {
        fetch(url, {
            method: 'GET',
        })
            .then(response => response.text())
            .then((text) => {
                document.getElementById('prismResponse').innerHTML = text;
                Prism.highlightAll();
            })

    }
    else {
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.text())
            .then((text) => {
                document.getElementById('prismResponse').innerHTML = text;
                Prism.highlightAll();
            })
        // console.log('post')
    }

})
