package com.trows.labmag.controller;

import com.trows.labmag.common.MyException.ExcelException;
import com.trows.labmag.common.PIO.MyExcel;
import com.trows.labmag.common.util.ProjectPath;

import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;

/**
 * Created by Throws_exception on 2016/4/29.
 */
@Controller
public class FileController {

    @Autowired
    private MyExcel excel;

    @RequestMapping("/getExcel.do")
    public void getExcel(@RequestParam(value = "file", required = false)
                                     MultipartFile[] files, HttpServletRequest request,
                         HttpServletResponse response) throws IOException {
        String target = request.getParameter("target");
        String user_name = (String) request.getSession().getAttribute("user_name");
        if (target == null || user_name == null) {
            response.getOutputStream().write(
                    "{\"state\":\"error\",\"code\":\"500\",\"desc\":\"Illegal target\"}"
                            .getBytes());
            return;
        }
        try {
            String saveFileStamp = getUserStamp() + user_name;
            this.PersistenceExcel(response,files,Integer.parseInt(target));  //解析excel表格
            this.Persistence(files, saveFileStamp);
        } catch (Exception e) {
            response.getOutputStream().write(
                    "{\"state\":\"error\",\"code\":\"500\",\"desc\":\"unexpected error\"}"
                            .getBytes());
            e.printStackTrace();
        }
    }

   //获取用户操作时间戳
    private String getUserStamp() {
        return new SimpleDateFormat("yyyy-MM-dd-hh-mm-ss-").format(new Date());
    }

    private String Persistence(MultipartFile[] files, String saveFileStamp) throws IOException, InvalidFormatException, ExcelException {
        String path = ProjectPath.getPath() + "/file/excel/";
        File parentFileDir = new File(path);
        if (!parentFileDir.exists()) {
            boolean judge = parentFileDir.mkdirs();
            if (!judge) {
                return "error";
            }
        }
        for (MultipartFile file : files) {
            if (file != null) {
                    file.transferTo(new File(path + saveFileStamp + file.getOriginalFilename()));
            }
        }
        return "200";
    }

    private void PersistenceExcel(HttpServletResponse response,MultipartFile [] files,int type) throws IOException, InvalidFormatException, ExcelException {
        for (MultipartFile file : files) {
            if (file != null) {
                 String[] result = excel.setInfo(file.getInputStream(),type);
                String info = "{\"state\":\"success\",\"code\":\"200\",\"desc\":\" "+Arrays.toString(result)+"\"}";
                response.getOutputStream().write(info.getBytes());      //返回操作成功记录
            }else {
                response.getOutputStream().write("{\"state\":\"error\",\"code\":\"500\",\"desc\":\"empty file\"}".getBytes());
            }
        }


    }

}
