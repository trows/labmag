package com.trows.labmag.entity;

/**
 * Created by Throws_exception on 2016/4/22.
 */
public class Student_relation {

    private int course_id;
    private String account_id;
    private int hour;
    private String course_name;
    private int chapter_id;
    private int exam_state;
    private int report_state;
    private float grade;
    private int flag;
    private String create_time;

    public int getCourse_id() {
        return course_id;
    }

    public void setCourse_id(int course_id) {
        this.course_id = course_id;
    }

    public String getAccount_id() {
        return account_id;
    }

    public void setAccount_id(String account_id) {
        this.account_id = account_id;
    }

    public int getHour() {
        return hour;
    }

    public void setHour(int hour) {
        this.hour = hour;
    }

    public String getCourse_name() {
        return course_name;
    }

    public void setCourse_name(String course_name) {
        this.course_name = course_name;
    }

    public int getChapter_id() {
        return chapter_id;
    }

    public void setChapter_id(int chapter_id) {
        this.chapter_id = chapter_id;
    }

    public int getExam_state() {
        return exam_state;
    }

    public void setExam_state(int exam_state) {
        this.exam_state = exam_state;
    }

    public int getReport_state() {
        return report_state;
    }

    public void setReport_state(int report_state) {
        this.report_state = report_state;
    }

    public float getGrade() {
        return grade;
    }

    public void setGrade(float grade) {
        this.grade = grade;
    }

    public int getFlag() {
        return flag;
    }

    public void setFlag(int flag) {
        this.flag = flag;
    }

    public String getCreate_time() {
        return create_time;
    }

    public void setCreate_time(String create_time) {
        this.create_time = create_time;
    }

    public void reset(){
        chapter_id = 0;
        account_id = "";
    }
}
