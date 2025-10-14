const valideExt = (ext)=> {
    if(ext === ".jpg" || ext ===".png" || ext === ".jpeg"){
        return true ;
    }else{
        return false ;
    }
};
module.exports = {valideExt};