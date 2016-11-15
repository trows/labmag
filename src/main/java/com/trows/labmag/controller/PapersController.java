package com.trows.labmag.controller;

import com.alibaba.fastjson.JSON;
import com.trows.labmag.entity.*;
import com.trows.labmag.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * Created by Throws_exception on 2016/5/16.
 */
@Controller
public class PapersController {

    @Autowired
    private PapersService papersService;
    @Autowired
    private ReportService reportService;
    @Autowired
    private Question_bankService question_bankService;
    @Autowired
    private ChapterService chapterService;
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

    @RequestMapping("/getHourState.do")
    public void getHourState(@RequestParam("chapter_id") int chapter_id, HttpServletResponse response, HttpServletRequest request) {
        String account_id = (String) request.getSession(true).getAttribute("account_id");
        Papers papers = new Papers();
        Report report = new Report();
        papers.setAccount_id(account_id);
        papers.setChapter_id(chapter_id);
        report.setAccount_id(account_id);
        report.setChapter_id(chapter_id);
        papers = papersService.getEntityByValue(papers, "isContain");
        report = reportService.getEntityByValue(report, "isContain");
        int result = 100;

        if (papers == null && report == null) {
            result = 200;
        } else if (papers == null) {
            result = 202;
        } else if (report == null) {
            result = 201;
        }
        this.print(response, result);
    }


    @RequestMapping("/{chapterStr}/exam.htm")
    public String exam(@PathVariable String chapterStr, HttpServletRequest request) {
        String account_id = (String) request.getSession(true).getAttribute("account_id");
        int chapter_id;
        try {
             chapter_id = Integer.parseInt(chapterStr);
        }catch (IllegalArgumentException e){
            return "redirect:/index/error.html";
        }
        Papers papers = new Papers();
        papers.setAccount_id(account_id);
        papers.setChapter_id(chapter_id);
        Chapter chapter = chapterService.getEntityByKey(chapter_id, "getChapterById");
        if (chapter == null) return "redirect:/index/error.html";
        //当测试已经作答 返回查看界面
        if (papersService.getEntityByValue(papers, "isContain") != null){
            request.setAttribute("account",accountService.getEntityByKey(account_id,"getStudentsById"));
            request.setAttribute("chapter",chapterService.getEntityByKey(chapter_id,"getChapterById"));
            return "/index/showMyExam";
        }
        //随机生成一张试卷

        List<Question_bank> questionList = new ArrayList<Question_bank>();
        if (createOnePapers(chapter_id, chapter, questionList)) return "redirect:/index/error.html"; //如果题库不存在

        //试卷存放正在questionList中
        request.setAttribute("questionList",questionList);
        String [] scoreStr = chapter.getScore().split(";");
        int score = 0;
        for(String str :scoreStr){
            score+=Integer.parseInt(str);
        }
        chapter.setScore(String.valueOf(score));
        request.setAttribute("chapter",chapter);
        return "/index/exam";
    }

    private boolean createOnePapers(int chapter_id, Chapter chapter,
                                    List<Question_bank> questionList) {
        Random random = new Random();
        String[] amountArray = chapter.getAmount().split(";");
        Question_bank question_bank = new Question_bank();
        question_bank.setChapter_id(chapter_id);
        for (int j = 0; j < 3; j++) {
            question_bank.setType(j + 1);
            List<Question_bank> list =
                    question_bankService.getListByValue(question_bank, "getPaper");
            if(list == null || list.size() == 0) return true;
            int length = list.size();
            int[] array = new int[length];
            for (int i = 0; i < length; i++) array[i] = i;
            int index = Integer.parseInt(amountArray[j]);
            for (int i = 0; i < index; i++) {
                int target = random.nextInt(length - i);
                questionList.add(list.get(array[target]));
                array[target] = array[length - i - 1];
            }
        }
        return false;
    }

    @RequestMapping("/submitPaper.do")
    public void submitPaper(HttpServletRequest request,HttpServletResponse response){
        String chapterStr = request.getParameter("chapter_id");
        String question_list = request.getParameter("question_list");
        String answer = request.getParameter("answer");
        if(chapterStr==null || question_list==null || answer == null){
            this.print(response,"error");
        }else {
            question_list = question_list+"##"+answer;
            Papers papers = new Papers();
            int chapter_id = Integer.parseInt(chapterStr);
            papers.setChapter_id(chapter_id);
            papers.setQuestion_list(question_list);
            String account_id = (String) request.getSession(true).getAttribute("account_id");
            papers.setAccount_id(account_id);
            int submitResult = papersService.insert(papers,"submitPaper");
            if(submitResult == 1){
                Student_relation student_relation = new Student_relation();
                student_relation.setAccount_id(account_id);
                student_relation.setChapter_id(chapter_id);
                student_relation.setExam_state(1);
                this.print(response,student_relationService.update(student_relation,"setExamState"));
            }else {
                this.print(response,0);
            }
        }
    }

    @RequestMapping("/toExam.htm")
    public String toExam(HttpServletRequest request){
        String list = request.getParameter("list");
        String chapterList = request.getParameter("chapterList");
        String index = request.getParameter("index");

        if (list == null || chapterList == null || index == null)
            return "redirect:/index/error.html";

        request.setAttribute("list",list);
        request.setAttribute("chapterList",chapterList);
        request.setAttribute("index",index);

        return "/manage/examDetail";

    }

    @RequestMapping("/getExistPaper.do")
    public void getExistPaper(@RequestParam("chapter_id") int chapter_id,@RequestParam("account_id") String account_id,HttpServletResponse response){
        Papers papers = new Papers();
        papers.setAccount_id(account_id);
        papers.setChapter_id(chapter_id);
        papers = papersService.getEntityByValue(papers,"getExistPaper");
        String [] array = papers.getQuestion_list().split("##");
        String [] list = array[0].split(",");
        List<Question_bank> quList = new ArrayList<Question_bank>();
        for(String qus : list){
            quList.add(question_bankService.getEntityByKey(Integer.parseInt(qus),"getQuestion"));
        }

        this.print(response,JSON.toJSONString(quList)+"####"+array[1]+"####"+papers.getGrade()+"####"+papers.getAdjust());

    }

    @RequestMapping("/setGrade.do")
    public void setGrade(HttpServletRequest request,HttpServletResponse response){
        String account_id = request.getParameter("account_id");
        int chapter_id = Integer.parseInt(request.getParameter("chapter_id"));
        float grade = Float.parseFloat(request.getParameter("grade"));
        String adjust = request.getParameter("adjust");

        Papers papers = new Papers();
        papers.setAccount_id(account_id);
        papers.setChapter_id(chapter_id);
        papers.setGrade(grade);
        papers.setAdjust(adjust);
        this.print(response,papersService.update(papers,"setGrade"));

        Student_relation student_relation = new Student_relation();
        student_relation.setAccount_id(account_id);
        student_relation.setChapter_id(chapter_id);
        student_relation.setExam_state(2);
        student_relationService.update(student_relation,"setExamState");

    }
}
