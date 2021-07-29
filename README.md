# JCMD

This is a simple javascript terminal. you can use the jcmd or interpreter classes to fully customize this console

notes:
1. the jcmd.clear function is not functioning properly
2. to create a jcmd object, the page must be loaded

## Docs

### examples
```
<html><body>
<div id="console"></div>
<script src="jcmd.js"></script>
<script>
  Window.addEventListener("load", function() {
    let jc = new jcmd("console", height="400px", width="75%");
    var echo = function(jc) { jc.output(jc.input.value); };
    jc.onInput(echo.bind(jc));
  });
</script>
</body></html>
```
That example will echo any input you type in

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


### class interpreter
#### constructor(jcmd)

initialized the interpreter


#### bind(command, callback, thisArg=this)

calls callback(thisArg) when command is input


#### unBind(command)

unbinds a callback


#### activate(event)

starts the interpreter. dont use the activate function directly, instead use like this
```
jcmd.onInput(interpreter.activate.bind(interpreter))
```

jcmd

just stores the jcmd object you input in interpreter.constructor


binder

stores the commands, callbacks and thisArg's to all the commands you binded
