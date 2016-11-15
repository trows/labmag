package com.trows.labmag.controller;

import com.alibaba.fastjson.JSON;
import com.trows.labmag.entity.Course_class;
import com.trows.labmag.entity.Teacher_relation;
import com.trows.labmag.service.Course_classService;
import com.trows.labmag.service.Teacher_relationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by Throws_exception on 2016/5/10.
 */
@Controller
public class Course_classController {
    @Autowired
    private Course_classService course_classService;
    @Autowired
    private Teacher_relationService teacher_relationService;

    private void print(HttpServletResponse response,String value){
        try {
            response.getWriter().print(value);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void print(HttpServletResponse response,int value){
        try {
            response.getWriter().print(value);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @RequestMapping("/bindingClass.do")
    public void bindingClass(@RequestParam("data") String data, HttpServletResponse response){
        print(response, course_classService.insert(JSON.parseObject(data, Course_class.class),"bindingClass"));
    }

    @RequestMapping("/getBindClass.do")
    public void getBindClass(@RequestParam("tea_course_id") int tea_course_id,HttpServletResponse response){
        print(response,JSON.toJSONString(course_classService.getListByKey(tea_course_id,"getBindClass")));
    }

    @RequestMapping("/unwarp.do")
    public void unwarp(@RequestParam("tea_course_id") int id,@RequestParam("class_name") String class_name,HttpServletResponse response){
        Course_class course_class = new Course_class();
        course_class.setTea_course_id(id);
        course_class.setClass_name(class_name);
        print(response,course_classService.deleteByValue(course_class,"unwarp"));
    }

    @RequestMapping("/{course_id}/blank.htm")
    public String blank(@PathVariable("course_id") String course_idStr, HttpServletRequest request){
        int course_id;
        try {
            course_id = Integer.parseInt(course_idStr);
        }catch (Exception e){
            return "redirect:/index/error.html";
        }

        String account_id = (String) request.getSession(true).getAttribute("account_id");

        Teacher_relation teacher_relation = new Teacher_relation();
        teacher_relation.setAccount_id(account_id);
        teacher_relation.setCourse_id(course_id);

        teacher_relation = teacher_relationService.getEntityByValue(teacher_relation,"getMyClass");
        if(teacher_relation == null) return "redirect:/index/error.html";
        request.setAttribute("course_class",course_classService.getListByKey(teacher_relation.getTea_course_id(),"getBindClass"));
        request.setAttribute("course_id",course_id);
        request.setAttribute("course_name",teacher_relation.getCourse_name());

        return "/manage/blank";
    }
}
