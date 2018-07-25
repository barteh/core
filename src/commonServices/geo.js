import Rx from "rxjs"

import {Server} from '@barteh/as-service';

export class AGeo{
   
    sub;
    firstime=true;
    static instance=null;
    ChiledList={};
   
    layerCount=6;
    layer_selected_geo={'0':{  geoid:"IR",name: "ایران",type:0,parent:"",typename:"کشور"  },'1':{},'2':{},'3':{}};
    layer_list={'0':[],'1':[],'2':[],'3':[],'4':[]};
   
    constructor(){
        if(!AGeo.instance)
            AGeo.instance=this;
        
        this.sub=  this.sub || new Rx.BehaviorSubject();
        this.layer_list=this.layer_list||{'0':[],'1':[],'2':[],'3':[],'4':[]};
        this.layer_list[0]=[{  geoid:"IR",name: "ایران",type:0,parent:"",typename:"کشور"  }];
        this.changeSelected(0, this.layer_selected_geo[0]);
       
        return AGeo.instance;
    }


    static get(refresh){
        console.log(55)
        let geo=new AGeo();
        if(geo.firstime || refresh){

            geo.firstime =false;

            geo.getChiledList("IR")
            .then(()=>{
               
            geo.sub.next(geo);
           }) 
        }
       
        return geo.sub.filter(a=>a);
    }

    getChiledList(parent,refresh){
        
        return  new Promise((a/*,b*/)=>{
            if (!this.ChiledList[parent]||refresh){
                this. loadChiledList(parent,refresh)
               .then(z=>{
               
                   this. ChiledList[parent]=z;
        
                   a( this.ChiledList[parent]);
               })
            
            }else{
              
                a( this.ChiledList[parent]);
            }
        });
    }

    loadChiledList(parent/*,refresh*/){

        this.ChiledList[parent.toString()]=null;

        return new Promise((a/*,b*/)=>{

            //Server.controller("useredit","countusertogeo",{geoid:parent})
            Server.controller("plancontroller","sel_geo",{geoid:parent})
                .then((r)=>{
            
                    this.ChiledList[parent]=r.data;
                    a(this.ChiledList[parent])
                   // return this.ChiledList[parent];
                });
        })
    }

    changeSelected(layer,obj){
       // 
      

        this.layer_selected_geo[layer]=obj;

       
        // if(this.layer_type[layer]==obj.type){
        
        //    if(layer==obj.type){
        //        this.clear_childs(layer);
            
        //}else {     
                if(layer+1<this.layerCount){
                this.getChiledList(obj.geoid)
                .then(()=>{
                  
                    this.layer_list[layer+1]=this.ChiledList[obj.geoid] ;
                  
                    this.clear_childs(layer+1);
                 
                })
            } 
       // }
    }

    clear_childs(layer){
        this.layer_selected_geo[layer]={};
        for(let i=layer+1;i<this.layerCount;i++){
            this.layer_list[i]=null;
            this.layer_selected_geo[i]={};
        }
    }
    get when(){
        return new Promise((a/*,b*/)=>{
                a( AGeo.instance);
        })
    }




    
  


}