sap.ui.define([
    "./Base.controller"
],

    function (Controller) {
        "use strict";

        return Controller.extend("appviewcatalog.controller.Main", {
            onInit: function () {

            },
            onPressTile: function(oEvent){
                let viewRoute = oEvent.getSource().getBindingContext("mTile").getObject().view;                
                this.navTo(viewRoute);
            }
        });
    });
