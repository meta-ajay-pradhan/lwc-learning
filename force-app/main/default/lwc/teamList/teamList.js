import { LightningElement, wire } from 'lwc';
import getAllMembers from '@salesforce/apex/MemberController.getAllMembers';
import ID_FIELD from '@salesforce/schema/Member__c.Id';
import NAME_FIELD from '@salesforce/schema/Member__c.Name';
import SKILLS_FIELD from '@salesforce/schema/Member__c.Skills__c';
import TEAM_FIELD from '@salesforce/schema/Member__c.Team__c';

export default class TeamList extends LightningElement {

    columns = [
        {label: 'Id', fieldName:ID_FIELD.fieldApiName},
        {label: 'Name', fieldName:NAME_FIELD.fieldApiName},
        {label: 'Skills', fieldName:SKILLS_FIELD.fieldApiName},
        {label: 'Team', fieldName:TEAM_FIELD.fieldApiName},
    ]
    _members = [];
    @wire(getAllMembers) 
    members({data,error}) {
        if(data) {
            this._members = data;
        }else if (error) {
            console.log(error);
        }
    }
    
}