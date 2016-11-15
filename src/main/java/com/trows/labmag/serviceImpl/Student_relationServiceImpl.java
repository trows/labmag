package com.trows.labmag.serviceImpl;

import com.trows.labmag.base.AbstractBaseDao;
import com.trows.labmag.entity.Student_relation;
import com.trows.labmag.service.Student_relationService;
import org.springframework.stereotype.Service;

/**
 * Created by Throws_exception on 2016/4/26.
 */
@Service("Student_relationService")
public class Student_relationServiceImpl extends AbstractBaseDao<Student_relation,String> implements Student_relationService {
}
