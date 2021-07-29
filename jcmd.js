class jcmd {
	constructor(consoleid, height="200px", width="50%", clear=["P", "STRONG", "H1", "H2", "UNDEFINED"]) {
		this.console = document.getElementById(consoleid);
		this.console.style = "height: {height}; width: {width}; background-color: #0C0C0C".replace("{height}", height).replace("{width}", width);
		var clearlist = {};
		clear.forEach(function(value, index, array) { clearlist[value] = value; });
		this.clearlist = clearlist;
		var labelnode = document.createElement("label");
		labelnode.id = "JCMDlabel";
		labelnode.innerHTML = "> "
		labelnode.style = "color: #CCCCCC";
		var inputnode = document.createElement("input");
		inputnode.id = "JCMDinput";
		inputnode.style = "background-color: #0C0C0C; color: #CCCCCC"
		var stylenode = document.createElement("style");
		stylenode.innerHTML = "#JCMDinput:focus { outline: 0px; }";
		this.console.appendChild(stylenode);
		this.console.appendChild(labelnode);
		this.console.appendChild(inputnode);
		this.prompter = document.getElementById("JCMDlabel");
		this.input = document.getElementById("JCMDinput");
	}
	onInput(callback) {
		this.input.addEventListener("keyup", function(event) { if (event.keyCode === 13) { callback(); } });
	}
	output(inputtext, inputtype="p") {
		var output = document.createElement(inputtype);
		output.innerHTML = inputtext;
		output.style = "color: #CCCCCC; margin-block: 0";
		var br = document.createElement("br");
		this.console.insertBefore(br, this.prompter);
		this.console.insertBefore(output, br);
		this.console.removeChild(br);
	}
	clear() {
		while (this.console.firstElementChild.tagName in this.clearlist) {
			this.console.removeChild(this.console.firstElementChild);
		}
	}
	set setPrompt(newval) {
		this.prompter.innerHTML = newval;
	}
}
class interpreter {
	constructor(console) {
		this.jcmd = console;
		this.binder = {};
		this.binder["$all"] = [function() { return null; }, this];
		this.binder["$else"] = [function() { return null; }, this];
	}
	bind(command, callback, thisArg=this) {
		this.binder[command] = [callback, thisArg];
	}
	unBind(command) {
		this.binder[command] = undefined;
	}
	activate(event) {
		if (this.jcmd.input.value in this.binder) {
			this.binder[this.jcmd.input.value][0](this.binder[this.jcmd.input.value][1]);
		} else if ("$all" in this.binder) {
			this.binder["$all"][0](this.binder["$all"][1]);
		} else {
			this.binder["$else"][0](this.binder["$else"][1]);
		}
	}
}