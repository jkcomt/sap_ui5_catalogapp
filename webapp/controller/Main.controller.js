sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,UIComponent) {
        "use strict";

        return Controller.extend("appviewcatalog.controller.Main", {
            onInit: function () {

            },
            onPressTile: function(oEvent){
                let viewName = oEvent.getSource().getBindingContext("mTiles").getObject().view;
                let oRouter = UIComponent.getRouterFor(this);
                oRouter.navTo(viewName);
            }
        });
    });
