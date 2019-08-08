/*
 * index.js
 * Put your JavaScript in here
 */

'use strict';

/*===========================*/
/* put global variables here */
/*===========================*/


/* wait until all phonegap/cordova is loaded then call onDeviceReady*/
document.addEventListener("deviceready", onDeviceReady, false);


// put your javascript code here, make sure you reference this with a script 
// at the just before the closing body tag:
// 
//     <script type="text/javascript" src="js/index.js"></script>

function onDeviceReady() 
{
    showTabContent(event, 'Login'  );
    hideTabs();
}


function showLoginTab() {
    document.getElementById('login').click();
    $('#MyTabSelector').disableTab(1, true);
}

function showTabs(event)
{
    // place if statement here 
    // if login was successful, then...

    var showHome = document.getElementById("home");
    if (showHome.style.display === "none")
    {
        showHome.style.display = "block";
    }
    else 
    {
        showHome.style.display = "none";
    }


    var showFind = document.getElementById("find");
    if (showFind.style.display === "none")
    {
        showFind.style.display = "block";
    }
    else 
    {
        showFind.style.display = "none";
    }


    var showMake = document.getElementById("make");
    if (showMake.style.display === "none")
    {
        showMake.style.display = "block";
    }
    else 
    {
        showMake.style.display = "none";
    }

     var showSignOut = document.getElementById("logOut");
    if (showSignOut.style.display === "none")
    {
        showSignOut.style.display = "block";
    } 
    else 
    {
        showSignOut.style.display = "none";
    }

    var hideLogin = document.getElementById("login");
     if (hideLogin.style.display === "none")
    {
        hideLogin.style.display = "block"; 
    }
    else 
    {
        hideLogin.style.display = "none";
        showTabContent(event, "Home"); // Jumps to home tab on login
    }
} // End showTabs function

function hideTabs()
{  
    var hideHome = document.getElementById("home");
    if (hideHome.style.display === "none")
    {
        hideHome.style.display = "block";
    }
    else 
    {
        hideHome.style.display = "none";
    }

    var hideFind = document.getElementById("find");
    if (hideFind.style.display === "none")
    {
        hideFind.style.display = "block";
    }
    else 
    {
        hideFind.style.display = "none";
    }

    var hideMake = document.getElementById("make");
    if (hideMake.style.display === "none")
    {
        hideMake.style.display = "block";
    } 
    else 
    {
        hideMake.style.display = "none";
    }

    var hideSignOut = document.getElementById("logOut");
    if (hideSignOut.style.display === "none")
    {
        hideSignOut.style.display = "block";
    } 
    else 
    {
        hideSignOut.style.display = "none";
    }

} // End hideTabs function


function showTabContent(event, tabName) {
    // Declare all variables
    var i, tabContentElems, tabLinkElems;

    // Get all elements with class="tabContent" and hide them
    tabContentElems = document.getElementsByClassName("tabContent");
    for (i = 0; i < tabContentElems.length; i++) {
        tabContentElems[i].style.display = "none";
    }

    // Get all elements with class="tabLink" and remove the class "active"
    tabLinkElems = document.getElementsByClassName("tabLink");
    for (i = 0; i < tabLinkElems.length; i++) {
        tabLinkElems[i].className = 
            tabLinkElems[i].className.replace(" active", "");
    }

    // Show the current tab
    document.getElementById(tabName).style.display = "block";


    if (tabName == "Home")
    {
        displayStudyGroup();
    }
} // End showTabContent function

function displayStudyGroup()
{
        var db_server   = '193.112.217.144';// server name
        var db_username = 'root';                       // username
        var db_password = 'Yzrihxt940512';                          // password
        var db_table    = 'studygroup';             // read/write database
        var queryStmt  = 'select * from studygroup';
        var LykkeIsTheBest;

            MySql.Execute(
            db_server, db_username, db_password, db_table,
            queryStmt,                      // SQL query string
            function (data) {
                //myStudyGroups.innerHTML=data.Success;
                console.log("displayStudyGroups Method Call");
                console.log(data);

                if (!data.Success) 
                {
                    alert(data.Error)
                } 

                else 
                {
                    //This will display our studyGroups from query.
                    var selectRef = document.getElementById("studyGroupsLB");
                   selectRef.length = 0;

                    //This is our array full of json
                    var jsonArray = data.Result;

                    //Loop through the array and make an option and append it to our select list
                    for(var i = 0; i < jsonArray.length; i++)
                    {
                        var tmpOption = document.createElement("option");
                        tmpOption.innerHTML = jsonArray[i].sgCourse;
                        studyGroupsLB.appendChild(tmpOption);
                    }
                }
            }
        );
}

function checkUser()
{
  var db_server   = '193.112.217.144';// server name
        var db_username = 'root';                       // username
        var db_password = 'Yzrihxt940512';                          // password
        var db_table    = 'studygroup';             // read/write database
        
        
        var inputUserName=document.getElementById("userNameID").value;
        var inputUserPassword=document.getElementById("userPasswordID").value;
        var checkUserQuery  = 'select count(username) AS usercount from user where username="' + inputUserName+'";';
        var CheckPasswordQuery='select password  from user where username="' + inputUserName+'";';
        var count=0;
        var accountNotExist=false;

         MySql.Execute(
            db_server, db_username, db_password, db_table,
            checkUserQuery,                      // SQL query string
            function (data) {
                //myStudyGroups.innerHTML=data.Success;
                //console.log("displayStudyGroups Method Call");
                //console.log(data);
                
                if (!data.Success) {alert(data.Error);}
                if(data.Success) {
                     
                    var m=JSON.stringify(data.Result, null, 2);
                    console.log(m);
                    count=data.Result[0].usercount;
                    console.log(count);
                    if (count==0) {accountNotExist=true;} else {accountNotExist=false;}
                    console.log(accountNotExist);

                    
                }

         });

         
         // if account userId is in the database, check the password
         if (!accountNotExist)
         {

            MySql.Execute(
            db_server, db_username, db_password, db_table,
            CheckPasswordQuery,                      // SQL query string
            function (data) {
               // myStudyGroups.innerHTML=data.Success;
                //console.log("displayStudyGroups Method Call");
                //console.log(data);
                if (!data.Success) {
                    alert(data.Error)
                } 
                if(data.Success)
                {
                    var correctPassword=data.Result[0].password;
                    console.log(count);
                    if (inputUserPassword!=correctPassword || correctPassword == NUll)
                    //get into app (passwordMatch)
                    {
                        window.alert("password is wrong, Please re-enter your passwrod! ");
                     
                    }
                    else
                    {
                     
                        showTabs();
                    }
                    

             
                }
                  });

        }
        else
                        //tell the user, UserName is type wrong.
                    { 
                        console.log("User name does not existed, please try again later. ");
                     }
    }

    
  function getSelected() 
{
    var tmp = document.getElementById("informationHeader");
    tmp.innerHTML = "Study group information: "


        var db_server   = '193.112.217.144';            // server name
        var db_username = 'root';                       // username
        var db_password = 'Yzrihxt940512';              // password
        var db_table    = 'studygroup';                 // read/write database
        var queryStmt  = 'select * from studygroup';
        var LykkeIsTheBest;

            MySql.Execute(
            db_server, db_username, db_password, db_table,
            queryStmt,                                  // SQL query string
            function (data) {

                console.log("displayStudyGroups Method Call");
                console.log(data);
                if (!data.Success) {
                    alert(data.Error)
                }

                else {

    var jsonArray = data.Result;
    for (var i = 0; i < jsonArray.length; i++) {
        var tmpSelect = document.getElementById("studyGroupsLB").value;
        if (jsonArray[i].sgCourse == tmpSelect)
        {
                var selectedVal = jsonArray[i];
        }

            }

    // Show information in labels
    // Add linebreaks (don't mind the variable names)
    document.getElementById("sgCourseLbl").innerHTML = "<i>Course:  <i>" + selectedVal.sgCourse;
    var laughter = document.getElementById("sgCourseLbl");
    var sadness = document.createElement("br");
    laughter.appendChild(sadness);
    document.getElementById("sgInstructorLbl").innerHTML = "<i>Instructor:  <i>" + selectedVal.sgInstructor;
    var moreLaughter = document.getElementById("sgInstructorLbl");
    var moreSadness = document.createElement("br");
    moreLaughter.appendChild(moreSadness);
    document.getElementById("sgCurrentSizeLbl").innerHTML = "<i>Curent Size:  <i>" + selectedVal.sgCurrentSize;
    var mostLaughter = document.getElementById("sgCurrentSizeLbl");
    var mostSadness = document.createElement("br");
    mostLaughter.appendChild(mostSadness);
    document.getElementById("sgTimeLbl").innerHTML = "<i>Time:  <i>" + selectedVal.sgTime;
    var bestLaughter = document.getElementById("sgTimeLbl");
    var worstSadness = document.createElement("br");
    bestLaughter.appendChild(worstSadness);
    document.getElementById("sgLocationLbl").innerHTML = "<i>Location:  <i>" + selectedVal.sgLocation;
    var lmao = document.getElementById("sgLocationLbl");
    var bitterMisery = document.createElement("br");
    lmao.appendChild(bitterMisery);
}
 }
   );
            }



// function LeftPadDecimalString(string, padChar, length) {

//     var resultString = string;

//     while (resultString.length < length ) {
//         resultString = padChar + resultString;
//     }
//     return resultString;
// }

// function LeftPadHexString(num, pad, length) {
//     var resultString = Number(num).toString(16).toUpperCase();

//     while (resultString.length < length) {
//         resultString = pad + resultString;
//     }
//     return resultString;
// }

