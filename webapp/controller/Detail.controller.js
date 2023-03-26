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
            let oRouter = this.getRouter();
            oRouter.getRoute("ViewDetail").attachMatched(this._onRouteMatched,this);
        },

        _onRouteMatched: function(oEvent){
            let oArgs, oView;
            oArgs = oEvent.getParameter("arguments");
            oView = this.getView();

            oView.bindElement({
                path: `mProduct>/ProductCollection/${oArgs.productId}`,
                events : {
                    change: this._onBindingChange.bind(this)
                }
            })
        },
        
        _onBindingChange : function (oEvent) {
			// No data for the binding
            let oRouter = this.getRouter();
			if (!oEvent.getSource().getBoundContext().getObject()) {
				oRouter.getTargets().display("TargetNotFound");
			}
		}
	});
});