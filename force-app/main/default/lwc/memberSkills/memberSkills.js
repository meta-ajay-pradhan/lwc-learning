import { api, LightningElement, track } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import MEMBER_OBJECT from '@salesforce/schema/Member__c';
import NAME_FIELD from '@salesforce/schema/Member__c.Name';
import SKILLS_FIELD from '@salesforce/schema/Member__c.Skills__c';
import TEAM_FIELD from '@salesforce/schema/Member__c.Team__c';

export default class MemberSkills extends LightningElement {

    objectApiName = MEMBER_OBJECT;
    nameField = NAME_FIELD;
    skillsField = SKILLS_FIELD;
    teamField = TEAM_FIELD;

    handleSuccess(event) {
        const addedMember = {
            Id: event.detail.id,
            Name: event.detail.fields.Name.value,
            Skills__c: event.detail.fields.Skills__c.value,
            Team__c: event.detail.fields.Team__c.value,
        }
        this.addTeamMemberToList(addedMember);
        this.resetForm();
        this.showToastMessage();
    }

    resetForm() {
        const inputFields = this.template.querySelectorAll(
            'lightning-input-field'
        );
        if (inputFields) {
            inputFields.forEach(field => {
                field.reset();
            });
        }
    }

    showToastMessage() {
        const toastEvent = new ShowToastEvent({
            title: "Account Created",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(toastEvent);
    }

    addTeamMemberToList(member) {
        const event = new CustomEvent('addmember', {
            detail: member
        });
        this.dispatchEvent(event);
    }
}                               