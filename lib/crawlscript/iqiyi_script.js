/////////////////////////////////////////////////////
//
// iqiyi.com
// http://list.iqiyi.com/www/1/-------------1-1-1-iqiyi--.html
// http://list.iqiyi.com/www/1/-------------1-2-1-iqiyi--.html
//
///////////////////////////////////////////////////

showAllMovies = function(startYear, endYear, videoFile, releationFile) {
	write(videoFile, "uid,title,url,imgUrl,website,type\n");
    write(releationFile, "uid,year,label\n");
    
	while(startYear <= endYear) {
		var contiueFlag = true;
		var page = 1;
		
		while(contiueFlag) {
			doc = $("http://list.iqiyi.com/www/1/-----------" + startYear + "--1-" + page++ + "-1-iqiyi--.html");
			
			result = doc.select("div.site-piclist_pic > a");
			result.each("a", function(element) {
				var id = uid();
				var title = element.attr("title").replace(",", "，");
				var movieURL = element.attr("href");
				var imgURL = element.select("img").attr("src");
				
				detail = $(movieURL);
				detail.select("#datainfo-taglist").each("a", function(e) {
					var relStr = id + "," + startYear + "," + e.attr("title") + "\n";
					write(releationFile, relStr);
				});
				
				var str = id + "," + title + "," +movieURL + "," + imgURL + ",iqiyi,movie\n";
				print(str);
				write(videoFile, str);
			});
			
			if (doc.select("div.mod-page > a[data-key=" + page + "]") == "") {
				contiueFlag = false;
			}
		}
		startYear++;
	}
}

showAllMovies(2005, 2015, "./iqiyi_result.csv", "./iqiyi_relation.csv");

