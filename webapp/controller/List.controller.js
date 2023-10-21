sap.ui.define([
    "./Base.controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/UIComponent",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel,MessageToast,Filter,FilterOperator,UIComponent,MessageBox) {
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
            },

            onOpenDialog: function(){
                this.fDialog ??= this.loadFragment({
                    name: "appviewcatalog.view.fragments.DialogForm"
                });

                this.fDialog.then((oDialog) => oDialog.open());
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

            validateFields: function(){
                var aForms = ["frmGeneral","frmWeigh","frmDetails"];
                var aValidated = [];
                aForms.forEach(oForm=>{
                    let aformElements = this.getView().byId(oForm).getFormContainers()[0].getFormElements();
                    aformElements.forEach(aFElements=>{
                        let aFields =  aFElements.getFields();
                            aFields.forEach(aField=>{
                                if(aField.getValue){
                                    let oFieldID = aField.getId().split("List--")[1];
                                    let validate = aField.getValue() !== "" ? true : false;
                                    if(!validate){
                                        aValidated.push({idField: oFieldID, state: validate});
                                        console.log(`aField ${oFieldID} - ${validate}`);
                                        this.getById(oFieldID).setValueState("Error");
                                    }
                                }
                            })
                    })   
                });

                return aValidated.length;
            },

            changeValueState: function(oEvent){
                let oValue = oEvent.getSource().getValue();
                if(oValue){
                    oEvent.getSource().setValueState("None");
                }
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

            onReject: function(){
                this.clearNavBack();
            },

            clearNavBack: function(){
                this.clearInputs();
                this.byId("frgDialogForm").close();
                // this.navTo("RouteMain");
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

                MessageBox.success("Product Added", {
                    actions: [MessageBox.Action.OK],
                    emphasizedAction: MessageBox.Action.OK,
                    onClose: function () {
                        _this.clearNavBack();
                    }
                });                
            },
        });
    });
