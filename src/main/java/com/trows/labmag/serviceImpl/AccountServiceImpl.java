package com.trows.labmag.serviceImpl;

import com.trows.labmag.base.AbstractBaseDao;
import com.trows.labmag.entity.Account;
import com.trows.labmag.service.AccountService;
import org.springframework.stereotype.Service;

/**
 * Created by Throws_exception on 2016/4/26.
 */
@Service("AccountService")
public class AccountServiceImpl extends AbstractBaseDao<Account,String> implements AccountService  {
}
