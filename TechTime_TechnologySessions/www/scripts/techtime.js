function reloginToTechTime(){$(".abc").attr("checked",true);$(".xyz").attr("checked",false);usrToggle=true;parent.window.location.href="https://techtime.stage2.accenture.com/mobile/index.php";window.localStorage.setItem("status","online")}function setAttributes(){if(launchingMode=="online"){$("div[id^='onlineModeDiv']").removeAttr("onclick");$("div[id^='offlineModeDiv']").attr("onclick","changeMode('offline')");$("div[id^='onlineModeDiv']").addClass("checkedOnlineMode");$("div[id^='onlineModeDiv']").addClass("addSelectedModeGradientOnline");$("label[id^='onlineMode']").addClass("addShadow");$("label[id^='currentModeDisplay']").text("Online Mode")}if(launchingMode=="offline"){$("div[id^='offlineModeDiv']").removeAttr("onclick");$("div[id^='onlineModeDiv']").attr("onclick","changeMode('online')");$("div[id^='offlineModeDiv']").addClass("checkedOfflineMode");$("div[id^='offlineModeDiv']").addClass("addSelectedModeGradientOffline");$("label[id^='offlineMode']").addClass("addShadow");$("label[id^='currentModeDisplay']").text("Offline Mode")}}function stopStreaming(e,t){$.each($("video"),function(){var e=this.poster;if(isOnline==false||isOnline=="false"){this.poster=e;this.src=" ";this.load();jAlert("Please go online to view the video.","Tech Time")}})}function changeMode(e){}function switchModeControls(e){}function logoutApp(){$.mobile.changePage("#logoutPage")}function setUserInfo(e){if(e.length){var t=e.substr(10,e.length).split("@")[0];document.getElementById("lblUserName").innerHTML=t.replace(/\./g,".");window.localStorage.setItem("username",t)}}function setUDIDInfo(e){deviceUDID=e}function loadDataforOfflineMode(){var e=window.localStorage.getItem("userName");getFileSystemRefForReading(true,null)}function getFileSize(e){if(e!=0&&e>1024){var t=1024*1024;return(e/t).toFixed(1)}else{return e}}function deleteCurrentPlayingFile(){if(document.getElementById("videoComp")){document.getElementById("videoComp").pause()}if(document.getElementById("audioComp")){document.getElementById("audioComp").pause()}jConfirm("The file will be permanently deleted from your device.","Tech Time",function(e){if(e==true){confirmDeleteFile();refreshFileSystem()}else{if(document.getElementById("videoComp")){document.getElementById("videoComp").play()}if(document.getElementById("audioComp")){document.getElementById("audioComp").play()}$("#avPlayer").css("display","block")}})}function confirmDeleteFile(){var e="";var t="";var n="";if(document.getElementById("videoComp")){e=document.getElementById("videoComp").src;t=document.getElementById("videoComp").src;n="video"}if(document.getElementById("audioComp")){e=document.getElementById("audioComp").src;t=document.getElementById("audioComp").src;n="audio"}$("#avPlayer").html("");var r=e.lastIndexOf("/")+1;e=e.substring(r,e.length);deleteFile(sPath+"/"+e);var i=e.lastIndexOf(".");e=e.substr(0,i);t=t.substr(7,t.length);changeIsdownloadStatus(t,e,"delete");CheckAllDownloads();if(spotLightFlag){var s=window.localStorage.getItem("detailPageelementIdSpot");var o=window.localStorage.getItem("detailPagetypeSpot");var u=window.localStorage.getItem("detailPagecountNumSpot");if(currElementIdSpot!=""&&currElementtypeSpot!=""&&currElementcountNumSpot!=""){spotlightDataTypes(currElementIdSpot,currElementtypeSpot,currElementcountNumSpot)}}else if(playlistItemsPageFlag){$.mobile.changePage("#DownloadsPage")}else{var s=window.localStorage.getItem("detailPageelementId");var o=window.localStorage.getItem("detailPagetype");var u=window.localStorage.getItem("detailPagecountNum");if(s!=""&&o!=""&&u!=""){detailPageView(s,o,u)}}}var launchingMode="online";var downloadList=new Array;var currentMode="";var mySelection;var status="";var currentPage;var fileObjAbort;var nv="";var searchInputFlag=false;var deviceUDID="";$(document).ready(function(){$.mobile.hashListeningEnabled=false;$.mobile.pushStateEnabled=false;$.mobile.changePage.defaults.changeHash=false;$.mobile.changePage("#intialPage");mySelection=window.localStorage.getItem("status");if(mySelection==""||mySelection==null){mySelection="online"}if(mySelection=="online"){$(".abc").attr("checked",true);$(".xyz").attr("checked",false)}else{$(".abc").attr("checked",false);$(".xyz").attr("checked",true)}$(document).on("pageshow","div[data-role=page]",function(e){});$("input[type='radio']").click(function(){var e=$(this).parents("div").last().attr("id");window.localStorage.setItem("currentPage",e);currentTechWatchItemId=window.localStorage.getItem("currentTechWatchItemId");currentTechWatchItemIndex=window.localStorage.getItem("currentTechWatchItemIndex");mySelection=$(this).val();if(mySelection=="online"){$(".abc").attr("checked",true);$(".xyz").attr("checked",false);usrToggle=true;$("#homescreenLogout").removeClass("dynamicDivForLogout");$("#homescreenLogout").addClass("dynamicDiv");window.localStorage.setItem("status","online");parent.window.location.href="https://techtime.stage2.accenture.com/mobile/index.php"}else{$(".abc").attr("checked",false);$(".xyz").attr("checked",true);window.localStorage.setItem("status","offline");$("#homescreenLogout").removeClass("dynamicDiv");$("#homescreenLogout").addClass("dynamicDivForLogout");var t=window.localStorage.getItem("searchString");window.localStorage.setItem("searchString",t);window.localStorage.setItem("eventFlag",eventsFlag);window.localStorage.setItem("spotLightFlag",spotLightFlag);window.localStorage.setItem("mediaFlag",mediaFlag);stopPlayingMedia();usrToggle=false;isOnline=false;if(fileObjAbort){fileObjAbort.abort(abortSuccess,errorDeleteFileSystem);downloadList=[];var n=document.getElementById("showProgressBar").innerHTML;document.getElementById("showProgressBar").innerHTML=" "}if($("#playlistItemPlayer").attr("src").indexOf("techtime.stage2.accenture")!=-1){displayPlaylistItems(currentOpenPlaylist)}onDeviceReady()}$("input[type='radio']").checkboxradio();$("input[type='radio']").checkboxradio("refresh")});var e=$("#frmLogin");$("#logout,#logout2,#logout3").on("click",function(){userName="";$("#avPlayer").html("");logoutApp()});$("#audioBack").on("click",function(){document.getElementById("avPlayer").innerHTML=""});$("#downloadFile").on("click",function(){downloadMedia()});$("#btnDeleteItem").on("click",function(){$("#avPlayer").css("display","none");deleteCurrentPlayingFile()});$("#imgBack").on("click",function(){$.mobile.changePage("#businessCategory")});$("#TAListResult").on("click",function(){getList();setFlag("media")});$("#BackPlayer").on("click",function(){$.mobile.changePage("#categoryItem");document.getElementById("avPlayer").innerHTML=""});$("#searchTAListResult, #searchDetailMediaPage, #searchTechWatch,#searchdetailAuthor, #searchUpcomingEventsPage, #searchSubscribePage, #searchAboutTectTimePage, #searchContactUsPage, #searchFaqPage, #searchsearchResultPage, #searchBusinessCategory, #searchDownloadsPage").focus(function(){$("#searchBusinessCategory").val("");if($(this).attr("placeholder")==" Search"){$(this).attr("placeholder","")}else if($(this).attr("placeholder")==currentSearchKey){$(this).attr("placeholder",currentSearchKey)}});$("#searchTAListResult, #searchDetailMediaPage, #searchTechWatch, #searchdetailAuthor, #searchUpcomingEventsPage, #searchSubscribePage, #searchAboutTectTimePage, #searchContactUsPage, #searchFaqPage, #searchsearchResultPage, #searchBusinessCategory, #searchDownloadsPage").blur(function(){if($(this).val()==""){$(this).attr("placeholder"," Search");searchInputFlag=false}});$("#searchBusinessCategory, #searchTAListResult, #searchDetailMediaPage, #searchTechWatch, #searchdetailAuthor, #searchUpcomingEventsPage, #searchSubscribePage, #searchAboutTectTimePage, #searchContactUsPage, #searchFaqPage, #searchsearchResultPage, #searchBusinessCategory, #searchDownloadsPage").bind("keypress keydown keyup",function(e){if(e.type=="keypress"||e.type=="keydown"||e.type=="keyup"){searchInputFlag=true}else if(e.type!="keypress"||e.type!="keydown"||e.type!="keyup"){searchInputFlag=false}})});var isDownloadOn=false