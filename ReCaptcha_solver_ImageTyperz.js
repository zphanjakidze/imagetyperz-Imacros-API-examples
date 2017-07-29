/*
----------------------------------------------------------------------------------
||						Author  Nowon48											||
||						https://www.fiverr.com/nowon48/							||
||																				||
||						For Some Of My Works 									||
||						https://www.youtube.com/c/AutoTasks/videos				||
----------------------------------------------------------------------------------
*/

/*
		SUMMARY
		This macro for solving ReCaptcha via ****** To use you need an account and balance as well
		
		!!! Most important part you should set 3 variable below
		
		1) your user name
		2) your password
		3) your submit button in page
		
		submit button can be found under Recaptchas you need Record your imacro to grab this button code and replace it below.

*/

//captchatypers username
var user='xxxxxxx';

//captchatypers password
var password='xxxxxxx';

//website submit button
var submit_button="TAG POS=1 TYPE=INPUT:SUBMIT FORM=ID:recaptcha-demo-form ATTR=ID:recaptcha-demo-submit";

var macro = "CODE:";
macro += "SET !EXTRACT_TEST_POPUP NO" + "\n";
macro += "SET !ERRORIGNORE YES" + "\n";
macro += "SET !TIMEOUT_PAGE 1" + "\n";
macro += "'SET !TIMEOUT_STEP 1" + "\n";
macro += "URL GOTO=javascript:((function(){var<SP>k=document.getElementsByName('undefined')[0].src.split('?k=')[1].split('&')[0];document.getElementById('g-recaptcha-response').style.display='';document.getElementById('g-recaptcha-response').textContent=k;}))();" + "\n";

macro += "SET !TIMEOUT_PAGE 60" + "\n";
macro += "TAG POS=1 TYPE=TEXTAREA FORM=ID:* ATTR=ID:g-recaptcha-response EXTRACT=TXT" + "\n";
macro += "SET k {{!EXTRACT}}" + "\n";
macro += "SET !EXTRACT NULL" + "\n";
macro += "SET url {{!URLCURRENT}}" + "\n";
macro += "TAB OPEN" + "\n";
macro += "TAB T=2" + "\n";
macro += "URL GOTO=http://captchatypers.com/captchaapi/UploadRecaptchav1.ashx?action=UPLOADCAPTCHA&username={{user}}&password={{password}}&googlekey={{k}}&pageurl={{url}}" + "\n";
macro += "WAIT SECONDS=1" + "\n";
macro += "TAG POS=1 TYPE=* ATTR=TXT:* EXTRACT=TXT" + "\n";
macro += "SET captid {{!EXTRACT}}" + "\n";
macro += "SET !EXTRACT NULL" + "\n";
macro += "URL GOTO=http://captchatypers.com/captchaapi/GetRecaptchaText.ashx?action=GETTEXT&username={{user}}&password={{password}}&Captchaid={{captid}}" + "\n";

var macro2 = "CODE:";
macro2 += "TAG POS=1 TYPE=* ATTR=TXT:* EXTRACT=TXT" + "\n";

var macro3 = "CODE:";
macro3 += "TAG POS=1 TYPE=* ATTR=TXT:* EXTRACT=TXT" + "\n";
macro3 += "SET answer {{!EXTRACT}}" + "\n";
macro3 += "TAB CLOSE" + "\n";
macro3 += "WAIT SECONDS=0.3" + "\n";
macro3 += "TAG POS=1 TYPE=TEXTAREA FORM=ID:* ATTR=ID:g-recaptcha-response CONTENT={{answer}}" + "\n";
macro3 += submit_button + "\n";

iimSet("user",user);
iimSet("password",password);
iimPlay(macro);
iimPlay(macro2);
var answer=iimGetLastExtract().trim();

while(answer=="ERROR: NOT_DECODED")
{
	iimPlay("CODE:WAIT SECONDS=5");
	iimPlay("CODE:REFRESH");
	iimPlay(macro2);
	var answer=iimGetLastExtract().trim();
}
iimPlay(macro3);

