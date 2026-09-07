async function create_template() {
        console.log("READING THE FILE portfolio.json.........");
       const REPO_INFO = await fetch(`/portfolio.json`);
       const Data = await REPO_INFO.json();
          if (!Array.isArray(Data)) {
        throw new Error("Invalid API response received");
     }
 let no_of_elements=0;
 let data_of_repo = [];
 for(let i in Data){
data_of_repo.push([
 Data[i].name,
 Data[i].description,
 Data[i].url,
 JSON.stringify(Data[i].languages),
 Data[i].stars
]);
no_of_elements++;

 }
const container_wrapper = document.getElementById('wrapper');
if (!container_wrapper) return;
container_wrapper.innerHTML = '' ; 
for(let i=0; i<no_of_elements;i++){  
const container = document.createElement('div');
container.classList.add('glass-card');
container_wrapper.appendChild(container);
}
const boxes = document.querySelectorAll('.glass-card');
boxes.forEach((box, index) => {
    box.textContent = ""; 
    
    for(let i = 0; i < 5; i++){
        
     box.textContent +=""; 
        if(i<3){
        box.textContent +=  data_of_repo[index][i] + "\n ";  }
        else if(i==3){
box.textContent +=  data_of_repo[index][i] + "\n ";  
        }
        else{  box.textContent += "Stars:"+ data_of_repo[index][i] ; 
        }
        
    }
});

}
create_template();
