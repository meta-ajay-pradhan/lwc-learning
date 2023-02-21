import { LightningElement, wire } from 'lwc';
import getAllMembers from '@salesforce/apex/MemberController.getAllMembers';
import getAllTeams from '@salesforce/apex/TeamController.getAllTeams';
import ID_FIELD from '@salesforce/schema/Member__c.Id';
import NAME_FIELD from '@salesforce/schema/Member__c.Name';
import SKILLS_FIELD from '@salesforce/schema/Member__c.Skills__c';
import TEAM_FIELD from '@salesforce/schema/Member__c.Team__c';

export default class TeamList extends LightningElement {

    currentTeam = 'All';
    options = [{ label: 'All', value: 'All'}];

    columns = [
        {label: 'Id', fieldName:ID_FIELD.fieldApiName},
        {label: 'Name', fieldName:NAME_FIELD.fieldApiName},
        {label: 'Skills', fieldName:SKILLS_FIELD.fieldApiName},
        {label: 'Team', fieldName:TEAM_FIELD.fieldApiName},
    ]

    displayMembers = [];

    _members = [];
    @wire(getAllMembers) 
    members({data,error}) {
        if(data) {
            this._members = data;
            this.filterMembersByTeam();
        }else if (error) {
            console.log(error);
        }
    }

    @wire(getAllTeams)
    getTeams({data, error}) {
        if(data) {
            console.log(data);
            this.options = [{ label: 'All', value: 'All'}];
            data.forEach( d => {
                this.options.push({
                    label: d.Name,
                    value: d.Id
                });
            })
            this.filterMembersByTeam();
        }else if (error) {
            console.log(error);
        }
    }

    handleTeamChange(event) {
        console.log(event);
        this.currentTeam = event.detail.value;
        this.filterMembersByTeam();
    }

    filterMembersByTeam() {
        if(this.currentTeam === 'All') {
            this.displayMembers = this._members;
            return;
        }
        this.displayMembers = this._members.filter( mem => mem.Team__c === this.currentTeam);
    }
    
}