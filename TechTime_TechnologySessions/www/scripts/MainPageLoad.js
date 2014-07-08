function createJsonFormat(){jsonData.category=new Array;jsonData.audio=new Array;jsonData.video=new Array;jsonData.events=new Array;jsonData.panelDiscussions=new Array;jsonData.interviews=new Array;jsonData.documents=new Array;jsonData.techConf=new Array;jsonData.technologySessions=new Array;jsonData.techWatchMultiple=new Array;jsonData.techWatchQuotesMultiple=new Array;jsonData.spotLight=new Array;jsonData.contributor=new Array;jsonData.aboutTechTime=new Array;jsonData.contributions=new Array;jsonData.faq=new Array;jsonData.loggedUserName="";jsonData.pendingDownloads=new Array;jsonData.imagesToDownload=new Array;jsonData.lookUpItemsList=new Array;jsonData.offlineCommentsPosted=new Array;jsonData.downloadedSpotLightItems=new Array;jsonData.listOfFiles=new Array;jsonData.playlists=new Array;jsonData.recommendations=new Array;jsonData.digitalAreas=new Array;jsonData.digitalAreasItems=new Array}function getSubscribeRss(){var e=document.getElementById("lblUserName").innerHTML;e=e.replace(/\./g,"_");jsonData.loggedUserName=e;var t="https://techtime.stage2.accenture.com/techtimemobile/subscribe-service/uid=";t=t+e;$.ajax({type:"GET",url:t,dataType:"xml",success:subscribeTA,error:function(e,t,n){console.log("In Failure"+JSON.stringify(e))}});loadTechWatchMultipleUrl();loadPlaylistsData();updateUserVersion("iOS",e,"3.5.0 on "+dd)}function updateUserVersion(e,t,n){if(e=="iOS"){window.GA.trackEventWithCategory("iOS Users",t,n,1)}else if(e=="Android"){window.GA.trackEventWithCategory("Android Users",t,n,1)}else if(e=="Windows"){window.GA.trackEventWithCategory("Windows Users",t,n,1)}}function subscribeTA(e){subscribeCatList="";subscribeCategoryId=new Array;subscribeCategoryId=[];var t=0;newAppVersion=$(e).find("item").attr("availableAppVersion");$(e).find("item").each(function(){var e=$(this).find("categoryid").text();var n=$(this).find("asset_type").text();var r=$(this).find("categoryname").text();if(jsonData.digitalAreas.indexOf(e)!=-1&&jsonData.digitalAreas.length!=0&&jsonData.digitalAreas.length>0){$("#digitalAreaHomePageTab").css("display","block")}if(e!=""&&t=="1"){subscribeCategoryId.push(e);if(subscribeCatList==""){subscribeCatList=e}else{subscribeCatList=subscribeCatList+"+"+e}}if($(this).find("asset_type").text()&&n=="documents"){isSubscribeDocument="yes"}if($(this).find("asset_type").text()&&n=="podcast"){isSubscribePodcast="yes"}if($(this).find("asset_type").text()&&n=="events"){isSubscribeEvent="yes"}t=1});if(subscribeCatList==""){subscribeCatList="0"}else{rssUrl="";eventsRss="";documentRss="";rssUrl="https://techtime.stage2.accenture.com/techno-areas/"+subscribeCatList+"/audio-video-listing-view";eventsRss="https://techtime.stage2.accenture.com/techno-areas/"+subscribeCatList+"/events-listing-view";documentRss="https://techtime.stage2.accenture.com/techno-areas/"+subscribeCatList+"/documents-listing-view"}loadtechnologyAreaListUrl()}function loadtechnologyAreaListUrl(){var e="https://techtime.stage2.accenture.com/techtimemobile/subscribe-service/all";$.ajax({type:"GET",url:e,dataType:"xml",success:displayTAList,error:function(e,t,n){console.log("In Failure"+JSON.stringify(e))}});e=""}function displayTAList(e){mainCategoryList=new Array;mainCategoryList=[];$(e).find("item").each(function(){var e=$(this).find("parentcategoryid").text();if($(this).find("parentcategoryid").text()=="0"){var t="false";var n=$(this).find("categoryid").text();$.each(subscribeCategoryId,function(e,r){if(r==n){t="true";noSubscribe="true"}});if(t=="true"){var r=new Object;r.categoryid=$(this).find("categoryid").text();r.categoryname=$(this).find("categoryname").text();r.subCategoryCount="";r.subCategory="";r.subscribe="yes";r.subscribeDocuments=isSubscribeDocument;r.subbscribePodcast=isSubscribePodcast;r.subbscribeEvent=isSubscribeEvent;mainCategoryList.push(r)}else{var r=new Object;r.categoryid=$(this).find("categoryid").text();r.categoryname=$(this).find("categoryname").text();r.subCategoryCount="";r.subCategory="";r.subscribe="no";r.subscribeDocuments="no";r.subbscribePodcast="no";r.subbscribeEvent="no";mainCategoryList.push(r)}}});$.each(mainCategoryList,function(t,n){var r=new Array;var i=new Object;i.categoryid=n.categoryid;i.parentcategoryid=n.categoryid;i.subCategoryName=n.categoryname;i.audio=new Array;i.video=new Array;i.interviews=new Array;i.panelDiscussions=new Array;i.techConf=new Array;i.technologySessions=new Array;i.document=new Array;i.event=new Array;i.contributor=new Array;r.push(i);$(e).find("item").each(function(){if($(this).find("parentcategoryid").text()==n.categoryid){var e=new Object;e.categoryid=$(this).find("categoryid").text();e.parentcategoryid=$(this).find("parentcategoryid").text();e.subCategoryName=$(this).find("categoryname").text();e.audio=new Array;e.video=new Array;e.interviews=new Array;e.panelDiscussions=new Array;e.techConf=new Array;e.technologySessions=new Array;e.document=new Array;e.event=new Array;e.contributor=new Array;r.push(e)}});n.subCategory=r;n.subCategoryCount=r.length});$.each(mainCategoryList,function(e,t){jsonData.category.push(t)});loadAudioVideoURL()}function loadAudioVideoURL(){$.ajax({type:"GET",url:rssUrl,dataType:"xml",success:getAudioVideoItem,error:function(e,t,n){console.log("In Failure"+JSON.stringify(e))}})}function getAudioVideoItem(e){$(e).find("item").each(function(){try{var e="";var t="";var n="";var r="";var i=$(this).find("category").text();var s=$(this).find("contentid").text();var o=i.split("|");for(var u=0;u<o.length;u++){var a=o[u].split("-")[1];if(jsonData.digitalAreas.indexOf(a)!=-1){jsonData.digitalAreasItems.push(s)}}var f=$(this).find("title").text();f=f.replace(/'/g,"");var l=$(this).find("pods_formattype").text();if(l=="Audios"||l=="Videos"){l="Technology Sessions"}var c=$(this).find("author").text().replace(/\|/g,",");var h=$(this).find("pods_date").text();var p=$(this).find("description").text();var d=$(this).find("qna").text();var v=$(this).find("thumb").text();var m=$(this).find("actual").text();var g=$(this).find("audio").text();var y=$(this).find("video").text();var b=$(this).find("transcript").text();var w=$(this).find("presentation").text();var E=$(this).find("Content_lang").text();$(this).find("audio").each(function(){e=$(this).attr("length")});$(this).find("video").each(function(){t=$(this).attr("length")});$(this).find("transcript").each(function(){r=$(this).attr("length")});$(this).find("presentation").each(function(){n=$(this).attr("length")});var S=new Array;var x=c.split(",");for(u=0;u<x.length;u++){S.push(x[u])}if(jQuery.inArray(s,audioVideoItemId)==-1){audioVideoItemId.push(s);var T=new Object;T.itemId=s;T.category=i;T.title=f;T.type=l;T.author=S;T.publishedDate=h;T.description=p;T.qna=d;T.thumb=v;T.actual=m;T.audioUrl=g;T.audioLength=e;T.audioIsDownloaded="false";T.isDownloadedAudio="false";T.localPathAudio="";T.downloadedDateA="";T.videoUrl=y;T.videoLength=t;T.videoIsDownloaded="false";T.isDownloadedVideo="false";T.localPathVideo="";T.downloadedDateV="";T.transcriptUrl=b;T.transcriptLength=r;T.transcriptIsDownloaded="false";T.isDownloadedTranscript="false";T.localPathTranscript="";T.downloadedDateT="";T.presentationUrl=w;T.presentationLength=n;T.presentationIsDownloaded="false";T.isDownloadedPresentation="false";T.localPathPresentation="";T.downloadedDateP="";T.thumbLocal="";T.actualLocal="";T.selLanguage=E;if(l=="Audios"){jsonData.technologySessions.push(T)}else if(l=="Videos"){jsonData.technologySessions.push(T)}else if(l=="Panel Discussions"){jsonData.panelDiscussions.push(T)}else if(l=="Technology Conferences"){jsonData.techConf.push(T)}else if(l=="Interviews"){jsonData.interviews.push(T)}else if(l=="Technology Sessions"){jsonData.technologySessions.push(T)}jsonData.lookUpItemsList[s]=T;var N=JSON.stringify(i);N=N.substring(1,N.length-1);var C,k,L,A;var O=N.length;C=0;while(O!=0&&k!=0&&N!=""){N=N.substring(0,N.length);var M=N.split("|");k=N.indexOf("-")+1;C=N.indexOf("|");O=N.length;L=N.substring(0,k-1);$.each(jsonData.category,function(e,t){$.each(t.subCategory,function(e,t){for(var n=0;n<M.length;n++){var r=M[n].substring(M[n].indexOf("-")+1,M[n].length);if(r==t.categoryid&&t.subCategoryName==L){if(l=="Audios"){t.technologySessions.push(s)}else if(l=="Videos"){t.technologySessions.push(s)}else if(l=="Panel Discussions"){t.panelDiscussions.push(s)}else if(l=="Technology Conferences"){t.techConf.push(s)}else if(l=="Interviews"){t.interviews.push(s)}else if(l=="Technology Sessions"){t.technologySessions.push(s)}}}})});if(C==-1){O=0}if(k==0){O=0}L=N.substring(C+1,N.length);N=L}}else{}}catch(_){var D="There was an error on this page.\n\n";D+="Error description: "+err.message+"\n\n";D+="Click OK to continue.\n\n"}});loadEventsRss()}function loadEventsRss(){$.ajax({type:"GET",url:eventsRss,dataType:"xml",success:getEventItem,error:function(e,t,n){console.log("In Failure"+JSON.stringify(e))}})}function getEventItem(e){var t=["January","February","March","April","May","June","July","August","September","October","November","December"];$(e).find("item").each(function(){try{var e,t;var n=$(this).find("category").text();var r=$(this).find("icsfile").text();var i=$(this).find("contentid").text();var s=$(this).find("title").text();var o=$(this).find("content_type").text();var u=$(this).find("author_count").text();var a=$(this).find("author").text().replace(/\|/g,",");var f=$(this).find("description").text();var l=$(this).find("event_sdate").text();var c=$(this).find("event_sdate").text();var h=$(this).find("event_edate").text();var p=$(this).find("thumb").text();var d=$(this).find("actual").text();var v=$(this).find("etime").text();var m=n.split("|");for(var g=0;g<m.length;g++){var y=m[g].split("-")[1];if(jsonData.digitalAreas.indexOf(y)!=-1){jsonData.digitalAreasItems.push(i)}}$(this).find("thumb").each(function(){e=$(this).attr("length")});$(this).find("actual").each(function(){t=$(this).attr("length")});var b=new Array;var w=a.split(",");for(g=0;g<w.length;g++){b.push(w[g])}if(jQuery.inArray(i,eventItemId)==-1){eventItemId.push(i);var E=new Object;E.itemId=i;E.title=s;E.type=o;E.icsfile=r;E.category=n;E.publishedDate=l;E.startDate=c;E.endDate=h;E.author=b;E.authorCount=u;E.description=f;E.thumb=p;E.thumbLength=e;E.actual=d;E.actualLength=t;E.etime=v;E.thumbLocal="";E.actualLocal="";jsonData.events.push(E);jsonData.lookUpItemsList[i]=E;var S=JSON.stringify(n);S=S.substring(1,S.length);var x,T,N;var C=S.length;x=0;while(C!==0&&T!=0&&S!=""){T=S.indexOf("-")+1;x=S.indexOf("|");C=S.length;N=S.substring(0,T-1);$.each(jsonData.category,function(e,t){$.each(t.subCategory,function(e,t){if(t.subCategoryName==N){t.event.push(i)}})});if(x==-1){C=0}if(T==0){C=0}N=S.substring(x+1,S.length);S=N}}else{}}catch(k){var L="There was an error on this page.\n\n";L+="Error description: "+err.message+"\n\n";L+="Click OK to continue.\n\n"}});loadDocumentRss()}function loadDocumentRss(){$.ajax({type:"GET",url:documentRss,dataType:"xml",success:getDocumentItem,error:function(e,t,n){}})}function getDocumentItem(e){$(e).find("item").each(function(){try{var e,t,n;var r=$(this).find("category").text();var i=$(this).find("contentid").text();var s=$(this).find("title").text();var o=$(this).find("description").text();var u=$(this).find("content_type").text();var a=$(this).find("author").text().replace(/\|/g,",");var f=$(this).find("Content_lang").text();var l=$(this).find("document_date").text();var c=$(this).find("thumb").text();var h=$(this).find("actual").text();var p=$(this).find("document_pdf").text();var d=r.split("|");for(var v=0;v<d.length;v++){var m=d[v].split("-")[1];if(jsonData.digitalAreas.indexOf(m)!=-1){jsonData.digitalAreasItems.push(i)}}$(this).find("thumb").each(function(){n=$(this).attr("length")});$(this).find("thumb").each(function(){e=$(this).attr("length")});$(this).find("actual").each(function(){t=$(this).attr("length")});if(jQuery.inArray(i,documentItemId)==-1){documentItemId.push(i);var g=new Array;var y=a.split(",");for(v=0;v<y.length;v++){g.push(y[v])}var b=new Object;b.itemId=i;b.title=s;b.description=o;b.publishedDate=l;b.type=u;b.author=g;b.category=r;b.thumb=c;b.thumbLength=e;b.actual=h;b.actualLength=t;b.pdf=p;b.apdfLength=n;b.isDownloaded="false";b.localPath="";b.thumbLocal="";b.actualLocal="";b.downloadedDateD="";b.selLanguage=f;jsonData.documents.push(b);jsonData.lookUpItemsList[i]=b;var w=JSON.stringify(r);w=w.substring(1,w.length);var E,S,x;var T=w.length;E=0;while(T!==0&&S!=0&&w!=""){S=w.indexOf("-")+1;E=w.indexOf("|");T=w.length;x=w.substring(0,S-1);$.each(jsonData.category,function(e,t){$.each(t.subCategory,function(e,t){if(t.subCategoryName==x){t.document.push(i)}})});if(E==-1){T=0}if(S==0){T=0}x=w.substring(E+1,w.length);w=x}}else{}}catch(N){var C="There was an error on this page.\n\n";C+="Error description: "+err.message+"\n\n";C+="Click OK to continue.\n\n"}});var t=uniqueFileList(jsonData.digitalAreasItems);jsonData.digitalAreasItems=t;loadContributorRss();isDataLoaded=true;if(isAppUpgradeAvailable==false){$.mobile.changePage("#businessCategory");$("#applicationUpgradeTab").css("display","none");$("#applicationUpdateButton").css("display","none")}else if(isAppUpgradeAvailable==true&&setCancelAction==true){$.mobile.changePage("#businessCategory");$("#applicationUpgradeTab").css("display","block");$("#applicationUpdateButton").css("display","block")}$("#imgRefreshProgress").hide()}function loadContributorRss(){var e="https://techtime.stage2.accenture.com/mobile-contributor-listing.xml";$.ajax({type:"GET",url:e,dataType:"xml",success:loadContributorData,error:function(e,t,n){console.log("In Failure"+JSON.stringify(e))}});e="";loadSpotlightUrl();loadFaqRss();downloadThumbImagesOnLogin()}function loadContributorData(e){$(e).find("item").each(function(){try{var e=$(this).find("title").text();var t=$(this).find("guid").text();var n=$(this).find("category").text();var r=$(this).find("description").text();var i=$(this).find("contributor").text();var s=$(this).find("date").text();var o=$(this).find("thumb").text();var u=$(this).find("actual").text();var a=$(this).find("email").text();var f=new Object;f.itemId=t;f.title=e;f.category=n;f.description=r;f.contributor=i;f.date=s;f.type="contributor";f.thumb=o;f.actual=u;f.thumbLocal="";f.actualLocal="";f.email=a;jsonData.contributor.push(f)}catch(l){var c="There was an error on this page.\n\n";c+="Error description: "+err.message+"\n\n";c+="Click OK to continue.\n\n"}});if(isOnline){getFileSystemRefForWriting(jsonData)}}function loadTechWatchMultipleUrl(){var e="https://techtime.stage2.accenture.com/mobile-tech-watch";$.ajax({type:"GET",url:e,dataType:"xml",success:loadTechWatchMultipleData,error:function(e,t,n){}});e=""}function loadTechWatchMultipleData(e){$(e).find("techwatch").each(function(e,t){try{var n=new Object;var r=$(this).attr("type");var i=$(this).attr("id");var s=$(this).attr("publishedDate");if(r=="current"){currentTechWatchItemId=i;currentTechWatchItemIndex=e;window.localStorage.setItem("currentTechWatchItemId",currentTechWatchItemId);window.localStorage.setItem("currentTechWatchItemIndex",currentTechWatchItemIndex)}n.techWatchPublicationType=r;n.techWatchPublicationId=i;n.techWatchPublicationDate=s;n.techWatchPublicationIndex=e;n.techWatchPublicationDateString=getFormattedDate(s);var o=new Array;var u=1;$(this).find("item").each(function(){var t=new Array;var n=$(this).find("title").text();var r=$(this).find("type").text();var s=$(this).find("article");s.each(function(n,s){var o=new Object;o.articleTitle=$(this).find("article_title").text();o.articleUrl=$(this).find("article_url").text();o.articleDescription=$(this).find("article_description").text();o.articleType=$(this).attr("type");if(o.articleType=="showcase"){var a=new Object;a.techwatchPubIndex=e;a.techwatchPubId=i;a.articleIndex=u;a.articleTitle=o.articleTitle;a.articleUrl=o.articleUrl;a.articleDescription=o.articleDescription;window.localStorage.setItem("techwatchPubIndex",e);window.localStorage.setItem("techwatchPubId",i);window.localStorage.setItem("articleIndex",u);window.localStorage.setItem("articleTitle",o.articleTitle);window.localStorage.setItem("articleUrl",o.articleUrl);window.localStorage.setItem("articleDescription",o.articleDescription);window.localStorage.setItem("articleType",r)}u=u+1;t.push(o)});var a=new Object;a.itemTitle=n;a.itemType=r;a.itemArticleArray=t;o.push(a)});n.techWatchPublicationItems=o;jsonData.techWatchMultiple.push(n)}catch(a){var f="There was an error on this page.\n\n";f+="Error description: "+a.message+"\n\n";f+="Click OK to continue.\n\n"}})}function loadSpotlightUrl(){var e="https://techtime.stage2.accenture.com/mobile-spotlight-feeds.xml";$.ajax({type:"GET",url:e,dataType:"xml",success:loadSpotlightGeneral,error:function(e,t,n){console.log("In Failure SPOTLIGHT "+JSON.stringify(e))}});e=""}function loadFaqRss(){var e="https://techtime.stage2.accenture.com/mobile-faq-rss/faq.xml";$.ajax({type:"GET",url:e,dataType:"xml",success:loadFaq,error:function(e,t,n){console.log("In Failure"+JSON.stringify(e))}});e=""}function loadFaq(e){$(e).find("item").each(function(){try{var e=$(this).find("title").text();var t=$(this).find("question_order").text();var n=$(this).find("description").text();var r=$(this).find("image1").text();var i=$(this).find("image2").text();var s=new Object;s.title=e;s.qOrder=t;s.sImage1=r;s.sImage2=i;s.description=n;jsonData.faq.push(s)}catch(o){var u="There was an error on this page.\n\n";u+="Error description: "+err.message+"\n\n";u+="Click OK to continue.\n\n"}});if(isAppUpgradeAvailable==false){$.mobile.changePage("#businessCategory")}else if(isAppUpgradeAvailable==true&&setCancelAction==true){$.mobile.changePage("#businessCategory")}}function loadAboutTechTimeRss(){var e="https://techtime.stage2.accenture.com/mobile-about-us/aboutus.xml";$.ajax({type:"GET",url:e,dataType:"xml",success:loadAboutTechTime,error:function(e,t,n){}});e=""}function loadAboutTechTime(e){jsonData.digitalAreas=$(e).find("digitalAreas").text().split("|");newAppVersion=$(e).find("iosAppVersion").text();var t=$(e).find("updateMessage").text();$("#customUpdateMessage").html(t);checkForApplicationUpgradeAvailability();$(e).find("item").each(function(){try{var e=$(this).find("title").text();var t=$(this).find("image").text();var n=$(this).find("description").text();var r=new Object;r.title=e;r.description=n;r.image=t;jsonData.aboutTechTime.push(r)}catch(i){var s="There was an error on this page.\n\n";s+="Error description: "+err.message+"\n\n";s+="Click OK to continue.\n\n"}})}function createJsonFormatOffline(e){jsonData=e;if(e){noSubscribe="true";$("#imgRefreshProgress").hide()}else{$("#errormsg").html("If you are accessing Tech Time mobile app for the first time, you will need to connect to the internet to view the content.<br> Please close the application and connect to Internet.");$.mobile.changePage("#loggedOutPage");$("#imgRefreshProgress").hide()}}function backnav(e){backPage(e)}function backPage(e){var t=window.localStorage.getItem("spotLightFlag");stopPlayingMedia();$(".mainMenuListContent").hide();if(e=="digitalAreaHomePage"){$.mobile.changePage("#businessCategory");loadDigitalTab()}else if(e=="detailMediaPage"){if(eventsFlag){var n=window.localStorage.getItem("eventmonth");var r=window.localStorage.getItem("eventcount");var i=window.localStorage.getItem("currMonth");showUpcomingEventList(n,r,i);$.mobile.changePage("#UpcomingEventsPage")}else if(mediaFlag){if(!spotLightFlag&&!searchFlag){var s=window.localStorage.getItem("currentCategoryOff");var o=window.localStorage.getItem("currentCategoryIdOff");selectedCategoryId=o;selectedCategoryName=s;$.mobile.changePage("#TAListResult",{transition:"none"})}else if(searchFlag){$.mobile.changePage("#searchResultPage")}else{$.mobile.changePage("#businessCategory",{transition:"none"})}mediaFlag=false;searchFlag=false;eventsFlag=false}else if(searchFromMainPage){$.mobile.changePage("#searchResultPage")}else{$(".navigateBackBtn").hide();if(t){$(".navigateBackBtn").show()}$.mobile.changePage("#businessCategory");resetSearchFlags()}}else if(e=="TAListResult"||e=="UpcomingEventsPage"||e=="aboutTectTimePage"||e=="contactUsPage"||e=="faqPage"){if(isFromDigitalHomePage){$.mobile.changePage("#digitalAreaHomePage")}else{defaultNavigate();$(".navigateBackBtn").hide();$.mobile.changePage("#businessCategory");resetSearchFlags()}}else if(e=="subscribePage"){defaultNavigate();$(".navigateBackBtn").hide();$("#subscribePageDiv").hide();$.mobile.changePage("#businessCategory");resetSearchFlags()}else if(e=="DownloadsPage"){gotFS(fileSystem);if(dwPgflag&&!playlistItemsPageFlag){if(spotLightFlag&&mediaFlag){u=window.localStorage.getItem("detailPageelementIdSpot");a=window.localStorage.getItem("detailPagetypeSpot");f=window.localStorage.getItem("detailPagecountNumSpot");spotlightDataTypes(u,a,f);$.mobile.changePage("#detailMediaPage")}else if(!spotLightFlag&&mediaFlag){var u=window.localStorage.getItem("detailPageelementId");var a=window.localStorage.getItem("detailPagetype");var f=window.localStorage.getItem("detailPagecountNum");detailPageView(u,a,f);$.mobile.changePage("#detailMediaPage")}else if(!spotLightFlag&&!mediaFlag){defaultNavigate();$(".navigateBackBtn").hide();$.mobile.changePage("#businessCategory");resetSearchFlags()}}else if(dwPgflag&&playlistItemsPageFlag){$.mobile.changePage("#playlistsItemPage")}else{defaultNavigate();$(".navigateBackBtn").hide();$.mobile.changePage("#businessCategory");resetSearchFlags()}}else if(e=="techwatchPage"){defaultNavigate();$.mobile.changePage("#businessCategory");currentTechWatchItemId=window.localStorage.getItem("currentTechWatchItemId");currentTechWatchItemIndex=window.localStorage.getItem("currentTechWatchItemIndex")}else if(e=="detailAuthor"&&t!="true"){var l=window.localStorage.getItem("eventFlag");var c=window.localStorage.getItem("spotLightFlag");var h=window.localStorage.getItem("mediaFlag");if(l=="true"){var p=window.localStorage.getItem("eventitemId");UpcomingEventsDetail(p);$.mobile.changePage("#detailMediaPage")}else if(h=="true"){var u=window.localStorage.getItem("detailPageelementId");var a=window.localStorage.getItem("detailPagetype");var f=window.localStorage.getItem("detailPagecountNum");var d=window.localStorage.getItem("detailPageitemCount");detailPageView(u,a,f,d);$.mobile.changePage("#detailMediaPage")}else{$.mobile.changePage("#businessCategory")}}else if(e=="detailAuthor"&&t=="true"){$.mobile.changePage("#businessCategory")}else if(e=="itemVideo"){if(mediaFlag&&playFromDownloadsPage){var u=window.localStorage.getItem("detailPageelementId");var a=window.localStorage.getItem("detailPagetype");var f=window.localStorage.getItem("detailPagecountNum");var d=window.localStorage.getItem("detailPageitemCount");detailPageView(u,a,f,d);$.mobile.changePage("#detailMediaPage")}else if(playFromDownloadsPage&&!mediaFlag){$.mobile.changePage("#DownloadsPage")}resetSearchFlags()}else if(e=="qnaPage"){var u="";var a="";var f="";if(spotLightFlag){u=window.localStorage.getItem("detailPageelementIdSpot");a=window.localStorage.getItem("detailPagetypeSpot");f=window.localStorage.getItem("detailPagecountNumSpot");spotlightDataTypes(u,a,f)}else{var u=window.localStorage.getItem("detailPageelementId");var a=window.localStorage.getItem("detailPagetype");var f=window.localStorage.getItem("detailPagecountNum");detailPageView(u,a,f)}$.mobile.changePage("#detailMediaPage")}else if(e=="searchResultPage"){if(searchFromMediaPage){if(spotLightFlag){u=window.localStorage.getItem("detailPageelementIdSpot");a=window.localStorage.getItem("detailPagetypeSpot");f=window.localStorage.getItem("detailPagecountNumSpot");spotlightDataTypes(u,a,f)}else{var u=window.localStorage.getItem("detailPageelementId");var a=window.localStorage.getItem("detailPagetype");var f=window.localStorage.getItem("detailPagecountNum");detailPageView(u,a,f)}}else if(searchFromDigitalPage){$.mobile.changePage("#digitalAreaHomePage")}else if(searchFromEventsPage){var p=window.localStorage.getItem("eventitemId");UpcomingEventsDetail(p);$.mobile.changePage("#detailMediaPage")}else if(searchFromSpotlightPage){showSpotLightContent();$.mobile.changePage("#detailMediaPage")}else if(searchFromUpcomingEventsPage){var n=window.localStorage.getItem("eventmonth");var r=window.localStorage.getItem("eventcount");var i=window.localStorage.getItem("currMonth");showUpcomingEventList(n,r,i);$.mobile.changePage("#UpcomingEventsPage")}else if(searchFromContributePage){resetSelfRecordingForms();resetAssistedRecordingForms();$.mobile.changePage("#ContributePage")}else if(searchFromTAListResultPage){var s=window.localStorage.getItem("currentCategoryOff");var o=window.localStorage.getItem("currentCategoryIdOff");selectedCategoryId=o;selectedCategoryName=s;showTAListResult(s,o);$.mobile.changePage("#TAListResult")}else if(searchFromAuthorDetailPage){var v=window.localStorage.getItem("aNameFromId");showAuthorDetailPage(v);$.mobile.changePage("#detailAuthor")}else if(searchFromDownloadsPage){showInProgress();$.mobile.changePage("#DownloadsPage")}else if(searchFromContactUsPage){contactUsFocus();$.mobile.changePage("#contactUsPage")}else if(searchFromAboutPage){showAboutTTArea();$.mobile.changePage("#aboutTectTimePage")}else if(searchFromFaqPage){showFaqContent();$.mobile.changePage("#faqPage")}else if(searchFroSubscribPage){showSubscribeContent();$.mobile.changePage("#subscribePage");$.mobile.changePage("#subscribePage")}else if(searchFromtechWatchPage){showTechWatchContent(currentItemId,currentItemIndex);$.mobile.changePage("#techwatchPage",{transition:"none"})}else if(searchFromPlaylistsPage){resetPlaylistLMRParameters();displayPlaylist();$.mobile.changePage("#PlaylistsPage");resetSearchFlags()}else if(searchFromPlaylistItemsPage){$.mobile.changePage("#playlistsItemPage");resetSearchFlags()}else if(searchFromSharePlaylistsPage){resetSharePlaylistForm();resetSharePlaylistParameters();$.mobile.changePage("#sharePlaylistsPage")}else if(searchFromAddToPlaylistPage){$.mobile.changePage("#addToPlaylistPage")}else{$(".navigateBackBtn").hide();$.mobile.changePage("#businessCategory");resetSearchFlags()}}else if(e=="sharePlaylistPage"){resetPlaylistLMRParameters();displayPlaylist();$.mobile.changePage("#PlaylistsPage");resetSharePlaylistParameters()}else if(e=="playlistPage"){$.mobile.changePage("#businessCategory");resetSearchFlags()}else if(e=="addToPlaylistPage"){$.mobile.changePage("#detailMediaPage")}else if(e=="playlistItemPage"){resetPlaylistLMRParameters();displayPlaylist();document.getElementById("playlistItemPlayer").pause();$.mobile.changePage("#PlaylistsPage")}else if(e=="contributePage"){$.mobile.changePage("#businessCategory");resetSearchFlags()}resetSearchFlags()}function compareAndUpdateJSON1(e){document.getElementById("showProgressBar").innerHTML="";$.each(e.contributions,function(e,t){jsonData.contributions.push(t)});if(e.offlineCommentsPosted.length>0){$.each(e.offlineCommentsPosted,function(e,t){jsonData.offlineCommentsPosted.push(t)});postOfflineComments()}$.each(e.downloadedSpotLightItems,function(e,t){jsonData.downloadedSpotLightItems.push(t)});if(isOnline){generateUserDownloadsJson()}}function generateUserDownloadsJson(){var e='{"data":{"username":"'+jsonData.loggedUserName+'","downloadedItems":[';var t="";var n=new Array;for(i=0;i<entries.length;i++){n.push('"'+entries[i]+'"')}e=e+n+'],"devicePlatform":"'+device.platform+'","deviceUUID":"'+deviceUDID+'","deviceModel":"'+device.model+'"}}';postUserDownloads(e)}function postUserDownloads(e){var t=e;var n="https://techtime.stage2.accenture.com/techtimemobile/mobiletrack";if(isOnline){$.ajax({type:"POST",url:n,data:t,dataType:"text",contentType:"application/json",success:function(e){},error:function(e,t,n){console.log("*****In Failure***"+JSON.stringify(e))}})}}function showCategoriesListsagar(e){var t="";if(!isOnline&&e==null){$("#errorString").html("If you are accessing Tech Time mobile app for the first time, you will need to connect to the internet to view the content. Please close the application and connect to Internet.");$.mobile.changePage("#errorPage");return}else{jsonData=e;changeDownloadLogoutColor();t=""}}function downloadedListload(e,t,n,r,i,s){if(i==1){type="A"}else if(i==2){type="V"}else if(i==3){type="P"}else if(i==4){type="T"}else if(i==5){type="D"}var o=new Object;o.itemId=e;o.title=r;o.publishedDate="";o.type=type;o.author="";o.isDownloaded=n;o.localPath=s;o.val=i}function resumePendingDownloads(e){document.getElementById("showProgressBar").innerHTML="";$.each(e,function(e,t){var n=t.elementId;var r=t.elementTitle;var i=t.isDownloadedFlag;var s=t.elementAudio;var o=t.val;if(isOnline){downloadFile(n,r,i,s,o)}})}function jsonPostAfterDownload(e){var t='{"data":{"username":"'+jsonData.loggedUserName+'", "downloadedItems":['+e+"]}}";postUserDownloads(t)}function getFormattedDate(e){var t=e.replace(/-/g,"/");var n=/(.*?)\/(.*?)\/(.*?)$/;var r=t.replace(n,function(e,t,n,r){var i=["January","February","March","April","May","June","July","August","September","October","November","December"];if(Math.floor(t/10)!=1){if(Math.floor(t%10)==1){return t+"st "+i[n-1]+", "+r}else if(Math.floor(t%10)==2){return t+"nd "+i[n-1]+", "+r}else if(Math.floor(t%10)==3){return t+"rd "+i[n-1]+", "+r}else{return t+"th "+i[n-1]+", "+r}}else{return t+"th "+i[n-1]+", "+r}});return r}function generateTechWatchShowCaseArticle(){var e=window.localStorage.getItem("techwatchPubIndex");var t=window.localStorage.getItem("techwatchPubId");var n=window.localStorage.getItem("articleIndex");var r=window.localStorage.getItem("articleTitle");var i=window.localStorage.getItem("articleUrl");var s=window.localStorage.getItem("articleDescription");var o=window.localStorage.getItem("articleType");showCaseArticleObject.showcaseArticleTechWatchPubIndex=e;showCaseArticleObject.showcaseArticleTechWatchPubId=t;showCaseArticleObject.articleIndex=n;showCaseArticleObject.articleTitle=r;showCaseArticleObject.articleUrl=i;showCaseArticleObject.articleDescription=s;showCaseArticleObject.articleType=o;var u="";u+="<div id='techWatchShowcaseArticleHeader' style='width:100%;padding-left:2%;' onclick='loadShowCaseArticleTechWatch()'>";u+="<label style='color:white;font-family:AgfaRotisSans;font-weight:bolder;font-size:20px;display:table-cell;'>TechWatch - Showcase Article:</label>";u+="</div>";u+="<div id='techwatchShowcaseArticleTitle' style='width:100%;padding-left:2%;padding-right:2%;margin-top:0px;'><label style='color:white;font-family:AgfaRotisSans;font-weight:bolder;font-size:18px;display:table-cell;word-wrap:break-word;'>"+r;u+="</label></div>";u+="<div id='techwatchShowcaseArticleDescription' style='margin-left:1%;margin-bottom:5px;width:96%;padding-top:3px;padding-bottom:3px;padding-left:2%;background-color:white;border-radius:15px;'><label style='word-wrap:break-word;color:black;font-family:Arial;font-weight:bold;font-size:15px;font-style:italic;display:table-row;text-align:left;'>"+s;u+="</label></div><div style='witdh:100%;text-align:right;padding-right:2%;'><a class='linkeffect' onclick='readMoreData(\""+i+"\");' href='#' style='text-decoration:none;color:white;font-size:14px;'><b>Read more</b></a></div>";$("#myShowcaseArticleDiv").html(u)}function loadShowCaseArticleTechWatch(){var e="#articleTitleDiv"+showCaseArticleObject.articleIndex;var t=".articleTitleDiv"+showCaseArticleObject.articleIndex;showTechWatchContent(showCaseArticleObject.showcaseArticleTechWatchPubId,showCaseArticleObject.showcaseArticleTechWatchPubIndex);$.mobile.changePage("#techwatchPage");if(showCaseArticleObject.articleType=="povs"){$(".articleTitlePoVDiv"+showCaseArticleObject.articleIndex).addClass("showCaseArticlePoVDiv");$(e).addClass("showCaseArticleDiv");$(t).addClass("showCaseArticleDiv")}else{$(e).addClass("showCaseArticleDiv");$(t).addClass("showCaseArticleDiv")}}function downloadThumbImagesOnLogin(){$.each(jsonData.documents,function(e,t){if(downloadedThumbs.indexOf(t.itemId+"thumb.png")==-1&&t.thumb!=""){var n=new Object;n.itemId=t.itemId;n.url=t.thumb;n.type="thumb";jsonData.imagesToDownload.push(n)}if(downloadedActuals.indexOf(t.itemId+"actual.png")==-1&&t.actual!=""){var r=new Object;r.itemId=t.itemId;r.url=t.actual;r.type="actual";jsonData.imagesToDownload.push(r)}});$.each(jsonData.panelDiscussions,function(e,t){if(downloadedThumbs.indexOf(t.itemId+"thumb.png")==-1&&t.thumb!=""){var n=new Object;n.itemId=t.itemId;n.url=t.thumb;n.type="thumb";jsonData.imagesToDownload.push(n)}if(downloadedActuals.indexOf(t.itemId+"actual.png")==-1&&t.actual!=""){var n=new Object;n.itemId=t.itemId;n.url=t.actual;n.type="actual";jsonData.imagesToDownload.push(n)}});$.each(jsonData.interviews,function(e,t){if(downloadedThumbs.indexOf(t.itemId+"thumb.png")==-1&&t.thumb!=""){var n=new Object;n.itemId=t.itemId;n.url=t.thumb;n.type="thumb";jsonData.imagesToDownload.push(n)}if(downloadedActuals.indexOf(t.itemId+"actual.png")==-1&&t.actual!=""){var n=new Object;n.itemId=t.itemId;n.url=t.actual;n.type="actual";jsonData.imagesToDownload.push(n)}});$.each(jsonData.techConf,function(e,t){if(downloadedThumbs.indexOf(t.itemId+"thumb.png")==-1&&t.thumb!=""){var n=new Object;n.itemId=t.itemId;n.url=t.thumb;n.type="thumb";jsonData.imagesToDownload.push(n)}if(downloadedActuals.indexOf(t.itemId+"actual.png")==-1&&t.actual!=""){var n=new Object;n.itemId=t.itemId;n.url=t.actual;n.type="actual";jsonData.imagesToDownload.push(n)}});$.each(jsonData.technologySessions,function(e,t){if(downloadedThumbs.indexOf(t.itemId+"thumb.png")==-1&&t.thumb!=""){var n=new Object;n.itemId=t.itemId;n.url=t.thumb;n.type="thumb";jsonData.imagesToDownload.push(n)}if(downloadedActuals.indexOf(t.itemId+"actual.png")==-1&&t.actual!=""){var n=new Object;n.itemId=t.itemId;n.url=t.actual;n.type="actual";jsonData.imagesToDownload.push(n)}});$.each(jsonData.contributor,function(e,t){if(downloadedActuals.indexOf(t.itemId+"actual.png")==-1&&t.actual!=""){var n=new Object;n.itemId=t.itemId;n.url=t.actual;n.type="actual";jsonData.imagesToDownload.push(n)}});$.each(jsonData.events,function(e,t){if(downloadedThumbs.indexOf(t.itemId+"thumb.png")==-1&&t.thumb!=""){var n=new Object;n.itemId=t.itemId;n.url=t.thumb;n.type="thumb";jsonData.imagesToDownload.push(n)}if(downloadedActuals.indexOf(t.itemId+"actual.png")==-1&&t.actual!=""){var n=new Object;n.itemId=t.itemId;n.url=t.actual;n.type="actual";jsonData.imagesToDownload.push(n)}});$.each(jsonData.spotLight,function(e,t){if(downloadedThumbs.indexOf(t.itemId+"thumb.png")==-1&&t.thumb!=""){var n=new Object;n.itemId=t.itemId;n.url=t.thumb;n.type="thumb";jsonData.imagesToDownload.push(n)}if(downloadedActuals.indexOf(t.itemId+"actual.png")==-1&&t.actual!=""){var n=new Object;n.itemId=t.itemId;n.url=t.actual;n.type="actual";jsonData.imagesToDownload.push(n)}});if(jsonData.imagesToDownload.length!=0&&jsonData.imagesToDownload.length>0){downloadAllRequiredImages()}}function downloadAllRequiredImages(){downloadAllRequiredImagesLength=jsonData.imagesToDownload.length;var e=jsonData.imagesToDownload[downloadAllRequiredImagesCounter].itemId;var t=jsonData.imagesToDownload[downloadAllRequiredImagesCounter].url;var n=jsonData.imagesToDownload[downloadAllRequiredImagesCounter].type;if(n=="thumb"){downloadThumbImages(e,n,t,"Interviews")}else if(n=="actual"){downloadThumbImages(e,n,t,"Interviews")}}function downloadThumbImages(e,t,n,r){var i="";i=n;var s="";s=t;var o="";o="false";var u="";u="";var a=new FileTransfer;if(isOnline){u=globalPathNew+"images/"+e+t+".png";a.download(i,u,function(e){refreshFileSystem();downloadAllRequiredImagesCounter=downloadAllRequiredImagesCounter+1;if(downloadAllRequiredImagesCounter<downloadAllRequiredImagesLength){downloadAllRequiredImages()}},function(e){downloadAllRequiredImagesCounter=downloadAllRequiredImagesCounter+1;if(downloadAllRequiredImagesCounter<downloadAllRequiredImagesLength){downloadAllRequiredImages()}})}}var noSubscribe="false";var subscribeCatList="";var jsonData=new Object;var mainCategoryList=new Array;var audioVideoItemId=new Array;var eventItemId=new Array;var documentItemId=new Array;var subscribeCategoryId=new Array;var isSubscribeDocument="no";var isSubscribePodcast="no";var isSubscribeEvent="no";var rssUrl="https://techtime.stage2.accenture.com/techno-areas/1+2/audio-video-listing-view";var documentRss="https://techtime.stage2.accenture.com/techno-areas/1+2/documents-listing-view";var eventsRss="https://techtime.stage2.accenture.com/techno-areas/1+2/events-listing-view";var selectedCategoryId="";var selectedCategoryName="";var resFinal=new Array;var currentTechWatchItemId="";var currentTechWatchItemIndex="";var techWatchTraverseIndex="";var showCaseArticleObject=new Object;var downloadAllRequiredImagesCounter=0;var downloadAllRequiredImagesLength