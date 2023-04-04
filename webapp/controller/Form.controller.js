sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel) {
        "use strict";

        return Controller.extend("appviewcatalog.controller.Form", {
            onInit: function () {
                let newProduct = {
                    "ProductId": "",
                    "Category": "",
                    "MainCategory": "",
                    "TaxTarifCode": "1",
                    "SupplierName": "",
                    "WeightMeasure": 4,
                    "WeightUnit": "KG",
                    "Description": "",
                    "Name": "",
                    "DateOfSale": "",
                    "ProductPicUrl": "",
                    "Status": "Available",
                    "Quantity": 10,
                    "UoM": "PC",
                    "CurrencyCode": "EUR",
                    "Price": 100,
                    "Width": 30,
                    "Depth": 18,
                    "Height": 3,
                    "DimUnit": "cm"
                }

                let oNewProduct = new JSONModel(newProduct);
                this.getView().setModel(oNewProduct, "mNewProduct");
            }
        });
    });
