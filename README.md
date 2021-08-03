# JCMD

This is a simple javascript terminal. you can use the jcmd or interpreter classes to fully customize this console

notes:
1. to create a jcmd object, the page must be loaded

## Docs

### examples
```html
<html><body>
<div id="console"></div>
<script src="jcmd.js"></script>
<script>
  window.addEventListener("load", function() {
    let jc = new jcmd("console", height="400px", width="75%");
    var echo = function(jc) { jc.output(jc.input.value); };
    jc.onInput(echo.bind(jc));
  });
</script>
</body></html>
```
That example will echo any input you type in
```html
<html><body>
<div id="console"></div>
<script src="jcmd.js"></script>
<script>
  window.addEventListener("load", function() {
    let jci = new interpreter("console");
    jci.bind("$all", function() { this.output(this.input.value); }.bind(jci));
  });
</script>
</body></html>
```
That example does the same thing, but using interpreter class
```html
<html><body>
<div id="console"></div>
<script src="jcmd.js"></script>
<script>
  window.addEventListener("load", function() {
    let jci = new interpreter("console");
    jci.bind("$all", function() { this.output("this is what happens when any value is input"); }.bind(jci));
    jci.bind("/$else", function() { this.output("this is what happens when any value starting with / is input"); }.bind(jci));
  });
</script>
</body></html>
```
That example uses the new $else preset
```html
<html><body>
<div id="console"></div>
<script src="jcmd.js"></script>
<script>
  window.addEventListener("load", function() {
    let jci = new interpreter("console");
    jci.bind("$all", function() { this.output(this.input.value); }.bind(jci));
    jci.bind("/setprompt $else", function() { this.setPrompt = this.input.value.split(" ")[1] + " "; });
  });
</script>
</body></html>
```
That example uses the $else preset to allow arguments for the /setprompt command shown

### info
the interpreter has a few more tricks up its sleeve

if you bind the command $all to a function, that function will be called whenever any input is entered

if you bind the command $else to a function, that function will be called when the command input is not binded to anything

### class jcmd
#### constructor(consoleid, height="200px", width="75%", clear=["P", "STRONG", "H1", "H2"])

initializes console (the clear parameter is the elements to remove when jcmd.clear is run)


#### output(inputtext, inputtype="p")

adds a new element of inputtype (default is p) and sets its innerHTML to inputtext


#### onInput(function.bind())

event listener for enter keypress

will run the callback when the enter key is pressed inside input

please make sure the callbak is a bound function


#### clear()

removes all elements in the clearlist (see jcmd.constructor) but keeps the input and prompter


#### set setPrompt(newval)

changes the innerHTML of jcmd.propmpter (the label element inside the terminal)


#### console

the element you put the terminal in


#### input

the input element inside the console


#### prompter

the label element next to jcmd.input


#### clearlist

an asociative array containing the clear parameter of jcmd.constructor


### class interpreter extends jcmd
#### constructor()

initialized the interpreter and binds activate function to jcmd.onInput


#### bind(command, function.bind())

calls function() when command is input


#### unBind(command)

unbinds a callback


#### activate()

starts the interpreter. dont use this function, it is already running

#### fdata

stores any data you want to put in here, will be global for any function using interpreter as this


#### binder

stores the commands and callbacks to all the commands you binded
