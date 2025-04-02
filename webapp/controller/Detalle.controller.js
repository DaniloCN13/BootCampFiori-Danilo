sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/bootcamp/sapui5/project/utils/HomeHelper",
    "sap/m/Dialog",
    "sap/m/Text",
    "sap/m/Button"
], (Controller, HomeHelper, Dialog, Text, Button) => {
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
            if (oDialog) {
                oDialog.open();
            }
        },

        onCloseDialog: function () {
            let oDialog = this.byId("myDialog");
            if (oDialog) {
                oDialog.close();
            }
        }
    });
});