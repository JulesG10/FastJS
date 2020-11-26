const { randomInt } = require("crypto");
const fs = require("fs");
const path = require("path");
const beautify = require('js-beautify').js;

module.exports.Utils = class {
    
    code="";
    selector=/([#.\(][a-zA-Z\[\]0-9\)]+\:)/g;
    soloFunction = [];
    back;
    
    constructor(str,callback=null) {
        this.code=str;
        this.back=callback;
    }

    Minify(){
        let res = this.code.replace(/\n/g,"");
        res=res.replace(/\t/g,"");
        res=res.replace(/\s/g,"");
        this.code=res;
        return res;
    }

    Parse(){
       let split=this.code.split(this.selector).filter(item=>{ return item != ""});
       if(split.length%2==0){
        let final =[];
        let keep; 
        for (let i = 0; i < split.length; i++) {
            
            if(i%2==1){
                final.push(keep+split[i]);
            }else{
                keep=split[i];
            }
        }
        this.soloFunction = final;
       }else{
           throw new SyntaxError("A function is empty !");
       }
    }   

    JSsyntax(selectorElement,event,Change,selectorIndex,item){
        let CssInline = "";
        let delay=0;
        let callback=[];
            Change.map(css=>{
                if(this.back!=null){
                    let cb = this.back(selectorElement,event,Change,selectorIndex,item,css);
                    if(cb!=undefined&&cb!=""&&cb!=null){
                        if(cb.endsWith(";")){
                            CssInline+=cb;
                        }else{
                            CssInline+=cb+";";
                        }
                    }
                }
                switch (css.css) {
                    case "callback":
                        if(css.value.match(/^[a-zA-Z0-9]+\(\)/g)!=null&&css.value.match(/^[a-zA-Z0-9]+\(\)/g).length==1){
                            callback.push(css.value.match(/([a-zA-Z0-9]+\(\))|([a-zA-Z0-9]+)/g)[0]);
                        }else{
                            throw new Error("Callback error \""+css.css+":"+css.value+"\" at "+item);
                        }
                        break;
                    case "delay":
                        if(css.value.match(/[0-9\.]+(ms|s)/g))
                        {
                            let unity = css.value.split(/(ms)/g).length>1 ? "ms" : "s";
                            let value = parseFloat(css.value.split(unity)[0]);
                            if(unity=="s"){
                                delay=value*1000;
                            }else{
                                delay=value;
                            }
                        }else{
                            throw new Error("Invalid delay \""+css.value+"\" in "+item);
                        }
                        break;
                    case "attribute":
                        let detect = /^(set|rem)\(["a-zA-Z0-9-,]+\)$/g
                        if(css.value.match(detect).length==1){
                           let isSet = css.value.match(/^(set)/g) ? true : false;
                           if(isSet){
                            let nValue=css.value.replace(/set\(/g,"");
                            nValue=nValue.replace(/\"/g,"");
                            nValue=nValue.replace(/\)/g,"");
                            if(nValue.split(",").length==2){
                                CssInline+="if(e.target){e.target.removeAttribute(\""+nValue.split(",")[0]+"\"); e.target.setAttribute(\""+nValue.split(",")[0]+"\",\""+nValue.split(",")[1]+"\") }";
                            }else{
                                throw new Error("Set attribute must have 2 value in "+item)
                            }
                           }else{
                            let nValue=css.value.replace(/rem\(/g,"");
                            nValue=nValue.replace(/\"/g,"");
                            nValue=nValue.replace(/\)/g,"");
                            nValue=nValue.replace(/\,/g,"");
                            CssInline+="e.target ? e.target.removeAttribute(\""+nValue+"\") : null;";
                           }
                        }
                        break;
                    default:
                        CssInline+="e.target.style ? e.target.style."+css.css+"=\""+css.value+"\" : null;";
                        break;
                }
        })
        if(selectorIndex!=undefined){

            let finalCode = `document.querySelectorAll(\"`+selectorElement+`\")[`+selectorIndex+`].addEventListener(\"`+event+`\",function(e){`;
            if(delay>0){
                finalCode += `setTimeout(function(){
                    `+CssInline+`
                },`+delay+`); `;
            }else{
                finalCode+= CssInline;
            }
            callback.map(call=>{
                finalCode+=call+";";
            })
            finalCode+="});";
            return finalCode;
        }else{
            let finalCode = `document.querySelectorAll(\"`+selectorElement+`\").forEach(function(item){item.addEventListener(\"`+event+`\",function(e){`;
            if(delay>0){
                finalCode += `setTimeout(function(){
                    `+CssInline+`
                },`+delay+`); `;
            }else{
                finalCode+= CssInline;
            }
            callback.map(call=>{
                finalCode+=call+";";
            })
            finalCode+="}); });";
            return finalCode;
        }
    }

    Create(ouput){
        let Code ="";
        this.soloFunction.map(item=>{
            let part= item.split(/\{/g);
                if(part.length==2){
                    part[1]=part[1].replace(/\}/g,"");
                    if(part[0].split(":").length==2){
                        let selectorElement = part[0].split(":")[0];
                        let event = part[0].split(":")[1];
                        let Change = [];
                        let selectorIndex=undefined;
                        part[1].split(";").map(css=>{
                            if(css!=""&&css.split(":").length==2){
                                Change.push({css:css.split(":")[0],value:css.split(":")[1]});
                            }
                        })
                        if(selectorElement.split("[")!=null&&selectorElement.split("[").length==2){
                            selectorIndex=selectorElement.split("[")[1].replace(/\]/g,"");
                            selectorElement=selectorElement.replace(/\[[0-9]+\]/g,"");
                        }
                        if(selectorElement.match(/^\(/g)!=null&&selectorElement.match(/^\(/g).length==1){
                            selectorElement=selectorElement.replace(/\(/,"[");
                            selectorElement=selectorElement.replace(/\)/,"]");
                        }
                        Code+=this.JSsyntax(selectorElement,event,Change,selectorIndex,item)+"\n";
                    }else{
                        throw new SyntaxError("ERROR in function "+this.soloFunction[item]);
                    }
                }else{
                    throw new SyntaxError("ERROR in function "+this.soloFunction[item]);
                }  
        })
        fs.writeFileSync(ouput,beautify(Code),"utf8")
    }

}

module.exports.Parse = (input,ouput=__dirname)=>{
    if(fs.existsSync(input)){
       let parse =  new this.Utils(fs.readFileSync(input,"utf-8"));
       parse.Minify()
       parse.Parse()
       let out = path.resolve(path.dirname(ouput),path.basename(input).split(".")[0]+".js");
       parse.Create(out);
    }else{
        let parse =  new this.Utils(input);
        parse.Minify()
        parse.Parse()
        let out = path.resolve(path.dirname(ouput),".js");
        parse.Create(out);
    }
}

module.exports.CustomParse = (input,ouput,callbackExecutor)=>{
    if(fs.existsSync(input)){
       let parse =  new this.Utils(fs.readFileSync(input,"utf-8"),callbackExecutor);
       parse.Minify()
       parse.Parse()
       let out = path.resolve(path.dirname(ouput),path.basename(input).split(".")[0]+".js");
       parse.Create(out);
    }else{
        let parse =  new this.Utils(input,callbackExecutor);
        parse.Minify()
        parse.Parse()
        let out = path.resolve(path.dirname(ouput),".js");
        parse.Create(out);
    }
}