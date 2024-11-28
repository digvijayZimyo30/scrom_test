/*
	- This is the custom coding interface for Sleave. 
	
	- You can create your custom functions and call them from Action Panel interface

	- To avoid any conflict with core code
		* start your function names with 'cust_'
		* start your variable names with 'c_'

	- You can also access objects using the dot notation, there are 3 containers
		- _top (header)
		- _stage (Content area, stage)
		- _bottom (footer)
		Each of these containers has a property 'objects' which can be used to access its children
		Example:
				- _stage.L8		(Object is in main timeline)
				- _stage.C1.L2 	(Object is inside Clip C1)

		You can then manipulate all javascript/CSS properties of the object. Go through the help to see what methods are provided by Sleave API.
*/

var wait_time = 2; // seconds
var autohideFeature = false;
var contentType; //interactive or video
var currentBottom;
var currentSeek;


/* Global variables*/
var frame_rate = 15;
var m_move=frame_rate*wait_time;
var autohide = false;
var videopaused = false;
//Gets called when user performs a swipe on touch device
function cust_swipeEvent(evnt, swipedirection){
  //f_log(evnt.clientX+", "+evnt.clientY)
}

//Gets called whenever mouse moves
function cust_MouseMove(evnt, swipedirection){
  //f_log(evnt.clientX+", "+evnt.clientY)
}

//Gets called whenever a key is pressed
function cust_KeyDown(evnt){
  f_log(evnt.keyCode)
  if(evnt.keyCode==32){
    if(!videopaused){
      currentSeek.pause();
    videopaused = true;
    }
 else{
   currentSeek.play();
    videopaused = false;
 }
}
  if(evnt.keyCode==39 || evnt.keyCode==37){
    cust_autohide_onn();
  }
}
//Gets called when page loading starts
function cust_PageLoadBegin(){
  
}

//Gets called when a page is loaded
function cust_PageLoaded(){
  c_checkvalidity();
}


//Gets called whenever mouse down
function cust_MouseDown(evnt, swipedirection){
  //f_log(evnt.clientX+", "+evnt.clientY)
  m_move=frame_rate*wait_time;
  currentBottom.goToLabel('l_show_controls',1); 
}

//Gets called whenever mouse moves
function cust_MouseMove(evnt, swipedirection){
  //f_log(evnt.clientX+", "+evnt.clientY)
  m_move=frame_rate*wait_time;
  currentBottom.goToLabel('l_show_controls',1);
}
function cust_checkMove(){
  if(autohide==true){
  m_move--;
  //  f_log(m_move);
   
}
  // f_log(autohide);
  if(m_move==0 && autohideFeature){
      if(contentType=="video"){
      _bottom.controls.goToLabel('l_hide_controls',1);
      }
      else if(contentType=="interactive"){
       _bottom.controls_2.goToLabel('l_hide_controls',1);
    }
     
    
  }
}

function cust_autohide_off(){
 autohide = false;
}

function cust_autohide_onn(){
 autohide = true;
  //f_log("calling cust_autohide_onn -> "+autohide);
}


function cust_intclicked(modref,pgref,intref,btnref){
	f_log("Module "+modref+", page "+pgref+" Interaction "+intref+" button "+btnref)
	if(modref=="module03" && pgref=="p02"){
		switch(intref){
			case "L2":
				if(btnref==1){
					f_log("Button 1 clicked")
				}
			break;
		}
	}
}


function cust_disablenext(){
  _bottom.L12.disable();
}

function cust_enablenext(){
  _bottom.L12.enable();
}

function cust_update_contentType(ref,event, cType){
  contentType = cType;
  if(contentType=="video"){
    currentSeek = _bottom.C1.L3;
    currentBottom = _bottom.controls;
      }
      else if(contentType=="interactive"){
      currentSeek = _bottom.C2.L16;
      currentBottom = _bottom.controls_2;
    }
  
}


function c_updtranscript(ref, event, c_ta){
  var c_tt = _stage[c_ta];
  var ccue=ref.currentCue
  var txt=c_tt.getContent().split("|")
  _stage.transcript.setContent(txt[ccue]) 
}

/*
function c_checkvalidity(){ 
 var client = 'DPMS-KB-TestScorm';
var stuId = _course.studentID; 
 var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
if(this.responseText==1){
 
}else {
       _top.goToLabel('l_accessdenied',1);
         //alert("This course has been locked. Please contact your admin.");
         //_course.exitCourse();
          _course.disableNext();
         _course.pauseCourse();
        }
    }
  };  xhttp.open("GET", "https://clients.dynamicpixel.co.in/api/clientStatus_v1.php?username="+client+"&student="+stuId, true);
  xhttp.send();
}

*/
function c_checkvalidity(){ 
 var client = 'DPMS-KB-TestScorm';
 var stuId = _course.studentID; 
 var xhttp = new XMLHttpRequest();
  var host = document.location.host;
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
if(this.responseText==1){
 
}else {
       _top.goToLabel('l_accessdenied',1);
         //alert("This course has been locked. Please contact your admin.");
         //_course.exitCourse();
          _course.disableNext();
         _course.pauseCourse();
        }
    }
  };  xhttp.open("GET", "https://clients.dynamicpixel.co.in/api/clientStatus_v2.php?username="+client+"&student="+stuId+"&url="+host, true);
  xhttp.send();
}

