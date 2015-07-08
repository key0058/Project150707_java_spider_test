package com.chen.webcollecotr;

import java.util.regex.Pattern;

import org.jsoup.nodes.Document;

import cn.edu.hfut.dmic.webcollector.crawler.BreadthCrawler;
import cn.edu.hfut.dmic.webcollector.model.Links;
import cn.edu.hfut.dmic.webcollector.model.Page;

public class MyCrawler extends BreadthCrawler {

	
	public MyCrawler(String crawlPath, boolean autoParse) {
		super(crawlPath, autoParse);

		this.addSeed("http://news.yahoo.com/");
        this.addRegex("http://news.yahoo.com/.*");
        this.addRegex("-http://news.yahoo.com/.+/.*");
//        this.addRegex("-.*\\.(jpg|png|gif).*");
        this.addRegex("-.*#.*");
	}

	@Override
	public void visit(Page page, Links nextLinks) {
        String url = page.getUrl();
        /*if page is news page*/
        if (Pattern.matches("http://news.yahoo.com/.+html", url)) {
            /*we use jsoup to parse page*/
            Document doc = page.getDoc();

            /*extract title and content of news by css selector*/
            String title = doc.select("h1[class=headline]").first().text();
            String content = doc.select("div[class=body yom-art-content clearfix]").first().text();

//            System.out.println("Page:\n" + doc.getAllElements().html());
            System.out.println("URL:\n" + url);
            System.out.println("title:\n" + title);
            System.out.println("content:\n" + content);

            /*If you want to add urls to crawl,add them to nextLink*/
            /*WebCollector automatically filters links that have been fetched before*/
            /*If autoParse is true and the link you add to nextLinks does not match the regex rules,the link will also been filtered.*/
            // nextLinks.add("http://xxxxxx.com");
        }
    }

    public static void main(String[] args) throws Exception {
        MyCrawler crawler = new MyCrawler("crawl", true);
        crawler.setThreads(50);
        crawler.setTopN(100);
        //crawler.setResumable(true);
            /*start crawl with depth of 4*/
        crawler.start(2);
    }
	
	
	
	
	

}