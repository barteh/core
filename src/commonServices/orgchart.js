import Rx from "rxjs"
import {Server} from '@barteh/as-service';

// let orgChartList=null; let deputiesList=null; let topchartList=null; let
// orgList=null;

export class AOrgChart {

    static sub;
    static firstime = true;
    static instance;
    selectedOrgChart = {
        boxid: -1,
        name: ''
    };
    static _topGeoOfScope = null;
    orgChartList = [];
    staff_tree = [];
    org_tree = [];
    branch_tree = [];
    static types = [];

    getChilsOfParent(parentid, scopeid) {

        return this
            .orgChartList
            .filter(a => {
                if (a.parent === parentid && a.scopeid === scopeid) {
                    return a;
                }

            })
    }
    getOrgchartListAsTree() {

        this.staff_tree = [];
        this.org_tree = [];
        this.branch_tree = [];

        // const staff_list = Object.assign([], this.orgChartList.filter(a => a.scopeid
        // === 1));
        var staff_list = this
            .orgChartList
            .filter(a => a.scopeid === 1);
        for (let i = 0; i < staff_list.length - 1; i++) {
            staff_list[i].key = staff_list[i].boxid;
            staff_list[i].title = staff_list[i].name;
            if (staff_list[i].istype === 2) {
                staff_list[i].subtitle = staff_list[i].position_name;
            }
            staff_list[i].children = this.getChilsOfParent(staff_list[i].boxid, 1)
        }
        // this.orgChartList[0].staff_tree=staff_list[0]
        this.orgChartList[0].staff_tree = [];
        this
            .orgChartList[0]
            .staff_tree
            .push(staff_list[0]);
        //         .staff_tree    .push(staff_list[0]) const org_list =
        // Object.assign([], this.orgChartList.filter(a => a.scopeid === 2));
        var org_list = this
            .orgChartList
            .filter(a => a.scopeid === 2);
        for (let i = 0; i < org_list.length - 1; i++) {
            org_list[i].key = org_list[i].boxid;
            org_list[i].title = org_list[i].name;
            if (staff_list[i].istype === 2) {
                staff_list[i].subtitle = staff_list[i].position_name;
            }
            org_list[i].children = this.getChilsOfParent(org_list[i].boxid, 2)
        }
        this.orgChartList[0].org_tree = [];
        this
            .orgChartList[0]
            .org_tree
            .push(staff_list[0]);
        // this     .org_tree     .push(org_list[0]) const branch_list =
        // Object.assign([], this.orgChartList.filter(a => a.scopeid === 3));
        var branch_list = this
            .orgChartList
            .filter(a => a.scopeid === 3);
        for (let i = 0; i < branch_list.length - 1; i++) {
            branch_list[i].key = branch_list[i].boxid;
            branch_list[i].title = branch_list[i].name;
            if (staff_list[i].istype === 2) {
                staff_list[i].subtitle = staff_list[i].position_name;
            }
            branch_list[i].children = this.getChilsOfParent(branch_list[i].boxid, 3)
        }
        this.orgChartList[0].branch_list = [];
        this
            .orgChartList[0]
            .branch_list
            .push(staff_list[0]);
        // this     .branch_tree     .push(branch_list[0])

    }

    static getChart(/*refresh, error*/) {
        
        AOrgChart.sub = AOrgChart.sub || new Rx.BehaviorSubject();

        let chart = new AOrgChart();
        // if (AOrgChart.firstime || refresh) {     AOrgChart.firstime = false;     //
        // chart     //     .load(error)     //     .then(a => {     // AOrgChart     //
        //             .sub     //             .next(chart);     // }); }

        return chart;
        // this     .sub     .filter(a => a!==undefined);
    }
    constructor() {
        if (!AOrgChart.instance) 
            AOrgChart.instance = this;
        return AOrgChart.instance;
    }
    deputies() {

        return this
            .orgChartList
            .filter(a => a.typeid < 3 && a.scopeid == 1);

    }
    topChart() {
        return this
            .orgChartList
            .filter(a => !a.parent);

    }
    getOrgList() {
        return this
            .orgChartList
            .filter(a => a.scopeid === 2);
    }
    getBoxById(id) {
        return this
            .orgChartList
            .filter(a => a.boxid === id)
    }
    getDeepChilds(boxid, arr) {
        arr = arr || this.ochart;
        for (var i = 0; i < arr.length; i++) {
            var temp = this
                .ochart
                .find((a) => {
                    return a.boxid === arr[i].boxid;
                });
            arr[i].pl1 = temp.pl1;
            arr[i].pl2 = temp.pl2;
            arr[i].pl3 = temp.pl3;
            arr[i].pl4 = temp.pl4;
            arr[i].pl5 = temp.pl5;
            arr[i].pl6 = temp.pl6;
            arr[i].pl7 = temp.pl7;
            arr[i].pl8 = temp.pl8;
            arr[i].pl9 = temp.pl9;
        }

        return arr.filter(function (a) {
            if (a.pl1 === boxid || a.pl2 === boxid || a.pl3 === boxid || a.pl4 === boxid || a.pl5 === boxid || a.pl6 === boxid || a.pl7 === boxid || a.pl8 === boxid || a.pl9 === boxid) 
                return true;
            else 
                return false;

            }
        );

    }
    getTopChart() {
        // > {a.parent === null }));

        return this
            .orgChartList
            .find(a => a.parent === null);

    }

    getTopGeoOfScope(scopeid) {
        if (AOrgChart._topGeoOfScope) 
            return AOrgChart._topGeoOfScope[scopeid];
        
        AOrgChart._topGeoOfScope[scopeid] = (scopeid === 2 || scopeid === 4)
            ? this.getTopChart()
            : {};

        for (var i = 0; i < AOrgChart.orgChartList.length; i++) {
            var oc = AOrgChart.orgChartList[i];
            if (oc.scopeid != 2 && oc.scopeid != 4) {
                if (!AOrgChart._topGeoOfScope[oc.scopeid]) {
                    AOrgChart._topGeoOfScope[AOrgChart.orgChartList[i].scopeid] = oc;
                } else if (AOrgChart._topGeoOfScope[oc.scopeid].level < oc.level) {
                    AOrgChart._topGeoOfScope[AOrgChart.orgChartList[i].scopeid] = oc;
                }

            }

        }
        return AOrgChart._topGeoOfScope[scopeid];

    }

    load(error) {
        
        this.orgChartList = [];
        return new Promise((resp, rej) => {

            Server.dvm("DVM_App_o_ochart", {
                o: 'boxid,parent,typeid'
            }, {cache: false}).then((r) => {

                if (r.data) {
                    this.orgChartList = r.data;
                    this.getOrgchartListAsTree()
                    //this.selectedOrgChart=this.getTopChart(); AOrgChart.getTypes();
                    resp(this);

                } else {
                    rej(r.status);
                    if(error)
                    error(r.status)
                }

            }).catch(e => {
                rej(e.status)
            })
        });

    }
    changeSelected(boxid) {
        
        let x = this
            .orgChartList
            .filter(a => a.boxid === boxid);
        if (x.length > 0) {
            this.selectedOrgChart = x[0];

            return this.selectedOrgChart;
        }

    }
    editOrgChart(t, done) {
        Server
            .controller('ochart', 'edit_ochart', {
            boxid: t.boxid,
            parent: t.parent,
            typeid: t.typeid || 9,
            name: t.name,
            position_name: t.position_name,
            position_type: t.position_type,
            geoid: t.geoid,
            geotype: t.geotype,
            orders: t.orders,
            des: t.des
        })
            .then(r => {

                done(r.data);
            })

    }
    addOrgChart(parent, t, done) {
        
        Server
            .controller('ochart', 'add_ochart', {
            scopeid: parent.scopeid,
            typeid: 9,
            name: t.position_name,
            parent: parent.boxid, //t.parent,
            chartbox: parent.chartbox,
            geotype: parent.geotype,
            istype: 1, //t.istype,
            capacity: 1, // t.capacity,
            postition_name: t.position_name,
            geoid: parent.geoid,
            // editable: parent.editable,
            orders: parent.orders,
            relbox: parent.relbox,
            des: parent.des
        })
            .then(r => {
                done(r.data);
                
            })
    }
    deleteOrgChart(box, done) {
        Server
            .controller('ochart', 'del_ochart', {boxid: box.boxid})
            .then(r => {
                done(r.data);

            })
    }

    static getTypes() {
        if (AOrgChart.types.length === 0) {
            Server
                .dvm('DVM_app_type_ch_type', {})
                .then(r => {
                    if (r.data) 
                        for (let i of r.data) {
                            AOrgChart
                                .types
                                .push(i)
                        }
                    return AOrgChart.types;
                })
                //.catch(e => {})
        }
        return AOrgChart.types;

    }

}