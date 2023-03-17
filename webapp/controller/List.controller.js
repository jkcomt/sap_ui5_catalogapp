sap.ui.define([
    "sap/ui/core/mvc/Controller",
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
                console.log("soy el evento onInit del controller List");             
            },

            onPressProduct: function(oEvent){
                let oItem = oEvent.getSource().getSelectedItem().getBindingContext("mProduct").getObject();
                
                let idxProduct = this.getView().getModel("mProduct").getData().ProductCollection.indexOf(oItem);
                
                let oRouter = UIComponent.getRouterFor(this);
                oRouter.navTo("ViewDetail",{
                    productId: idxProduct
                })

            },

            onSearch: function(oEvent){
                let aFilters = [];
                let sQuery = oEvent.getSource().getValue();

                if(sQuery && sQuery.length > 0){
                    let oFilter = new Filter("Name", FilterOperator.Contains,sQuery);
                    aFilters.push(oFilter);
                }

                let oList = this.byId("listProducts");
                let oBinding = oList.getBinding("items");
                oBinding.filter(aFilters);

            }
        });
    });
