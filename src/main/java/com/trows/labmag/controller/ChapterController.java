package com.trows.labmag.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.trows.labmag.service.ChapterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by Throws_exception on 2016/5/6.
 */
@Controller
public class ChapterController {

    @Autowired
    ChapterService chapterService;

    @RequestMapping("/getChaptersByCourseId.do")
    public void getChaptersById(@RequestParam("course_id") int course_id,
                                HttpServletResponse response){
        try {
            response.getWriter().print(JSON.toJSONString(
                    chapterService.getListByKey(course_id,"getChaptersByCourseId"),
                    SerializerFeature.WriteNullStringAsEmpty,
                    SerializerFeature.WriteNullNumberAsZero,
                    SerializerFeature.WriteMapNullValue));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    //已废弃
    @RequestMapping("/delChapterById.do")
    public void delChapterById(@RequestParam("chapter_id") int chapter_id,HttpServletResponse response){
        try {
            response.getWriter().print(chapterService.deleteByKey(chapter_id,"delChapterById"));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }



}
