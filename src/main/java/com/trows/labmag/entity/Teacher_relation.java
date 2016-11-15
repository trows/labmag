package com.trows.labmag.entity;

/**
 * Created by Throws_exception on 2016/4/22.
 */
public class Teacher_relation {

    private int tea_course_id;
    private String account_id;
    private int course_id;
    private String user_name;
    private String course_name;
    private String create_time;

    public int getTea_course_id() {
        return tea_course_id;
    }

    public void setTea_course_id(int tea_course_id) {
        this.tea_course_id = tea_course_id;
    }

    public String getAccount_id() {
        return account_id;
    }

    public void setAccount_id(String account_id) {
        this.account_id = account_id;
    }

    public int getCourse_id() {
        return course_id;
    }

    public void setCourse_id(int course_id) {
        this.course_id = course_id;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public String getCourse_name() {
        return course_name;
    }

    public void setCourse_name(String course_name) {
        this.course_name = course_name;
    }

    public String getCreate_time() {
        return create_time;
    }

    public void setCreate_time(String create_time) {
        this.create_time = create_time;
    }
}
