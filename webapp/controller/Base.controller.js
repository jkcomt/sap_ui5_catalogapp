sap.ui.define([
	"sap/ui/core/mvc/Controller",
  "sap/ui/core/UIComponent",
  "sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel"
], function(
	Controller,
	UIComponent,
	History,
	JSONModel
) {
	"use strict";

	return Controller.extend("appviewcatalog.controller.Base", {
        
        getRouter(){
            return UIComponent.getRouterFor(this);
        },
        navTo(viewRoute, param = null){
            this.getRouter().navTo(viewRoute,param)
        },

        onNavBack: function () {
            let oHistory,sPreviousHash;
            oHistory = History.getInstance();
            sPreviousHash = oHistory.getPreviousHash();
            if (sPreviousHash !== undefined) {
              window.history.go(-1);
            } else {
              this.getRouter().navTo("RouteMain");
            }
        },

        getById: function(sId){
          return this.getView().byId(sId);
        }

        // getNavHistory: function(){
        //     let oHistory;
        //     oHistory = History.getInstance();
        //     let navHistory = oHistory.aHistory;
        //     let oNavs = new JSONModel(navHistory);
        //     this.getView().setModel(oNavs,"mNavHistory");
        // },

        // setLinkstoBreadCumbs: function(id){
        //     let breadCrumbs = this.getView().byId(id);
        //     let aNavHistory = this.getView().getModel("mNavHistory").getData();
        //     if(breadCrumbs){
        //         aNavHistory.forEach( item => {
        //             if(item != aNavHistory[aNavHistory.length-1]){
        //                 let sText = item == '' ? 'Home': item;
        //                 breadCrumbs.addLink(new sap.m.Link({text:sText, press:function(){}}));
        //             }
        //         });
        //         breadCrumbs.setCurrentLocationText(aNavHistory[aNavHistory.length-1]);
        //     }
        // }

	});
});