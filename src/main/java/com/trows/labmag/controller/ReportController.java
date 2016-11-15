package com.trows.labmag.controller;

import com.alibaba.fastjson.JSON;
import com.trows.labmag.entity.Account;
import com.trows.labmag.entity.Chapter;
import com.trows.labmag.entity.Report;
import com.trows.labmag.entity.Student_relation;
import com.trows.labmag.service.AccountService;
import com.trows.labmag.service.ChapterService;
import com.trows.labmag.service.ReportService;
import com.trows.labmag.service.Student_relationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by Throws_exception on 2016/5/17.
 */
@Controller
public class ReportController {

    @Autowired
    private ChapterService chapterService;
    @Autowired
    private ReportService reportService;
    @Autowired
    private Student_relationService student_relationService;
    @Autowired
    private AccountService accountService;

    private void print(HttpServletResponse response, String value) {
        try {
            response.getWriter().print(value);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void print(HttpServletResponse response, int value) {
        try {
            response.getWriter().print(value);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @RequestMapping("/{chapterStr}/report.htm")
    public String exam(@PathVariable String chapterStr, HttpServletRequest request) {
        String account_id = (String) request.getSession(true).getAttribute("account_id");
        int chapter_id;
        try {
            chapter_id = Integer.parseInt(chapterStr);
        } catch (IllegalArgumentException e) {
            return "redirect:/index/error.html";
        }

        Chapter chapter = chapterService.getEntityByKey(chapter_id, "getChapterById");
        if (chapter == null) return "redirect:/index/error.html";

        Report report = new Report();
        report.setAccount_id(account_id);
        report.setChapter_id(chapter_id);
        report = reportService.getEntityByValue(report,"getExistReport");

        if (report!=null){
            request.setAttribute("account",accountService.getEntityByKey(account_id,"getStudentsById"));
            request.setAttribute("chapter",chapterService.getEntityByKey(chapter_id,"getChapterById"));
            request.setAttribute("report",report);
            return "/index/showMyReport";
        }

        request.setAttribute("chapter", chapter);
        return "/index/present";
    }

    @RequestMapping("/setReport.do")
    public void setReport(HttpServletRequest request, HttpServletResponse response) {

        String account_id = (String) request.getSession(true).getAttribute("account_id");
        String chapter_Str = request.getParameter("chapter_id");

        if (chapter_Str != null) {
            int chapter_id = Integer.parseInt(chapter_Str);
            Report report = new Report(
                    chapter_id, account_id, request.getParameter("study"),
                    request.getParameter("advice"), request.getParameter("data"),
                    request.getParameter("chart")
            );

            Student_relation student_relation = new Student_relation();
            student_relation.setAccount_id(account_id);
            student_relation.setChapter_id(chapter_id);
            student_relation.setReport_state(1);
            this.print(response, reportService.insert(report, "setReport") & student_relationService.update(student_relation, "setReportState"));
        } else {
            this.print(response, 0);
        }
    }

    @RequestMapping("/toReport.htm")
    public String toReport(HttpServletRequest request) {
        String list = request.getParameter("list");
        String chapterList = request.getParameter("chapterList");
        String index = request.getParameter("index");

        if (list == null || chapterList == null || index == null)
            return "redirect:/index/error.html";

        request.setAttribute("list", list);
        request.setAttribute("chapterList", chapterList);
        request.setAttribute("index", index);

        return "/manage/reportDetail";

    }

    @RequestMapping("/getExistReport.do")
    public void getExistReport(@RequestParam("chapter_id") int chapter_id, @RequestParam("account_id") String account_id, HttpServletResponse response){
        Report report = new Report();
        report.setChapter_id(chapter_id);
        report.setAccount_id(account_id);

        this.print(response,JSON.toJSONString(reportService.getEntityByValue(report,"getExistReport")));
    }

    @RequestMapping("/setReportGrade.do")
    public void setReportGrade(HttpServletRequest request,HttpServletResponse response){
        String account_id = request.getParameter("account_id");
        int chapter_id = Integer.parseInt(request.getParameter("chapter_id"));
        float grade = Float.parseFloat(request.getParameter("grade"));

        Report report = new Report();
        report.setAccount_id(account_id);
        report.setChapter_id(chapter_id);
        report.setGrade(grade);
        this.print(response,reportService.update(report,"setGrade"));

        Student_relation student_relation = new Student_relation();
        student_relation.setAccount_id(account_id);
        student_relation.setChapter_id(chapter_id);
        student_relation.setReport_state(2);
        student_relationService.update(student_relation,"setReportState");
    }
}
