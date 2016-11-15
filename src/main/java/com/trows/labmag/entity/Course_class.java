package com.trows.labmag.entity;

/**
 * Created by Throws_exception on 2016/5/10.
 */
public class Course_class {

    private String class_name;
    private int tea_course_id;
    private String start_time;
    private String end_time;
    private String rebuild;
    private String create_time;

    public String getClass_name() {
        return class_name;
    }

    public void setClass_name(String class_name) {
        this.class_name = class_name;
    }

    public int getTea_course_id() {
        return tea_course_id;
    }

    public void setTea_course_id(int tea_course_id) {
        this.tea_course_id = tea_course_id;
    }

    public String getStart_time() {
        return start_time;
    }

    public void setStart_time(String start_time) {
        this.start_time = start_time;
    }

    public String getEnd_time() {
        return end_time;
    }

    public void setEnd_time(String end_time) {
        this.end_time = end_time;
    }

    public String getRebuild() {
        return rebuild;
    }

    public void setRebuild(String rebuild) {
        this.rebuild = rebuild;
    }

    public String getCreate_time() {
        return create_time;
    }

    public void setCreate_time(String create_time) {
        this.create_time = create_time;
    }
}
