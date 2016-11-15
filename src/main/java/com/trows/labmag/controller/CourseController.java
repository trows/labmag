package com.trows.labmag.controller;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.trows.labmag.common.component.comInterface.CreateImage;
import com.trows.labmag.entity.*;
import com.trows.labmag.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Throws_exception on 2016/5/2.
 */
@Controller
public class CourseController {

    @Autowired
    private Teacher_relationService teacher_relationService;
    @Autowired
    private Student_relationService student_relationService;
    @Autowired
    private Course_classService course_classService;

    @Autowired
    private CourseService courseService;

    @Autowired
    private ChapterService chapterService;
    @Autowired
    private CreateImage createImage;

    private void printError(HttpServletResponse response) {
        try {
            response.getWriter().print("error");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void printSuccess(HttpServletResponse response) {
        try {
            response.getWriter().print("success");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    //
    @RequestMapping("/myCourse.htm")
    public String myCourse(HttpServletRequest request) {
        HttpSession session = request.getSession(true);
        if (2==session.getAttribute("level")) {
            request.setAttribute("myCourseList",
                    teacher_relationService.getListByStr((String)
                            session.getAttribute("account_id"),
                            "getTeacherRelationByAccountId"));
        } else {
            List<Course> courseList = new ArrayList<Course>();
            List<Course_class> list = course_classService.getListByStr((String)
                    session.getAttribute("class_name"),
                    "getTea_course_idByClassName");
            for (Course_class course_class:list){
                Teacher_relation teacher_relation= teacher_relationService.getEntityByKey
                        (course_class.getTea_course_id(),"getInfoById");
                Course course = courseService.getEntityByKey(teacher_relation.getCourse_id(),
                        "getCourseById");
                course.setCreate_time(teacher_relation.getUser_name());
                courseList.add(course);
            }
            request.setAttribute("courseList",courseList);
        }
        return "./index/myCourse";
    }

    @RequestMapping("/createCourse.do")
    public void createCourse(@RequestParam("courseInfo") String courseInfo, @RequestParam("chaptersInfo") String chaptersInfo, HttpServletResponse response) {
        if (courseInfo == null || chaptersInfo == null) {
            this.printError(response);
        } else {
            Course course = JSON.parseObject(courseInfo, Course.class);
            List<Chapter> chapterList = JSONArray.parseArray(chaptersInfo, Chapter.class);
            int result = courseService.insert(course, "createCourse");
            int chaptersResult = 0;
            if (result == 0) {    //判断课程是否添加成功
                this.printError(response);
            } else {
                //课程添加成功后开始添加此课程的章节信息
                for (Chapter chapter : chapterList) {
                    chapter.setCourse_id(course.getCourse_id());
                    chaptersResult += chapterService.insert(chapter, "createChapter");
                }
                if (chaptersResult != chapterList.size()) { //章节信息添加出错 回滚
                    courseService.deleteByKey(course.getCourse_id(), "delCourseById");
                    this.printError(response);
                } else {
                    this.printSuccess(response);
                    createImage.create(course.getCourse_id(),course.getCourse_name());
                }
            }
        }
    }

    @RequestMapping("/getAllCourseInfo.do")
    public void getAllCourseInfo(HttpServletResponse response) {
        try {
            response.getWriter().print(JSON.toJSONString(courseService.getListByKey(0, "getAllCourseInfo"),
                    SerializerFeature.WriteNullStringAsEmpty, SerializerFeature.WriteNullNumberAsZero,
                    SerializerFeature.WriteMapNullValue));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @RequestMapping("/getCourseByName.do")
    public void getCourseByName(@RequestParam("data") String course_name, HttpServletResponse response) {
        try {
            response.getWriter().print(JSON.toJSONString(courseService.getListByStr(course_name, "getCourseByName"),
                    SerializerFeature.WriteNullStringAsEmpty, SerializerFeature.WriteNullNumberAsZero,
                    SerializerFeature.WriteMapNullValue));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @RequestMapping("/getCourseById.do")
    public void getCourseById(@RequestParam("data") int course_id, HttpServletResponse response) {
        try {
            response.getWriter().print(JSON.toJSONString(courseService.getListByKey(course_id, "getCourseById"),
                    SerializerFeature.WriteNullStringAsEmpty, SerializerFeature.WriteNullNumberAsZero,
                    SerializerFeature.WriteMapNullValue));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @RequestMapping("/alertCourseNum.do")
    public void alertCourseNum(@RequestParam("course_id") int course_id, @RequestParam("course_num") int course_num, HttpServletResponse response) {
        Course course = new Course();
        course.setCourse_id(course_id);
        course.setCourse_num(course_num);
        System.out.println(course_id);
        System.out.println(course_num);

        try {
            response.getWriter().print(courseService.update(course, "alertCourseNum"));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @RequestMapping("/alertCourseInfo.do")
    public void alertCourseInfo(HttpServletRequest request, HttpServletResponse response) {
        String courseStr = request.getParameter("course");
        String delData = request.getParameter("delData");
        String chaptersInfo = request.getParameter("chapterInfo");

        System.out.println(chaptersInfo);

        Course course = JSON.parseObject(courseStr, Course.class);
        courseService.update(course, "updateCourse");
        createImage.create(course.getCourse_id(),course.getCourse_name());
        if (delData != null && delData.length() > 1) {
            String [] arry = delData.split(",");

            for(String id : arry){
                chapterService.deleteByKey(Integer.parseInt(id),"delChapterById");
            }

        }
        List<Chapter> chapterList = JSONArray.parseArray(chaptersInfo, Chapter.class);
        for (Chapter chapter : chapterList) {
            if (chapter.getChapter_id() == 0){
                chapter.setCourse_id(course.getCourse_id());
                chapterService.insert(chapter, "createChapter");
            }else {
                chapterService.update(chapter, "updateChapter");
            }

        }


    }

    @RequestMapping("/delCourseById.do")
    public void delCourseById(@RequestParam("course_id") int course_id,HttpServletResponse response){
        try {
            response.getWriter().print(courseService.deleteByKey(course_id,"delCourseById"));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @RequestMapping("/getCourseDetails.htm")
    public String getCourseDetails(HttpServletRequest request){
        String course_idStr = request.getParameter("course_id");
        String teacher_name = request.getParameter("tn");
        if (course_idStr==null || teacher_name ==null){
            return "redirect:./index/error.html";
        }
        int course_id;
        try {
             course_id = Integer.parseInt(course_idStr);
        }catch (Exception e){
            return "redirect:./index/error.html";
        }
        Course course = courseService.getEntityByKey(course_id,"getCourseById");
        List<Chapter> chapterList = chapterService.getListByKey(course_id,"getChaptersByCourseId");
        Student_relation student_relation = new Student_relation();
        String account_id = (String) request.getSession(true).getAttribute("account_id");
        for (Chapter chapter:chapterList){
            student_relation.setChapter_id(chapter.getChapter_id());
            student_relation.setAccount_id(account_id);
            Integer hour = student_relationService.getIntByValue(student_relation,"getHour");//此查询会得到当前章节的课时 如果无返回null
           chapter.setCreate_time(hour==null?null:String.valueOf(hour));
        }
        request.setAttribute("course",course);
        request.setAttribute("chapterList",chapterList);
        request.setAttribute("teacher_name",teacher_name);
        return "./index/courseDetails";
    }

}
