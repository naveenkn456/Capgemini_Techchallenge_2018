({
    loadAccountList : function(component, event, helper) {
       // $A.get('e.force:refreshView').fire();
        helper.getAccountList(component, event);	
    }, 
    
    refreshView:function(component, event, helper) {
        $A.get('e.force:refreshView').fire();
        //helper.getAccountList(component, event);	
    }, 
    
    deleteAccount: function(component, event, helper){
        //alert('Inside controller >> deleteAccount');
        helper.deleteAccount(component, event);
    }, 
    
    deleteSelected: function(component, event, helper){
        var delId = [];
        var getIds = component.find("checkbox");
        if(! Array.isArray(getIds)){
            if (getIds.get("v.value") == true) {
                delId.push(getIds.get("v.text"));
            }
        }else{
            for (var i = 0; i < getIds.length; i++) {
                if (getIds[i].get("v.value") == true) {
                    delId.push(getIds[i].get("v.text"));
                }
            }
        }   
        helper.deleteSelectedAccounts(component, event, delId);
    }, 
    
    editAccount : function(component, event, helper) {
        var editRecordEvent = $A.get("e.force:editRecord");
        //alert(event.target.id);
        editRecordEvent.setParams({
            "recordId": event.target.id
        });
        editRecordEvent.fire();
    },
    
    OnChangeInputCheckBox: function(component,event,helper){
        //alert("controller method");
        helper.passAccParamsToForm(component, event);  
    },
    
    CreateNewAccount:function(component,event,helper){
        var editRecordEvent = $A.get("e.force:createRecord");
        editRecordEvent.setParams({
            "entityApiName": "Account"
        });
        editRecordEvent.fire();
    },
})