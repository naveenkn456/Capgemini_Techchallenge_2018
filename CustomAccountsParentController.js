({
	handleComponentEvent : function(component, event, helper) {
		//alert("handleComponentEvent in the parent");
        var accID = event.getParam("accDetail");
        //alert("accID is " + accID);
        component.set("v.accIDFromEvent", accID);
	}
})