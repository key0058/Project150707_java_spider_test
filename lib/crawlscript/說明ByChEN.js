打開crawlscript.bat
複製下面的代碼，然後回車運行即可。
結果保存在result.sql文件。




createSQL = function(element) {
	
	title = element.select(".p-link > a").attr("title");
	movieURL = element.select(".p-link > a").attr("href");
	imgURL = element.select("img").attr("src");
	str = title + "|" +movieURL + "|" + imgURL + "\n";
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

showAllMovies(30, "./result.csv");




