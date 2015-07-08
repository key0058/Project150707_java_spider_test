/////////////////////////////////////////////////////
//
// iqiyi.com
// http://list.iqiyi.com/www/1/-------------1-1-1-iqiyi--.html
// http://list.iqiyi.com/www/1/-------------1-2-1-iqiyi--.html
//
///////////////////////////////////////////////////
createSQL = function(element) {
	
	title = element.attr("title");
	movieURL = element.attr("href");
	imgURL = element.select("img").attr("src");
	str = "insert into xxxxx (A, B, C, D) values ('iqiyi', '" + title + "', '" + movieURL + "', '" + imgURL + "');\n";
	print(str);
	write(filePath, str);
}


showAllMovies = function(max, path) {
	filePath = path;
	for (var i=1; i<=max; i++) {
		doc = $("http://list.iqiyi.com/www/1/-------------1-" + i + "-1-iqiyi--.html");
		result = doc.select("div.site-piclist_pic > a");
		result.each("a", createSQL);
	}
}

showAllMovies(30, "D:\\result.sql");



/////////////////////////////////////////////////////
// 
// youku.com
// http://www.youku.com/v_olist/c_96_g__a__sg__mt__lg__q__s_1_r_0_u_0_pt_0_av_0_ag_0_sg__pr__h__d_1_p_2.html
// http://www.youku.com/v_olist/c_96_g__a__sg__mt__lg__q__s_1_r_0_u_0_pt_0_av_0_ag_0_sg__pr__h__d_1_p_3.html
//
///////////////////////////////////////////////////
createSQL = function(element) {
	
	title = element.select(".p-link > a").attr("title");
	movieURL = element.select(".p-link > a").attr("href");
	imgURL = element.select("img").attr("src");
	str = "insert into xxxxx (A, B, C, D) values ('youku', '" + title + "', '" + movieURL + "', '" + imgURL + "');\n";
	print(str);
	write(filePath, str);
}


showAllMovies = function(max, path) {
	filePath = path;
	for (var i=1; i<=max; i++) {
		doc = $("http://www.youku.com/v_olist/c_96_g__a__sg__mt__lg__q__s_1_r_0_u_0_pt_0_av_0_ag_0_sg__pr__h__d_1_p_" + i + ".html");
		result = doc.select("div.yk-col3");
		result.each("div.yk-col3", createSQL);
	}
}

showAllMovies(30, "./result.sql");




