sap.ui.define([
    "./Base.controller",
    "sap/ui/core/UIComponent",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,UIComponent,MessageBox) {
        "use strict";

        return Controller.extend("appviewcatalog.controller.Form", {
            onInit: function () {

            },

            getValues: function(){

                let productId       = this.getById("txtProducId").getValue();
                let mainCategory    = this.getById("cboMainCategory").getValue();
                let category        = this.getById("cboCategory").getValue();
                let name            = this.getById("txtName").getValue();
                let description     = this.getById("txtDescription").getValue();
                let supplier        = this.getById("txtSupplier").getValue();
                let weightMeasure   = this.getById("txtWeightMeasure").getValue();
                let weightUnit      = this.getById("rbgWeightUnit").getSelectedIndex() == 0 ? "KG" : "LB";
                let dateOfSale      = this.getById("dtSale").getValue();
                let status          = this.getById("swStatus").getState() ? "Available" : "Not Available";
                let quantity        = this.getById("txtQuantity").getValue();
                let currencyCode    = this.getById("rbgCurrency").getSelectedIndex() == 0 ? "EUR" : "USD";
                let price           = this.getById("txtPrice").getValue();

                let newProduct = {
                    "ProductId": productId,
                    "Category": category,
                    "MainCategory": mainCategory,
                    "TaxTarifCode": "1",
                    "SupplierName": supplier,
                    "WeightMeasure": weightMeasure,
                    "WeightUnit": weightUnit,
                    "Description": description,
                    "Name": name,
                    "DateOfSale": dateOfSale,
                    "ProductPicUrl": "https://sdk.openui5.org/test-resources/sap/ui/documentation/sdk/images/HT-1258.jpg",
                    "Status": status,
                    "Quantity": quantity,
                    "UoM": "PC",
                    "CurrencyCode": currencyCode,
                    "Price": price,
                    "Width": 38,
                    "Depth": 21,
                    "Height": 3.5,
                    "DimUnit": "cm"
                }

                return newProduct;

            },

            validateFields: function(){
                var aForms = ["frmGeneral","frmWeight","frmDetails"];
                var aValidated = [];
                aForms.forEach(oForm=>{
                    let aformElements = this.getView().byId(oForm).getFormContainers()[0].getFormElements();
                    aformElements.forEach(aFElements=>{
                        let aFields = aFElements.getFields();
                            aFields.forEach(aField=>{
                                if(aField.getValue){
                                    let oFieldID = aField.getId().split("Form--")[1];
                                    let validate = aField.getValue() !== "" ? true : false;
                                    
                                    if(!validate){
                                        aValidated.push({idField:oFieldID, state: validate});
                                        this.getById(oFieldID).setValueState("Error");
                                    }
                                }
                            });
                    })
                });
                return aValidated.length;
            },

            clearInputs: function(){

                this.getById("txtProducId").setValue("");
                this.getById("cboMainCategory").setValue("");
                this.getById("cboCategory").setValue("");
                this.getById("txtName").setValue("");
                this.getById("txtDescription").setValue("");
                this.getById("txtSupplier").setValue("");
                this.getById("txtWeightMeasure").setValue("");
                this.getById("rbgWeightUnit").setSelectedIndex(0);
                this.getById("dtSale").setValue("");
                this.getById("swStatus").setState(true);
                this.getById("txtQuantity").setValue("");
                this.getById("rbgCurrency").setSelectedIndex(0);
                this.getById("txtPrice").setValue("");

            },

            clearNavBack: function(){
                this.clearInputs();
                this.onNavTo("RouteMain");
            },

            changeValueState: function(oEvent){
                let oValue = oEvent.getSource().getValue();
                if(oValue){
                    oEvent.getSource().setValueState("None");
                }
            },

            onSubmit: function(){
                const _this = this;

                let nValidatedFields = this.validateFields();

                if(nValidatedFields){
                    return;
                }

                let newProduct = this.getValues();
                
                let aProductColl = this.getView().getModel("mProduct").getData().ProductCollection;
                    aProductColl.unshift(newProduct);

                    this.getView().getModel("mProduct").refresh();
                
                    MessageBox.success("Product Added",{
                        actions: [MessageBox.Action.OK],
                        emphazisedAction: MessageBox.Action.OK,
                        onClose: function(){
                            _this.clearNavBack();
                        }
                    });
            },

            onReject: function(){
                this.clearNavBack();
            }
        });
    });
