sap.ui.define([
	"com/bootcamp/sapui5/project/utils/HomeService",
	"sap/ui/model/json/JSONModel"
], function (HomeService, JSONModel) {
	"use strict";

	return {
		init: function (oNorthwindModel) {
			this._oNorthwindModel = oNorthwindModel;
		},

		getDataSuppliers: async function() {
            let oFilters = [];
            return HomeService.readSuppliers(this._oNorthwindModel, oFilters);
        },

        setSupplierModel: async function (oController, oDatos) {
            let oListModel = oController.getOwnerComponent().getModel('ListadoProveedores');
            if(!oListModel){
                const oModel  = new JSONModel([]);
                oModel.setSizeLimit(1000000);	
                oController.getOwnerComponent().setModel(oModel, "ListadoProveedores");  
                oListModel = oController.getOwnerComponent().getModel('ListadoProveedores');
            }

            oListModel.setData(oDatos);
        },
	};
});