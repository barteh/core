import Rx from "rxjs"
import {Server} from '@barteh/as-service';

export class AView {

    static sub;
    static firstime = true;
    static instance;

    static getView(refresh, error) {
        AView.sub = AView.sub || new Rx.BehaviorSubject();

        if (AView.firstime || refresh) {
            AView.firstime = false;
            let view = new AView();

            view
                .load()
                .then(a => {

                    AOrgChart
                        .sub
                        .next(view);
                });

        }

        return this.sub;
    }

    constructor() {
        if (!AView.instance) 
            AView.instance = this;
        
        return AView.instance;
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
        arr = arr || ochart;
        for (var i = 0; i < arr.length; i++) {
            var temp = ochart.find(function (a) {
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
        return orgChartList.find(a => a.parent === null);
    }
    _topGeoOfScope = null;
    getTopGeoOfScope(scopeid) {
        if (_topGeoOfScope) 
            return _topGeoOfScope[scopeid];
        
        _topGeoOfScope[scopeid] = (scopeid === 2 || scopeid === 4)
            ? this.getTopChart()
            : {};

        for (var i = 0; i < orgChartList.length; i++) {
            var oc = orgChartList[i];
            if (oc.scopeid != 2 && oc.scopeid != 4) {
                if (!_topGeoOfScope[oc.scopeid]) {
                    _topGeoOfScope[orgChartList[i].scopeid] = oc;
                } else if (_topGeoOfScope[oc.scopeid].level < oc.level) {
                    _topGeoOfScope[orgChartList[i].scopeid] = oc;
                }

            }

        }
        return _topGeoOfScope[scopeid];

    }

    orgChartList = [];

    load(refresh) {
        this.orgChartList = [];

        return new Promise((a, b) => {

            Server.dvm("DVM_App_o_ochart", {
                o: 'boxid,parent,typeid'
            }, {
                error: a => {
                    firsttime = true;
                    if (error) 
                        error(a);
                    }
                }).then((r) => {

                this.orgChartList = r.data;

                a(this.orgChartList);
                return this;
            })
        });

    }

}