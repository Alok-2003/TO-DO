let btn = document.querySelector("button");
let ol =  document.querySelector("ol");
let inp = document.querySelector("input");

btn.addEventListener("click", function() {
    let item = document.createElement("li");
    let value = inp.value.trim();
    // Do not create a list element if the user input is null or space.
    if (value) {
      item.innerText = value;
  
      let delBtn = document.createElement("button");
      delBtn.innerText = "Delete";
      delBtn.classList.add("delete");
  
      item.appendChild(delBtn);
      ol.appendChild(item);
      inp.value = "";
    }
  });

// btn.addEventListener("click",function(){
//     let item= document.createElement("li");
//     item.innerText = inp.value;

//     let delBtn = document.createElement("button");
//     delBtn.innerText = "delete";
//     delBtn.classList.add("delete");

//     item.appendChild(delBtn);
//     ul.appendChild(item);
//     inp.value="";
// });

ol.addEventListener("click", function (event) {
    if (event.target.nodeName == "BUTTON") {
        let listItem = event.target.parentElement;
        listItem.remove();
    }
});

// let delBtns = document.querySelectorAll(".delete");
// for(delBtn of delBtns ){
//     delBtn.addEventListener("click",function(){
//         let par = this.parentElement;
//         console.log(par);
//         par.remove();
//     })
// }