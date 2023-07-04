sap.ui.define([
    "./Base.controller",
	"sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel,MessageBox) {
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
            },

            getValues: function(){             

                let productId     = this.getById("txtProductId").getValue();                
                let mainCategory  = this.getById("cboMainCategory").getValue();
                let category      = this.getById("cboCategory").getValue();
                let name          = this.getById("txtName").getValue();
                let description   = this.getById("txtDescription").getValue();
                let supplierName  = this.getById("txtSupplierName").getValue();
                let weightMeasure = this.getById("txtWeightMesaure").getValue();
                let weightUnit    = this.getById("rbgWeightUnit").getSelectedIndex() == 0 ? "KG" : "LB" ;
                let dateOfSale    = this.getById("dtSale").getValue();
                let status        = this.getById("swtStatus").getState() ? "Available" : "Not Available";
                let quantity      = this.getById("txtQuantity").getValue();
                let currencyCode  = this.getById("rbgCurrency").getSelectedIndex() == 0 ? "EUR" : "USD";
                let price         = this.getById("txtPrice").getValue();

                let newProduct = {
                    "ProductId": productId,
                    "Category": category,
                    "MainCategory": mainCategory,
                    "TaxTarifCode": "1",
                    "SupplierName": supplierName,
                    "WeightMeasure": weightMeasure,
                    "WeightUnit": weightUnit,
                    "Description": description,
                    "Name": name,
                    "DateOfSale": dateOfSale,
                    "ProductPicUrl": "https://sdk.openui5.org/test-resources/sap/ui/documentation/sdk/images/HT-1000.jpg",
                    "Status": status,
                    "Quantity": quantity,
                    "UoM": "PC",
                    "CurrencyCode": currencyCode,
                    "Price": price,
                    "Width": 30,
                    "Depth": 18,
                    "Height": 3,
                    "DimUnit": "cm"
                }

                return newProduct;
            },

            clearInputs: function(){
                this.getById("txtProductId").setValue("");                
                this.getById("cboMainCategory").setValue("");
                this.getById("cboCategory").setValue("");
                this.getById("txtName").setValue("");
                this.getById("txtDescription").setValue("");
                this.getById("txtSupplierName").setValue("");
                this.getById("txtWeightMesaure").setValue("");
                this.getById("rbgWeightUnit").setSelectedIndex(0);
                this.getById("dtSale").setValue("");
                this.getById("swtStatus").setState(true);
                this.getById("txtQuantity").getValue("");
                this.getById("rbgCurrency").setSelectedIndex(0);
                this.getById("txtPrice").setValue("");
            },

            onSubmit: function(){
                const _this = this;
                let newProduct = this.getValues();

                let aProductColl = this.getView().getModel("mProduct").getData().ProductCollection;
                    aProductColl.unshift(newProduct);

                this.getView().getModel("mProduct").refresh();

                MessageBox.success("Product Added", {
                    actions: [MessageBox.Action.OK],
                    emphasizedAction: MessageBox.Action.OK,
                    onClose: function () {
                        _this.clearNavBack();
                    }
                });                
            },

            onReject: function(){
                this.clearNavBack();
            },

            clearNavBack: function(){
                this.clearInputs();
                this.navTo("RouteMain");
            }
            
        });
    });
