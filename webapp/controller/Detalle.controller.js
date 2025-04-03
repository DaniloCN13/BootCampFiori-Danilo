sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/bootcamp/sapui5/project/utils/HomeHelper",
    "sap/m/Dialog",
    "sap/m/Text",
    "sap/m/Button",
    "sap/m/Input",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment" 
], (Controller, HomeHelper, Dialog, Text, Button, Input, MessageToast, Fragment) => {
    "use strict";

    return Controller.extend("com.bootcamp.sapui5.project.controller.Detalle", {
        onInit() {
            let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function (oEvent) {
            let sSupplierID = oEvent.getParameter("arguments").SupplierID;

            this.getView().bindElement({
                path: "/Suppliers(" + sSupplierID + ")",
                parameters: {
                    expand: "Products"
                }
            });
        },

        onOpenDialog: function () {
            let oDialog = this.byId("myDialog");
            if (!oDialog) {
                const oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
                oDialog = new Dialog({
                    title: oResourceBundle.getText("{dialognoTitle}"),
                    content: [
                        new VBox({
                            items: [
                                new Label({ text: oResourceBundle.getText("nombreProducto") }),
                                new Input("productNameInput"),
                                new Label({ text: oResourceBundle.getText("precio") }),
                                new Input("productPriceInput", { type: "Number" }),
                                new Label({ text: oResourceBundle.getText("cantidadStock") }),
                                new Input("productStockInput", { type: "Number" })
                            ]
                        })
                    ],
                    buttons: [
                        new Button({
                            text: oResourceBundle.getText("guardar"),
                            press: this.onSaveProduct.bind(this)
                        }),
                        new Button({
                            text: oResourceBundle.getText("cerrar"),
                            press: this.onCloseDialog.bind(this)
                        })
                    ]
                });
                this.getView().addDependent(oDialog);
            }
            oDialog.open();
        },

        onCloseDialog: function () {
            let oDialog = this.byId("myDialog");
            if (oDialog) {
                oDialog.close();
            }
        },

        onSaveProduct: function () {
            const productName = this.byId("productNameInput").getValue();
            const productPrice = this.byId("productPriceInput").getValue();
            const productStock = this.byId("productStockInput").getValue();

            if (!productName) {
                MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("errorN"));
                return;
            }
            if (!productPrice) {
                MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("errorP"));
                return;
            }
            if (!productStock) {
                MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("errorC"));
                return;
            }

            let sMessage = this.getView().getModel("i18n").getResourceBundle().getText("productoG");
            MessageToast.show(sMessage);
            this.onCloseDialog();
        },

        onRowSelectionChange: function (oEvent) {
            const oSelectedItem = oEvent.getParameter("rowContext");
            if (oSelectedItem) {
                const oProduct = oSelectedItem.getObject();
                this.showProductDetails(oProduct);
            }
        },

        showProductDetails: function (oProduct) {
            const oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
            const oDialog = this.byId("myDialog");

            this.byId("productNameInput").setValue(oProduct.ProductName);
            this.byId("productPriceInput").setValue(oProduct.UnitPrice);
            this.byId("productStockInput").setValue(oProduct.UnitsInStock);

            if (!oDialog) {
                this.onOpenDialog();
            } else {
                oDialog.open();
            }
        },

        onSelectionChange: function (oEvent) {
            let oTable = oEvent.getSource();
            let aSelectedItems = oTable.getSelectedContexts();
            this._selectedProducts = aSelectedItems.map(function (oContext) {
                return oContext.getObject();
            });
            console.log("Selected Products:", this._selectedProducts);
        },

        onSelectProducts: function () {
            if (this._selectedProducts && this._selectedProducts.length > 0) {
                console.log("Productos seleccionados:", this._selectedProducts);
            } else {
                MessageToast.show("Por favor, seleccione al menos un producto.");
            }
        },

        onSortAscending: function () {
            this.sortSuppliers("SupplierID", false);
        },

        onSortDescending: function () {
            this.sortSuppliers("SupplierID", true);
        },

        sortSuppliers: function (sPath, bDescending) {
            let oTable = Fragment.byId("SupplierTable", "idSupplier");
            let oBinding = oTable.getBinding("items");
            let oSorter = new sap.ui.model.Sorter(sPath, bDescending);
            oBinding.sort(oSorter);
        },

        byId: function (sId) {
            return this.getView().byId(sId);
        }
    });
});