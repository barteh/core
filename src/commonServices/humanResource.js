import Rx from  "rxjs"
import {Server} from '@barteh/as-service';

let sub=null;
let firsttime=true;

export function AHumanResources(refresh){

    sub=sub || new Rx.BehaviorSubject();
    if(refresh||firsttime){
        firsttime=false;
        Server.dvm("dvm_App_o_Human_Resource")
        .then(a=>{
        sub.next(r.data)
        })
    }
    return sub;

}