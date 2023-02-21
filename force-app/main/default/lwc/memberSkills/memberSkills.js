import { api, LightningElement, track } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import MEMBER_OBJECT from '@salesforce/schema/Member__c';
import NAME_FIELD from '@salesforce/schema/Member__c.Name';
import SKILLS_FIELD from '@salesforce/schema/Member__c.Skills__c';
import TEAM_FIELD from '@salesforce/schema/Member__c.Team__c';

export default class MemberSkills extends LightningElement {
    member = {
        name: '',
        skills: '',
        team: ''
    }
    objectApiName = MEMBER_OBJECT;
    nameField = NAME_FIELD;
    skillsField = SKILLS_FIELD;
    teamField = TEAM_FIELD;

    handleSuccess(event) {
        const inputFields = this.template.querySelectorAll(
            'lightning-input-field'
        );
        if (inputFields) {
            inputFields.forEach(field => {
                field.reset();
            });
        }
        const toastEvent = new ShowToastEvent({
            title: "Account Created",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(toastEvent);
        
    }
}                               