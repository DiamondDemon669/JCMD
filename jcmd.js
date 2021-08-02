class jcmd {
	constructor(consoleid, height="200px", width="50%", clear=["P", "STRONG", "H1", "H2", "UNDEFINED"]) {
		this.console = document.getElementById(consoleid);
		var clearlist = {};
		clear.forEach(function(value, index, array) { clearlist[value] = value; });
		this.clearlist = clearlist;
		var labelnode = document.createElement("label");
		labelnode.id = "JCMDlabel";
		labelnode.innerHTML = "> "
		var inputnode = document.createElement("input");
		inputnode.id = "JCMDinput";
		var stylenode = document.createElement("style");
		stylenode.innerHTML = "#JCMDinput:focus { outline: 0px; } #JCMDinput { background-color: #0C0C0C; color: #CCCCCC; } #JCMDlabel { color: #CCCCCC; } #{console} { height: {height}; width: {width}; background-color: #0C0C0C; } .output { color: #CCCCCC; margin-block: 0; }".replace("{console}", consoleid).replace("{height}", height).replace("{width}", width);
		this.console.appendChild(labelnode);
		this.console.appendChild(inputnode);
		this.console.appendChild(stylenode);
		this.prompter = document.getElementById("JCMDlabel");
		this.input = document.getElementById("JCMDinput");
	}
	onInput(callback) {
		this.input.addEventListener("keyup", function(event) { if (event.keyCode === 13) { callback(); } });
	}
	output(inputtext, inputtype="p") {
		var output = document.createElement(inputtype);
		output.innerHTML = inputtext;
		output.classList.add("output");
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
class interpreter extends jcmd {
	constructor(consoleid, height="200px", width="50%", clear=["P", "STRONG", "H1", "H2", "UNDEFINED"]) {
		super(consoleid, height, width, clear)
		this.binder = {};
		this.fdata = {};
		this.binder["$all"] = function() { return null; };
		super.onInput(this.activate.bind(this));
	}
	bind(command, callback) {
		this.binder[command] = callback;
	}
	unBind(command) {
		this.binder[command] = undefined;
	}
	activate() {
		if (this.input.value in this.binder) {
			this.binder[this.input.value]();
		} else {
			for (var x in this.binder) {
				var found = false;
				if (x.includes("$else") && this.input.value.includes(x.replace("$else", ""))) {
					this.binder[x]();
					found = true;
					break
				}
			}
			if (!found) {
				this.binder["$all"]();
			}
		}
	}
}
