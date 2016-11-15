package com.trows.labmag.controller;

import com.alibaba.fastjson.JSON;
import com.trows.labmag.entity.Teacher_relation;
import com.trows.labmag.service.ChapterService;
import com.trows.labmag.service.Teacher_relationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;

/**
 * Created by Throws_exception on 2016/5/8.
 */
@Controller
public class teacher_relationController {
    @Autowired
    Teacher_relationService teacher_relationService;
    @Autowired
    ChapterService chapterService;

    private void print(HttpServletResponse response, String value) {
        try {
            response.getWriter().print(value);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @RequestMapping("/curricula_variable.do")
    public void curricula_variable(@RequestParam("course_id") int course_id, @RequestParam("course_name") String course_name, HttpServletResponse response, HttpServletRequest request) {
        Teacher_relation teacher_relation = new Teacher_relation();
        teacher_relation.setCourse_id(course_id);
        teacher_relation.setCourse_name(course_name);
        HttpSession session = request.getSession(true);
        teacher_relation.setAccount_id((String) session.getAttribute("account_id"));
        teacher_relation.setUser_name((String) session.getAttribute("user_name"));
        String feedBack = "error";
        if (teacher_relationService.insert(teacher_relation, "curricula_variable") == 1) {
            String chaptersList = JSON.toJSONString(chapterService.getListByKey(course_id, "getChaptersPartInfoByCourseId"));
            feedBack = JSON.toJSONString(teacher_relation) + "##" + chaptersList;
        }
        this.print(response, feedBack);
    }

    @RequestMapping("/getTeacher_relation.do")
    public void getTeacher_relation(HttpServletResponse response, HttpServletRequest request) {
        HttpSession session = request.getSession(true);
        String account_id = (String) session.getAttribute("account_id");
        if (account_id != null) {
            List<Teacher_relation> list = teacher_relationService.getListByStr(account_id, "getTeacherRelationByAccountId");
            if (list != null) {
                for (Teacher_relation teacher_relation : list) {
                    teacher_relation.setCreate_time(JSON.toJSONString(chapterService.getListByKey(teacher_relation.getCourse_id(), "getChaptersPartInfoByCourseId")));
                }
                this.print(response, JSON.toJSONString(list));
            }
        } else {
            this.print(response, "error");
        }
    }

    @RequestMapping("/dropCourse.do")
    public void dropCourse(@RequestParam("id") int id,HttpServletResponse response){
        this.print(response, String.valueOf(teacher_relationService.deleteByKey(id,"dropCourse")));
    }

}
