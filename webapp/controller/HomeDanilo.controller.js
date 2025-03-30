sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/bootcamp/sapui5/project/utils/HomeHelper"
], (Controller, HomeHelper) => {
    "use strict";

    return Controller.extend("com.bootcamp.sapui5.project.controller.HomeDanilo", {
        onInit() {
            this.oRouter = this.getOwnerComponent().getRouter()
            

        },

        onPress: async function(){
            let aDatos = await HomeHelper.getDataSuppliers(); 
            await HomeHelper.setSupplierModel(this, aDatos[0].results);
        },

        onItemPress: function (oEvent) {
            let oSource = oEvent.getSource()
            let aDatos = oSource.getBindingContext("ListadoProveedores").getObject();
            
            this.oRouter.navTo("detail",{
                SupplierID: aDatos.SupplierID
            })
        }
    });
});