// Name: Andrew Poh
// Class: DISM/1A/01
// Adm: 2227168

var input = require("readline-sync");
var mainMenuInput = 0;
var numOfType = 0;
var pointsInType = 0;
var typeIndex = 0;
var memberIndex = 0;
var similar = false;
var exists = false;
var memberName = "";
var str = "";
var confirmation = "";
var inputToCheck = "";


// MemberGroup and Member class declaration
class MemberGroup {
    constructor() {
        this.memberList = [];
        this.memberTypeList = ["Ruby", "Gold", "Platinum", "Diamond"];
        this.monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    }
}

// Member declaration
class Member {
    constructor(name, type = "Ruby", joinedDate, birthDate, points = 0) {
        this.name = name;
        this.type = type;
        this.joinedDate = joinedDate;
        this.birthDate = birthDate;
        this.points = points;
    }

    // Prints a Member's info
    printInfo(i) {
        console.log(
            "\nName: " + memGrp.memberList[i].name +
            "\nMembership Type: " + memGrp.memberList[i].type +
            "\nDate Joined: " + memGrp.memberList[i].joinedDate +
            "\nDate of Birth: " + memGrp.memberList[i].birthDate +
            "\nPoints Earned: " + memGrp.memberList[i].points
        );
    }

    // Checks if input member exists
    checkNameExist(inputToCheck, withSuggestedInput) {
        exists = false;
        for (var i = 0; i < memGrp.memberList.length; i++) {
            if (inputToCheck.toUpperCase() == memGrp.memberList[i].name.toUpperCase()) {
                exists = true;
                memberIndex = i; // declares  memberIndex as i if member exists
                return;
            } else {
                memberName = inputToCheck; // globally declares memberName as the name that was checked if member doesn't exist
            }
        }
        if (withSuggestedInput) {
            this.suggestInput(inputToCheck)
        }
    }

    // Checks if input membership type exists
    checkTypeExist(inputToCheck) {
        exists = false;
        str = "";
        numOfType = 0;
        pointsInType = 0;
        typeIndex = 0;

        // Checks if input membership type exists at all
        for(var j = 0; j < memGrp.memberTypeList.length; j++){
            if (inputToCheck.toUpperCase() == memGrp.memberTypeList[j].toUpperCase()){
                exists = true; // Declares that the type exists
                typeIndex = j;
                
                // Checks if any members have the membership type
                for (var i = 0; i < memGrp.memberList.length; i++) {
                    if (inputToCheck.toUpperCase() == memGrp.memberList[i].type.toUpperCase()) {
                        str += memGrp.memberList[i].name + ", "; // Creates string of members in that membership type (for Stats case 1)
                        numOfType++; // Counts number of members in membership type (for Stats case 4)
                        pointsInType += memGrp.memberList[i].points; // Adds points of one membership type (for Stats case 5)
                    }
                }  
            }
        }
        // Changes last comma in str into "."
        str = str.slice(0, -2);
        str += ".";
    }

    // Prints info of all members
    printInfoAll() {
        for (var i = 0; i < memGrp.memberList.length; i++) {
            this.printInfo(i)
        }
    }

    // Checks if a member exists then prints info of member
    printInfoSingle() {
        memberName = input.question("\nPlease enter member's name: ");
        this.checkNameExist(memberName, true);

        if (exists) {
            this.printInfo(memberIndex);
        } else {
            console.log("Member does not exist.");
        }
    }
    
    // Adds member to memberList array
    addMember() {
        do{  
            // Checks if member exists
            memberName = input.question("\nPlease enter member's name: ");
            this.checkNameExist(memberName, false);
            if (!exists){
                var today = new Date()
                var birthDateInput = new Date (input.question("Please enter member's date of birth: "));
                var newMemberBirthDate = `${birthDateInput.getDate()} ${memGrp.monthArr[birthDateInput.getMonth()]} ${birthDateInput.getFullYear()}`;
                var newMemberJoinedDate = today.getDate() + " " + memGrp.monthArr[today.getMonth()] + " " + today.getFullYear() //get todays date
                var newMember = new Member(memberName, undefined, newMemberJoinedDate, newMemberBirthDate, undefined, undefined);
                memGrp.memberList.push(newMember)
            } else {
                console.log("Member's name exists in database. Please enter a new name.")
            }
        } while (exists);
    }

    // Updates member points based on amount spent
    updatePoints() {
        // Checks if member exists
        memberName = input.question("\nPlease enter member's name: ");
        this.checkNameExist(memberName, true);
        if (exists) {
            do{
                var amountSpent = input.question("Please enter amount spent: ");
                // Data validation for amountSpent 
                if (!isNaN(amountSpent) && amountSpent > 0) {
                    // Calculates points added based on amountSpent
                    if (amountSpent <= 50) {
                        memGrp.memberList[memberIndex].points += 10;
                    } else if (amountSpent <= 100) {
                        memGrp.memberList[memberIndex].points += 50;
                    } else if (amountSpent <= 200) {
                        memGrp.memberList[memberIndex].points += 100;
                    } else if (amountSpent <= 500) {
                        memGrp.memberList[memberIndex].points += 200;
                    } else if (amountSpent <= 1000) {
                        memGrp.memberList[memberIndex].points += 500
                    } else if (amountSpent <= 2500) {
                        memGrp.memberList[memberIndex].points += 1000;
                    } else if (amountSpent > 2500) {
                        memGrp.memberList[memberIndex].points += 2000;
                    }
                } else {
                    console.log("Please enter a valid amount spent. \n");
                }
            } while ((isNaN(amountSpent) || amountSpent < 0))
            // Updates rank if criteria is met
            if (memGrp.memberList[memberIndex].points >= 20000) {
                memGrp.memberList[memberIndex].type = "Diamond";
            } else if (memGrp.memberList[memberIndex].points >= 5000) {
                memGrp.memberList[memberIndex].type = "Platinum";
            } else if (memGrp.memberList[memberIndex].points >= 500) {
                memGrp.memberList[memberIndex].type = "Gold";
            } else {
                memGrp.memberList[memberIndex].type = "Ruby";
            }
        } else {
            console.log("Member does not exist. ")
        }
    } 
    // Statistics submenu and programs 
    statsProgram() {  
        do{
            // Statistics menu and input
            console.log(
                "\n\t\tPlease select an option from the sub-menu: \n\t\t1. Display names of (all) of a certain type of members only. \n\t\t2. Display the name of the youngest and oldest member in the system. \n\t\t3. Display the name of members with the highest and lowest points earned. \n\t\t4. Display the total number of members in each membership type. \n\t\t5. Display the total points in each membership type. \n\t\t6. Return to main menu"
            );  
            var statsMenuInput = input.question("\t\t>> ");

            // Data validation for statsMenuInput
            if (statsMenuInput >= 1 && statsMenuInput <= 6 && statsMenuInput % 1 == 0) {
                // Statistics menu outputs
                switch (statsMenuInput) {
                    
                    // Display all members of certain type
                    case ("1"):
                        do {
                            inputToCheck = input.question("\n\t\tEnter Membership Type: ");
                            this.checkTypeExist(inputToCheck);
                            if (exists == false) {
                                console.log("\t\tPlease enter a valid membership type.");
                            } else if (numOfType == 0) {
                                console.log("\n\t\tNo members of this membership type.");
                            } else if (exists) {
                                console.log("\n\t\tMember(s) of membership type " + memGrp.memberTypeList[typeIndex] + ": " + str);
                            } 
                        } while (!exists)
                        break;

                    // Display youngest and oldest members
                    case ("2"):
                        var youngestMem = memGrp.memberList[0];
                        var oldestMem = memGrp.memberList[0];
                        var youngestMemStr = "";
                        var oldestMemStr = "";
                        for (var i = 1; i < memGrp.memberList.length; i++) {

                            // Youngest member
                            if (new Date(memGrp.memberList[i].birthDate).valueOf() > new Date(youngestMem.birthDate).valueOf()) {
                                youngestMem = memGrp.memberList[i];
                                youngestMemStr = ""; // Resets the string if a younger member appears
                            }
                            // Concatenates other youngest members (if any)
                            if (new Date(memGrp.memberList[i].birthDate).valueOf() == new Date(youngestMem.birthDate).valueOf()) {
                                if (youngestMemStr != "") {
                                    youngestMemStr += ", "; // Add comma if the string is not empty
                                }
                                youngestMemStr += memGrp.memberList[i].name;
                            }
                            // If there's no other youngest mem, set the string as the youngest mem
                            if (youngestMemStr == "") {
                                youngestMemStr += youngestMem.name;
                            }

                            // Oldest member
                            if (new Date(memGrp.memberList[i].birthDate).valueOf() < new Date(oldestMem.birthDate).valueOf()) {
                                oldestMem = memGrp.memberList[i];
                                oldestMemStr = ""; // Resets the string if an older member appears
                            }
                            // Concatenates other oldest members (if any)
                            if (new Date(memGrp.memberList[i].birthDate).valueOf() == new Date(oldestMem.birthDate).valueOf()) {
                                if (oldestMemStr != "") {
                                    oldestMemStr += ", "; // Add comma if the string is not empty
                                }
                                oldestMemStr += memGrp.memberList[i].name;
                            }
                            // If there's no other oldest mem, set the string as the oldest mem
                            if (oldestMemStr == "") {
                                oldestMemStr += oldestMem.name;
                            }
                        }
                        console.log("\n\t\tYoungest member(s): " + youngestMemStr + "\n\t\tOldest member(s): " + oldestMemStr);
                        break;

                    // Display highest and lowest point members
                    case ("3"):
                        var highestMem = memGrp.memberList[0];
                        var lowestMem = memGrp.memberList[0];
                        var highestMemStr = "";
                        var lowestMemStr = "";
                        for (var i = 1; i < memGrp.memberList.length; i++) {

                            // Highest member
                            if (memGrp.memberList[i].points > highestMem.points) {
                                highestMem = memGrp.memberList[i];
                                highestMemStr = ""; // Resets the string if a higher member appears
                            }
                            // Concatenates other highest members (if any)
                            if (memGrp.memberList[i].points == highestMem.points) {
                                if (highestMemStr != "") {
                                    highestMemStr += ", "; // Add comma if the string is not empty
                                }
                                highestMemStr += memGrp.memberList[i].name;
                            }
                            // If there's no other highest mem, set the string as the highest mem
                            if (highestMemStr == "") {
                                highestMemStr += highestMem.name;
                            }

                            // Lowest member
                            if (memGrp.memberList[i].points < lowestMem.points) {
                                lowestMem = memGrp.memberList[i];
                                lowestMemStr = ""; // Resets the string if a lower member appears
                            }
                            // Concatenates other lowest members (if any)
                            if (memGrp.memberList[i].points == lowestMem.points) {
                                if (lowestMemStr != "") {
                                    lowestMemStr += ", "; // Add comma if the string is not empty
                                }
                                lowestMemStr += memGrp.memberList[i].name;
                            }
                            // If there's no other lowest mem, set the string as the lowest mem
                            if (lowestMemStr == "") {
                                lowestMemStr += lowestMem.name;
                            }
                        }
                        console.log("\n\t\tHighest member(s): " + highestMemStr + "\n\t\tLowest member(s): " + lowestMemStr);
                        break;

                    // Display total no. of members in each type
                    case ("4"):
                        console.log();
                        for (var i = 0; i < memGrp.memberTypeList.length; i++){
                            this.checkTypeExist(memGrp.memberTypeList[i]);
                            console.log("\t\t" + memGrp.memberTypeList[i] + ": " + numOfType);
                        }
                        break;

                    // Display total points in each type
                    case ("5"):
                        console.log();
                        for (var i = 0; i < memGrp.memberTypeList.length; i++){
                            this.checkTypeExist(memGrp.memberTypeList[i]);
                            console.log("\t\t" + memGrp.memberTypeList[i] + ": " + pointsInType)
                        }
                        break;
                } 
            } else {
                console.log("\t\tPlease enter a valid input.")
            }
        // Returns to main menu when 6 is input
        } while (statsMenuInput != 6);
    }

    // Validates name
    validateNameInput(nameInput){
        while (/[^a-zA-Z]/.test(nameInput) || nameInput.length == 0){
            nameInput = input.question("Please enter a valid name. \n>> ");
        }
        return nameInput;
    }

    // Removes member from memberList array
    removeMember() {
        // Check if member exists
        memberName = input.question("\nPlease enter member's name: ");
        this.checkNameExist(memberName, true);
        if (exists) {
            // Confirmation
            confirmation = input.question("Are you sure you want to remove this member? (Y/N) \n>> ").toUpperCase();
            do {
                if (confirmation == "Y") {
                    // Removes member at memberIndex
                    memGrp.memberList.splice(memberIndex, 1);
                } else if (confirmation == "N") {
                    console.log("Removal was cancelled.");
                    return;
                } else {
                    console.log("Please enter valid input.")
                }
            } while (confirmation != "Y" && confirmation != "N")
        } else {
            console.log("Member does not exist.")
        }
    } 
    
    // Sorts member by selected filter
    sortMembers() {

        // Gives user sorting options and sorts
        do{
            var sortBy = input.question("\n\tHow would you like to sort members? \n\t1. Alphabetical order \n\t2. Age \n\t3. Points \n\t4. Date joined \n\t>> ");
            switch(sortBy) {

                // in .sort(compareFunction(a, b)):
                // if compareFunction returns > 0, sorts a after b. if it returns < 0, sorts b after a

                // Sorts alphabetically
                case("1"):
                    memGrp.memberList.sort((a,b) => {
                        var aFirstLetter = a.name.toUpperCase();
                        var bFirstLetter = b.name.toUpperCase();
                        if (aFirstLetter < bFirstLetter) {
                            return -1;
                        }
                        if (aFirstLetter > bFirstLetter) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });
                break;

                // Sorts by age
                case("2"):
                memGrp.memberList.sort((a, b) => {
                    return new Date(b.birthDate).valueOf() - new Date(a.birthDate).valueOf();
                });
                break;

                // Sorts by points
                case("3"):
                memGrp.memberList.sort((a, b) => {
                    return a.points - b.points;
                });
                break;

                // Sorts by date joined
                case("4"):
                memGrp.memberList.sort((a, b) => {
                    return new Date(b.joinedDate).valueOf() - new Date(a.joinedDate).valueOf();
                });
                break;
                
                default:
                    console.log("Please enter valid input");
                break;
            }

        } while (sortBy < 1 || sortBy > 4)
    }

    // Suggests name input
    suggestInput(nameInput){
        var similarityArr = []; // Stores values of how similar each name is, keeps track via index
        similar = false;

        for(var k = 0; k < memGrp.memberList.length; k++){ 
            similarityArr.push(0); // Adds member into the similarity array

            for (var i = 0; i < memGrp.memberList[k].name.length; i++) { 

                for (var j = 0; j < nameInput.length; j++) { 

                    // Adds 1 to the similarityArr if letters match 
                    if (nameInput.toUpperCase().charAt(j) == memGrp.memberList[k].name.toUpperCase().charAt(i)) {
                        similarityArr[k] += 1;
                    }
                }
            }
        }
        // If there's a name with >=4 matching characters then declares value of similar as true
        for (var i = 0; i < similarityArr.length; i++){
            if (similarityArr[i] >= 4){
                similar = true;
            }
        }
        // If similar is true, checks for the most similar name
        if (similar) {
            var similarIndex = 0;
            var highestSimilarity = similarityArr[0];
            for (var j = 0; j < similarityArr.length; j++) {
                if (similarityArr[j] > highestSimilarity) {
                    highestSimilarity = similarityArr[j];
                    similarIndex = j;
                }
            }
            // Asks if the user meant the suggested name
            do {
                confirmation = input.question("Did you mean " + memGrp.memberList[similarIndex].name + "? (Y/N) \n>> ").toUpperCase();
                if (confirmation == "Y") {
                    // Declare the inputToCheck to be the actual member's name
                    memberIndex = similarIndex
                    exists = true;
                    return;
                } else if (confirmation == "N") {
                    return;
                } else {
                    console.log("Please enter valid input.")
                }
            } while (confirmation != "Y" && confirmation != "N")
        }
    }
}

// Creating instance of member and MemberGroup class
var memGrp = new MemberGroup();
var mem = new Member();

// member initizalizaion
memGrp.memberList.push(new Member("Leonardo", "Gold", "1 Dec 2019", "1 Jan 1980", 1400));
memGrp.memberList.push(new Member("Catherine", "Ruby", "14 Jan 2020", "28 Oct 1985", 250));
memGrp.memberList.push(new Member("Luther", "Gold", "29 Apr 2020", "16 Mar 1992", 3350));
memGrp.memberList.push(new Member("Bruce", "Diamond", "3 Jun 2020", "18 Mar 1994", 40200));
memGrp.memberList.push(new Member("Amy", "Gold", "5 Jun 2020", "31 May 2000", 500));

// userName input
var userName = input.question("Welcome to XYZ Membership Loyalty Programme! \nPlease enter your name: ");
var userName = mem.validateNameInput(userName);

// Main program
do {
    // Main program menu and input
    console.log(
        "\nHi " + userName + ", please select your choice: \n\t1. Display all members' information \n\t2. Display member information \n\t3. Add new member \n\t4. Update Points Earned \n\t5. Statistics \n\t6. Remove Member \n\t7. Exit"
    );

    var mainMenuInput = input.question('\t>> ');

    // Data validation mainMenuInput 
    if (mainMenuInput >= 1 && mainMenuInput <= 7 && mainMenuInput % 1 == 0) {

        // Main Menu outputs
        switch (mainMenuInput) {
            case ("1"):
                // Asks if user wishes to sort members
                do {
                    var sortConfirmation = input.question("Would you like to sort members? (Y/N) \n>> ").toUpperCase();
                    if (sortConfirmation == "Y") {
                        // Sorts members
                        mem.sortMembers();
                        
                        // User chooses ascending or descending
                        do {
                            var ascendingDescending = input.question("\n\tPlease specify the order: \n\t1. Ascending \n\t2. Descending \n\t>> ");
                        } while (ascendingDescending != "1" && ascendingDescending != "2");
                        if (ascendingDescending == 2) {
                            memGrp.memberList.reverse(); //Reverses array order
                        }

                    } else if (sortConfirmation == "N") {
                        break;
                    } else {
                        console.log("Please enter a valid input.")
                    }
                } while (sortConfirmation != "Y" && sortConfirmation != "N")
                mem.printInfoAll(); // Display all members' info
                break;
            case ("2"):
                mem.printInfoSingle(); // Display single memeber info
                break;
            case ("3"):
                mem.addMember(); // Add new member
                break;
            case ("4"):
                mem.updatePoints(); // Update points
                break;
            case ("5"):
                mem.statsProgram(); // Statistics
                break;
            case ("6"):
                mem.removeMember(); // Remove member
                break;
        };
    } else { console.log('\tPlease enter valid input.') }

} while (mainMenuInput != "7"); // Program terminates when 7 is input
console.log("Thank you & goodbye!"); // Exit (terminates program)