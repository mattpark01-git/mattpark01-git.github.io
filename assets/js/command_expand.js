
function getChildElementByClass(ele, className) {
    let childNodes = ele.childNodes;
    for(var j=0;j<childNodes.length;j++) {
        if(childNodes[j].classList && childNodes[j].classList.contains(className)) {
            return childNodes[j];
        }
    }
    return undefined;
}

function decorateCommand(cmd) {
    
    function decorateCommandHelper(cmd) {
        let build = "<span style=\"color:#00f;\">";

        let closeOnNextSpace = true;
        let inQuotes = false;
        let prevChar = undefined;
        for(let i=0;i<cmd.length;i++) {
            let c = cmd[i];
            if((prevChar == ' ' || prevChar == ';') && c == ' ' && !inQuotes) {
                continue;
            }

            if((c == ' ' || c == ';') && closeOnNextSpace && !inQuotes) {
                build += "</span>";
                closeOnNextSpace = false;
            }

            if(c == '\"') {
                if(!inQuotes) build += "<span style=\"color:#0a0;\">";
            }
    
            if(c == '-' && prevChar == ' ' && !inQuotes) {
                build += "<br>&nbsp;&nbsp;&nbsp;&nbsp;<span style=\"color:#f00;\">";
                closeOnNextSpace = true;
            }
    
            build += c;
    
            if(c == ';'  && !inQuotes) {
                build += "<br><span style=\"color:#00f;\">";
                closeOnNextSpace = true;
            }
            
            if(c == '\"') {
                if(inQuotes) build += "</span>"
                inQuotes = !inQuotes;
            }
    
            prevChar = c;
        }
    
        return build;
    }

    return decorateCommandHelper(cmd);
    
}


let commandElements = document.getElementsByClassName("command-block");
for (var i = 0; i < commandElements.length; i++) {
    let ele = commandElements.item(i);
    let title = getChildElementByClass(ele, "command-title").innerHTML;
    let data = getChildElementByClass(ele, "command-data").innerHTML;
    let desc = getChildElementByClass(ele, "command-desc").innerHTML;

    let innerHTML = "<div class=\"command-header\"> " + title + "</div>";

    innerHTML += "<div class=\"command-data-hidden hidden\">" + data + "</div>";

    innerHTML += "<div class=\"command-content hidden\">";

    innerHTML += "<div class=\"command-text-area\"><button class=\"clipboard\">copy to clipboard</button>" + decorateCommand(data) + "</div>";
    
    innerHTML += "<br>";
    innerHTML += desc;

    innerHTML += "</div>";
    ele.innerHTML = innerHTML;

}

let commandHeaderElements = document.getElementsByClassName("command-header");
for (var i = 0; i < commandHeaderElements.length; i++) {
    let ele = commandHeaderElements.item(i);

    ele.onclick = function(){
        ele.classList.toggle("command-active");

        let childNodes = ele.parentNode.childNodes;
        for(var j=0;j<childNodes.length;j++) {
            if(childNodes[j].classList.contains("command-content")) {
                childNodes[j].classList.toggle("hidden");
            }
        }
        
        return false;
    };
}