
import {Server} from '@barteh/as-service';



 
export function doChangePass(oldPass,newPass,captcha){

  return new Promise( (res,rej)=>{

    Server.controller("useraction","changepassword",{ //("pevalcontroller","changepassword_authenticate",{
     oldpass:oldPass
     ,newpass: newPass
     , chap:captcha

    })

    .then(r=>{
      if (r)
      console.log("44444",r.data);
      res(r.data);
    })
    .catch(r=>{
      console.log("5555",r);
      rej(r.data);

    })
});
}

export function doLogin(user, pass, captcha,  done) {
  
  
  

    Server.controller("useraction","login",{
          username:user,
          password: pass, 
          chaptcha: captcha
    })
    .then(r=>{
    //  if (r.data === 0) {
      //  let u = new AUserInfo();
      //  u.refresh();

     // }

        done(r.data);
      
    })
    .catch(r=>{
      console.log(500,r)
      done(500);
    })




  
}
export function doLogout(done) {
  
  Server.controller("useraction", "logoff")

    .then(r => {
    //  if (r.data === 0) {
      //  let u = new AUserInfo();
      //  AUserInfo.lastUserInfo=null;
     //   u.refresh();
     // }
    //  else
          done(r.data);
    })
    .catch(() => {

      done(500);
    });



}

//peval_authenticate
