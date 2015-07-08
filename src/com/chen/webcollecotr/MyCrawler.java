package com.chen.webcollecotr;

import java.util.regex.Pattern;

import org.jsoup.nodes.Document;

import cn.edu.hfut.dmic.webcollector.crawler.BreadthCrawler;
import cn.edu.hfut.dmic.webcollector.model.Links;
import cn.edu.hfut.dmic.webcollector.model.Page;

public class MyCrawler extends BreadthCrawler {

	
	public MyCrawler(String crawlPath, boolean autoParse) {
		super(crawlPath, autoParse);

		this.addSeed("http://www.iqiyi.com/dianying/");
        this.addRegex("http://www.iqiyi.com/dianying/.*");
        this.addRegex("-http://www.iqiyi.com/dianying/.+/.*");
//        this.addRegex("-.*\\.(jpg|png|gif).*");
//        this.addRegex("-.*#.*");
	}

	@Override
	public void visit(Page page, Links nextLinks) {
        String url = page.getUrl();

        if (Pattern.matches("http://www.iqiyi.com/dianying/.+vfrm*", url)) {
            Document doc = page.getDoc();

            String title = doc.select("a[site-piclist_pic_link]").first().text();
//            String content = doc.select("div[class=body yom-art-content clearfix]").first().text();

            System.out.println("URL:\n" + url);
            System.out.println("title:\n" + title);
//            System.out.println("content:\n" + content);

        }
    }

    public static void main(String[] args) throws Exception {
        MyCrawler crawler = new MyCrawler("crawl", true);
        crawler.setThreads(50);
        crawler.setTopN(100);
        crawler.start(3);
    }
	
	
	
	
	

}