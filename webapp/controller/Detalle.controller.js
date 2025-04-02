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

         
           // Validar campos obligatorios
                if (!productName) {
                    MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText(`Error: ${i18n>precioP}`)); // Mensaje de error
                    return; // Salir si hay error
                }
                if (!productPrice) {
                    MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("errorPrecioRequerido")); // Mensaje de error
                    return; // Salir si hay error
                }
                if (!productStock) {
                    MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("errorCantidadRequerida")); // Mensaje de error
                    return; // Salir si hay error
                }

            MessageToast.show(`Producto guardado: ${productName}, Precio: ${productPrice}, Stock: ${productStock}`)

          
            this.onCloseDialog();
        },
        onRowSelectionChange: function(oEvent) {
            // Obtener la fila seleccionada
            const oSelectedItem = oEvent.getParameter("rowContext");
            if (oSelectedItem) {
                const oProduct = oSelectedItem.getObject(); // Obtener los datos del producto
        
                // Aquí puedes mostrar los detalles del producto en el Diálogo
                this.showProductDetails(oProduct);
            }
        },
        
        showProductDetails: function(oProduct) {
            const oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
            
            // Establecer los valores en los campos del diálogo, si ya lo tienes definido en tu HTML
            const oDialog = this.byId("myDialog");
            
            this.byId("productNameInput").setValue(oProduct.ProductName);
            this.byId("productPriceInput").setValue(oProduct.UnitPrice);
            this.byId("productStockInput").setValue(oProduct.UnitsInStock);
        
            // Abrir el diálogo con los detalles
            if (!oDialog) {
                // (Crear el diálogo aquí o asegurarte que esté definido)
                this.onOpenDialog(); // Llama a una función que abra el diálogo
            } else {
                oDialog.open(); // Si ya existe, abrirlo
            }
        }
    });
});