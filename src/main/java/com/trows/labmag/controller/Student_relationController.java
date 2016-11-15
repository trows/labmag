package com.trows.labmag.controller;

import com.alibaba.fastjson.JSON;
import com.trows.labmag.entity.Account;
import com.trows.labmag.entity.Student_relation;
import com.trows.labmag.service.AccountService;
import com.trows.labmag.service.Student_relationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

/**
 * Created by Throws_exception on 2016/5/15.
 */
@Controller
public class Student_relationController {

    @Autowired
    private Student_relationService student_relationService;
    @Autowired
    private AccountService accountService;

    @RequestMapping("/setChapterHour.do")
    public void setChapterHour(HttpServletRequest request, HttpServletResponse response){
        int course_id = Integer.parseInt(request.getParameter("course_id"));
        int chapter_id = Integer.parseInt(request.getParameter("chapter_id"));
        String course_name = request.getParameter("course_name");
        int hour = Integer.parseInt(request.getParameter("hour"));

        Student_relation student_relation = new Student_relation();
        student_relation.setCourse_id(course_id);
        student_relation.setChapter_id(chapter_id);
        student_relation.setCourse_name(course_name);
        student_relation.setHour(hour);
        student_relation.setAccount_id((String) request.getSession(true).getAttribute("account_id"));

        try {
            response.getWriter().print(student_relationService.insert(student_relation,"setChapterHour"));
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    @RequestMapping("/getHourStudent.do")
    public void getExamHourStudent(HttpServletRequest request,HttpServletResponse response){
        String class_name = request.getParameter("class_name");
        int course_id = Integer.parseInt(request.getParameter("course_id"));
        int hour = Integer.parseInt(request.getParameter("hour"));
        String type = request.getParameter("type");

        List<Account> list = accountService.getListByKey(class_name,"getPartStudentInfoByClass");
        Student_relation student_relation = new Student_relation();
        student_relation.setCourse_id(course_id);
        student_relation.setHour(hour);

        Student_relation temp;
        for (Account stu:list){
            student_relation.setAccount_id(stu.getAccount_id());
            temp = student_relationService.getEntityByValue(student_relation,"getStuHourInfo");
            if (temp!=null){
                stu.setLevel(temp.getChapter_id());//level替换为章节id
                if(type.equals("exam")){
                    stu.setSex(temp.getExam_state());
                }else {
                    stu.setSex(temp.getReport_state());
                }//sex替换为测试状态
            }else {
                stu.setLevel(0);         //level替换为章节id
                stu.setSex(0);
            }
        }
        try {
            response.getWriter().print(JSON.toJSONString(list));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
