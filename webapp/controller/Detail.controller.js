sap.ui.define([
	"./Base.controller"
], function(
	Controller
) {
	"use strict";

	return Controller.extend("appviewcatalog.controller.Detail", {
        /**
         * @override
         */
        onInit: function() {
            this.getRouter().getRoute("ViewDetail").attachMatched(this._onRouteMatched,this);
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
            let oRouter = this.getRouter();
            if(!oEvent.getSource().getBoundContext().getObject()){
                oRouter.getTargets().display("TargetNotFound")
            }
        }
	});
});