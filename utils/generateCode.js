const generateCode = (codeLength) =>{
    const numbers = String(Math.random()).split(".")[1].split("");//['9','1',...]
    const length = numbers.length;
    if(!codeLength)
        codeLength = 4;
    let code = "";
    for(let i = 0 ; i < codeLength ; i++){
        code = code + numbers[length-(i+1)];
    }
    return code;
}
module.exports = generateCode