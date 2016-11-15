package com.trows.labmag.entity;

/**
 * Created by Throws_exception on 2016/4/22.
 */
public class Question_bank {

    private int question_id;
    private int chapter_id;
    private int type;
    private String subject;
    private String options;
    private String answer;
    private String createTime;

    public int getQuestion_id() {
        return question_id;
    }

    public void setQuestion_id(int question_id) {
        this.question_id = question_id;
    }

    public int getChapter_id() {
        return chapter_id;
    }

    public void setChapter_id(int chapter_id) {
        this.chapter_id = chapter_id;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getOptions() {
        return options;
    }

    public void setOptions(String options) {
        this.options = options;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public void initQuestion_bank() {
        this.question_id = 0;
        this.chapter_id = 0;
        this.type = 0;
        this.subject = "";
        this.options = "";
        this.answer = "";
    }
}
