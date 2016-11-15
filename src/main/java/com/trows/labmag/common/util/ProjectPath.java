package com.trows.labmag.common.util;

/**
 * Created by Throws_exception on 2015/7/23.
 */
public class ProjectPath {
    private static String path =setPath();
    private static String courseImgPath = getPath()+"\\assert\\images\\course\\";
    private static String setPath (){
       path = System.getProperty("user.dir");
        path = path.substring(0,path.length()-4)+"\\webapps\\labmag";
        return path;
    }
    public static String getPath(){
        return path;
    }
    public static String getCourseImgPath(){ return courseImgPath;}
}
