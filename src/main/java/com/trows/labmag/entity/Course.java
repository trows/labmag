package com.trows.labmag.entity;

/**
 * Created by Throws_exception on 2016/4/22.
 */
public class Course {

    private int course_id;
    private String course_name;
    private int course_num;
    private String course_desc;
    private String create_time;

    public int getCourse_id() {
        return course_id;
    }

    public void setCourse_id(int course_id) {
        this.course_id = course_id;
    }

    public String getCourse_name() {
        return course_name;
    }

    public void setCourse_name(String course_name) {
        this.course_name = course_name;
    }

    public int getCourse_num() {
        return course_num;
    }

    public void setCourse_num(int course_num) {
        this.course_num = course_num;
    }

    public String getCourse_desc() {
        return course_desc;
    }

    public void setCourse_desc(String course_desc) {
        this.course_desc = course_desc;
    }

    public String getCreate_time() {
        return create_time;
    }

    public void setCreate_time(String create_time) {
        this.create_time = create_time;
    }
}
