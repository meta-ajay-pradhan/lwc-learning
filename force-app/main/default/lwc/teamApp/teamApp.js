import getAllMembers from '@salesforce/apex/MemberController.getAllMembers';
import { LightningElement, track, wire } from 'lwc';

export default class TeamApp extends LightningElement {

    
    allmembers = []
    @wire(getAllMembers) 
     members({data,error}) {
         if(data) {
             this.allmembers = data;
         }else if (error) {
             console.log(error);
         }
     }

    handleAddMember(event) {
        this.allmembers = [...this.allmembers, event.detail];
    }
}