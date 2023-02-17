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
                console.log("soy el evento onInit del controller List");
                
                let aItems = [
                    {
                        "ProductId": "HT-1000",
                        "Category": "Laptops",
                        "MainCategory": "Computer Systems",                        
                        "SupplierName": "Very Best Screens",                        
                        "Description": "Notebook Basic 15 with 2,80 GHz quad core, 15\" LCD, 4 GB DDR3 RAM, 500 GB Hard Disc, Windows 8 Pro",
                        "Name": "Notebook Basic 15",                        
                        "ProductPicUrl": "https://sdk.openui5.org/test-resources/sap/ui/documentation/sdk/images/HT-1000.jpg",
                        "Status": "Available",
                        "Quantity": 10,                        
                        "CurrencyCode": "EUR",
                        "Price": 956                        
                    },
                    {
                        "ProductId": "HT-1001",
                        "Category": "Laptops",
                        "MainCategory": "Computer Systems",                        
                        "SupplierName": "Very Best Screens",                        
                        "Description": "Notebook Basic 17 with 2,80 GHz quad core, 17\" LCD, 4 GB DDR3 RAM, 500 GB Hard Disc, Windows 8 Pro",
                        "Name": "Notebook Basic 17",                        
                        "ProductPicUrl": "https://sdk.openui5.org/test-resources/sap/ui/documentation/sdk/images/HT-1001.jpg",
                        "Status": "Available",
                        "Quantity": 20,                        
                        "CurrencyCode": "EUR",
                        "Price": 1249
                    },
                    {
                        "ProductId": "HT-1002",
                        "Category": "Laptops",
                        "MainCategory": "Computer Systems",                        
                        "SupplierName": "Very Best Screens",                        
                        "Description": "Notebook Basic 18 with 2,80 GHz quad core, 18\" LCD, 8 GB DDR3 RAM, 1000 GB Hard Disc, Windows 8 Pro",
                        "Name": "Notebook Basic 18",                        
                        "ProductPicUrl": "https://sdk.openui5.org/test-resources/sap/ui/documentation/sdk/images/HT-1002.jpg",
                        "Status": "Available",
                        "Quantity": 10,                        
                        "CurrencyCode": "EUR",
                        "Price": 1570
                    }
                ];

                let oProductsModel = new JSONModel(aItems);

                this.getView().setModel(oProductsModel,"Products");

            },

            onPressProduct: function(oEvent){
                let oItem = oEvent.getSource().getSelectedItem().getBindingContext("Products").getObject();
                MessageToast.show(oItem.Name);
            }
        });
    });
