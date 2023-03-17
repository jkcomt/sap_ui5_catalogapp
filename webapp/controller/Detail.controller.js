sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent"
], function(
	Controller,
    UIComponent
) {
	"use strict";

	return Controller.extend("appviewcatalog.controller.Detail", {
        /**
         * @override
         */
        onInit: function() {
            let oRouter = UIComponent.getRouterFor(this);
            oRouter.getRoute("ViewDetail").attachMatched(this._onRouteMatched,this);
        },

        _onRouteMatched: function(oEvent){
            let oArgs, oView;
            oArgs = oEvent.getParameter("arguments");
            oView = this.getView();

            oView.bindElement({
                path: `mProduct>/ProductCollection/${oArgs.productId}`,
                events: {
                    change : this._onBindingChange.bind(this)
                }
            })
        },

        _onBindingChange: function(oEvent){
            let oRouter = UIComponent.getRouterFor(this);
            if(!oEvent.getSource().getBoundContext().getObject()){
                oRouter.getTargets().display("TargetNotFound")
            }
        }
	});
});