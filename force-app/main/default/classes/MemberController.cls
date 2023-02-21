public with sharing class MemberController {
    public MemberController() {

    }

    @AuraEnabled(cacheable=true)
    public static List<Member__c>getAllMembers() {
        return (List<Member__c>)[SELECT Id, Name, Skills__c, Team__c, Team__r.Name FROM Member__c];
    }
}
