package com.trows.labmag.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.trows.labmag.entity.Account;
import com.trows.labmag.service.AccountService;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 * Created by Throws_exception on 2015/12/28.
 */
@Controller
public class AccountController {

    @Autowired
    private AccountService accountService;

    private void print(HttpServletResponse response,String value){
        try {
            response.getWriter().print(value);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void print(HttpServletResponse response,int value){
        try {
            response.getWriter().print(value);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @RequestMapping("/loginCheck.htm")        //登陆检查
    public String loginCheck(HttpServletRequest request){
        String account_id = request.getParameter("form-username");
        String password =request.getParameter("form-password");
        if(account_id == null || password == null || account_id.length()<=5
                || password.length() <=5 ){
            return "redirect:./index/index.jsp?return_code=301";}
        account_id = account_id.trim();//去除首尾误输入的空格，提升操作友好性
        password = DigestUtils.md5Hex(DigestUtils.sha1Hex(password));
        Account account = new Account();
        account.setAccount_id(account_id);
        account.setPassword(password);
        account = accountService.getEntityByValue(account,"checkLogin");
        if(account!=null && account.getAccount_id().equals(account_id) &&
                account.getPassword().equals(password)){
            HttpSession session = request.getSession(true);
            session.setAttribute("level",account.getLevel());
            session.setAttribute("user_name",account.getUser_name());
            session.setAttribute("account_id",account.getAccount_id());
            session.setAttribute("class_name",account.getClass_name());
            //根据权限不同进行不同的操作
           switch (account.getLevel()){
               case 1:return "redirect:/myCourse.htm";
               case 2:return "redirect:/myCourse.htm";
               case 3:return "redirect:./manage/adminIndex.jsp";
               default:return "redirect:./index/index.jsp?return_code=301"; //用户存在 但有非法信息
           }
        }
        return "redirect:./index/index.jsp?return_code=301";
    }

    @RequestMapping("/loginOut.htm")
    public String loginOut(HttpServletRequest request){
        request.getSession(true).invalidate();
        return "redirect:./index/index.jsp";
    }

    @RequestMapping("/getStudentsByClass.do")
    public void getStudentsByClass(@RequestParam("data") String class_name, HttpServletResponse response){
        if(class_name!=null){
            String data = JSON.toJSONString(accountService.getListByKey(class_name,"getStudentsByClass"),
                    SerializerFeature.WriteNullStringAsEmpty,SerializerFeature.WriteNullNumberAsZero,
                    SerializerFeature.WriteMapNullValue);
            try {
                response.getWriter().print((data.equals("[]"))?"empty":data);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    @RequestMapping("/getStudentsByName.do")
    public void getStudentsByName(@RequestParam("data") String user_name, HttpServletResponse response){
        if(user_name!=null){
            String data = JSON.toJSONString(accountService.getListByKey(user_name,"getStudentsByName"),
                    SerializerFeature.WriteNullStringAsEmpty,SerializerFeature.WriteNullNumberAsZero,
                    SerializerFeature.WriteMapNullValue);
            try {
                response.getWriter().print((data.equals("[]"))?"empty":data);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    @RequestMapping("/getStudentsById.do")
    public void getStudentsById(@RequestParam("data") String account_id, HttpServletResponse response){
        if(account_id!=null){
            String  data = JSON.toJSONString(accountService.getListByKey(account_id,"getStudentsById"),
                    SerializerFeature.WriteNullStringAsEmpty,SerializerFeature.WriteNullNumberAsZero,
                    SerializerFeature.WriteMapNullValue);
            try {
                response.getWriter().print((data.equals("[]"))?"empty":data);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    @RequestMapping("/delAccount.do")
    public void delAccount(@RequestParam("account_id") String account_id,HttpServletResponse response){
        if(account_id!=null){
            try {
                response.getWriter().print(accountService.deleteByKey(account_id,"delOneByKey"));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    @RequestMapping("/delClass.do")
    public void delClass(@RequestParam("class_name") String class_name,HttpServletResponse response) {
        if (class_name != null) {
            try {
                response.getWriter().print(accountService.deleteByKey(class_name, "delClassByKey"));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    @RequestMapping("/resetPassword.do")
    public void resetPassword(@RequestParam("account_id") String account_id,HttpServletResponse response){
        if(account_id != null){
            Account account = new Account();
            account.setAccount_id(account_id);
            account.setPassword(DigestUtils.md5Hex(DigestUtils.sha1Hex(account_id)));
            try {
                response.getWriter().print(accountService.update(account,"resetPassword"));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    @RequestMapping("/alertStudentInfo.do")
    public void alertAccount(@RequestParam("json") String json,HttpServletResponse response){
        Account account = JSON.parseObject(json,Account.class);
        try {
            response.getWriter().print(accountService.update(account,"alertStudentInfo"));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    @RequestMapping("/getTeacherByName.do")
    public void getTeacherByName(@RequestParam("data") String user_name, HttpServletResponse response){
        if(user_name!=null){
            try {
                response.getWriter().print(JSON.toJSONString(accountService.getListByKey(user_name,"getTeacherByName"),
                        SerializerFeature.WriteNullStringAsEmpty,SerializerFeature.WriteNullNumberAsZero,
                        SerializerFeature.WriteMapNullValue));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    @RequestMapping("/getTeacherById.do")
    public void getTeacherById(@RequestParam("data") String account_id, HttpServletResponse response){
        if(account_id!=null){
            try {
                response.getWriter().print(JSON.toJSONString(accountService.getListByKey(account_id,"getTeacherById"),
                        SerializerFeature.WriteNullStringAsEmpty,SerializerFeature.WriteNullNumberAsZero,
                        SerializerFeature.WriteMapNullValue));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    @RequestMapping("/getAllTeacherInfo.do")
    public void getAllTeacherInfo(HttpServletResponse response){
        try {
            response.getWriter().print(JSON.toJSONString(accountService.getListByKey("all","getAllTeacherInfo"),
                    SerializerFeature.WriteNullStringAsEmpty,SerializerFeature.WriteNullNumberAsZero,
                    SerializerFeature.WriteMapNullValue));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @RequestMapping("/alertTeacherInfo.do")
    public void alertTeacherInfo(@RequestParam("json") String json,HttpServletResponse response){
        Account account = JSON.parseObject(json,Account.class);
        try {
            response.getWriter().print(accountService.update(account,"alertTeacherInfo"));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @RequestMapping("/getExistClass.do")
    public void getExistClass(@RequestParam("class_name") String class_name,HttpServletResponse response){
        Account account = accountService.getEntityByKey(class_name,"getExistClass");
        if (account!=null){
            try {
                response.getWriter().print("success");
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    @RequestMapping("/myInfo.htm")
    public String myInfo(HttpServletRequest request){
        String account_id = (String) request.getSession(true).getAttribute("account_id");
        request.setAttribute("account",accountService.getEntityByKey(account_id,"getOneAccount"));
        return "./index/personal_info";
    }

    @RequestMapping("/changePassword.do")
    public void changePassword(HttpServletRequest request,HttpServletResponse response){
        String account_id = (String) request.getSession(true).getAttribute("account_id");
        Account account = accountService.getEntityByKey(account_id,"getOneAccount");

        String change = DigestUtils.md5Hex(DigestUtils.sha1Hex(request.getParameter("change")));
        String origin = DigestUtils.md5Hex(DigestUtils.sha1Hex(request.getParameter("origin")));
        if(account.getPassword().equals(origin)){
            account.setPassword(change);
            this.print(response,accountService.update(account,"resetPassword"));
        }else {
            this.print(response,0);
        }
    }

    @RequestMapping("/changeAccountInfo.do")
    public void changeAccountInfo(HttpServletRequest request,HttpServletResponse response){
        Account account = new Account();
        account.setAccount_id((String) request.getSession(true).getAttribute("account_id"));
        account.setEmail(request.getParameter("email"));
        account.setCellphone(request.getParameter("cellphone"));
        this.print(response,accountService.update(account,"changeAccountInfo"));
    }
}
