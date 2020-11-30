

let categoryElements = document.getElementsByClassName("category");

console.log(categoryElements);
for (var i = 0; i < categoryElements.length; i++) {
    categoryElements.item(i).onclick = function(){
        window.location.href="master_list.html#" + this.innerHTML
    };
}