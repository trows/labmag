package com.trows.labmag.common.PIO;

import com.trows.labmag.common.MyException.ExcelException;
import com.trows.labmag.common.component.comInterface.CreateImage;
import com.trows.labmag.entity.Account;
import com.trows.labmag.entity.Chapter;
import com.trows.labmag.entity.Course;
import com.trows.labmag.entity.Question_bank;
import com.trows.labmag.service.AccountService;
import com.trows.labmag.service.ChapterService;
import com.trows.labmag.service.CourseService;
import com.trows.labmag.service.Question_bankService;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Throws_exception on 2016/5/1.
 *
 */
@Component
public class MyExcel {

    @Autowired
    private AccountService accountService;
    @Autowired
    private CourseService courseService;
    @Autowired
    private ChapterService chapterService;
    @Autowired
    private Question_bankService question_bankService;
    @Autowired
    private CreateImage createImage;
    /**
     * @param excelFile
     * @param type
     * @return  返回字符型数组，[0]代表文档记录总数，[1]代表成功记录数据个数,[2]代表失败记录数据个数,[3]代表具体失败的行数/插入用户id
     * @throws IOException
     * @throws InvalidFormatException
     * @throws ExcelException
     */
    public String[] setInfo(InputStream excelFile, int type) throws IOException, InvalidFormatException, ExcelException {
        Workbook workbook = WorkbookFactory.create(excelFile);

        Sheet sheet = workbook.getSheetAt(0);
        int trLength = sheet.getLastRowNum()+1;     //获得表长度
        Row row = sheet.getRow(0);
        int tdLength = row.getLastCellNum();    //获得表宽度
        int success = 0;
        StringBuilder stringBuilder = new StringBuilder();
        switch (type) {
            case 1: //表格为学生信息表
                success = setStudent(sheet, trLength, tdLength, success, stringBuilder);
                break;
            case 2:     //表格为教师信息表
                success = setTeacher(sheet, trLength, tdLength, success, stringBuilder);
                break;
            case 3:     //课程信息表
                success = setCourse(sheet, trLength, success, stringBuilder);
                break;
            case 4:     //题库信息表
                success = setQuestion(sheet, trLength, tdLength, success, stringBuilder);
                break;
            default:
                throw new ExcelException("wrong excel");
        }
        return new String[]{String.valueOf(trLength - 1), String.valueOf(success), String.valueOf(trLength - 1 - success), stringBuilder.toString()};
    }

    private int setQuestion(Sheet sheet, int trLength, int tdLength, int success, StringBuilder stringBuilder) throws ExcelException {
        Row row;
        Cell cell;
        int result;Question_bank question_bank = new Question_bank();
        for (int i = 1; i < trLength; i++) {
            row = sheet.getRow(i);

            for (int j = 0; j < tdLength; j++) {
                cell = row.getCell(j);
                if (cell != null) {
                    cell.setCellType(Cell.CELL_TYPE_STRING);
                    switch (j) {
                        case 0://设定章节编号
                            question_bank.setChapter_id(Integer.parseInt(cell.getStringCellValue()));
                            break;
                        case 1:
                            question_bank.setType(Integer.parseInt(cell.getStringCellValue()));
                            break;
                        case 2:
                            question_bank.setSubject(cell.getStringCellValue());
                            break;
                        case 3:
                            question_bank.setAnswer(cell.getStringCellValue());
                            break;
                        case 4:
                            question_bank.setOptions(cell.getStringCellValue());
                            break;
                        default:
                            throw new ExcelException("wrong excel");
                    }
                }
            }
            result = question_bankService.insert(question_bank, "createQuestion");
            question_bank.initQuestion_bank();
            if (result == 0) {
                stringBuilder.append(i).append(";");
            }
            success += result;
        }
        return success;
    }

    private int setCourse(Sheet sheet, int trLength, int success, StringBuilder stringBuilder) {
        Row row;
        int tdLength;
        Cell cell;
        int result;Course course = new Course();
        List<Chapter> list = new ArrayList<Chapter>();
        for (int i = 1; i < trLength; i++) {
            row = sheet.getRow(i);

            tdLength = row.getLastCellNum();    //由于此表数量不定  需要重置每行宽度
            for (int j = 0; j < tdLength; j++) {
                cell = row.getCell(j);
                if (cell != null) {
                    cell.setCellType(Cell.CELL_TYPE_STRING);
                    switch (j) {
                        case 0:
                            course.setCourse_name(cell.getStringCellValue());
                            break;
                        case 1:
                            course.setCourse_desc(cell.getStringCellValue());
                            break;
                        case 2:
                            course.setCourse_num(Integer.parseInt(cell.getStringCellValue()));
                            break;
                        default:                //默认为章节
                            if (j < 3 + course.getCourse_num()) {
                                String [] chapterStr = cell.getStringCellValue().split("##");
                                System.out.println(chapterStr.length);
                                Chapter chapter = new Chapter(chapterStr[0],chapterStr[1].replaceAll("；",";"),chapterStr[2].replaceAll("；",";"));
                                list.add(chapter);
                            } else {
                                break;
                            }
                    }
                }
            }
            result = courseService.insert(course, "createCourse");  //新增一门课程，同时获得课程的ID
            int chapterResult = 0;
            for (Chapter chapter : list){
                chapter.setCourse_id(course.getCourse_id());
                chapterResult += chapterService.insert(chapter,"createChapter");
            }

            list.clear();

            //判断课程是否添加成功 课程章节是否添加成功
            if (result == 0) {
                stringBuilder.append(i).append(";");
            } else {
                if(chapterResult == course.getCourse_num()){    //课程章节是否添加成功
                    success++;
                }else {                     //课程添加成功而章节失败，则回滚所有操作
                    stringBuilder.append(i).append(";");
                    courseService.deleteByKey(course.getCourse_id(),"delCourseById");
                }

            }
            //在此添加生成图片方法
            createImage.create(course.getCourse_id(),course.getCourse_name());
            //==================
        }
        return success;
    }

    private int setTeacher(Sheet sheet, int trLength, int tdLength, int success, StringBuilder stringBuilder) throws ExcelException {
        Row row;
        Cell cell;
        int result;Account accountT = new Account();
        for (int i = 1; i < trLength; i++) {
            row = sheet.getRow(i);

            for (int j = 0; j < tdLength; j++) {
                cell = row.getCell(j);
                if (cell != null) {
                    cell.setCellType(Cell.CELL_TYPE_STRING);
                    switch (j) {
                        case 0://设定工号及密码
                            accountT.setAccount_id(cell.getStringCellValue());
                            accountT.setPassword(DigestUtils.md5Hex(DigestUtils.sha1Hex(cell.getStringCellValue())));
                            accountT.setLevel(2);
                            break;
                        case 1://设定姓名
                            accountT.setUser_name(cell.getStringCellValue());
                            break;
                        case 2://设定性别
                            accountT.setSex(Integer.parseInt(cell.getStringCellValue()));
                            break;
                        case 3: //设定邮箱
                            accountT.setEmail(cell.getStringCellValue());
                            break;
                        case 4: //设定手机
                            accountT.setCellphone(cell.getStringCellValue());
                            break;
                        default:
                            throw new ExcelException("wrong excel");
                    }
                }
            }
            result = accountService.insert(accountT, "createAccount");
            if (result == 0) {
                stringBuilder.append(accountT.getAccount_id()).append(";");
            }
            success += result;
        }
        return success;
    }

    private int setStudent(Sheet sheet, int trLength, int tdLength, int success, StringBuilder stringBuilder) throws ExcelException {
        Row row;
        Cell cell;
        int result;Account account = new Account();
        for (int i = 1; i < trLength; i++) {
            row = sheet.getRow(i);
            for (int j = 0; j < tdLength; j++) {
                cell = row.getCell(j);
                if (cell != null) {
                    cell.setCellType(Cell.CELL_TYPE_STRING);
                    switch (j) {
                        case 0://设定学号、密码、权限等级
                            account.setAccount_id(cell.getStringCellValue());
                            account.setPassword(DigestUtils.md5Hex(DigestUtils.sha1Hex(cell.getStringCellValue())));
                            account.setLevel(1);
                            break;
                        case 1://设定姓名
                            account.setUser_name(cell.getStringCellValue());
                            break;
                        case 2://设定性别
                            account.setSex(Integer.parseInt(cell.getStringCellValue()));
                            break;
                        case 3://设定班级
                            account.setClass_name(cell.getStringCellValue());
                            break;
                        case 4: //设定班内序号
                            account.setSerial_number(Integer.parseInt(cell.getStringCellValue()));
                            break;
                        case 5: //设定邮箱
                            account.setEmail(cell.getStringCellValue());
                            break;
                        case 6: //设定手机
                            account.setCellphone(cell.getStringCellValue());
                            break;
                        default:
                            throw new ExcelException("wrong excel");

                    }
                }
            }
            result = accountService.insert(account, "createAccount");
            if (result == 0) {
                stringBuilder.append(account.getAccount_id()).append(";");
            }
            success += result;
        }
        return success;
    }


}
