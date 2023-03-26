sap.ui.define([
    "./Base.controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/UIComponent"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel,MessageToast,Filter,FilterOperator,UIComponent) {
        "use strict";

        return Controller.extend("appviewcatalog.controller.List", {
            onInit: function () {
                // this.getNavHistory();
                // this.setLinkstoBreadCumbs("navHistory");
            },

            onPressProduct: function(oEvent){
                let oItem = oEvent.getSource().getSelectedItem().getBindingContext("mProduct").getObject();
                
                //obtener la posición del objeto en nuestra colección, ese será nuestro id
                let idxProduct = this.getView().getModel("mProduct").getData().ProductCollection.indexOf(oItem);
                this.navTo("ViewDetail",{
                    productId: idxProduct
                })
            },

            onSearch: function(oEvent){
                let aFilters = [];
                let sQuery = oEvent.getSource().getValue();
                
                if(sQuery && sQuery.length > 0){
                    let filter = new Filter("Name", FilterOperator.Contains, sQuery);
                    aFilters.push(filter);
                }

                let oList = this.byId("listProducts");
                let oBinding = oList.getBinding("items");
                oBinding.filter(aFilters)
            }
        });
    });
