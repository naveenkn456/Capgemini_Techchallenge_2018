({
    getAccountList : function(component, event) {
        var action = component.get('c.getAccounts');
        
        action.setCallback(this, function(response){
            debugger;
            var res = response.getState();
            if(res == "SUCCESS"){
                debugger;
                component.set('v.ListOfAccounts', response.getReturnValue());   
            }
        });
        
        $A.enqueueAction(action);
    },
    
    deleteAccount: function(component, event){
       // alert('Inside helper >> deleteAccounts');
        var action = component.get('c.deleteAccountById');
        var accID = event.target.id;
        console.log("Id is " + accID); 
        action.setParams({
            "acctId":accID
        });
        
        action.setCallback(this, function(response){
            var res = response.getState();
            if(res == "SUCCESS"){
                component.set('v.ListOfAccounts', '');
                component.set('v.ListOfAccounts', response.getReturnValue());   
            }
        });
        
        $A.enqueueAction(action); 
    },
    
    passAccParamsToForm: function(component, event){
        debugger;
        var accounts = component.get("v.ListOfAccounts");
        var accId = event.getSource().get("v.text");
        //alert("accId is" + accId);
        var i;
        for(i in accounts){
            if(accounts[i].Id == accId){
                //alert(accounts[i].Name);
                var accDetail = {};
                accDetail = { 'sobjectType': 'Account','Name': '', 'AccountNumber':'','Owner':'',
                             'AccountSource':'','ParentId':'','AnnualRevenue':'','Type':'','CreatedBy':'',
                             'LastModifiedBy':'','Industry':'','Description':'','Phone':'','Fax':''};
                accDetail.Name = accounts[i].Name;
                accDetail.AccountNumber = accounts[i].AccountNumber;
                accDetail.Owner = accounts[i].Owner.Name;
                accDetail.AccountSource = accounts[i].AccountSource;
                accDetail.ParentId = accounts[i].ParentId;
                accDetail.AnnualRevenue = accounts[i].AnnualRevenue;
                accDetail.Type = accounts[i].Type;
                accDetail.CreatedBy = accounts[i].CreatedBy.Name;
                accDetail.LastModifiedBy = accounts[i].LastModifiedBy.Name;
                accDetail.Industry = accounts[i].Industry;
                accDetail.Description = accounts[i].Description;
                accDetail.Phone = accounts[i].Phone;
                accDetail.Fax = accounts[i].Fax;
            }
        }
        // alert(component.get("v.ListOfAccounts"));
        var cmpEvent = component.getEvent("cmpEvent");
        cmpEvent.setParams({"accDetail" : accDetail });
        cmpEvent.fire();
    },
    
    deleteSelectedAccounts: function(component, event, deleteRecordsIds) {
 		//alert("inside deleteSelectedAccounts");
        var action = component.get('c.deleteRecords');
        action.setParams({
            "lstRecordId": deleteRecordsIds
        });
        action.setCallback(this, function(response) {
            //store state of response
            var state = response.getState();
            if (state === "SUCCESS") {
                $A.get('e.force:refreshView').fire();
                console.log(state);
                if (response.getReturnValue() != '') {
                    alert('Error' + response.getReturnValue());
                } else {
                    console.log('delete successful');
                }  
            }
        });
        $A.enqueueAction(action);
    },
})