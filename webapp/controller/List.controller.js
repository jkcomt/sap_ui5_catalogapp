sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel,MessageToast) {
        "use strict";

        return Controller.extend("appviewcatalog.controller.List", {
            onInit: function () {               
            },

            onPressProduct: function(oEvent){
                let oItem = oEvent.getSource().getSelectedItem().getBindingContext("mProducts").getObject();
                MessageToast.show(oItem.Name);
            }
        });
    });
