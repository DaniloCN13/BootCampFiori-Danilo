sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/bootcamp/sapui5/project/utils/HomeHelper",
    "sap/m/Dialog",
    "sap/m/Text",
    "sap/m/Button",
    "sap/m/Input",
     "sap/m/MessageToast"
], (Controller, HomeHelper, Dialog, Text, Button, Input, MessageToast) => {
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
                const oResourceBundle = this.getView().getModel("i18n").getResourceBundle(); // Obtén el recurso i18n
        
                oDialog = new Dialog({
                    title: oResourceBundle.getText("{dialognoTitle}"), // Usar i18n para el título
                    content: [
                        new VBox({
                            items: [
                                new Label({ text: oResourceBundle.getText("nombreProducto") }), // Usar i18n para el nombre del producto
                                new Input("productNameInput"),
                                new Label({ text: oResourceBundle.getText("precio") }), // Usar i18n para el precio
                                new Input("productPriceInput", { type: "Number" }),
                                new Label({ text: oResourceBundle.getText("cantidadStock") }), // Usar i18n para la cantidad en stock
                                new Input("productStockInput", { type: "Number" })
                            ]
                        })
                    ],
                    buttons: [
                        new Button({
                            text: oResourceBundle.getText("guardar"), // Usar i18n para el botón guardar
                            press: this.onSaveProduct.bind(this)
                        }),
                        new Button({
                            text: oResourceBundle.getText("cerrar"), // Usar i18n para el botón cerrar
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

        onSaveProduct: function() {
         
            const productName = this.byId("productNameInput").getValue();
            const productPrice = this.byId("productPriceInput").getValue();
            const productStock = this.byId("productStockInput").getValue();

         
            console.log("Producto Guardado:", {
                Name: productName,
                Price: productPrice,
                Stock: productStock
            });

            MessageToast.show(`Producto guardado: ${productName}, Precio: ${productPrice}, Stock: ${productStock}`)

          
            this.onCloseDialog();
        }
    });
});