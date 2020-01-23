var url = "https://poloniex.com/public?command=returnCurrencies";

var arr = [];
async function start(){
    let res = await fetch(url);
    if(res.ok){
        let data = await res.json();
        let tbl = document.createElement("table");
        tbl.className = "table";
        let thead = document.createElement("thead");
        thead.className = "thead-dark";
        let tr = document.createElement("tr");

        let index = 0;
        let th1 = document.createElement("th");
        tr.append(th1);
        for(let key in data["1CR"]){
            let th = document.createElement("th");
            th.innerHTML = key;
            tr.append(th);
            if(index == 6)
                 break;
            index++;
        }

        
        thead.append(tr);
        tbl.append(thead);
        
        
        
        
        for(let key in data){
            arr.push(data[key])
        }

       
        
        let tbody = document.createElement("tbody");
        tbody.id = "tbody";
        
        tbl.append(tbody);

        document.getElementById("main").append(tbl);
        refreshTable();

    }
    else{
        console.log("error");
    }
}
start();

function refreshTable(){
    let tbody = document.getElementById("tbody");
    tbody.innerHTML = "";
    for(let i = 0; i < arr.length;i++){
        let tr = document.createElement("tr");

        let th1 = document.createElement("th");

        let btn = document.createElement("button");
        btn.innerHTML = "Delete";
        btn.className = "btn btn-outline-dark";
        btn.onclick = ()=>{
            arr.splice(i,1);
            refreshTable();
        };
        th1.append(btn);

        tr.append(th1);
        let index = 0;
        for(let key in arr[i]){
            let th = document.createElement("th");
            
                if(key == "depositAddress"){
                    th.innerHTML = ((arr[i][key]) != null) ? (arr[i][key]).substring(0,6) : "_";
                    
                }
                else{
                    th.innerHTML = (arr[i][key]);
                }
                tr.append(th);
            if(index == 6)
                break;
                index++;
        }
        index = 0;
        
        tbody.append(tr); 
        
    }
}
 
function searchClick(){
    let tbody = document.getElementById("tbody");
    tbody.innerHTML = "";
    let res = [];

    let search = document.getElementById("searchBox").value;
    for(let i = 0; i < arr.length;i++){
        if((arr[i]["name"].toLowerCase()).includes(search.toLowerCase())){
            res.push(arr[i]);
            res[i].realId = i;
        }
    }

    

    for(let i = 0; i < res.length;i++){
        let tr = document.createElement("tr");

        let th1 = document.createElement("th");

        let btn = document.createElement("button");
        btn.innerHTML = "Delete";
        btn.className = "btn btn-outline-dark";
        btn.onclick = ()=>{
            arr.splice(res[i].realId,1);
            refreshTable();
        };
        th1.append(btn);

        tr.append(th1);
        let index = 0;
        for(let key in res[i]){
            let th = document.createElement("th");
            
                if(key == "depositAddress"){
                    th.innerHTML = ((res[i][key]) != null) ? (res[i][key]).substring(0,6) : "_";
                    
                }
                else{
                    th.innerHTML = (res[i][key]);
                }
                tr.append(th);
            if(index == 6)
                break;
                index++;
        }
        index = 0;
        
        tbody.append(tr); 
        
    }
    
    

}

