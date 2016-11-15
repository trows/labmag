package com.trows.labmag.serviceImpl;

import com.trows.labmag.base.AbstractBaseDao;
import com.trows.labmag.entity.Teacher_relation;
import com.trows.labmag.service.Teacher_relationService;
import org.springframework.stereotype.Service;

/**
 * Created by Throws_exception on 2016/4/26.
 */
@Service("Teacher_relationService")
public class Teacher_relationServiceImpl extends AbstractBaseDao<Teacher_relation,Integer> implements Teacher_relationService {
}
