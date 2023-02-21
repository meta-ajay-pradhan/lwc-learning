public  class TeamController {
    public TeamController() {

    }

    @AuraEnabled(cacheable=true)
    public static List<Team__c> getAllTeams(){
        return (List<Team__c>)[SELECT Id, Name FROM Team__c];
    }
}