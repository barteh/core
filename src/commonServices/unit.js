import Rx from "rxjs"
import {Server} from '@barteh/as-service';

let sub=null;
let firsttime=true;
export function AUnit(refresh,error){

    sub=sub|| new Rx.BehaviorSubject();

    if(refresh || firsttime){
        firsttime=false   ;
        Server.dvm("dvm_base_input",{},{error:a=>{
            this.firsttime=true;
            if (error) error(a);
        }
        })
        .then(function(r){
        sub.next(r.data)
        })
    }
    return sub.filter(a=>a);
}