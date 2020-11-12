import SimpleCrypto from "simple-crypto-js";
export function setCookie(cname, cvalue, exdays){
    var simpleCrypto = new SimpleCrypto(process.env.REACT_APP_SALT_SECRET_CODE + cname);
    var  encrypted = simpleCrypto.encrypt(cvalue);
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + encrypted + ";" + expires + ";path=/;SameSite=Secure;";
}

export function getCookie(cname){
    var name = cname + "=";
    var simpleCrypto1 = new SimpleCrypto(process.env.REACT_APP_SALT_SECRET_CODE + cname);
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            var value = c.substring(name.length, c.length)
            if(value){
                    var decrypted = simpleCrypto1.decrypt(value);
                    return decrypted
            }else{
                return c.substring(name.length, c.length)
            }
            
        }
    }
    return "";
}
export function deleteCookie(key){
    setCookie(key, '', -1)
}
export function deleteAllCookies(){
    deleteCookie("access_token");
}