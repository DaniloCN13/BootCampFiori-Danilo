sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/bootcamp/sapui5/project/utils/HomeHelper",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"

], (Controller, HomeHelper, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("com.bootcamp.sapui5.project.controller.HomeDanilo", {
        onInit() {
            this.oRouter = this.getOwnerComponent().getRouter();
            this.suppliersTable(); //Trae los datos al home
    
        },

        // Carga de datos automático
        suppliersTable: async function(oFilter=[]){
            let aDatos = await HomeHelper.getDataSuppliers([oFilter])
            await HomeHelper.setSupplierModel(this, aDatos[0].results);
        },
         

        onItemPress: function (oEvent) {
            let oSource = oEvent.getSource()
            let aDatos = oSource.getBindingContext("ListadoProveedores").getObject();
            
            this.oRouter.navTo("detail",{
                SupplierID: aDatos.SupplierID
            })
        },

        onPress: async function () {
            let oFilter = [];

            let oDatos = await HomeHelper.getDataSuppliers();
            await HomeHelper.setSupplierModel(this. oDatos[0].results);
            
        },

        onSelectionChange: async function (oEvent) {
            /*let oFilter = [];
            let oSource = oEvent.getSource()
            let oTable = this.getView().byId("idSupplier")
            let oBinding = oTable.getBinding("items")

            if(oSource.getValue()){
                oFilter = new Filter("SupplierID", FilterOperator.EQ, oSource.getValue()) 
            }
            oBinding.filter(oFilter);
            */
        },
        onSelectionChange1: async function (oEvent) {
            /*let oFilter = [];
            let oSource = oEvent.getSource()
            let oTable = this.getView().byId("idSupplier")
            let oBinding = oTable.getBinding("items")

            if(oSource.getValue()){
                oFilter = new Filter("CompanyName", FilterOperator.EQ, oSource.getValue()) 
            }
            oBinding.filter(oFilter);
          */  
        },
        
    });
});