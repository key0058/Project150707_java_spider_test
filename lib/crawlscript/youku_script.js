/////////////////////////////////////////////////////
// 
// youku.com
// http://www.youku.com/v_olist/c_96_g__a__sg__mt__lg__q__s_1_r_0_u_0_pt_0_av_0_ag_0_sg__pr__h__d_1_p_2.html
// http://www.youku.com/v_olist/c_96_g__a__sg__mt__lg__q__s_1_r_0_u_0_pt_0_av_0_ag_0_sg__pr__h__d_1_p_3.html
//
// http://www.youku.com/v_olist/c_96_g__a__sg__mt__lg__q__s_1_r_2015_u_0_pt_0_av_0_ag_0_sg__pr__h__d_1_p_1.html
// http://www.youku.com/v_olist/c_96_g__a__sg__mt__lg__q__s_1_r_2015_u_0_pt_0_av_0_ag_0_sg__pr__h__d_1_p_2.html
///////////////////////////////////////////////////

showAllMovies = function(startYear, endYear, videoFile, releationFile) {
	write(videoFile, "uid,title,url,imgUrl,website,type\n");
    write(releationFile, "uid,year,label\n");
    
	while(startYear <= endYear) {
		var contiueFlag = true;
		var page = 1;
		
		while(contiueFlag) {
			doc = $("http://www.youku.com/v_olist/c_96_g__a__sg__mt__lg__q__s_1_r_" + startYear + "_u_0_pt_0_av_0_ag_0_sg__pr__h__d_1_p_" + page++ + ".html");
			
			result = doc.select("div.yk-col3");
			result.each("div.yk-col3", function(element) {
				var id = uid();
				var title = element.select(".p-link > a").attr("title");
				var detailURL = element.select(".p-link > a").attr("href");
				var imgURL = element.select("img").attr("src");
				
				detail = $(detailURL);
				detail.select("a[charset=420-2-1]").each("a", function(e) {
					var temp = id + "," + startYear + "," + e.text() + "\n";
					write(releationFile, temp);
				});
				
				detail.select("a[charset=420-2-8]").each("a", function(e) {
					var temp = id + "," + startYear + "," + e.text() + "\n";
					write(releationFile, temp);
				});
				
				var movieURL = detail.select("a[charset=420-2-3]").attr("href");
				if (movieURL == "") {
					movieURL = detail.select("a[charset=412-2-1]").attr("href");
				}
				if (movieURL == "") {
					movieURL = detail.select("a[charset=420-2-2]").attr("href");
				}
				if (movieURL.indexOf("?") > 0) {
					movieURL = movieURL.substring(0, movieURL.indexOf("?"));
				}
				
				var str = id + "," + title + "," +movieURL + "," + imgURL + ",youku,movie\n";
				print(str);
				write(videoFile, str);
			});
			
			if (doc.select("div.yk-pager > ul > li > a[charset=124-4-1-" + page + "]") == "") {
				contiueFlag = false;
			}
		}
		startYear++;
	}
}

showAllMovies(2015, 2015, "./youku_result.csv", "./youku_relation.csv");


