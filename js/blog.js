async function read_data(){
const file_info= await fetch('/blog-content.json');
if(!file_info.ok){
console.log("could not read file");
    return null;
}
const data_to_json= await file_info.json();
return data_to_json;
}
async function  parsing_data_create_link(){
const PARSED_FILE_DATA= await read_data();
const container= document.getElementById('blog-link-container');
container.innerHTML='';
PARSED_FILE_DATA.forEach((data, index)=>{
let parsing_data_object=PARSED_FILE_DATA[index];
const LINK = document.createElement('a');
LINK.classList.add('link-holder');
container.appendChild(LINK);
LINK.textContent= parsing_data_object.date + ":" +  parsing_data_object.title;
let url1= "blog/"+ parsing_data_object.name;
    LINK.href=url1;
});
}
parsing_data_create_link();
