package com.trows.labmag.entity;

/**
 * Created by Throws_exception on 2016/4/22.
 */
public class Papers {

    private int chapter_id;
    private String account_id;
    private String question_list;
    private float grade;
    private String adjust;
    private String create_time;
    private int flag;

    public int getChapter_id() {
        return chapter_id;
    }

    public void setChapter_id(int chapter_id) {
        this.chapter_id = chapter_id;
    }

    public String getAccount_id() {
        return account_id;
    }

    public void setAccount_id(String account_id) {
        this.account_id = account_id;
    }

    public String getQuestion_list() {
        return question_list;
    }

    public void setQuestion_list(String question_list) {
        this.question_list = question_list;
    }

    public float getGrade() {
        return grade;
    }

    public void setGrade(float grade) {
        this.grade = grade;
    }

    public String getAdjust() {
        return adjust;
    }

    public void setAdjust(String adjust) {
        this.adjust = adjust;
    }

    public String getCreate_time() {
        return create_time;
    }

    public void setCreate_time(String create_time) {
        this.create_time = create_time;
    }

    public int getFlag() {
        return flag;
    }

    public void setFlag(int flag) {
        this.flag = flag;
    }
}
