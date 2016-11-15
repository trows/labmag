package com.trows.labmag.common.component.comImplements;

import com.trows.labmag.common.component.comInterface.CreateImage;
import com.trows.labmag.common.util.ProjectPath;
import org.springframework.stereotype.Component;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.Random;

/**
 * Created by Throws_exception on 2016/5/8.
 */
@Component
public class CreateImageImpl implements CreateImage {

    public void create(int course_id,String course_name) {

        String path = ProjectPath.getCourseImgPath()+course_id+".png";
        int width = 300, height = 150;

        BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
        Graphics2D graphics = image.createGraphics();
        String [] fontFamily = {"华康勘亭流W9(P)","华康海报体W12(P)","华康雅宋体W9","方正行楷简体","华康龙门石碑W9","华康少女文字W5"};
        int [][] ColorFamily = {
                {111, 84, 153}, {7,105,173},{76,175,80},{207,70,70},{52,152,219},{31,166,122},{244,60,18},{26,188,156},
                {4,165,230},{96,94,94},{109,51,83},{240,80,51}
        };
        String font = fontFamily[new Random().nextInt(6)];
        int [] color = ColorFamily[new Random().nextInt(12)];
        graphics.setColor(new Color(color[0], color[1], color[2]));
        graphics.fillRect(0, 0, width, height);
        int fontSize,yPox =0;    //@字体大小  @y轴偏移量
        int textLength = course_name.length();

        if(textLength>8){               //根据字数长短设定大小和偏移量
            course_name = course_name.substring(0,7)+"...";
            fontSize = 30;
        }else if(textLength>6){
            fontSize = 35;
        }else if (textLength>4) {
            fontSize = 40;
        }else {
            fontSize = 50;
            yPox = 6;
        }


        graphics.setFont(new Font(font, Font.BOLD, fontSize));
        graphics.setColor(Color.white);
        int strWidth = graphics.getFontMetrics().stringWidth(course_name);

        graphics.drawString(course_name, (300-strWidth)/2, 75+yPox);
        File parentFileDir = new File(ProjectPath.getCourseImgPath());
        if (!parentFileDir.exists()) {
           parentFileDir.mkdirs();
        }
        try {
            ImageIO.write(image, "png", new File(path));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
